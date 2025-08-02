import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDlDsLQgfd4zBfuPepExOKR95Rp70eZgtI",
  authDomain: "home-automation-1c6f3.firebaseapp.com",
  databaseURL:
    "https://home-automation-1c6f3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "home-automation-1c6f3",
  storageBucket: "home-automation-1c6f3.firebasestorage.app",
  messagingSenderId: "596337726071",
  appId: "1:596337726071:web:316d6469dda9f644676c72",
  measurementId: "G-S403HE4MC9",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
