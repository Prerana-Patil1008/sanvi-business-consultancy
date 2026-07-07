import { useState } from "react";
import axios from "axios";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const otp = location.state?.otp || "";

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      return alert("Passwords do not match");

    }

    if (formData.password.length < 6) {

      return alert(
        "Password must contain at least 6 characters"
      );

    }

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          otp,
          password: formData.password,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to reset password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen bg-[#FFFDF8] flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-xl p-10">

        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#6D28D9] to-[#14B8A6] flex items-center justify-center text-white text-3xl">

            <FaCheckCircle />

          </div>

          <h1 className="text-3xl font-bold mt-6">

            Reset Password

          </h1>

          <p className="text-gray-500 mt-3">

            Create a new secure password.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* Password */}

          <div>

            <label className="block font-semibold mb-2">

              New Password

            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="New Password"
                className="w-full pl-12 pr-12 py-4 border rounded-xl outline-none focus:border-[#6D28D9]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-400"
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block font-semibold mb-2">

              Confirm Password

            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-4 border rounded-xl outline-none focus:border-[#6D28D9]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-400"
              >

                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#14B8A6] text-white font-semibold flex justify-center items-center gap-2"
          >

            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Updating...
              </>
            ) : (
              "Reset Password"
            )}

          </button>

        </form>

      </div>

    </section>

  );

}

export default ResetPassword;