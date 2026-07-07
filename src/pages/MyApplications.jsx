


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ApplicationCard from "../components/ApplicationCard";
import PaymentModal from "../components/PaymentModal";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/user/${user._id}`
      );

      setApplications(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handlePayment = (application) => {
    console.log("Payment:", application);

    // Razorpay Integration
    // Next Step
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <section className="min-h-screen flex items-center justify-center bg-slate-100">

          <div className="text-center">

            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

            <h2 className="text-2xl font-bold">
              Loading Applications...
            </h2>

          </div>

        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* Hero */}

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-10 text-white shadow-xl mb-12">

            <h1 className="text-5xl font-bold">
              My Applications
            </h1>

            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              Track your application progress, payment
              status, uploaded documents, and service
              completion in one place.
            </p>

          </div>

          {applications.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

              <h2 className="text-3xl font-bold">
                No Applications Found
              </h2>

              <p className="text-gray-500 mt-3">
                Apply for a service to see it here.
              </p>

            </div>

          ) : (

            <div className="space-y-10">

              {applications.map((application) => (

                <ApplicationCard
                  key={application._id}
                  application={application}
                  navigate={navigate}
                  onPay={() => {
                    setSelectedApplication(application);
                    setOpenPaymentModal(true);
                  }}

                />

              ))}
              <PaymentModal
                open={openPaymentModal}
                application={selectedApplication}
                onClose={() => setOpenPaymentModal(false)}
                onSuccess={fetchApplications}
              />

            </div>

          )}

        </div>

      </section>
    </>
  );
}

export default MyApplications;