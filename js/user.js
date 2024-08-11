
// user.js

const USERS_KEY = 'users';

// Load users from localStorage
function loadUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Register a new user
async function registerUser(username, password) {
    const users = loadUsers();
    if (users.find(user => user.username === username)) {
        alert('Username already exists!');
        return false;
    }
    users.push({ username, password, profile: {} });
    saveUsers(users);
    return true;
}

// Authenticate a user
async function authenticateUser(username, password) {
    const users = loadUsers();
    return users.find(user => user.username === username && user.password === password);
}

// Save user profile
async function saveProfile(username, profileData) {
    const users = loadUsers();
    const user = users.find(user => user.username === username);
    if (user) {
        user.profile = profileData;
        saveUsers(users);
    }
}
