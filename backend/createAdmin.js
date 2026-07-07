require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const exists =
      await Admin.findOne({
        email:
          "admin@sanvi.com",
      });

    if (exists) {
      console.log(
        "Admin already exists"
      );
      process.exit();
    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await Admin.create({
      email:
        "admin@sanvi.com",
      password:
        hashedPassword,
    });

    console.log(
      "Admin Created Successfully"
    );

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });