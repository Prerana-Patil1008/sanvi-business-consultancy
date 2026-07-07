const Setting = require("../models/Setting");

// ===============================
// Get Business Settings
// ===============================

exports.getSettings = async (req, res) => {
  try {

    let settings = await Setting.findOne();

    // Create default settings if none exist
    if (!settings) {

      settings = await Setting.create({});

    }

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Update Business Settings
// ===============================

exports.updateSettings = async (req, res) => {
  try {

    let settings = await Setting.findOne();

    if (!settings) {

      settings = await Setting.create(req.body);

    } else {

      settings = await Setting.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
        }
      );

    }

    res.json(settings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};