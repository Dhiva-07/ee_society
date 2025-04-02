const UserModel = require("../Models/User");

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
  getUser,
};
