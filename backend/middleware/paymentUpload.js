const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadPath = path.join(
  __dirname,
  "../uploads/payments"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});

// Allow only images
const fileFilter = (req, file, cb) => {

  const allowed = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }
};

// Upload middleware
const uploadPayment = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

});

module.exports = uploadPayment;