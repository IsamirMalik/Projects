import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { 
    collection, 
    query, 
    orderBy, 
    limit, 
    getDocs 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// DOM Elements
const userNameElement = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        userNameElement.textContent = `Welcome, ${user.displayName || 'Gardener'}!`;
        loadResources();
    } else {
        window.location.href = 'index.html';
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// Load all resources
async function loadResources() {
    try {
        // Load seasonal tips
        const tipsQuery = query(
            collection(db, 'seasonal_tips'),
            orderBy('season', 'asc')
        );
        
        const tipsSnapshot = await getDocs(tipsQuery);
        const tips = [];
        
        tipsSnapshot.forEach(doc => {
            tips.push({ id: doc.id, ...doc.data() });
        });
        
        // Update UI with tips
        updateSeasonalTips(tips);
        
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

// Update seasonal tips section
function updateSeasonalTips(tips) {
    const tipsGrid = document.querySelector('.tips-grid');
    if (!tipsGrid) return;
    
    if (tips.length > 0) {
        tipsGrid.innerHTML = tips.map(tip => `
            <div class="tip-card">
                <i class="fas ${getSeasonIcon(tip.season)}"></i>
                <h4>${tip.title}</h4>
                <p>${tip.description}</p>
                <button class="btn" onclick="showTipDetails('${tip.id}')">Read More</button>
            </div>
        `).join('');
    }
}

// Get season icon
function getSeasonIcon(season) {
    switch (season.toLowerCase()) {
        case 'summer':
            return 'fa-sun';
        case 'winter':
            return 'fa-snowflake';
        case 'spring':
            return 'fa-seedling';
        case 'autumn':
            return 'fa-leaf';
        default:
            return 'fa-calendar';
    }
}

// Scroll to section
window.scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

// Show tip details
window.showTipDetails = (tipId) => {
    // Implement tip details view
    console.log('Viewing tip:', tipId);
};

// Handle guide view
window.viewGuide = (guideId) => {
    // Implement guide view
    console.log('Viewing guide:', guideId);
};

// Handle resource view
window.viewResource = (resourceId) => {
    // Implement resource view
    console.log('Viewing resource:', resourceId);
};

// Handle tool list view
window.viewToolList = (category) => {
    // Implement tool list view
    console.log('Viewing tools:', category);
}; 