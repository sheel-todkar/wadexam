const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    WAD: Number,
    CC: Number,
    DSBDA: Number,
    CNS: Number,
    AI: Number
});
module.exports = mongoose.model('Student',studentSchema);