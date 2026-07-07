const express = require("express");
const router = express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  createApplication,
  getApplications,
  getUserApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  sendQuote,
} = require("../controllers/applicationController");

// Create Application
router.post(
  "/",
  upload.array("documents"),
  createApplication
);

// Get All Applications
router.get(
  "/",
  getApplications
);

// Get Applications of Logged-in User
router.get(
  "/user/:id",
  getUserApplications
);

// Get Single Application
router.get(
  "/:id",
  getApplicationById
);

router.put("/:id/quote", sendQuote);

// Update Application
router.put(
  "/:id",
  updateApplication
);

// Delete Application
router.delete(
  "/:id",
  deleteApplication
);

module.exports = router;