import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function TestimonialForm() {

  const { applicationId } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [application, setApplication] =
    useState(null);

  const [rating, setRating] =
    useState(5);

  const [review, setReview] =
    useState("");

  useEffect(() => {

    loadApplication();

  }, []);

  const loadApplication = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/applications/${applicationId}`
      );

      setApplication(res.data);

    } catch (error) {

      console.log(error);

      alert("Unable to load application.");

    }

  };

  const submitTestimonial = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/testimonials",
        {
          customerName: user.name,
          applicationId,
          userId: user._id,
          service: application.service,
          rating,
          review,
        }
      );

      alert(
        "Thank you! Your testimonial has been submitted for admin approval."
      );

      navigate("/my-applications");

    } catch (error) {

      console.log(error);

      alert("Unable to submit testimonial.");

    }

  };

  if (!application) {

    return (

      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">

          <h1 className="text-3xl font-bold">
            Loading...
          </h1>

        </div>

      </>

    );

  }

  return (

    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 pt-32 pb-20">

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-4xl font-bold mb-8">
            Write a Testimonial
          </h1>

          <form
            onSubmit={submitTestimonial}
            className="space-y-6"
          >

            <div>

              <label className="font-semibold">
                Service
              </label>

              <input
                value={application.service}
                readOnly
                className="w-full border rounded-xl p-4 mt-2 bg-gray-100"
              />

            </div>

            <div>

              <label className="font-semibold">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
                className="w-full border rounded-xl p-4 mt-2"
              >

                <option value="5">
                  ⭐⭐⭐⭐⭐ (5)
                </option>

                <option value="4">
                  ⭐⭐⭐⭐ (4)
                </option>

                <option value="3">
                  ⭐⭐⭐ (3)
                </option>

                <option value="2">
                  ⭐⭐ (2)
                </option>

                <option value="1">
                  ⭐ (1)
                </option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Review
              </label>

              <textarea
                rows={6}
                value={review}
                onChange={(e) =>
                  setReview(e.target.value)
                }
                required
                placeholder="Share your experience..."
                className="w-full border rounded-xl p-4 mt-2 resize-none"
              />

            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Submit Testimonial
            </button>

          </form>

        </div>

      </section>

    </>

  );

}

export default TestimonialForm;