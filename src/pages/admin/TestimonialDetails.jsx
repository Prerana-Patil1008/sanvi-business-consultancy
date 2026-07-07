import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";

function TestimonialDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    loadTestimonial();
  }, []);

  const loadTestimonial = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/testimonials/${id}`
      );

      setTestimonial(res.data);

    } catch (err) {
      console.log(err);
      alert("Unable to load testimonial.");
    }
  };

  if (!testimonial) {
    return (
      <AdminLayout>
        <div className="text-center text-2xl py-20">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <button
        onClick={() => navigate("/admin/testimonials")}
        className="mb-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        ← Back to Testimonials
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-4xl font-bold mb-8">
          Testimonial Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">
              Customer Name
            </label>

            <input
              value={testimonial.customerName}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Service
            </label>

            <input
              value={testimonial.service}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Rating
            </label>

            <input
              value={`${testimonial.rating} ⭐`}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Status
            </label>

            <input
              value={testimonial.status}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

        </div>

        <div className="mt-8">

          <label className="font-semibold">
            Review
          </label>

          <textarea
            rows={8}
            value={testimonial.review}
            readOnly
            className="w-full border rounded-xl p-4 mt-2 bg-gray-100 resize-none"
          />

        </div>

        <div className="mt-8">

          <label className="font-semibold">
            Submitted On
          </label>

          <input
            value={new Date(testimonial.createdAt).toLocaleString()}
            readOnly
            className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
          />

        </div>

      </div>

    </AdminLayout>
  );
}

export default TestimonialDetails;