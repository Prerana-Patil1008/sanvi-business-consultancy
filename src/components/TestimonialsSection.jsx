import { useEffect, useState } from "react";
import axios from "axios";

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const res = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/testimonials"
      );

      setTestimonials(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold mt-4 text-slate-900">
            What Our Customers Say
          </h2>

          <p className="mt-6 text-gray-500 max-w-3xl mx-auto">
            Trusted by customers across India for business registration,
            taxation, compliance and consultancy services.
          </p>

        </div>

        {testimonials.length === 0 ? (

          <div className="text-center text-gray-500 text-lg">
            No Testimonials Available
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {testimonials.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
              >

                <div className="text-yellow-500 text-2xl mb-4">
                  {"⭐".repeat(item.rating)}
                </div>

                <p className="text-gray-600 leading-7">
                  "{item.review}"
                </p>

                <hr className="my-6" />

                <h3 className="text-xl font-bold text-slate-900">
                  {item.customerName}
                </h3>

                <p className="text-blue-600 mt-2">
                  {item.service}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default TestimonialsSection;