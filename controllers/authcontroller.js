const userModel = require("../models/userModel")
const bcrypt = require("bcrypt");
const { UsertokenGenerator } = require("../utils/token");
const { registerSchema } = require("../validators/authvalidations");


const authController = {};

authController.signupPost = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      const firstError = parsed.error.issues?.[0];
      return res.status(400).json({
        field: firstError?.path?.[0] || null,
        message: parsed.error.issues[0].message || "Invalid input"
      });
    }
    const { bq_id, name, email, password, phone, CNIC, course } = parsed.data

    const existingbq_id = await userModel.findOne({ bq_id });
    if (existingbq_id) {
      return res.status(400).json({
        field: "bq_id",
        message: "This BQ Id is not available, please try another"
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        field: "email",
        message: "This Email is Already Registered"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await userModel.create({ bq_id, name, email, password: hash, phone, CNIC, course });

    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


authController.signupGet = async (req, res) => {
  try {
    const users = await userModel.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Users', error })
  }
}

authController.loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }
    const token = UsertokenGenerator(user)
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

authController.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

authController.updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { bq_id, name, email, phone, CNIC, course } = req.body;
    await userModel.findByIdAndUpdate(_id, { bq_id, name, email, phone, CNIC, course });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

authController.deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    await userModel.findByIdAndDelete(_id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = authController;