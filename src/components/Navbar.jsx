

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFFDF8]/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img
              src={logo}
              alt="Sanvi Business Consultancy"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#111827] tracking-wide">
                SANVI
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Business Consultancy
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-violet-700 transition duration-300 font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {token ? (
              <>
                <li>
                  <Link
                    to="/my-applications"
                    className="text-gray-700 hover:text-violet-700 transition font-medium"
                  >
                    My Applications
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-violet-700 transition font-medium"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-amber-600 hover:text-amber-700 transition font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-violet-700 transition font-medium"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-violet-700 to-teal-500 text-white px-5 py-2 rounded-xl hover:opacity-90 shadow-md hover:scale-105 transition block"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#111827] text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mb-4 bg-[#FFFDF8] rounded-3xl p-6 border border-gray-200 shadow-xl">
            <ul className="flex flex-col gap-6">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:text-violet-700 transition font-medium block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {token ? (
                <>
                  <li>
                    <Link
                      to="/my-applications"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-violet-700 transition font-medium block"
                    >
                      My Applications
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-violet-700 transition font-medium block"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-left text-amber-600 hover:text-amber-700 transition font-medium w-full"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 hover:text-violet-700 transition font-medium block"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="text-center bg-gradient-to-r from-violet-700 to-teal-500 text-white py-3 rounded-2xl font-semibold block shadow-md"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;