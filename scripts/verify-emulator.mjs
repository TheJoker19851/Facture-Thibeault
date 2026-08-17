import assert from "node:assert/strict";
import { deleteApp, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connectStorageEmulator, deleteObject, getBytes, getStorage, ref, uploadString } from "firebase/storage";
import { LOCAL_FIREBASE_PROJECT_ID } from "../lib/environment.mjs";
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

  try {
    await uploadString(ref(worker.storage, storagePath), "iVBORw0KGgo=", "base64", {
      contentType: "image/png",
      customMetadata: {
        receiptId,
        ownerUid: worker.credential.user.uid,
        sequence: "1",
      },
    });
    await assert.rejects(() => getBytes(ref(worker.storage, storagePath)), /storage\/unauthorized|permission/i);
    await assert.rejects(() => getBytes(ref(anonymousStorage, storagePath)), /storage\/unauthorized|permission/i);
    const privilegedBytes = await getBytes(ref(kim.storage, storagePath));
    assert.ok(privilegedBytes.byteLength > 0);

    process.env.DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399";
    const [{ initializeApp: initializeAdminApp, deleteApp: deleteAdminApp }, { getDataConnect }] = await Promise.all([
      import("firebase-admin/app"),
      import("firebase-admin/data-connect"),
    ]);
    const adminApp = initializeAdminApp({ projectId: LOCAL_FIREBASE_PROJECT_ID }, `permission-admin-${Date.now()}`);
    try {
      const dataConnect = getDataConnect({
        serviceId: "facture-thibeault-service",
        location: "northamerica-northeast1",
        connector: "accounting",
      }, adminApp);
      const workerClaims = { sub: worker.credential.user.uid, role: "WORKER" };
      const kimClaims = { sub: kim.credential.user.uid, role: "KIM" };
      await assert.rejects(
        () => dataConnect.executeQuery("ListExpenseAccounts", undefined, { impersonate: { authClaims: workerClaims } }),
        /permission|unauthorized|auth/i,
      );
      const accounting = await dataConnect.executeQuery("ListExpenseAccounts", undefined, { impersonate: { authClaims: kimClaims } });
      assert.ok(Array.isArray(accounting.data.expenseAccounts));
      await dataConnect.executeMutation("CreateInvoiceIntake", {
        receiptId: "DEMO-PERMISSION-INTAKE",
        storageFolder: "receipts/demo/DEMO-PERMISSION-INTAKE",
        photoCount: 1,
      }, { impersonate: { authClaims: workerClaims } });
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

    await deleteObject(ref(kim.storage, storagePath));
    console.log("Permissions Emulator validées : WORKER, KIM, Auth, Storage et SQL Connect.");
  } finally {
    await Promise.all([deleteApp(worker.app), deleteApp(kim.app), deleteApp(anonymousApp)]);
  }
}
