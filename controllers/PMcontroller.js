const PMModel = require("../models/PMModel");
const bcrypt = require("bcrypt");

const PMcontroller = {};

PMcontroller.createPM = async (req, res) => {
    try {
        const { name, email, password, role, projects } = req.body;

        const existingPM = await PMModel.findOne({ email });
        if (existingPM) {
            return res.status(400).json({ message: "PM already exists" });
        }

        const existingEmail = await PMModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const pm = await PMModel.create({ name, email, password: hash, role, projects });

        res.status(201).json({ message: "PM created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

PMcontroller.getPMs = async (req, res) => {
    try {
        const pms = await PMModel.find();
        res.status(200).json(pms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

PMcontroller.updatePM = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, projects } = req.body;

        const pm = await PMModel.findByIdAndUpdate(id, { name, email, password, role, projects }, { new: true });
        res.status(200).json({ message: "PM updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

PMcontroller.deletePM = async (req, res) => {
    try {
        const { id } = req.params;
        await PMModel.findByIdAndDelete(id);
        res.status(200).json({ message: "PM deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = PMcontroller;