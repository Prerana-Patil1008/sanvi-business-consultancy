const express = require("express");

const router = express.Router();

const {
  getMessages,
  getMessageById,
  createMessage,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");

// Get All Messages
router.get("/", getMessages);

// Get Single Message
router.get("/:id", getMessageById);

// Save Contact Message
router.post("/", createMessage);

// Mark as Read
router.put("/:id", markAsRead);

// Delete Message
router.delete("/:id", deleteMessage);

module.exports = router;