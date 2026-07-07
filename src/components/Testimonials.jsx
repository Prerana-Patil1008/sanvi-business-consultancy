import { FaStar } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      message:
        "Excellent service. My GST registration was completed quickly and professionally.",
    },
    {
      name: "Priya Patel",
      message:
        "Very helpful team. They guided me throughout the passport application process.",
    },
    {
      name: "Amit Kumar",
      message:
        "Highly recommend Sanvi Business Consultancy for all documentation services.",
    },
  ];

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <p className="text-amber-500 font-semibold uppercase tracking-widest">
            Testimonials
          </p>

          <h1 className="text-5xl font-bold text-slate-900 mt-4">
            What Our Customers Say
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex gap-1 text-amber-400 mb-5">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 leading-relaxed">
                "{item.message}"
              </p>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;