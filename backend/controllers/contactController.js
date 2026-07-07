const Contact = require("../models/Contact");

// ===============================
// Get All Messages
// ===============================

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(messages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Single Message
// ===============================

exports.getMessageById = async (req, res) => {
  try {

    const message = await Contact.findById(
      req.params.id
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.json(message);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Create Message
// ===============================

exports.createMessage = async (req, res) => {
  try {

    const message = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    });

    res.status(201).json(message);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Mark Message as Read
// ===============================

exports.markAsRead = async (req, res) => {
  try {

    const message =
      await Contact.findByIdAndUpdate(
        req.params.id,
        {
          status: "Read",
        },
        {
          new: true,
        }
      );

    res.json(message);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Delete Message
// ===============================

exports.deleteMessage = async (req, res) => {
  try {

    await Contact.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Message deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};