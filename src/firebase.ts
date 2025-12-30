
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// #region firebase初期設定
const firebaseConfig = {
  apiKey: "AIzaSyDHG2ss9kIcNNf8Mg5A12FxpSaXRM7mBOE",
  authDomain: "kakeibo-kaka1166.firebaseapp.com",
  projectId: "kakeibo-kaka1166",
  storageBucket: "kakeibo-kaka1166.firebasestorage.app",
  messagingSenderId: "372779745836",
  appId: "1:372779745836:web:4c860ac607c5583648c789"
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
// #endregion