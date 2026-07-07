

import {
  FaArrowRight,
  FaPhoneAlt,
  FaUsers,
  FaBriefcase,
  FaClock,
  FaHeadset,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/logo.png"; // Path to the new team photo

function Hero() {
  const navigate = useNavigate();

  const stats = [
    {
      icon: <FaUsers />,
      value: "1000+",
      title: "Customers",
    },
    {
      icon: <FaBriefcase />,
      value: "29+",
      title: "Services",
    },
    {
      icon: <FaClock />,
      value: "2+",
      title: "Years Experience",
    },
    {
      icon: <FaHeadset />,
      value: "24/7",
      title: "Support",
    },
  ];

  return (
    <section className="relative bg-[#FFFDF8] pt-40 pb-24 overflow-hidden">
      {/* Background Decorative Blur Glows (Accent Color) */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-700/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side (Content and Stats) */}
          <div>
            <p className="text-amber-600 font-semibold uppercase tracking-widest mb-6 text-sm">
              Government & Business Consultancy Services
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.1]">
              Sanvi Business{" "}
              <span className="block text-violet-700">
                Consultancy
              </span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl mt-8 leading-8 max-w-2xl">
              One place for GST Registration, Income Tax Filing,
              Passport Services, PAN Card, Certificates,
              Licenses and Business Registration Services.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">
              <button
                onClick={() => navigate("/services")}
                className="bg-violet-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-violet-800 transition duration-300 shadow-lg shadow-violet-700/20 hover:scale-[1.02]"
              >
                Explore Services
                <FaArrowRight />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="border-2 border-gray-300 text-[#111827] bg-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-gray-50 hover:border-violet-700 transition duration-300 shadow-sm"
              >
                <FaPhoneAlt className="text-violet-700" />
                Contact Us
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-200/80 rounded-3xl p-6 text-center hover:border-violet-700 transition duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="text-violet-700 text-3xl flex justify-center mb-4">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#111827]">
                    {item.value}
                  </h3>

                  <p className="text-gray-500 mt-2 text-sm font-medium">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side (Team Image) */}
          <div className="relative">
            <img
              src={heroImage}
              alt="Professional Business Consultancy Team Collaboration"
              className="w-full max-w-xl mx-auto rounded-[60px] shadow-xl object-cover border border-gray-100"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;