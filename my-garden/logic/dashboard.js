import { auth, db } from './firebase-config.js';
import { 
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Check authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById('userName').textContent = `Welcome, ${userData.username}!`;
        }
    } else {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
    }
});

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        alert(error.message);
    }
});

// Navigation handling
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all links
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.classList.remove('active');
        });
        // Add active class to clicked link
        link.parentElement.classList.add('active');
    });
}); 