import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaShieldAlt,
  FaSpinner,
} from "react-icons/fa";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function VerifyOTP() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);

  useEffect(() => {

    if (!email) {
      navigate("/forgot-password");
    }

  }, []);

  useEffect(() => {

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleChange = (value, index) => {

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

  };

  const handleKeyDown = (
    e,
    index
  ) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }

  };

  const verifyOTP = async () => {

    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      return alert("Enter complete OTP");
    }

    setLoading(true);

    try {

      const res = await axios.post(
        "https://sanvi-business-consultancy.onrender.com/api/auth/verify-otp",
        {
          email,
          otp: enteredOTP,
        }
      );

      alert(res.data.message);

      navigate("/reset-password", {
        state: {
          email,
          otp: enteredOTP,
        },
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "OTP Verification Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const resendOTP = async () => {

    try {

      await axios.post(
        "https://sanvi-business-consultancy.onrender.com/api/auth/forgot-password",
        {
          email,
        }
      );

      alert("OTP Sent Again");

      setTimer(60);

    } catch (error) {

      alert("Unable to resend OTP");

    }

  };

  return (

    <section className="min-h-screen bg-[#FFFDF8] flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-xl p-10">

        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#6D28D9] to-[#14B8A6] flex items-center justify-center text-white text-3xl">

            <FaShieldAlt />

          </div>

          <h1 className="text-3xl font-bold mt-6">

            Verify OTP

          </h1>

          <p className="text-gray-500 mt-3">

            Enter the 6-digit OTP sent to

            <br />

            <span className="font-semibold">

              {email}

            </span>

          </p>

        </div>

        <div className="flex justify-center gap-3 mt-10">

          {otp.map((digit, index) => (

            <input
              key={index}
              ref={(el) =>
                (inputRefs.current[index] = el)
              }
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  index
                )
              }
              className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-gray-300 focus:border-[#6D28D9] outline-none"
            />

          ))}

        </div>

        <button
          onClick={verifyOTP}
          disabled={loading}
          className="w-full mt-10 bg-gradient-to-r from-[#6D28D9] to-[#14B8A6] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
        >

          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}

        </button>

        <div className="text-center mt-6">

          {timer > 0 ? (

            <p className="text-gray-500">

              Resend OTP in

              <span className="font-bold">

                {" "}
                {timer}s

              </span>

            </p>

          ) : (

            <button
              onClick={resendOTP}
              className="text-[#6D28D9] font-semibold hover:underline"
            >

              Resend OTP

            </button>

          )}

        </div>

      </div>

    </section>

  );

}

export default VerifyOTP;