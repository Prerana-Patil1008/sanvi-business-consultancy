import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaHandshake,
  FaUsers,
  FaAward,
  FaBriefcase,
} from "react-icons/fa";

function About() {
  const navigate = useNavigate();
  const stats = [
    {
      icon: <FaUsers />,
      value: "1000+",
      title: "Happy Customers",
    },
    {
      icon: <FaBriefcase />,
      value: "29+",
      title: "Services Offered",
    },
    {
      icon: <FaAward />,
      value: "2+",
      title: "Years Experience",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center">
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              About Us
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mt-4">
              Building Trust & Business Success
            </h1>

            <p className="mt-6 text-lg text-gray-500 max-w-3xl mx-auto">
              Sanvi Business Consultancy is committed to helping individuals,
              entrepreneurs, and businesses with professional consultancy and
              government-related services across India.
            </p>
          </div>

          {/* About Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-24">
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
                alt="About Sanvi Consultancy"
                className="rounded-[40px] shadow-2xl w-full"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900">
                About Sanvi Consultancy
              </h2>

              <p className="mt-8 text-lg text-gray-600 leading-9">
                Sanvi Business Consultancy focuses on providing trusted,
                affordable, and professional consultancy services for GST,
                Income Tax, Passport Services, Business Registration, PAN Card,
                Certificates, and many other government services.
              </p>

              <p className="mt-6 text-lg text-gray-600 leading-9">
                Our mission is to simplify complex processes and provide
                efficient solutions that save time and help our customers
                achieve their goals with confidence.
              </p>

              <button
  onClick={() => navigate("/services")}
  className="
    mt-10
    bg-blue-600
    text-white
    px-8
    py-4
    rounded-2xl
    font-semibold
    hover:bg-blue-700
    transition
  "
>
  Learn More
</button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-8 mt-28">
            {stats.map((item) => (
              <div
                key={item.title}
                className="
                  bg-white
                  p-10
                  rounded-[32px]
                  shadow-lg
                  text-center
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                "
              >
                <div className="text-4xl text-blue-600 flex justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-5xl font-bold text-slate-900">
                  {item.value}
                </h3>

                <p className="text-gray-500 mt-3">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Vision Mission Values */}
          <div className="grid md:grid-cols-3 gap-8 mt-28">
            <div className="bg-white p-10 rounded-[32px] shadow-lg">
              <FaEye className="text-5xl text-blue-600 mb-6" />

              <h3 className="text-3xl font-bold text-slate-900">
                Our Vision
              </h3>

              <p className="mt-5 text-gray-600 leading-8">
                To become a trusted consultancy partner helping individuals and
                businesses grow with integrity, innovation, and excellence.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-lg">
              <FaBullseye className="text-5xl text-cyan-600 mb-6" />

              <h3 className="text-3xl font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="mt-5 text-gray-600 leading-8">
                Delivering reliable, professional, and affordable services that
                create long-term value for our customers and society.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[32px] shadow-lg">
              <FaHandshake className="text-5xl text-indigo-600 mb-6" />

              <h3 className="text-3xl font-bold text-slate-900">
                Our Values
              </h3>

              <p className="mt-5 text-gray-600 leading-8">
                Integrity, transparency, customer satisfaction, responsibility,
                and teamwork drive everything we do.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-28 bg-gradient-to-r from-slate-900 to-blue-950 rounded-[40px] p-14 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold">
              Let's Build Something Great Together
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
              Whether you're an individual, entrepreneur, or business owner,
              we're here to guide you through every step.
            </p>

            <button
  onClick={() => navigate("/contact")}
  className="
    mt-10
    bg-blue-600
    px-8
    py-4
    rounded-2xl
    font-semibold
    hover:bg-blue-700
    transition
  "
>
  Contact Us
</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;