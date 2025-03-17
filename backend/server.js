const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const prisma = require('./prisma'); // Prisma client

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example route
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});