import { FileText, CalendarDays, MessageSquare } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ApplicationTimeline from "./ApplicationTimeline";
import PaymentCard from "./PaymentCard";

function ApplicationCard({
  application,
  navigate,
  onPay,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div className="flex items-center gap-3">

            <div className="bg-white/20 p-3 rounded-full">

              <FileText size={28} />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                {application.service}
              </h2>

              <p className="text-blue-100 mt-1">
                Application ID :
                {" "}
                {application._id.slice(-8).toUpperCase()}
              </p>

            </div>

          </div>

          <StatusBadge
            status={application.status}
          />

        </div>

      </div>

      {/* Body */}

      <div className="grid lg:grid-cols-3 gap-8 p-8">

        {/* Left */}

        <div className="lg:col-span-2">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p className="text-gray-500 text-sm">
                Applied On
              </p>

              <div className="flex items-center gap-2 mt-2">

                <CalendarDays
                  size={18}
                  className="text-blue-600"
                />

                <span className="font-semibold">
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString("en-IN")}
                </span>

              </div>

            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Payment Status
              </p>

              <div className="mt-2">

                <StatusBadge
                  status={
                    application.payment?.paymentStatus ||
                    application.paymentStatus ||
                    "Awaiting Quote"
                  }
                  type="payment"
                />

              </div>

            </div>

          </div>

          <ApplicationTimeline
            status={application.status}
            paymentStatus={
              application.payment?.paymentStatus ||
              application.paymentStatus
            }
          />

          {application.remarks && (

            <div className="mt-8">

              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">

                <MessageSquare
                  size={20}
                />

                Admin Remarks

              </h3>

              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">

                {application.remarks}

              </div>

            </div>

          )}

          {application.documents?.length > 0 && (

            <div className="mt-8">

              <h3 className="font-bold text-lg mb-4">
                Documents
              </h3>

              <div className="flex flex-wrap gap-3">

                {application.documents.map(
                  (doc, index) => (

                    <a
                      key={index}
                      href={`https://sanvi-business-consultancy.onrender.com/uploads/${doc}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-blue-100 transition font-medium"
                    >
                      📄 Document {index + 1}
                    </a>

                  )
                )}

              </div>

            </div>

          )}

          {application.status === "Approved" && (

            <button

              onClick={() =>
                navigate(
                  `/testimonial/${application._id}`
                )
              }

              className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold transition"

            >
              ⭐ Give Testimonial
            </button>

          )}

        </div>

        {/* Right */}

        <PaymentCard
  application={application}
  onPay={onPay}
/>

            

      </div>

    </div>
  );
}

export default ApplicationCard;