import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/payments"
      );

      setPayments(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Approve Payment
  // ==========================

  const approvePayment = async (id) => {
    try {

      await axios.put(
        `https://sanvi-business-consultancy.onrender.com/api/payments/approve/${id}`
      );

      alert("Payment Approved Successfully");

      loadPayments();

    } catch (error) {

      console.log(error);

      alert("Unable to approve payment.");

    }
  };

  // ==========================
  // Reject Payment
  // ==========================

  const rejectPayment = async () => {
    try {

      await axios.put(
        `https://sanvi-business-consultancy.onrender.com/api/payments/reject/${selectedPayment._id}`,
        {
          remarks,
        }
      );

      alert("Payment Rejected");

      setShowRejectModal(false);
      setSelectedPayment(null);
      setRemarks("");

      loadPayments();

    } catch (error) {

      console.log(error);

      alert("Unable to reject payment.");

    }
  };

  if (loading) {
    return (
      <AdminLayout>

        <div className="text-center py-20 text-2xl font-bold">

          Loading Payments...

        </div>

      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Payment Verification

        </h1>

        <p className="text-gray-500 mt-2">

          Verify customer payments

        </p>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Service
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Screenshot
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr
                key={payment._id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">

                  <div className="font-semibold">

                    {payment.customer?.name}

                  </div>

                  <div className="text-gray-500 text-sm">

                    {payment.customer?.email}

                  </div>

                </td>

                <td className="p-4">
                  {payment.service}
                </td>

                <td className="p-4 font-bold">
                  ₹{payment.amount}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      payment.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : payment.paymentStatus === "Verification Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : payment.paymentStatus === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {payment.paymentStatus}
                  </span>

                </td>

                <td className="p-4">

                  {payment.screenshot ? (

                    <a
                      href={`https://sanvi-business-consultancy.onrender.com/uploads/payments/${payment.screenshot}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Screenshot
                    </a>

                  ) : (

                    <span className="text-red-500">

                      Not Uploaded

                    </span>

                  )}

                </td>

                <td className="p-4">

                  {payment.paymentStatus === "Verification Pending" ? (

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          approvePayment(payment._id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowRejectModal(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>

                    </div>

                  ) : (

                    <span className="text-gray-400">
                      No Action
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Reject Modal */}

      {showRejectModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-5">

              Reject Payment

            </h2>

            <textarea
              rows={4}
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              placeholder="Enter rejection reason..."
              className="w-full border rounded-xl p-3"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedPayment(null);
                  setRemarks("");
                }}
                className="border px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={rejectPayment}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Reject Payment
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}

export default Payments;