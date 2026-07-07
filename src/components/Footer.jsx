import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/settings"
      );

      setSettings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* Company */}

        <div>
          <h1 className="text-4xl font-bold text-amber-400">
            SANVI
          </h1>

          <p className="mt-5 text-gray-400 leading-8">
            Professional government documentation and business consultancy
            services with trusted support across India.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-xl font-bold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link to="/" className="hover:text-amber-400">
                Home
              </Link>
            </li>

            <li>
              <Link to="/services" className="hover:text-amber-400">
                Services
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-amber-400">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-amber-400">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Services */}

        <div>
          <h3 className="text-xl font-bold mb-6">
            Services
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>GST Registration</li>
            <li>Income Tax Filing</li>
            <li>PAN Card Services</li>
            <li>Passport Services</li>
            <li>Business Registration</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="text-xl font-bold mb-6">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex items-start gap-3">
  <FaPhone className="text-amber-400 mt-1" />

  <div>
    <p>{settings.phone1 || "Not Available"}</p>
    <p>{settings.phone2 || ""}</p>
  </div>
</div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400" />

              <span>
                {settings.email || "Not Available"}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-amber-400 mt-1" />

              <span>
                {settings.address || "Address Not Available"}
              </span>
            </div>

            <div className="flex gap-5 text-2xl mt-6">

              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="hover:text-amber-400 transition" />
              </a>

              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="hover:text-amber-400 transition" />
              </a>

              <a
                href={settings.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="hover:text-amber-400 transition" />
              </a>

            </div>

          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 mt-16 pt-8 text-center text-gray-500">
        © {new Date().getFullYear()} Sanvi Business Consultancy. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;