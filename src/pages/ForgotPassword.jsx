import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaPaperPlane,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "https://sanvi-business-consultancy.onrender.com/api/auth/forgot-password",
        {
          email,
        }
      );

      alert(res.data.message);

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFFDF8] flex items-center justify-center px-6 py-16 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-[#6D28D9]/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#14B8A6]/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white rounded-[30px] shadow-xl border border-gray-100 p-10 relative z-10">

        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#6D28D9] to-[#14B8A6] flex items-center justify-center text-white text-3xl">

            <FaEnvelope />

          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-3">
            Enter your registered email to receive a
            password reset OTP.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email Address
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-[#6D28D9] outline-none"
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6D28D9] to-[#14B8A6] hover:opacity-95 transition flex items-center justify-center gap-2"
          >

            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send OTP
              </>
            )}

          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#6D28D9] font-semibold hover:underline"
          >
            <FaArrowLeft />
            Back to Login
          </Link>

        </div>

      </div>

    </section>
  );
}

export default ForgotPassword;