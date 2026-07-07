const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); 
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const reportRoutes = require("./routes/reportRoutes");
const settingRoutes = require("./routes/settingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const paymentSettingsRoutes = require(
  "./routes/paymentSettingsRoutes"
);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Download route
app.get("/download/:file", (req, res) => {
  const file = req.params.file;

  res.download(
    path.join(__dirname, "uploads", file)
  );
});

// Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);


app.use(
  "/api/payment-settings",
  paymentSettingsRoutes
);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  
  
  .then(() => {
    mongoose.connection.db.listCollections().toArray()
  .then((collections) => {
    console.log("========== Collections ==========");
    console.log(collections);
    console.log("===============================");
  });
    console.log("Connected Database:", mongoose.connection.name);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });