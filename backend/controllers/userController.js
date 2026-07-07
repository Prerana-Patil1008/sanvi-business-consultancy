const User = require("../models/User");

// ============================
// Get All Users
// ============================

exports.getUsers = async (req, res) => {
  try {

    const users = await User.find().sort({
      createdAt: -1,
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ============================
// Delete User
// ============================

exports.deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.updateProfile = async (req, res) => {
  try {


    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name;
    user.mobile = req.body.mobile;

    await user.save();

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};