import {
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaHeadset,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Trusted Services",
      description:
        "Reliable and transparent consultancy services with customer satisfaction.",
    },
    {
      icon: <FaClock />,
      title: "Fast Processing",
      description:
        "Quick documentation and application processing with minimal delays.",
    },
    {
      icon: <FaUsers />,
      title: "Expert Guidance",
      description:
        "Professional assistance from experienced consultants at every step.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description:
        "Dedicated support team ready to answer your questions anytime.",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-amber-500 font-semibold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h1 className="text-5xl font-bold text-slate-900 mt-4">
            Why Customers Trust Sanvi
          </h1>

          <p className="text-gray-500 mt-5 max-w-3xl mx-auto">
            We provide professional consultancy services with
            transparency, reliability and customer satisfaction.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                bg-slate-50
                rounded-3xl
                p-8
                text-center
                shadow-lg
                hover:-translate-y-3
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-16 h-16
                  bg-amber-100
                  text-amber-500
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-3xl
                  mx-auto
                  mb-6
                "
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="text-gray-500 mt-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;