const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch employee data
app.get('/api/employees', (req, res) => {
  fs.readFile(path.join(__dirname, 'employees.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading employee file:', err);
      return res.status(500).json({ error: 'Unable to load employee data' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
