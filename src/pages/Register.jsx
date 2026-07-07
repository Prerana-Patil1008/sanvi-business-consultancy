// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       formData.password !==
//       formData.confirmPassword
//     ) {
//       alert(
//         "Passwords do not match"
//       );
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/register",
//         {
//           name: formData.name,
//           email: formData.email,
//           mobile: formData.mobile,
//           password: formData.password,
//         }
//       );

//       alert(
//         "Registration Successful"
//       );

//       navigate("/login");
//     } catch (error) {
//       console.log(error);

//       alert(
//         error.response?.data
//           ?.message ||
//           "Registration Failed"
//       );
//     }
//   };

//   return (
//     <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
//       <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-10">
//         <h1 className="text-4xl font-bold text-center text-slate-900">
//           Create Account
//         </h1>

//         <p className="text-gray-500 text-center mt-3">
//           Register to apply and
//           track your services.
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="mt-10 space-y-5"
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             required
//             value={formData.name}
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
//             type="text"
//             name="mobile"
//             placeholder="Mobile Number"
//             required
//             value={formData.mobile}
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

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             required
//             value={
//               formData.confirmPassword
//             }
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
//             Register
//           </button>
//         </form>

//         <p className="text-center mt-8 text-gray-500">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-blue-600 font-semibold"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </section>
//   );
// }

// export default Register;


import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaSpinner, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaRocket,
  FaMapMarkerAlt,
  FaBuilding,
  FaVenusMars
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [mobileError, setMobileError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "mobile") {
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: cleanValue }));
        if (cleanValue.length > 0 && cleanValue.length < 10) {
          setMobileError("Mobile number must be 10 digits");
        } else {
          setMobileError("");
        }
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const checkPasswordStrength = (pwd) => {
    if (!pwd) return { label: "", color: "bg-gray-200", width: "w-0" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    switch (score) {
      case 1: return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
      case 2: return { label: "Fair", color: "bg-amber-500", width: "w-2/4" };
      case 3: return { label: "Good", color: "bg-teal-500", width: "w-3/4" };
      case 4: return { label: "Strong", color: "bg-[#6D28D9]", width: "w-full" };
      default: return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
    }
  };

  const strength = checkPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions to proceed");
      return;
    }

    setIsLoading(true);

    try {
      // Sending additional fields to your backend pipeline safely
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          gender: formData.gender,
          city: formData.city,
          state: formData.state,
          password: formData.password,
        }
      );

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
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
        
        {/* Left Side Content */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left px-4">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
            <FaRocket className="text-[#14B8A6]" size={14} />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Sanvi Business Framework</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] leading-tight">
            Manage your applications <span className="text-[#6D28D9]">seamlessly.</span>
          </h1>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
            Create an official account to monitor regulatory updates, track processing benchmarks, and secure strategic corporate clearances.
          </p>

          <div className="hidden lg:flex items-center gap-6 pt-4 border-t border-gray-200/60">
            <div>
              <p className="text-2xl font-bold text-[#111827]">100%</p>
              <p className="text-xs text-gray-500 font-medium">Data Confidentiality</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-[#111827]">Real-time</p>
              <p className="text-xs text-gray-500 font-medium">Status Analytics</p>
            </div>
          </div>
        </div>

        {/* Right Side: Responsive Input Card */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div className="w-full max-w-xl bg-white border border-gray-100/80 rounded-[32px] p-6 sm:p-10 shadow-xl shadow-gray-200/40">
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">Create Account</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Get set up in just a couple minutes.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaUser size={14} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                  />
                </div>
              </div>

              {/* Grid Wrapper for Email & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <FaPhone size={14} />
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="1234567890"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${mobileError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#6D28D9]'} focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition`}
                    />
                  </div>
                  {mobileError && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <FaExclamationCircle /> {mobileError}
                    </p>
                  )}
                </div>
              </div>

              {/* NEW DEMOGRAPHICS ROW: Gender, City, State stacked side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Gender Selector Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Gender</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                      <FaVenusMars size={14} />
                    </span>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition appearance-none"
                    >
                      <option value="" disabled>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* City Input */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">City</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <FaBuilding size={14} />
                    </span>
                    <input
                      type="text"
                      name="city"
                      placeholder="Mumbai"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                    />
                  </div>
                </div>

                {/* State Input */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">State</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                      <FaMapMarkerAlt size={14} />
                    </span>
                    <input
                      type="text"
                      name="state"
                      placeholder="MH"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Password</label>
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
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}></div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5 text-right font-medium">
                      Strength: <span className="font-semibold text-gray-700">{strength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FaLock size={14} />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 focus:border-[#6D28D9] focus:bg-white rounded-xl outline-none text-sm text-[#111827] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> Passwords do not match
                  </p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-[11px] text-teal-600 mt-1 flex items-center gap-1">
                    <FaCheckCircle /> Passwords match
                  </p>
                )}
              </div>

              {/* Terms Conditions */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#6D28D9] focus:ring-[#6D28D9] border-gray-300 transition"
                />
                <label htmlFor="terms" className="text-xs text-gray-500 leading-tight select-none">
                  I agree to the <span className="text-[#6D28D9] font-medium underline cursor-pointer">Terms</span> and <span className="text-[#6D28D9] font-medium underline cursor-pointer">Privacy Policy</span>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !!mobileError}
                className="w-full bg-gradient-to-r from-[#6D28D9] via-[#6D28D9] to-[#14B8A6] text-white py-3.5 rounded-xl font-semibold hover:opacity-95 shadow-md shadow-[#6D28D9]/10 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-4"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-center mt-6 text-xs sm:text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#6D28D9] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Register;