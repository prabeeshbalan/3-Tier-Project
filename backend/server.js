const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); // Prisma ORM
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to add data to MySQL
app.post('/api/data', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    try {
        const newUser = await prisma.user.create({
            data: { username, password }
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Backend running on http://localhost:5000');
});
