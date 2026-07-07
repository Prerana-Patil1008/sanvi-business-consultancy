import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft,
  Printer,
  Building2,
  CheckCircle,
} from "lucide-react";

import "./Receipt.css";

function Receipt() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [payment, setPayment] = useState(null);
  const [application, setApplication] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchReceipt();
  }, []);

  const fetchReceipt = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payments/${paymentId}`
      );

      setPayment(res.data.payment);
      setApplication(res.data.application);
      setSettings(res.data.settings);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-2xl font-bold mt-6">

            Loading Receipt...

          </h2>

        </div>

      </div>
    );
  }

  if (!payment || !application || !settings) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-bold">

          Receipt Not Found

        </h2>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Action Buttons */}

        <div className="print-hide flex justify-between mb-6">

          <button

            onClick={() => navigate(-1)}

            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl flex items-center gap-2"

          >

            <ArrowLeft size={18} />

            Back

          </button>

          <button

            onClick={handlePrint}

            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl flex items-center gap-2"

          >

            <Printer size={18} />

            Print Receipt

          </button>

        </div>

        {/* Receipt */}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                      {/* ========================================= */}
          {/* Company Header */}
          {/* ========================================= */}

          <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white px-10 py-8">

            <div className="flex justify-between items-start">

              {/* Company Information */}

              <div className="flex items-start gap-5">

                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg">

                  {settings.logo ? (

                    <img
                      src={`http://localhost:5000/uploads/${settings.logo}`}
                      alt="Logo"
                      className="w-16 h-16 object-contain"
                    />

                  ) : (

                    <Building2
                      size={42}
                      className="text-blue-700"
                    />

                  )}

                </div>

                <div>

                  <h1 className="text-3xl font-bold tracking-wide">

                    {settings.businessName}

                  </h1>

                  <p className="text-blue-100 mt-1">

                    {settings.tagline}

                  </p>

                  <div className="mt-5 space-y-1 text-sm text-blue-100">

                    <p>

                      📍 {settings.address || "-"}

                    </p>

                    <p>

                      📞 {settings.phone1}

                      {settings.phone2
                        ? ` / ${settings.phone2}`
                        : ""}

                    </p>

                    <p>

                      ✉ {settings.email}

                    </p>

                    <p>

                      🌐 {settings.website || "-"}

                    </p>

                  </div>

                </div>

              </div>

              {/* Paid Badge */}

              <div className="text-right">

                <div className="inline-flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full shadow-lg">

                  <CheckCircle size={22} />

                  <span className="font-bold">

                    VERIFIED

                  </span>

                </div>

                <div className="mt-6">

                  <p className="text-blue-100 text-sm">

                    Receipt Number

                  </p>

                  <h2 className="text-xl font-bold">

                    {payment.receiptNumber}

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Receipt Title */}
          {/* ========================================= */}

          <div className="border-b bg-slate-50 px-10 py-6">

            <h2 className="text-4xl font-bold text-slate-800">

              PAYMENT RECEIPT

            </h2>

            <p className="mt-2 text-gray-500">

              This receipt confirms that the payment has been
              successfully received and verified by
              {" "}
              <span className="font-semibold">

                {settings.businessName}

              </span>.

            </p>

          </div>
                    {/* ========================================= */}
          {/* Receipt Information */}
          {/* ========================================= */}

          <div className="grid grid-cols-4 border-b">

            <div className="p-6 border-r">
              <p className="text-sm text-gray-500">
                Receipt Date
              </p>

              <h3 className="font-bold text-lg mt-2">
                {new Date(
                  payment.paymentDate
                ).toLocaleDateString("en-IN")}
              </h3>
            </div>

            <div className="p-6 border-r">
              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <h3 className="font-bold text-lg mt-2">
                {payment.paymentMethod}
              </h3>
            </div>

            <div className="p-6 border-r">
              <p className="text-sm text-gray-500">
                Status
              </p>

              <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {payment.paymentStatus}
              </span>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-500">
                Amount Paid
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                ₹ {payment.amount}
              </h2>
            </div>

          </div>

          {/* ========================================= */}
          {/* Customer & Payment Details */}
          {/* ========================================= */}

          <div className="grid md:grid-cols-2 gap-8 p-10">

            {/* Customer Details */}

            <div>

              <h3 className="text-xl font-bold text-blue-700 mb-5">
                Customer Details
              </h3>

              <table className="w-full">

                <tbody>

                  <tr className="border-b">
                    <td className="py-3 text-gray-500 w-40">
                      Full Name
                    </td>

                    <td className="py-3 font-semibold">
                      {application.name}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3 text-gray-500">
                      Email
                    </td>

                    <td className="py-3 break-all">
                      {application.email}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3 text-gray-500">
                      Mobile
                    </td>

                    <td className="py-3">
                      {application.mobile}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 text-gray-500">
                      Application ID
                    </td>

                    <td className="py-3 text-sm font-mono break-all">
                      {application._id}
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

            {/* Payment Details */}

            <div>

              <h3 className="text-xl font-bold text-blue-700 mb-5">
                Payment Details
              </h3>

              <table className="w-full">

                <tbody>

                  <tr className="border-b">
                    <td className="py-3 text-gray-500 w-44">
                      Transaction ID
                    </td>

                    <td className="py-3 break-all">
                      {payment.transactionId || "N/A"}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3 text-gray-500">
                      Payment Date
                    </td>

                    <td className="py-3">
                      {new Date(
                        payment.paymentDate
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3 text-gray-500">
                      Verified By
                    </td>

                    <td className="py-3">
                      {payment.verifiedBy || "Administrator"}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 text-gray-500">
                      Receipt No
                    </td>

                    <td className="py-3 font-semibold">
                      {payment.receiptNumber}
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>
                    {/* ========================================= */}
          {/* Service & Verification */}
          {/* ========================================= */}

          <div className="grid md:grid-cols-2 gap-8 px-10 pb-10">

            {/* Service Details */}

            <div>

              <h3 className="text-xl font-bold text-blue-700 mb-5">

                Service Details

              </h3>

              <table className="w-full">

                <tbody>

                  <tr className="border-b">

                    <td className="py-3 text-gray-500 w-44">

                      Service

                    </td>

                    <td className="py-3 font-semibold">

                      {application.service}

                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="py-3 text-gray-500">

                      Status

                    </td>

                    <td className="py-3">

                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">

                        {application.status}

                      </span>

                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="py-3 text-gray-500">

                      Applied Date

                    </td>

                    <td className="py-3">

                      {new Date(
                        application.createdAt
                      ).toLocaleDateString("en-IN")}

                    </td>

                  </tr>

                  <tr>

                    <td className="py-3 text-gray-500">

                      Payment Status

                    </td>

                    <td className="py-3">

                      <span className="text-green-600 font-bold">

                        {payment.paymentStatus}

                      </span>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

            {/* Verification */}

            <div>

              <h3 className="text-xl font-bold text-blue-700 mb-5">

                Verification Details

              </h3>

              <table className="w-full">

                <tbody>

                  <tr className="border-b">

                    <td className="py-3 text-gray-500 w-44">

                      Verified By

                    </td>

                    <td className="py-3">

                      {payment.verifiedBy || "Administrator"}

                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="py-3 text-gray-500">

                      Verified On

                    </td>

                    <td className="py-3">

                      {payment.verifiedAt
                        ? new Date(
                            payment.verifiedAt
                          ).toLocaleString("en-IN")
                        : "-"}

                    </td>

                  </tr>

                  <tr>

                    <td className="py-3 text-gray-500">

                      Remarks

                    </td>

                    <td className="py-3">

                      {payment.remarks ||
                        "Payment verified successfully."}

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* ========================================= */}
          {/* Total Paid */}
          {/* ========================================= */}

          <div className="mx-10 mb-10 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-xl">

            <div className="flex items-center justify-between px-10 py-8">

              <div>

                <p className="uppercase tracking-widest text-green-100 text-sm">

                  Total Amount Paid

                </p>

                <h1 className="text-5xl font-bold mt-2">

                  ₹ {payment.amount}

                </h1>

              </div>

              <div>

                <div className="bg-white/20 px-6 py-3 rounded-full font-bold text-lg">

                  ✓ PAID

                </div>

              </div>

            </div>

          </div>

          {/* ========================================= */}
          {/* Thank You */}
          {/* ========================================= */}

          <div className="px-10 pb-10">

            <div className="rounded-2xl border bg-slate-50 p-8">

              <h2 className="text-2xl font-bold text-slate-800">

                Thank You!

              </h2>

              <p className="mt-3 text-gray-600 leading-7">

                Thank you for choosing

                <span className="font-semibold">

                  {" "}
                  {settings.businessName}

                </span>.

                Your payment has been successfully received and verified.

              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div>

                  <p className="font-semibold">

                    Phone

                  </p>

                  <p className="text-gray-600">

                    {settings.phone1}

                  </p>

                </div>

                <div>

                  <p className="font-semibold">

                    Email

                  </p>

                  <p className="text-gray-600 break-all">

                    {settings.email}

                  </p>

                </div>

                <div>

                  <p className="font-semibold">

                    Website

                  </p>

                  <p className="text-gray-600">

                    {settings.website || "-"}

                  </p>

                </div>

              </div>

            </div>

          </div>
                    {/* ========================================= */}
          {/* Footer */}
          {/* ========================================= */}

          <footer className="bg-slate-900 text-white px-10 py-8">

            <div className="grid md:grid-cols-3 gap-8">

              <div>

                <h3 className="text-xl font-bold">

                  {settings.businessName}

                </h3>

                <p className="text-slate-300 mt-2">

                  {settings.tagline}

                </p>

              </div>

              <div>

                <h4 className="font-semibold mb-3">

                  Contact Information

                </h4>

                <p className="text-slate-300">

                  📍 {settings.address}

                </p>

                <p className="text-slate-300">

                  ☎ {settings.phone1}

                  {settings.phone2
                    ? ` / ${settings.phone2}`
                    : ""}

                </p>

                <p className="text-slate-300">

                  ✉ {settings.email}

                </p>

              </div>

              <div>

                <h4 className="font-semibold mb-3">

                  Office

                </h4>

                <p className="text-slate-300">

                  🌐 {settings.website || "-"}

                </p>

                <p className="text-slate-300">

                  {settings.officeHours || "Working Hours"}

                </p>

              </div>

            </div>

            <div className="border-t border-slate-700 mt-8 pt-5 text-center text-sm text-slate-400">

              This is a computer-generated payment receipt.

              <br />

              No signature is required.

            </div>

          </footer>

        </div>

      </div>

    </div>

  );

}

export default Receipt;