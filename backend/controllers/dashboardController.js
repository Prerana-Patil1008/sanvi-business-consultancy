const Application = require("../models/Application");
const User = require("../models/User");
const Contact = require("../models/Contact");
const Testimonial = require("../models/Testimonial");

exports.getDashboard = async (req, res) => {
  try {

    // ===========================
    // Fetch all collections
    // ===========================

    const [
      applications,
      customers,
      contacts,
      testimonials,
    ] = await Promise.all([
      Application.find().sort({ createdAt: -1 }),
      User.find().sort({ createdAt: -1 }),
      Contact.find().sort({ createdAt: -1 }),
      Testimonial.find().sort({ createdAt: -1 }),
    ]);

    // ===========================
    // Dashboard Statistics
    // ===========================

    const stats = {
      totalApplications: applications.length,

      totalCustomers: customers.length,

      totalMessages: contacts.length,

      totalTestimonials: testimonials.length,

      pending: applications.filter(
        app => app.status === "Pending"
      ).length,

      processing: applications.filter(
        app => app.status === "Processing"
      ).length,

      approved: applications.filter(
        app =>
          app.status === "Approved" ||
          app.status === "Completed"
      ).length,

      rejected: applications.filter(
        app => app.status === "Rejected"
      ).length,
    };

    // ===========================
    // Monthly Applications Chart
    // ===========================

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyApplications = months.map(
      (month, index) => ({
        month,
        applications: applications.filter(app => {
          return (
            new Date(app.createdAt).getMonth() ===
            index
          );
        }).length,
      })
    );

    // ===========================
    // Status Chart
    // ===========================

    const statusChart = [
      {
        name: "Pending",
        value: stats.pending,
      },
      {
        name: "Processing",
        value: stats.processing,
      },
      {
        name: "Approved",
        value: stats.approved,
      },
      {
        name: "Rejected",
        value: stats.rejected,
      },

      {
        name: "Completed",
        value: stats.completed,
      }
    ];

    // ===========================
    // Pending Applications
    // ===========================

    const pendingApplications =
      applications
        .filter(app =>
          ["Pending", "Processing"].includes(
            app.status
          )
        )
        .slice(0, 5);

    // ===========================
    // Latest Messages
    // ===========================

    const latestMessages =
      contacts.slice(0, 5);

    // ===========================
    // Final Response
    // ===========================

    res.json({
      stats,
      monthlyApplications,
      statusChart,
      pendingApplications,
      latestMessages,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};