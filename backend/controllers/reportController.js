const Application = require("../models/Application");
const User = require("../models/User");
const Service = require("../models/Service");
const Testimonial = require("../models/Testimonial");

exports.getDashboardReport = async (req, res) => {
  try {
    // ==========================
    // Dashboard Counts
    // ==========================

    const totalCustomers = await User.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const approvedApplications =
      await Application.countDocuments({
        status: "Approved",
      });

    const pendingApplications =
      await Application.countDocuments({
        status: "Pending",
      });

    const rejectedApplications =
      await Application.countDocuments({
        status: "Rejected",
      });

    const underReviewApplications =
      await Application.countDocuments({
        status: "Under Review",
      });

    const completedApplications =
      await Application.countDocuments({
        status: "Completed",
      });

    const totalServices =
      await Service.countDocuments();

    const totalTestimonials =
      await Testimonial.countDocuments({
        status: "Approved",
      });

    // ==========================
    // Top Services
    // ==========================

    const topServices =
      await Application.aggregate([
        {
          $group: {
            _id: "$service",
            total: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
        {
          $limit: 5,
        },
      ]);

    // ==========================
    // Monthly Applications
    // ==========================

    const monthlyApplications =
      await Application.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month: "$createdAt",
              },
            },
            total: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]);

    // ==========================
    // Recent Applications
    // ==========================

    const recentApplications =
      await Application.find()
        .sort({
          createdAt: -1,
        })
        .limit(5);

    // ==========================
    // Response
    // ==========================

    res.json({
      totalCustomers,

      totalApplications,

      approvedApplications,

      pendingApplications,

      rejectedApplications,

      underReviewApplications,

      completedApplications,

      totalServices,

      totalTestimonials,

      topServices,

      monthlyApplications,

      recentApplications,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};