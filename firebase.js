
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDN8I1WsN9ijyk0KQv-9F8ANPMErSsh8KY",
  authDomain: "chatapp-97a9f.firebaseapp.com",
  projectId: "chatapp-97a9f",
  storageBucket: "chatapp-97a9f.firebasestorage.app",
  messagingSenderId: "798267306891",
  appId: "1:798267306891:web:db648bf708a5814bd3358e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
