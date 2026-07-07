const Application = require("../models/Application");
const User = require("../models/User");
const Contact = require("../models/Contact");
const Testimonial = require("../models/Testimonial");

exports.getDashboard = async (req, res) => {
  try {
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

    // Dashboard Stats

    const stats = {
      totalApplications: applications.length,

      totalCustomers: customers.length,

      totalMessages: contacts.length,

      totalTestimonials: testimonials.length,

      pending: applications.filter(
        (a) => a.status === "Pending"
      ).length,

      processing: applications.filter(
        (a) => a.status === "Under Review"
      ).length,

      approved: applications.filter(
        (a) => a.status === "Approved"
      ).length,

      rejected: applications.filter(
        (a) => a.status === "Rejected"
      ).length,

      completed: applications.filter(
        (a) => a.status === "Completed"
      ).length,
    };

    // Monthly Applications

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
        applications: applications.filter(
          (app) =>
            new Date(app.createdAt).getMonth() ===
            index
        ).length,
      })
    );

    // Pie Chart Data

    const statusChart = [
      {
        name: "Pending",
        value: stats.pending,
      },
      {
        name: "Under Review",
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
      },
    ];

    // Pending Applications

    const pendingApplications =
      applications
        .filter((app) =>
          ["Pending", "Under Review"].includes(
            app.status
          )
        )
        .slice(0, 5);

    // Latest Messages

    const latestMessages =
      contacts.slice(0, 5);

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