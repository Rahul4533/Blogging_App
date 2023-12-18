// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNCcI2AIogaNrDI72V7DOxBoAuGyvDspA",
  authDomain: "blogging-app-6ea50.firebaseapp.com",
  projectId: "blogging-app-6ea50",
  storageBucket: "blogging-app-6ea50.appspot.com",
  messagingSenderId: "131430225690",
  appId: "1:131430225690:web:4e18f85624059de68dbea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

