// utils/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDyPsgWePL-K1nWB5Pv3oD07Sk2vFmXEfQ",
    authDomain: "login-signup-authenticat-abda5.firebaseapp.com",
    projectId: "login-signup-authenticat-abda5",
    storageBucket: "login-signup-authenticat-abda5.firebasestorage.app",
    messagingSenderId: "847526541668",
    appId: "1:847526541668:web:93411ea12d81043b032271",
    measurementId: "G-R13N1JRJRC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
