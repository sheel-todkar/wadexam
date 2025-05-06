const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch(err => console.error(err));

// Insert sample data (run once)
app.get('/insert', async (req, res) => {
  await Student.insertMany([
    { name: "ABC", rollNo: 111, WAD: 25, CC: 25, DSBDA: 25, CNS: 25, AI: 2 },
    { name: "XYZ", rollNo: 112, WAD: 30, CC: 32, DSBDA: 28, CNS: 40, AI: 38 },
    { name: "LMN", rollNo: 113, WAD: 20, CC: 21, DSBDA: 22, CNS: 19, AI: 15 },
    { name: "DEF", rollNo: 114, WAD: 42, CC: 40, DSBDA: 45, CNS: 48, AI: 46 }
  ]);
  res.send("Data inserted");
});

// View all students
app.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('index', { students });
});

// More than 20 in DSBDA
app.get('/dsbda20', async (req, res) => {
  const students = await Student.find({ DSBDA: { $gt: 20 } });
  res.render('index', { students });
});

// Add 10 marks to WAD for student by name
app.get('/update/:name', async (req, res) => {
  const name = req.params.name;
  await Student.updateOne({ name }, { $inc: { WAD: 10 } });
  res.send("Marks updated");
});

// All subjects > 25
app.get('/allabove25', async (req, res) => {
  const students = await Student.find({
    WAD: { $gt: 25 },
    CC: { $gt: 25 },
    DSBDA: { $gt: 25 },
    CNS: { $gt: 25 },
    AI: { $gt: 25 }
  });
  res.render('index', { students });
});

// Delete a student by name
app.get('/delete/:name', async (req, res) => {
  await Student.deleteOne({ name: req.params.name });
  res.send("Student deleted");
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
