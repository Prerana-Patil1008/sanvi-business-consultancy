import {
  ShieldCheck,
  Receipt,
  Mail,
  CreditCard,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentCard({
  application,
  onPay,
}) {

  const navigate = useNavigate();
  const {
    quotedAmount,
    paymentStatus,
  } = application;

  const renderButton = () => {
    switch (paymentStatus) {
      case "Pending":
        return (
          <button
            onClick={onPay}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            🔒 Pay Securely
          </button>
        );

      case "Paid":
  return (
    <div className="mt-6 space-y-4">

      {/* Payment Success */}

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">

        <h3 className="text-green-700 font-bold text-lg">
          ✓ Payment Completed
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Your payment has been verified successfully.
        </p>

      </div>

      {/* Receipt Information */}

      {application.payment && (
        <div className="bg-slate-50 rounded-xl border p-4">

          <div className="flex justify-between mb-2">

            <span className="text-gray-500">
              Receipt No
            </span>

            <span className="font-semibold">
              {application.payment.receiptNumber}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Payment Date
            </span>

            <span>
              {application.payment.paymentDate
                ? new Date(
                    application.payment.paymentDate
                  ).toLocaleDateString("en-IN")
                : "-"}
            </span>

          </div>

        </div>
      )}

      {/* Download Button */}

      <button
  onClick={() =>
    navigate(`/receipt/${application.payment._id}`)
  }
  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
>
  👁 View Receipt
</button>

    </div>
  );

      case "Failed":
        return (
          <button
            onClick={onPay}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl"
          >
            <RefreshCw
              className="inline mr-2"
              size={18}
            />
            Retry Payment
          </button>
        );

      case "Refunded":
        return (
          <button
            disabled
            className="w-full mt-6 bg-purple-600 text-white font-semibold py-3 rounded-xl"
          >
            Refunded
          </button>
        );

      default:
        return (
          <div className="mt-6 bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-600">
              Waiting for admin to send
              payment quotation.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-slate-100 rounded-3xl shadow-xl border border-blue-100 p-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-blue-100 p-3 rounded-full">

          <CreditCard
            className="text-blue-700"
            size={26}
          />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            Payment Details
          </h2>

          <p className="text-sm text-gray-500">
            Secure online payment
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">

        <p className="text-gray-500 text-sm">
          Amount to Pay
        </p>

        <h1 className="text-4xl font-bold text-blue-700 mt-2">
          ₹{quotedAmount || 0}
        </h1>

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">

          <ShieldCheck
            className="text-green-600"
            size={20}
          />

          <span>
            100% Secure Payment
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Receipt
            className="text-blue-600"
            size={20}
          />

          <span>
            GST Receipt Included
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Mail
            className="text-orange-500"
            size={20}
          />

          <span>
            Email Confirmation
          </span>

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle
            className="text-green-600"
            size={20}
          />

          <span>
            Powered by Razorpay
          </span>

        </div>

      </div>

      {renderButton()}

    </div>
  );
}

export default PaymentCard;