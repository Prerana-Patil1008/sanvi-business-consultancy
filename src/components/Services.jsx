import {
  FaFileInvoice,
  FaMoneyCheckAlt,
  FaPassport,
  FaIdCard,
  FaBuilding,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "GST Registration",
    icon: <FaFileInvoice />,
    description:
      "Quick and hassle-free GST registration for businesses and professionals.",
  },
  {
    title: "Income Tax Filing",
    icon: <FaMoneyCheckAlt />,
    description:
      "Professional assistance for accurate and timely income tax filing.",
  },
  {
    title: "Passport Services",
    icon: <FaPassport />,
    description:
      "Apply, renew, or update passport information with expert guidance.",
  },
  {
    title: "PAN Card Services",
    icon: <FaIdCard />,
    description:
      "New PAN card applications, corrections, and updates made easy.",
  },
  {
    title: "Business Registration",
    icon: <FaBuilding />,
    description:
      "Company registration, MSME, Startup India, and other business services.",
  },
  {
    title: "Marriage Certificate",
    icon: <FaCertificate />,
    description:
      "Assistance with marriage registration and certificate documentation.",
  },
];

function Services() {
  const navigate = useNavigate();
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-amber-500 font-semibold uppercase tracking-widest">
            Our Services
          </p>

          <h1 className="text-5xl font-bold text-slate-900 mt-4">
            Popular Services
          </h1>

          <p className="text-gray-500 mt-5 max-w-3xl mx-auto">
            We provide reliable and professional government
            documentation and business consultancy services.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {services.map((service) => (
            <div
              key={service.title}
              className="
                bg-white
                rounded-3xl
                p-10
                shadow-lg
                border border-gray-100
                hover:-translate-y-3
                hover:shadow-2xl
                hover:border-amber-400
                transition-all
                duration-300
                group
              "
            >
              {/* Icon */}
              <div
                className="
                  w-18 h-18
                  bg-amber-100
                  text-amber-500
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-4xl
                  mb-8
                  group-hover:bg-amber-500
                  group-hover:text-white
                  transition-all
                "
              >
                {service.icon}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-slate-900">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 mt-5 leading-relaxed">
                {service.description}
              </p>

              {/* Button */}
              <button
  onClick={() => navigate("/services")}
  className="
    mt-8
    text-amber-500
    font-semibold
    flex
    items-center
    gap-2
    group-hover:text-slate-900
    transition-all
  "
>
  Apply Now
  <FaArrowRight />
</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;