const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

/* ===========================
   CREATE CUSTOMER
=========================== */
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ===========================
   GET ALL CUSTOMERS
=========================== */
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({
      createdAt: -1,
    });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ===========================
   GET SINGLE CUSTOMER
=========================== */
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ===========================
   UPDATE CUSTOMER STATUS
=========================== */
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ===========================
   DELETE CUSTOMER
=========================== */
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(
      req.params.id
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Delete Customer
router.delete("/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;