import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { 
    collection, 
    query, 
    orderBy, 
    limit, 
    getDocs,
    addDoc,
    serverTimestamp,
    where
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// DOM Elements
const userNameElement = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const featuredGrid = document.querySelector('.featured-grid');
const feedContent = document.querySelector('.feed-content');
const eventsGrid = document.querySelector('.events-grid');
const tipsGrid = document.querySelector('.tips-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        userNameElement.textContent = `Welcome, ${user.displayName || 'Gardener'}!`;
        loadCommunityContent();
    } else {
        window.location.href = 'index.html';
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// Load all community content
async function loadCommunityContent() {
    await Promise.all([
        loadFeaturedGardens(),
        loadCommunityFeed(),
        loadCommunityEvents(),
        loadCommunityTips()
    ]);
}

// Load featured gardens
async function loadFeaturedGardens() {
    try {
        const gardensQuery = query(
            collection(db, 'gardens'),
            where('isPublic', '==', true),
            orderBy('likes', 'desc'),
            limit(3)
        );
        
        const querySnapshot = await getDocs(gardensQuery);
        featuredGrid.innerHTML = ''; // Clear existing content
        
        querySnapshot.forEach((doc) => {
            const garden = doc.data();
            const gardenCard = createGardenCard(doc.id, garden);
            featuredGrid.appendChild(gardenCard);
        });
    } catch (error) {
        console.error('Error loading featured gardens:', error);
    }
}

// Create garden card element
function createGardenCard(id, garden) {
    const card = document.createElement('div');
    card.className = 'featured-card';
    card.innerHTML = `
        <img src="${garden.imageUrl || 'https://via.placeholder.com/400x300'}" alt="${garden.name}">
        <div class="featured-info">
            <h3>${garden.name}</h3>
            <p>${garden.description}</p>
            <div class="garden-stats">
                <span><i class="fas fa-seedling"></i> ${garden.plantCount || 0} Plants</span>
                <span><i class="fas fa-heart"></i> ${garden.likes || 0} Likes</span>
                <span><i class="fas fa-comments"></i> ${garden.commentCount || 0} Comments</span>
            </div>
            <button class="btn" onclick="viewGarden('${id}')">View Garden</button>
        </div>
    `;
    return card;
}

// Load community feed
async function loadCommunityFeed() {
    try {
        const postsQuery = query(
            collection(db, 'posts'),
            orderBy('timestamp', 'desc'),
            limit(10)
        );
        
        const querySnapshot = await getDocs(postsQuery);
        feedContent.innerHTML = ''; // Clear existing content
        
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postCard = createPostCard(doc.id, post);
            feedContent.appendChild(postCard);
        });
    } catch (error) {
        console.error('Error loading community feed:', error);
    }
}

// Create post card element
function createPostCard(id, post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
        <div class="post-header">
            <img src="${post.userPhotoURL || 'https://via.placeholder.com/50'}" alt="User Avatar" class="user-avatar">
            <div class="post-info">
                <h4>${post.userName}</h4>
                <span class="post-time">${formatTimestamp(post.timestamp)}</span>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image" class="post-image">` : ''}
        </div>
        <div class="post-actions">
            <button class="action-btn" onclick="likePost('${id}')">
                <i class="fas fa-heart"></i> Like (${post.likes || 0})
            </button>
            <button class="action-btn" onclick="showComments('${id}')">
                <i class="fas fa-comment"></i> Comment
            </button>
            <button class="action-btn" onclick="sharePost('${id}')">
                <i class="fas fa-share"></i> Share
            </button>
        </div>
        <div class="comments-section" id="comments-${id}">
            <!-- Comments will be loaded here -->
        </div>
    `;
    return card;
}

// Load community events
async function loadCommunityEvents() {
    try {
        const eventsQuery = query(
            collection(db, 'events'),
            where('date', '>=', new Date()),
            orderBy('date', 'asc'),
            limit(5)
        );
        
        const querySnapshot = await getDocs(eventsQuery);
        eventsGrid.innerHTML = ''; // Clear existing content
        
        querySnapshot.forEach((doc) => {
            const event = doc.data();
            const eventCard = createEventCard(doc.id, event);
            eventsGrid.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Error loading community events:', error);
    }
}

// Create event card element
function createEventCard(id, event) {
    const eventDate = event.date.toDate();
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-date">
            <span class="day">${eventDate.getDate()}</span>
            <span class="month">${eventDate.toLocaleString('default', { month: 'short' })}</span>
        </div>
        <div class="event-details">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-meta">
                <span><i class="fas fa-clock"></i> ${eventDate.toLocaleTimeString()}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
            </div>
            <button class="btn" onclick="registerForEvent('${id}')">Register</button>
        </div>
    `;
    return card;
}

// Load community tips
async function loadCommunityTips() {
    try {
        const tipsQuery = query(
            collection(db, 'tips'),
            orderBy('likes', 'desc'),
            limit(6)
        );
        
        const querySnapshot = await getDocs(tipsQuery);
        tipsGrid.innerHTML = ''; // Clear existing content
        
        querySnapshot.forEach((doc) => {
            const tip = doc.data();
            const tipCard = createTipCard(doc.id, tip);
            tipsGrid.appendChild(tipCard);
        });
    } catch (error) {
        console.error('Error loading community tips:', error);
    }
}

// Create tip card element
function createTipCard(id, tip) {
    const card = document.createElement('div');
    card.className = 'tip-card';
    card.innerHTML = `
        <div class="tip-header">
            <img src="${tip.userPhotoURL || 'https://via.placeholder.com/40'}" alt="User Avatar" class="user-avatar">
            <div class="tip-info">
                <h4>${tip.userName}</h4>
                <span class="tip-category">${tip.category}</span>
            </div>
        </div>
        <p>${tip.content}</p>
        <div class="tip-stats">
            <span><i class="fas fa-thumbs-up"></i> ${tip.likes || 0}</span>
            <span><i class="fas fa-bookmark"></i> Save</span>
        </div>
    `;
    return card;
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Implement filter logic here
    });
});

// Utility function to format timestamps
function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days === 1 ? '' : 's'} ago`;
    if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    return 'Just now';
}

// Event handlers
window.viewGarden = (gardenId) => {
    // Implement garden view functionality
    console.log('Viewing garden:', gardenId);
};

window.likePost = async (postId) => {
    // Implement post like functionality
    console.log('Liking post:', postId);
};

window.showComments = async (postId) => {
    // Implement comment display functionality
    console.log('Showing comments for post:', postId);
};

window.sharePost = (postId) => {
    // Implement post sharing functionality
    console.log('Sharing post:', postId);
};

window.registerForEvent = async (eventId) => {
    // Implement event registration functionality
    console.log('Registering for event:', eventId);
}; 