const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    bq_id: String,
    incubation_id: String,
    name: String,
    email: String,
    password: String,
    phone: String,
    CNIC: String,
    course: String
});

module.exports = mongoose.model('user', userSchema);