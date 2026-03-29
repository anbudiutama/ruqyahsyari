import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Option 1: Using service account JSON (recommended for production)
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    try {
      const parsed = JSON.parse(serviceAccount);
      return initializeApp({
        credential: cert(parsed),
      });
    } catch {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY");
    }
  }

  // Option 2: Auto-detect (works on Google Cloud / Firebase Hosting)
  return initializeApp();
}

const app = initAdmin();
export const adminDb = getFirestore(app);
