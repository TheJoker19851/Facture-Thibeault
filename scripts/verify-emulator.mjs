import assert from "node:assert/strict";
import { deleteApp, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connectStorageEmulator, deleteObject, getBytes, getStorage, ref, uploadString } from "firebase/storage";
import { LOCAL_FIREBASE_PROJECT_ID } from "../lib/environment.mjs";
import { loadStoredInvoicePhotos } from "../lib/invoice-storage.mjs";
import { INVOICE_CLIENT_VERSION } from "../lib/invoice-client-version.mjs";
import { demoUsers, LOCAL_DEMO_PASSWORD } from "./fixtures/demo-data.mjs";

const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: `${LOCAL_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: LOCAL_FIREBASE_PROJECT_ID,
  storageBucket: `${LOCAL_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: "1:000000000000:web:demo",
};

async function signedInServices(role) {
  const demoUser = demoUsers.find((user) => user.role === role);
  const app = initializeApp(firebaseConfig, `permission-${role}-${Date.now()}`);
  const auth = getAuth(app);
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  const storage = getStorage(app);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
  const credential = await signInWithEmailAndPassword(auth, demoUser.email, LOCAL_DEMO_PASSWORD);
  return { app, auth, credential, storage };
}

export async function verifyEmulatorPermissions() {
  const worker = await signedInServices("WORKER");
  const kim = await signedInServices("KIM");
  const anonymousApp = initializeApp(firebaseConfig, `permission-anonymous-${Date.now()}`);
  const anonymousStorage = getStorage(anonymousApp);
  connectStorageEmulator(anonymousStorage, "127.0.0.1", 9199);
  const receiptId = "DEMO-PERMISSION-RECEIPT";
  const storagePath = `receipts/2099/01/${receiptId}/original-01.png`;
  const jpegPath = `receipts/2099/01/DEMO-FORMAT-JPEG/original-01.jpg`;
  const webpPath = `receipts/2099/01/DEMO-FORMAT-WEBP/original-01.webp`;

  try {
    await uploadString(ref(worker.storage, storagePath), "iVBORw0KGgo=", "base64", {
      contentType: "image/png",
      customMetadata: {
        receiptId,
        ownerUid: worker.credential.user.uid,
        sequence: "1",
        invoiceClientVersion: INVOICE_CLIENT_VERSION,
      },
    });
    await assert.rejects(() => getBytes(ref(worker.storage, storagePath)), /storage\/unauthorized|permission/i);
    await assert.rejects(() => getBytes(ref(anonymousStorage, storagePath)), /storage\/unauthorized|permission/i);
    const privilegedBytes = await getBytes(ref(kim.storage, storagePath));
    assert.ok(privilegedBytes.byteLength > 0);
    await assert.rejects(() => uploadString(ref(worker.storage, `receipts/2099/01/DEMO-FORMAT-HEIC/original-01.heic`), "AAAA", "base64", {
      contentType: "image/heic",
      customMetadata: { receiptId: "DEMO-FORMAT-HEIC", ownerUid: worker.credential.user.uid, sequence: "1", invoiceClientVersion: INVOICE_CLIENT_VERSION },
    }), /storage\/unauthorized|permission/i);
    await assert.rejects(() => uploadString(ref(worker.storage, `receipts/2099/01/DEMO-FORMAT-LIE/original-01.png`), "/9j/", "base64", {
      contentType: "image/jpeg",
      customMetadata: { receiptId: "DEMO-FORMAT-LIE", ownerUid: worker.credential.user.uid, sequence: "1", invoiceClientVersion: INVOICE_CLIENT_VERSION },
    }), /storage\/unauthorized|permission/i);
    await uploadString(ref(worker.storage, jpegPath), "/9j/2wA=", "base64", {
      contentType: "image/jpeg",
      customMetadata: { receiptId: "DEMO-FORMAT-JPEG", ownerUid: worker.credential.user.uid, sequence: "1", invoiceClientVersion: INVOICE_CLIENT_VERSION },
    });
    await uploadString(ref(worker.storage, webpPath), "UklGRgQAAABXRUJQ", "base64", {
      contentType: "image/webp",
      customMetadata: { receiptId: "DEMO-FORMAT-WEBP", ownerUid: worker.credential.user.uid, sequence: "1", invoiceClientVersion: INVOICE_CLIENT_VERSION },
    });
    await assert.rejects(() => uploadString(ref(kim.storage, storagePath), "iVBORw0KGgo=", "base64", {
      contentType: "image/png",
      customMetadata: { receiptId, ownerUid: worker.credential.user.uid, sequence: "1", invoiceClientVersion: INVOICE_CLIENT_VERSION },
    }), /storage\/unauthorized|permission/i);
    await assert.rejects(() => uploadString(ref(worker.storage, "receipts/2099/01/DEMO-STALE-CLIENT/original-01.png"), "iVBORw0KGgo=", "base64", {
      contentType: "image/png",
      customMetadata: { receiptId: "DEMO-STALE-CLIENT", ownerUid: worker.credential.user.uid, sequence: "1" },
    }), /storage\/unauthorized|permission/i);

    process.env.DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399";
    const [{ initializeApp: initializeAdminApp, deleteApp: deleteAdminApp }, { getDataConnect }, { getStorage: getAdminStorage }] = await Promise.all([
      import("firebase-admin/app"),
      import("firebase-admin/data-connect"),
      import("firebase-admin/storage"),
    ]);
    const adminApp = initializeAdminApp({ projectId: LOCAL_FIREBASE_PROJECT_ID }, `permission-admin-${Date.now()}`);
    try {
      const dataConnect = getDataConnect({
        serviceId: "facture-thibeault-service",
        location: "northamerica-northeast1",
        connector: "accounting",
      }, adminApp);
      const adminFile = getAdminStorage(adminApp).bucket(firebaseConfig.storageBucket).file(storagePath);
      const [metadataBefore] = await adminFile.getMetadata();
      const [objectsBefore] = await getAdminStorage(adminApp).bucket(firebaseConfig.storageBucket).getFiles({ prefix: `receipts/2099/01/${receiptId}/` });
      const storedPhotos = await loadStoredInvoicePhotos(getAdminStorage(adminApp).bucket(firebaseConfig.storageBucket), {
        receiptId,
        uploaderUid: worker.credential.user.uid,
        storageFolder: `receipts/2099/01/${receiptId}`,
        photoCount: 1,
      });
      const [metadataAfter] = await adminFile.getMetadata();
      const [objectsAfter] = await getAdminStorage(adminApp).bucket(firebaseConfig.storageBucket).getFiles({ prefix: `receipts/2099/01/${receiptId}/` });
      assert.equal(storedPhotos.length, 1);
      assert.equal(storedPhotos[0].storagePath, storagePath);
      assert.equal(metadataAfter.generation, metadataBefore.generation);
      assert.equal(metadataAfter.metageneration, metadataBefore.metageneration);
      assert.equal(objectsAfter.length, objectsBefore.length);
      const workerClaims = { sub: worker.credential.user.uid, role: "WORKER" };
      const kimClaims = { sub: kim.credential.user.uid, role: "KIM" };
      const blockedV1ReceiptId = `DEMO-PERMISSION-V1-${Date.now()}`;
      const blockedStaleV2ReceiptId = `DEMO-PERMISSION-STALE-${Date.now()}`;
      await assert.rejects(
        () => dataConnect.executeQuery("ListExpenseAccounts", undefined, { impersonate: { authClaims: workerClaims } }),
        /permission|unauthorized|auth/i,
      );
      const accounting = await dataConnect.executeQuery("ListExpenseAccounts", undefined, { impersonate: { authClaims: kimClaims } });
      assert.ok(Array.isArray(accounting.data.expenseAccounts));
      await assert.rejects(() => dataConnect.executeMutation("CreateInvoiceIntake", {
        receiptId: blockedV1ReceiptId,
        storageFolder: `receipts/demo/${blockedV1ReceiptId}`,
        photoCount: 1,
      }, { impersonate: { authClaims: workerClaims } }));
      const afterV1 = await dataConnect.executeQuery("ListInvoiceIntakes", { limit: 200, offset: 0 });
      assert.equal(afterV1.data.invoiceIntakes.some((intake) => intake.receiptId === blockedV1ReceiptId), false);
      await dataConnect.executeMutation("CreateInvoiceIntakeV2", {
        receiptId: "DEMO-PERMISSION-INTAKE",
        storageFolder: "receipts/demo/DEMO-PERMISSION-INTAKE",
        photoCount: 1,
        clientVersion: INVOICE_CLIENT_VERSION,
      }, { impersonate: { authClaims: workerClaims } });
      await assert.rejects(() => dataConnect.executeMutation("CreateInvoiceIntakeV2", {
        receiptId: blockedStaleV2ReceiptId,
        storageFolder: `receipts/demo/${blockedStaleV2ReceiptId}`,
        photoCount: 1,
        clientVersion: "invoice-photo-v1",
      }, { impersonate: { authClaims: workerClaims } }));
      const afterStaleV2 = await dataConnect.executeQuery("ListInvoiceIntakes", { limit: 200, offset: 0 });
      assert.equal(afterStaleV2.data.invoiceIntakes.some((intake) => intake.receiptId === blockedStaleV2ReceiptId), false);
      await assert.rejects(
        () => dataConnect.executeMutation("UpsertUserProfile", {
          id: "DEMO-UNAUTHORIZED-PROFILE",
          firebaseUid: "demo-forbidden",
          displayName: "Profil interdit",
          email: "forbidden@example.test",
          jobTitle: "Test",
          role: "WORKER",
          status: "ACTIVE",
        }, { impersonate: { authClaims: workerClaims } }),
        /permission|unauthorized|auth/i,
      );
    } finally {
      await deleteAdminApp(adminApp);
    }

    await Promise.all([
      deleteObject(ref(kim.storage, storagePath)),
      deleteObject(ref(kim.storage, jpegPath)),
      deleteObject(ref(kim.storage, webpPath)),
    ]);
    console.log("Permissions Emulator validées : WORKER, KIM, Auth, Storage et SQL Connect.");
  } finally {
    await Promise.all([deleteApp(worker.app), deleteApp(kim.app), deleteApp(anonymousApp)]);
  }
}
