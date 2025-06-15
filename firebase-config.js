// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACAWQ0o-fdicW3tyazZ5X_jKaBfiaMob0",
    authDomain: "learnfirebase-da46a.firebaseapp.com",
    projectId: "learnfirebase-da46a",
    storageBucket: "learnfirebase-da46a.firebasestorage.app",
    messagingSenderId: "1062346852547",
    appId: "1:1062346852547:web:743a2611b1fbeeae36fa76",
    measurementId: "G-YYMXDCP1B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 