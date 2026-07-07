import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaGlobe,
} from "react-icons/fa";

function Contact() {
  const [settings, setSettings] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await axios.get("https://sanvi-business-consultancy.onrender.com/api/settings");
      setSettings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://sanvi-business-consultancy.onrender.com/api/contacts", formData);
      alert("Message Sent Successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Unable to send message.");
    }
  };

  if (!settings) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Headers */}
          <div className="text-center">
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              Contact Us
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mt-4">
              Get In Touch
            </h1>
            <p className="mt-6 text-lg text-gray-500 max-w-3xl mx-auto">
              We are always ready to help and guide you with all your
              business and government service requirements.
            </p>
          </div>

          {/* Core Layout Grid Block Wrapper */}
          <div className="grid lg:grid-cols-2 gap-12 mt-20">
            
            {/* Left Column: Contact Information & Map Cards */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-lg">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Phone Item */}
                  <div className="flex gap-4">
                    <FaPhoneAlt className="text-blue-600 text-2xl mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Mobile Numbers</h3>
                      <p className="text-gray-500">
                        {settings.phone1 || "Not Available"}
                      </p>
                      {settings.phone2 && (
                        <p className="text-gray-500">{settings.phone2}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Item */}
                  <div className="flex gap-4">
                    <FaEnvelope className="text-blue-600 text-2xl mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Email</h3>
                      <p className="text-gray-500">
                        {settings.email || "Not Available"}
                      </p>
                    </div>
                  </div>

                  {/* Address Item */}
                  <div className="flex gap-4">
                    <FaMapMarkerAlt className="text-blue-600 text-2xl mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Office Address</h3>
                      <p className="text-gray-500 whitespace-pre-line">
                        {settings.address || "Address not available"}
                      </p>
                    </div>
                  </div>

                  {/* Office Hours Item */}
                  <div className="flex gap-4">
                    <FaClock className="text-blue-600 text-2xl mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Office Hours</h3>
                      <p className="text-gray-500">
                        {settings.officeHours || "Not Available"}
                      </p>
                    </div>
                  </div>

                  {/* Website Item */}
                  <div className="flex gap-4">
                    <FaGlobe className="text-blue-600 text-2xl mt-1" />
                    <div>
                      <h3 className="font-bold text-slate-900">Website</h3>
                      <p className="text-gray-500">
                        {settings.website || "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embed Google Map Card
              <div className="bg-white rounded-[32px] shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Our Location
                </h3>
                <div className="rounded-2xl overflow-hidden h-72 border border-slate-200">

  {settings.googleMap ? (

    <iframe
      src={settings.googleMap}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Sanvi Business Consultancy Location"
    />

  ) : (

    <div className="h-full flex items-center justify-center bg-slate-100 text-gray-500">
      Google Map Not Available
    </div>

  )}

</div>
              </div> */}
            </div>

            {/* Right Column: Contact Form Card */}
            <div className="bg-white rounded-[32px] shadow-lg p-10">
              <h2 className="text-3xl font-bold text-slate-900">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-blue-600 transition"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-blue-600 transition"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-blue-600 transition"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-blue-600 transition"
                />

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl p-4 outline-none resize-none focus:border-blue-600 transition"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-md hover:shadow-lg transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Floating WhatsApp Action Anchor Hook */}
        <a
          href={
            settings.whatsapp
              ? `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`
              : "#"
          }
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-green-500 text-white text-3xl flex items-center justify-center shadow-2xl z-50 hover:scale-110 active:scale-95 transition transformed-origin"
        >
          <FaWhatsapp />
        </a>
      </section>

      <Footer />
    </>
  );
}

export default Contact;