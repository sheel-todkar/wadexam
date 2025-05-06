const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Error", err));

// Employee Schema & Model
const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joiningDate: Date
});

const Employee = mongoose.model('Employee', employeeSchema);

// Create new employee
app.post('/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// View all employees
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send("Error fetching employees");
    }
});

// Update employee
app.put('/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Employee.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send("Employee updated");
    } catch (error) {
        res.status(404).send("Employee not found");
    }
});

// Delete employee
app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.send("Employee record deleted successfully");
    } catch (error) {
        res.status(404).send("Employee not found");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
