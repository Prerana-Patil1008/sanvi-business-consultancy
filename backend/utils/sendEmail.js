const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================================
// Send OTP Email
// ======================================

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Sanvi Business Consultancy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;background:#f4f4f4;">
          <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,.1);">

            <h2 style="color:#0f172a;">
              Sanvi Business Consultancy
            </h2>

            <p>Hello,</p>

            <p>You requested to reset your password.</p>

            <p>Your OTP is:</p>

            <h1 style="
              color:#6D28D9;
              letter-spacing:6px;
              text-align:center;
            ">
              ${otp}
            </h1>

            <p>
              This OTP will expire in
              <strong>10 minutes</strong>.
            </p>

            <p>
              If you didn't request a password reset,
              simply ignore this email.
            </p>

          </div>
        </div>
      `,
    });

    console.log("OTP Email Sent");
  } catch (error) {
    console.log("OTP Email Error:", error);
    throw error;
  }
};

// ======================================
// Send Application Status Email
// ======================================

const sendEmail = async (to, subject, application) => {
  try {
    const html = `
      <div style="
        font-family:Arial,sans-serif;
        background:#f4f7fc;
        padding:40px;
      ">

        <div style="
          max-width:600px;
          margin:auto;
          background:#fff;
          border-radius:20px;
          overflow:hidden;
          box-shadow:0 5px 20px rgba(0,0,0,.1);
        ">

          <div style="
            background:#0f172a;
            color:white;
            text-align:center;
            padding:30px;
          ">
            <h1 style="margin:0;">
              SANVI BUSINESS CONSULTANCY
            </h1>

            <p style="color:#cbd5e1;">
              Professional Business Services
            </p>
          </div>

          <div style="padding:35px;">

            <h2>Hello ${application.name},</h2>

            <p>
              Your application status has been updated.
            </p>

            <table
              style="
                width:100%;
                border-collapse:collapse;
                margin-top:20px;
              "
            >

              <tr>
                <td style="
                  padding:12px;
                  background:#f8fafc;
                  font-weight:bold;
                ">
                  Service
                </td>

                <td style="padding:12px;">
                  ${application.service}
                </td>
              </tr>

              <tr>
                <td style="
                  padding:12px;
                  background:#f8fafc;
                  font-weight:bold;
                ">
                  Status
                </td>

                <td style="
                  padding:12px;
                  color:#2563eb;
                  font-weight:bold;
                ">
                  ${application.status}
                </td>
              </tr>

              <tr>
                <td style="
                  padding:12px;
                  background:#f8fafc;
                  font-weight:bold;
                ">
                  Remarks
                </td>

                <td style="padding:12px;">
                  ${
                    application.remarks ||
                    "No Remarks"
                  }
                </td>
              </tr>

            </table>

            <div style="
              margin-top:35px;
              text-align:center;
            ">

              <a
                href="https://sanvi-business-consultancy.vercel.app/my-applications"
                style="
                  background:#2563eb;
                  color:white;
                  padding:14px 30px;
                  border-radius:10px;
                  text-decoration:none;
                  font-weight:bold;
                "
              >
                View My Applications
              </a>

            </div>

            <p style="
              margin-top:35px;
              color:#64748b;
            ">
              Thank you for choosing
              <strong> Sanvi Business Consultancy</strong>.
            </p>

          </div>

          <div style="
            background:#f8fafc;
            text-align:center;
            padding:20px;
            color:#64748b;
            font-size:14px;
          ">
            © ${new Date().getFullYear()} Sanvi Business Consultancy.
            All Rights Reserved.
          </div>

        </div>

      </div>
    `;

    await transporter.sendMail({
      from: `"Sanvi Business Consultancy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Application Email Sent");
  } catch (error) {
    console.log("Application Email Error:", error);
    throw error;
  }
};

// ======================================
// Export Both Functions
// ======================================

module.exports = {
  sendOTP,
  sendEmail,
};