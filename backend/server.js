const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataFilePath = path.join(__dirname, '../data/users.json');

// Load existing users
function loadUsers() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
}

// Save users to file
function saveUsers(users) {
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
}

// Endpoint to handle sign up
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    // Check if username already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Add new user and save
    users.push({ username, password });
    saveUsers(users);

    res.status(200).json({ message: 'User signed up successfully' });
});

// Endpoint to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
