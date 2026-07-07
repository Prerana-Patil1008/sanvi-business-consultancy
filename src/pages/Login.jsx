// import { useState } from "react";
// import axios from "axios";
// import {
//   Link,
//   useNavigate,
// } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] =
//     useState({
//       email: "",
//       password: "",
//     });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res =
//         await axios.post(
//           "https://sanvi-business-consultancy.onrender.com/api/auth/login",
//           formData
//         );

//       localStorage.setItem(
//         "token",
//         res.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(
//           res.data.user
//         )
//       );

//       alert("Login Successful");

//       navigate("/");
//     } catch (error) {
//       console.log(error);

//       alert(
//         error.response?.data
//           ?.message ||
//           "Login Failed"
//       );
//     }
//   };

//   return (
//     <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
//       <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-10">
//         <h1 className="text-4xl font-bold text-center text-slate-900">
//           Welcome Back
//         </h1>

//         <p className="text-gray-500 text-center mt-3">
//           Login to manage your
//           applications.
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="mt-10 space-y-5"
//         >
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="
//               w-full
//               p-4
//               rounded-2xl
//               border
//               outline-none
//             "
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             className="
//               w-full
//               p-4
//               rounded-2xl
//               border
//               outline-none
//             "
//           />

//           <button
//             type="submit"
//             className="
//               w-full
//               bg-blue-600
//               text-white
//               py-4
//               rounded-2xl
//               font-semibold
//               hover:bg-blue-700
//               transition
//             "
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-8 text-gray-500">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-blue-600 font-semibold"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// }

// export default Login;


import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaSpinner, 
  FaRocket 
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI State Handles
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://sanvi-business-consultancy.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFFDF8] relative flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
      
      {/* Background Ambience Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#6D28D9]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#14B8A6]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Side: Matching Editorial Content */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left px-4">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
            <FaRocket className="text-[#14B8A6]" size={14} />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Sanvi Gateway</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] leading-tight">
            Welcome back to your <span className="text-[#6D28D9]">Dashboard.</span>
          </h1>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
            Log in to securely track your active registrations, update dynamic filings, and check application status timelines in real-time.
          </p>

          <div className="hidden lg:flex items-center gap-6 pt-4 border-t border-gray-200/60">
            <div>
              <p className="text-2xl font-bold text-[#111827]">Secure</p>
              <p className="text-xs text-gray-500 font-medium">256-bit Encryption</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-[#111827]">Direct</p>
              <p className="text-xs text-gray-500 font-medium">Expert Consultations</p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Form Container Card */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white border border-gray-100/80 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-gray-200/40">
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">Welcome Back</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Login to manage your applications.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaEnvelope size={14} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">Password</label>
                  <Link to="/forgot-password" className="text-xs text-[#6D28D9] hover:underline font-medium">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaLock size={14} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#6D28D9] via-[#6D28D9] to-[#14B8A6] text-white py-3.5 rounded-xl font-semibold hover:opacity-95 shadow-md shadow-[#6D28D9]/10 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm pt-3.5"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-xs sm:text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#6D28D9] font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Login;