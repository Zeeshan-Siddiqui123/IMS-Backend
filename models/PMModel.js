const mongoose = require("mongoose");

const PMSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
    },
    projects: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("PM", PMSchema);