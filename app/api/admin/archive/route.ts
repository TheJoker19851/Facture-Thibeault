import { firebaseAdminConfigured, getFirebaseAdminAuth, getFirebaseAdminDataConnect, getFirebaseAdminStorage } from "../../../../firebase/admin";
import { listAllAdminInvoices, type ServerAdminInvoice } from "../../../../firebase/accounting-pagination.server";
import { AUDIT_ACTIONS, auditDetails, auditEventId } from "../../../../lib/audit-events.mjs";
import { ARCHIVE_CRITERIA, ARCHIVE_PURGE_CONFIRMATION, ARCHIVE_SCHEMA_VERSION, buildArchiveId, buildArchiveManifestHash, normalizeArchiveStoragePath, sortArchiveFiles } from "../../../../lib/archive-manifest.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PURGE_OBJECTS = 500;

type ArchiveIdentity = { uid: string; role: "KIM" | "ADMIN" };
type StorageMetadata = {
  size?: string | number;
  contentType?: string;
  updated?: string;
  generation?: string;
};
type StorageFile = {
  name: string;
  metadata?: StorageMetadata;
  getMetadata?: () => Promise<[StorageMetadata]>;
  delete: () => Promise<unknown>;
};
type StorageObject = {
  storagePath: string;
  contentType: string | null;
  sizeBytes: number;
  updatedAt: string | null;
  generation: string | null;
  file: StorageFile;
};
type ArchiveManifestFile = Omit<StorageObject, "file"> & {
  receiptId: string;
  invoiceId: string;
  transactionId: string | null;
  sequence: number;
};
type ArchiveSummary = {
  storageObjects: number;
  storageBytes: number;
  eligiblePhotos: number;
  eligibleBytes: number;
  eligibleInvoices: number;
  eligibleReceipts: number;
  unlinkedStorageObjects: number;
  missingLinkedPhotos: number;
  duplicateLinkedPaths: number;
};
type ArchiveManifest = {
  schemaVersion: number;
  generatedAt: string;
  bucket: string;
  archiveId: string;
  manifestHash: string;
  criteria: typeof ARCHIVE_CRITERIA;
  summary: ArchiveSummary;
  files: ArchiveManifestFile[];
};
type ArchiveSnapshot = {
  bucket: string;
  archiveId: string;
  manifest: ArchiveManifest;
  eligibleObjects: Array<StorageObject & { archiveFile: ArchiveManifestFile }>;
};

async function authenticatePrivileged(request: Request): Promise<ArchiveIdentity | null> {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return null;
  try {
    const decoded = await (await getFirebaseAdminAuth()).verifyIdToken(token);
    if (decoded.role !== "KIM" && decoded.role !== "ADMIN") return null;
    return { uid: decoded.uid, role: decoded.role };
  } catch {
    return null;
  }
}

async function listStorageObjects(bucketName: string): Promise<StorageObject[]> {
  const [files] = await (await getFirebaseAdminStorage()).bucket(bucketName).getFiles({ prefix: "receipts/" });
  const storageFiles = files as unknown as StorageFile[];
  const objects: StorageObject[] = [];

  for (let index = 0; index < storageFiles.length; index += 25) {
    const batch = storageFiles.slice(index, index + 25);
    const rows = await Promise.all(batch.map(async (file) => {
      const storagePath = normalizeArchiveStoragePath(file.name);
      if (!storagePath) return null;
      let metadata = file.metadata ?? {};
      if (metadata.size == null && file.getMetadata) {
        [metadata] = await file.getMetadata();
      }
      const sizeBytes = Number(metadata.size);
      if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 0) {
        throw new Error(`Métadonnées Storage incomplètes pour ${storagePath}.`);
      }
      return {
        storagePath,
        contentType: metadata.contentType ?? null,
        sizeBytes,
        updatedAt: metadata.updated ?? null,
        generation: metadata.generation ?? null,
        file,
      } satisfies StorageObject;
    }));
    objects.push(...rows.filter((row): row is StorageObject => row !== null));
  }

  return objects;
}

function postedPhotoLinks(invoices: ServerAdminInvoice[]) {
  const links = new Map<string, Array<{
    receiptId: string;
    invoiceId: string;
    transactionId: string | null;
    sequence: number;
  }>>();

  for (const invoice of invoices) {
    if (invoice.accountingStatus !== "POSTED" || invoice.processingStatus === "DELETED") continue;
    const receiptId = invoice.intake?.receiptId ?? "";
    const storageFolder = invoice.intake?.storageFolder ?? invoice.storageFolder ?? null;
    for (const photo of invoice.invoicePhotos_on_invoice ?? []) {
      const storagePath = normalizeArchiveStoragePath(photo.storagePath);
      if (!storagePath) continue;
      if (storageFolder) {
        const normalizedFolder = normalizeArchiveStoragePath(storageFolder);
        if (!normalizedFolder || !storagePath.startsWith(`${normalizedFolder}/`)) continue;
      }
      const current = links.get(storagePath) ?? [];
      current.push({
        receiptId,
        invoiceId: invoice.id,
        transactionId: invoice.transaction?.id ?? null,
        sequence: Number(photo.sequence) || 0,
      });
      links.set(storagePath, current);
    }
  }
  return links;
}

async function buildArchiveSnapshot(): Promise<ArchiveSnapshot> {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucket) throw new Error("Le bucket Firebase Storage n'est pas configuré.");
  const dataConnect = await getFirebaseAdminDataConnect();
  const [invoices, storageObjects] = await Promise.all([
    listAllAdminInvoices(dataConnect),
    listStorageObjects(bucket),
  ]);
  const links = postedPhotoLinks(invoices);
  const storagePaths = new Set(storageObjects.map((object) => object.storagePath));
  const eligibleObjects: Array<StorageObject & { archiveFile: ArchiveManifestFile }> = [];
  const duplicateLinkedPaths = Array.from(links.values()).filter((entries) => entries.length > 1).length;

  for (const object of storageObjects) {
    const entries = links.get(object.storagePath) ?? [];
    if (entries.length !== 1) continue;
    const [entry] = entries;
    const archiveFile: ArchiveManifestFile = {
      storagePath: object.storagePath,
      contentType: object.contentType,
      sizeBytes: object.sizeBytes,
      updatedAt: object.updatedAt,
      generation: object.generation,
      receiptId: entry.receiptId,
      invoiceId: entry.invoiceId,
      transactionId: entry.transactionId,
      sequence: entry.sequence,
    };
    eligibleObjects.push({ ...object, archiveFile });
  }

  const files = sortArchiveFiles(eligibleObjects.map(({ archiveFile }) => archiveFile));
  const summary: ArchiveSummary = {
    storageObjects: storageObjects.length,
    storageBytes: storageObjects.reduce((total, object) => total + object.sizeBytes, 0),
    eligiblePhotos: files.length,
    eligibleBytes: files.reduce((total, file) => total + file.sizeBytes, 0),
    eligibleInvoices: new Set(files.map((file) => file.invoiceId)).size,
    eligibleReceipts: new Set(files.map((file) => file.receiptId).filter(Boolean)).size,
    unlinkedStorageObjects: storageObjects.length - files.length,
    missingLinkedPhotos: Array.from(links.keys()).filter((storagePath) => !storagePaths.has(storagePath)).length,
    duplicateLinkedPaths,
  };
  const manifestHash = buildArchiveManifestHash({ bucket, summary, files });
  const archiveId = buildArchiveId(manifestHash);
  const manifest: ArchiveManifest = {
    schemaVersion: ARCHIVE_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    bucket,
    archiveId,
    manifestHash,
    criteria: ARCHIVE_CRITERIA,
    summary,
    files,
  };
  return { bucket, archiveId, manifest, eligibleObjects };
}

async function recordArchiveAudit(
  dataConnect: Awaited<ReturnType<typeof getFirebaseAdminDataConnect>>,
  identity: ArchiveIdentity,
  snapshot: ArchiveSnapshot,
  details: Record<string, unknown>,
) {
  const auditEventIdValue = auditEventId(snapshot.archiveId, AUDIT_ACTIONS.ARCHIVE_PURGE, snapshot.manifest.manifestHash.slice(0, 16));
  await dataConnect.executeMutation("AdminRecordArchivePurge", {
    auditEventId: auditEventIdValue,
    actorUid: identity.uid,
    actorRole: identity.role,
    archiveId: snapshot.archiveId,
    auditDetails: auditDetails(details),
  });
  return auditEventIdValue;
}

export async function GET(request: Request) {
  const identity = await authenticatePrivileged(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  if (!firebaseAdminConfigured()) return Response.json({ error: "Firebase Admin n'est pas configuré côté serveur." }, { status: 503 });

  try {
    const snapshot = await buildArchiveSnapshot();
    const includeManifest = new URL(request.url).searchParams.get("include") === "manifest";
    const payload = {
      ok: true,
      generatedAt: snapshot.manifest.generatedAt,
      archiveId: snapshot.archiveId,
      manifestHash: snapshot.manifest.manifestHash,
      summary: snapshot.manifest.summary,
      ...(includeManifest ? { manifest: snapshot.manifest } : {}),
    };
    return Response.json(payload, {
      headers: {
        "cache-control": "no-store",
        ...(includeManifest ? { "content-disposition": `attachment; filename=archive-manifest-${snapshot.manifest.manifestHash.slice(0, 12)}.json` } : {}),
      },
    });
  } catch (error) {
    console.error("Archive statistics failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "Les statistiques Storage ne sont pas disponibles pour le moment." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const identity = await authenticatePrivileged(request);
  if (!identity) return Response.json({ error: "Le rôle KIM ou ADMIN est requis." }, { status: 403 });
  if (identity.role !== "ADMIN") return Response.json({ error: "Le rôle ADMIN est requis pour purger les photos." }, { status: 403 });
  if (!firebaseAdminConfigured()) return Response.json({ error: "Firebase Admin n'est pas configuré côté serveur." }, { status: 503 });

  const body = await request.json().catch(() => ({})) as { manifestHash?: unknown; confirmation?: unknown; exportReference?: unknown };
  if (body.confirmation !== ARCHIVE_PURGE_CONFIRMATION) {
    return Response.json({ error: `La confirmation exacte ${ARCHIVE_PURGE_CONFIRMATION} est requise.` }, { status: 400 });
  }
  if (typeof body.manifestHash !== "string" || !/^[a-f0-9]{64}$/.test(body.manifestHash)) {
    return Response.json({ error: "Le manifeste fourni est invalide." }, { status: 400 });
  }
  if (typeof body.exportReference !== "string" || body.exportReference.trim().length < 3 || body.exportReference.trim().length > 160) {
    return Response.json({ error: "La référence de l’export vérifié est requise." }, { status: 400 });
  }

  try {
    const snapshot = await buildArchiveSnapshot();
    if (snapshot.manifest.manifestHash !== body.manifestHash) {
      return Response.json({ error: "Le manifeste est périmé. Actualisez les statistiques avant de recommencer." }, { status: 409 });
    }
    if (snapshot.eligibleObjects.length === 0) {
      return Response.json({ ok: true, deletedCount: 0, deletedBytes: 0, manifestHash: snapshot.manifest.manifestHash, archiveId: snapshot.archiveId }, { headers: { "cache-control": "no-store" } });
    }
    if (snapshot.eligibleObjects.length > MAX_PURGE_OBJECTS) {
      return Response.json({ error: `La purge est limitée à ${MAX_PURGE_OBJECTS} photos par opération; aucun fichier n’a été supprimé.` }, { status: 409 });
    }

    const dataConnect = await getFirebaseAdminDataConnect();
    const auditBase = {
      status: "STARTED",
      manifestHash: snapshot.manifest.manifestHash,
      exportReference: body.exportReference.trim(),
      requestedFiles: snapshot.eligibleObjects.length,
      requestedBytes: snapshot.manifest.summary.eligibleBytes,
    };
    let auditId: string;
    try {
      auditId = await recordArchiveAudit(dataConnect, identity, snapshot, auditBase);
    } catch (error) {
      console.error("Archive audit write failed", error instanceof Error ? error.message : error);
      return Response.json({ error: "La piste d’audit n’est pas disponible; aucun fichier n’a été supprimé." }, { status: 503 });
    }

    let deletedCount = 0;
    let deletedBytes = 0;
    for (const object of snapshot.eligibleObjects) {
      try {
        await object.file.delete();
        deletedCount += 1;
        deletedBytes += object.sizeBytes;
      } catch (error) {
        console.error("Archive object deletion failed", object.storagePath, error instanceof Error ? error.message : error);
      }
    }

    const status = deletedCount === snapshot.eligibleObjects.length ? "COMPLETED" : "PARTIAL";
    try {
      await recordArchiveAudit(dataConnect, identity, snapshot, {
        ...auditBase,
        status,
        deletedFiles: deletedCount,
        deletedBytes,
        completedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Archive completion audit write failed", error instanceof Error ? error.message : error);
    }

    if (status !== "COMPLETED") {
      return Response.json({ error: "La purge est partielle; consultez l’audit avant de relancer une opération.", deletedCount, deletedBytes, auditId }, { status: 502 });
    }
    return Response.json({ ok: true, deletedCount, deletedBytes, manifestHash: snapshot.manifest.manifestHash, archiveId: snapshot.archiveId, auditId }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    console.error("Archive purge failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "La purge n’a pas pu être exécutée; aucun résultat fiable n’est disponible." }, { status: 503 });
  }
}
