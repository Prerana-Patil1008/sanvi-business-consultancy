const express = require("express");

const router = express.Router();

const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Get All Services
router.get("/", getServices);

// Create Service
router.post("/", createService);

// Update Service
router.put("/:id", updateService);

// Delete Service
router.delete("/:id", deleteService);

module.exports = router;