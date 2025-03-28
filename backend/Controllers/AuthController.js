const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists , you can login : ",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "signup successful", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({ message: "Auth failed", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: "Auth failed", success: false });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


module.exports = {
  signup,
  login,
  getUser,
};
