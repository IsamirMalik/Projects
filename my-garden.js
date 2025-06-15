import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { 
    collection, 
    query, 
    where, 
    orderBy, 
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    Timestamp
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// DOM Elements
const userNameElement = document.getElementById('userName');
const addPlantBtn = document.getElementById('addPlantBtn');
const editLayoutBtn = document.getElementById('editLayoutBtn');
const layoutGrid = document.querySelector('.layout-grid');
const plantsGrid = document.querySelector('.plants-grid');
const searchInput = document.querySelector('.search-input');
const filterSelect = document.querySelector('.filter-select');
const scheduleList = document.querySelector('.schedule-list');
const statNumbers = document.querySelectorAll('.stat-number');
const filterButtons = document.querySelectorAll('.filter-btn');

// Local Storage Keys
const STORAGE_KEYS = {
    PLANTS: 'garden_plants',
    LAYOUT: 'garden_layout',
    SCHEDULE: 'care_schedule',
    LAST_SYNC: 'last_sync_time'
};

// Plant Categories
const plantCategories = {
    vegetables: { icon: 'fas fa-carrot', name: 'Vegetables' },
    fruits: { icon: 'fas fa-apple-alt', name: 'Fruits' },
    herbs: { icon: 'fas fa-leaf', name: 'Herbs' },
    flowers: { icon: 'fas fa-seedling', name: 'Flowers' }
};

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        userNameElement.textContent = `Welcome, ${user.fullName || 'Gardener'}!`;
        loadGardenData();
        setupEventListeners();
    } else {
        window.location.href = 'index.html';
    }
});

// Setup event listeners
function setupEventListeners() {
    addPlantBtn.addEventListener('click', showAddPlantModal);
    editLayoutBtn.addEventListener('click', toggleLayoutEditMode);
    searchInput.addEventListener('input', handlePlantSearch);
    filterSelect.addEventListener('change', handlePlantFilter);
    filterButtons.forEach(btn => btn.addEventListener('click', handleScheduleFilter));
}

// Load all garden data
async function loadGardenData() {
    try {
        // Load from local storage first
        const localData = loadFromLocalStorage();
        if (localData.plants.length > 0) {
            updateGardenOverview(localData.plants);
            updatePlantList(localData.plants);
            updateGardenLayout(localData.plants);
            // Only update schedule if there are plants
            if (localData.plants.length > 0) {
                updateCareSchedule(localData.schedule);
            }
        }

        // Fetch from Firebase
        const plantsQuery = query(
            collection(db, 'plants'),
            where('userId', '==', auth.currentUser.uid)
        );
        
        const scheduleQuery = query(
            collection(db, 'care_schedule'),
            where('userId', '==', auth.currentUser.uid),
            orderBy('scheduledDate', 'asc')
        );
        
        const [plantsSnapshot, scheduleSnapshot] = await Promise.all([
            getDocs(plantsQuery),
            getDocs(scheduleQuery)
        ]);
        
        const plants = [];
        const schedule = [];
        
        plantsSnapshot.forEach(doc => {
            plants.push({ id: doc.id, ...doc.data() });
        });
        
        scheduleSnapshot.forEach(doc => {
            schedule.push({ id: doc.id, ...doc.data() });
        });
        
        // Update local storage
        saveToLocalStorage({ plants, schedule });
        
        // Update UI
        updateGardenOverview(plants);
        updatePlantList(plants);
        updateGardenLayout(plants);
        // Only update schedule if there are plants
        if (plants.length > 0) {
            updateCareSchedule(schedule);
        } else {
            scheduleList.innerHTML = `
                <div class="no-schedule">
                    <i class="fas fa-calendar-check"></i>
                    <p>No care tasks scheduled</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading garden data:', error);
        // Use local storage data if Firebase fails
        const localData = loadFromLocalStorage();
        if (localData.plants.length > 0) {
            updateGardenOverview(localData.plants);
            updatePlantList(localData.plants);
            updateGardenLayout(localData.plants);
            // Only update schedule if there are plants
            if (localData.plants.length > 0) {
                updateCareSchedule(localData.schedule);
            } else {
                scheduleList.innerHTML = `
                    <div class="no-schedule">
                        <i class="fas fa-calendar-check"></i>
                        <p>No care tasks scheduled</p>
                    </div>
                `;
            }
        }
    }
}

// Update garden overview statistics
function updateGardenOverview(plants) {
    const stats = {
        totalPlants: plants.length,
        upcomingTasks: plants.filter(plant => plant.needsCare).length,
        healthyPlants: plants.filter(plant => plant.health === 'healthy').length,
        needsAttention: plants.filter(plant => plant.health === 'needs_attention').length
    };
    
    statNumbers[0].textContent = stats.totalPlants;
    statNumbers[1].textContent = stats.upcomingTasks;
    statNumbers[2].textContent = stats.healthyPlants;
    statNumbers[3].textContent = stats.needsAttention;
}

// Update plant list
function updatePlantList(plants) {
    plantsGrid.innerHTML = '';
    
    if (plants.length === 0) {
        plantsGrid.innerHTML = `
            <div class="no-plants">
                <i class="fas fa-seedling"></i>
                <p>No plants added yet</p>
                <button class="btn btn-primary" onclick="showAddPlantModal()">
                    <i class="fas fa-plus"></i> Add Your First Plant
                </button>
            </div>
        `;
        return;
    }
    
    plants.forEach(plant => {
        const plantCard = createPlantCard(plant);
        plantsGrid.appendChild(plantCard);
    });
}

// Create plant card
function createPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
        <img src="${plant.imageUrl || 'https://via.placeholder.com/150'}" alt="${plant.name}">
        <div class="plant-info">
            <h3>${plant.name}</h3>
            <p class="plant-type">${plantCategories[plant.category].name}</p>
            <div class="plant-status">
                <span class="status ${plant.health}">${plant.health.replace('_', ' ')}</span>
                <span class="water-level">Water: ${plant.waterLevel}%</span>
            </div>
            <button class="btn view-details" onclick="showPlantDetails('${plant.id}')">View Details</button>
        </div>
    `;
    return card;
}

// Update garden layout
function updateGardenLayout(plants) {
    layoutGrid.innerHTML = '';
    const gridSize = 4; // 4x4 grid
    
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'plant-slot';
        
        const plant = plants.find(p => p.position === i);
        if (plant) {
            cell.innerHTML = `
                <img src="${plant.imageUrl || 'https://via.placeholder.com/50'}" alt="${plant.name}">
                <p>${plant.name}</p>
            `;
            cell.classList.add('occupied');
        } else {
            cell.innerHTML = `
                <i class="fas fa-plus"></i>
                <p>Add Plant</p>
            `;
            cell.addEventListener('click', () => showAddPlantModal(i));
        }
        
        layoutGrid.appendChild(cell);
    }
}

// Update care schedule
function updateCareSchedule(schedule) {
    scheduleList.innerHTML = '';
    
    if (schedule.length === 0) {
        scheduleList.innerHTML = `
            <div class="no-schedule">
                <i class="fas fa-calendar-check"></i>
                <p>No care tasks scheduled</p>
            </div>
        `;
        return;
    }
    
    schedule.forEach(item => {
        const scheduleItem = createScheduleItem(item);
        scheduleList.appendChild(scheduleItem);
    });
}

// Create schedule item
function createScheduleItem(item) {
    const scheduledDate = item.scheduledDate.toDate();
    const itemElement = document.createElement('div');
    itemElement.className = 'schedule-item';
    itemElement.innerHTML = `
        <div class="schedule-time">
            <span class="time">${scheduledDate.toLocaleTimeString()}</span>
            <span class="date">${formatDate(scheduledDate)}</span>
        </div>
        <div class="schedule-details">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
        <div class="schedule-status">
            <span class="status ${item.status}">${item.status}</span>
        </div>
    `;
    return itemElement;
}

// Show add plant modal
function showAddPlantModal(position = null) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Add New Plant</h2>
            <form id="addPlantForm">
                <div class="form-group">
                    <label for="plantName">Plant Name</label>
                    <input type="text" id="plantName" required>
                </div>
                <div class="form-group">
                    <label for="plantCategory">Category</label>
                    <select id="plantCategory" required>
                        ${Object.entries(plantCategories).map(([key, value]) => 
                            `<option value="${key}">${value.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="plantImage">Image URL</label>
                    <input type="url" id="plantImage">
                </div>
                <div class="form-group">
                    <label for="plantDescription">Description</label>
                    <textarea id="plantDescription"></textarea>
                </div>
                ${position !== null ? `<input type="hidden" id="plantPosition" value="${position}">` : ''}
                <div class="form-actions">
                    <button type="button" class="btn" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Plant</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const form = document.getElementById('addPlantForm');
    form.addEventListener('submit', handleAddPlant);
}

// Handle add plant
async function handleAddPlant(event) {
    event.preventDefault();
    
    const plantData = {
        userId: auth.currentUser.uid,
        name: document.getElementById('plantName').value,
        category: document.getElementById('plantCategory').value,
        imageUrl: document.getElementById('plantImage').value,
        description: document.getElementById('plantDescription').value,
        position: document.getElementById('plantPosition')?.value,
        health: 'healthy',
        waterLevel: 100,
        needsCare: false,
        createdAt: serverTimestamp()
    };
    
    try {
        // Add to Firebase
        const docRef = await addDoc(collection(db, 'plants'), plantData);
        plantData.id = docRef.id;
        
        // Update local storage
        const localData = loadFromLocalStorage();
        localData.plants.push(plantData);
        saveToLocalStorage(localData);
        
        closeModal();
        loadGardenData();
    } catch (error) {
        console.error('Error adding plant:', error);
        // If Firebase fails, still save to local storage
        const localData = loadFromLocalStorage();
        plantData.id = 'local_' + Date.now();
        localData.plants.push(plantData);
        saveToLocalStorage(localData);
        
        closeModal();
        updatePlantList(localData.plants);
        updateGardenLayout(localData.plants);
    }
}

// Handle plant search
function handlePlantSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const plants = Array.from(plantsGrid.children);
    
    plants.forEach(plant => {
        const name = plant.querySelector('h3').textContent.toLowerCase();
        const type = plant.querySelector('.plant-type').textContent.toLowerCase();
        const isVisible = name.includes(searchTerm) || type.includes(searchTerm);
        plant.style.display = isVisible ? 'block' : 'none';
    });
}

// Handle plant filter
function handlePlantFilter(event) {
    const category = event.target.value;
    const plants = Array.from(plantsGrid.children);
    
    plants.forEach(plant => {
        const plantCategory = plant.querySelector('.plant-type').textContent.toLowerCase();
        const isVisible = category === 'all' || plantCategory === category;
        plant.style.display = isVisible ? 'block' : 'none';
    });
}

// Handle schedule filter
function handleScheduleFilter(event) {
    const filter = event.target.textContent.toLowerCase();
    const scheduleItems = Array.from(scheduleList.children);
    const now = new Date();
    
    scheduleItems.forEach(item => {
        const date = new Date(item.querySelector('.date').textContent);
        let isVisible = true;
        
        switch (filter) {
            case 'today':
                isVisible = isSameDay(date, now);
                break;
            case 'this week':
                isVisible = isWithinWeek(date, now);
                break;
            case 'this month':
                isVisible = isWithinMonth(date, now);
                break;
        }
        
        item.style.display = isVisible ? 'flex' : 'none';
    });
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Toggle layout edit mode
function toggleLayoutEditMode() {
    const slots = document.querySelectorAll('.plant-slot');
    const isEditing = editLayoutBtn.classList.toggle('active');
    
    slots.forEach(slot => {
        if (!slot.classList.contains('occupied')) {
            slot.style.cursor = isEditing ? 'pointer' : 'default';
            slot.style.opacity = isEditing ? '0.7' : '1';
        }
    });
    
    editLayoutBtn.innerHTML = isEditing ? 
        '<i class="fas fa-check"></i> Save Layout' : 
        '<i class="fas fa-edit"></i> Edit Layout';
}

// Local Storage Functions
function saveToLocalStorage(data) {
    try {
        localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(data.plants));
        localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(data.schedule));
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (error) {
        console.error('Error saving to local storage:', error);
    }
}

function loadFromLocalStorage() {
    try {
        return {
            plants: JSON.parse(localStorage.getItem(STORAGE_KEYS.PLANTS) || '[]'),
            schedule: JSON.parse(localStorage.getItem(STORAGE_KEYS.SCHEDULE) || '[]')
        };
    } catch (error) {
        console.error('Error loading from local storage:', error);
        return { plants: [], schedule: [] };
    }
}

// Utility functions
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

function isWithinWeek(date1, date2) {
    const diff = Math.abs(date1 - date2);
    return diff <= 7 * 24 * 60 * 60 * 1000;
}

function isWithinMonth(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth();
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Make functions available globally
window.showAddPlantModal = showAddPlantModal;
window.showPlantDetails = (plantId) => {
    // Implement plant details view
    console.log('Viewing plant:', plantId);
};
window.closeModal = closeModal; 