import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBffZnfSwX7Mg6T9GumLTt_VHHjIDllp7U",
  authDomain: "naturenexus.firebaseapp.com",
  projectId: "naturenexus",
  storageBucket: "naturenexus.firebasestorage.app",
  messagingSenderId: "706753622210",
  appId: "1:706753622210:web:360b8f292faf75ecf9cb5b"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
