import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAyqafvEUBfX4crEBqO78edmZ4knQGtATs",
  authDomain: "lipurmusic-fb5dc.firebaseapp.com",
  projectId: "lipurmusic-fb5dc",
  storageBucket: "lipurmusic-fb5dc.firebasestorage.app",
  messagingSenderId: "248925932805",
  appId: "1:248925932805:web:d47f461bb0d8fb2581bb6c",
  measurementId: "G-VZDGTLM5B4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);