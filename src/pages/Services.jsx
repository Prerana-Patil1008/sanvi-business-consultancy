import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ApplicationModal from "../components/ApplicationModal";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [search, setSearch] = useState("");

  const [services, setServices] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [selectedService, setSelectedService] =
    useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/services"
      );

      setServices(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const filteredPanIndia = services.filter(
    (service) =>
      service.category === "Pan India" &&
      service.status === "Active" &&
      service.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const filteredKarnataka = services.filter(
    (service) =>
      service.category === "Karnataka" &&
      service.status === "Active" &&
      service.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleApply = (serviceTitle) => {

    if (!token) {

      alert("Please login to apply.");

      navigate("/login");

      return;

    }

    setSelectedService(serviceTitle);

    setShowForm(true);

  };

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-32 pb-24">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="text-center">

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
              Our Services
            </h1>

            <p className="mt-6 text-lg text-gray-500 max-w-3xl mx-auto">
              Professional consultancy services across India and Karnataka.
            </p>

          </div>

          {/* Statistics */}

          <div className="flex flex-col md:flex-row justify-center gap-8 mt-14">

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center w-full md:w-64">

              <h3 className="text-4xl font-bold text-blue-600">
                {filteredPanIndia.length}
              </h3>

              <p className="text-gray-500 mt-2">
                Pan India Services
              </p>

            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center w-full md:w-64">

              <h3 className="text-4xl font-bold text-cyan-600">
                {filteredKarnataka.length}
              </h3>

              <p className="text-gray-500 mt-2">
                Karnataka Services
              </p>

            </div>

          </div>

          {/* Search */}

          <div className="max-w-2xl mx-auto mt-14">

            <div className="bg-white rounded-3xl shadow-lg p-5 flex items-center gap-4">

              <FaSearch className="text-gray-400 text-xl" />

              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full outline-none text-lg"
              />

            </div>

          </div>

          {/* Pan India Services */}
          <div className="mt-24">

  <h2 className="text-4xl font-bold text-slate-900 mb-12">
    🌐 Pan India Services
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {filteredPanIndia.map((service) => (

      <div
        key={service._id}
        className="
          bg-white
          rounded-[32px]
          p-8
          shadow-lg
          border
          border-gray-100
          hover:-translate-y-3
          hover:shadow-2xl
          transition-all
          duration-300
        "
      >

        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mb-6">
          🌐
        </div>

        <h3 className="text-xl font-bold text-slate-900 leading-8">
          {service.title}
        </h3>

        <p className="mt-4 text-gray-500">
          {service.description}
        </p>

        <button
          onClick={() =>
            handleApply(service.title)
          }
          className="
            mt-6
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            gap-2
            hover:bg-blue-700
            hover:scale-105
            transition-all
            duration-300
            shadow-lg
          "
        >
          Apply Now
        </button>

      </div>

    ))}

  </div>

</div>

{/* Karnataka Services */}

<div className="mt-28">

  <h2 className="text-4xl font-bold text-slate-900 mb-12">
    📄 Karnataka / Bangalore Services
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {filteredKarnataka.map((service) => (

      <div
        key={service._id}
        className="
          bg-white
          rounded-[32px]
          p-8
          shadow-lg
          border
          border-gray-100
          hover:-translate-y-3
          hover:shadow-2xl
          transition-all
          duration-300
        "
      >

        <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-3xl mb-6">
          📄
        </div>

        <h3 className="text-xl font-bold text-slate-900 leading-8">
          {service.title}
        </h3>

        <p className="mt-4 text-gray-500">
          {service.description}
        </p>

        <button
          onClick={() =>
            handleApply(service.title)
          }
          className="
            mt-8
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            gap-3
            hover:bg-blue-700
            transition
          "
        >
          Apply Now
        </button>

      </div>

    ))}

  </div>

</div>

{/* CTA */}

<div className="mt-28 bg-gradient-to-r from-slate-900 to-blue-950 rounded-[40px] p-14 text-center text-white">

  <h2 className="text-4xl md:text-5xl font-bold">
    Need Any Other Service?
  </h2>

  <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
    Additional consultancy services can also be provided according to customer requirements.
  </p>

  <button
    onClick={() => navigate("/contact")}
    className="mt-10 bg-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
  >
    Contact Us
  </button>

</div>
      </div>

    </section>

    {/* Application Modal */}

    <ApplicationModal
      showForm={showForm}
      setShowForm={setShowForm}
      selectedService={selectedService}
    />

    {/* WhatsApp Floating Button */}

    <a
href="https://wa.me/9380401950"
      target="_blank"
      rel="noreferrer"
      className="
        fixed
        bottom-8
        right-8
        w-16
        h-16
        rounded-full
        bg-green-500
        text-white
        text-3xl
        flex
        items-center
        justify-center
        shadow-2xl
        z-50
        hover:scale-110
        transition
      "
    >
      💬
    </a>

    <Footer />

    </>

  );

}

export default Services;