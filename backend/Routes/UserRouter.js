const { getUser , updateUser} = require('../Controllers/UserController');
const ensureAuthenticated = require("../Middlewares/ViewValidation.js");
const updateValidation = require("../Middlewares/updateValidation.js");
const UserModel = require("../Models/User");
const router = require('express').Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/../users");
  },
  filename: function (req, file, callback) {
    const filename = `/userimg_${file.originalname}`; 
    callback(null, filename);
  },
});
const upload = multer({
  storage: storage,
  //   limits: {
  //     fileSize: 1048576, // Defined in bytes (1 Mb)
  //   },
});

router.get('/fetch', ensureAuthenticated , getUser) 

router.put("/update/:id", updateValidation, upload.any(), async (req, res) => {
    // console.log("Received body:", req.body); 
    // console.log("Received file:", req.files); 
  try {
    const userId = req.params.id;
    const img = req.files[0] ? req.files[0].filename : null; 
    const { name, email, bio } = req.body;

    if (req.user._id !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email, bio, ...(img && { img }) },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});
  

module.exports = router;