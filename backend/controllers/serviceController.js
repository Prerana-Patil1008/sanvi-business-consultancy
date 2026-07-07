const Service = require("../models/Service");

// ===============================
// Get All Services
// ===============================

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1,
    });

    res.json(services);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Create Service
// ===============================

exports.createService = async (req, res) => {
  try {

    const service = await Service.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      icon: req.body.icon,
      status: req.body.status,
    });

    res.status(201).json(service);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Update Service
// ===============================

exports.updateService = async (req, res) => {
  try {

    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(service);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Delete Service
// ===============================

exports.deleteService = async (req, res) => {
  try {

    await Service.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Service deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};