const mongoose = require("mongoose");
const { nullish } = require("zod");



const userSchema = new mongoose.Schema({
    bq_id: String,
    incubation_id: String,
    name: String,
    email: String,
    password: String,
    phone: String,
    CNIC: String,
    course: String,
    team:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"team"
    }
});

module.exports = mongoose.model('user', userSchema);