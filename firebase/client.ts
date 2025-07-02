
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRvtVpaDPs0df8ddfKFQdgGV-E44z26-M",
  authDomain: "aceprep-ae42a.firebaseapp.com",
  databaseURL: "https://aceprep-ae42a-default-rtdb.firebaseio.com",
  projectId: "aceprep-ae42a",
  storageBucket: "aceprep-ae42a.firebasestorage.app",
  messagingSenderId: "114319484676",
  appId: "1:114319484676:web:4ea6e14f2a9c94d6875251",
  measurementId: "G-771W7KJMN7"
};

const app =!getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);