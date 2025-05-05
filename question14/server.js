const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ THIS IS THE API ROUTE THAT MUST BE PRESENT
app.get('/api/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading JSON:', err);
      return res.status(500).json({ error: 'Could not read users file' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
