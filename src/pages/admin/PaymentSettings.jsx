import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

function PaymentSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [qrPreview, setQrPreview] = useState("");

  const [formData, setFormData] = useState({
    businessName: "",
    upiId: "",
    paymentInstructions: "",
    supportNumber: "",
    supportEmail: "",
    qrImage: null,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/payment-settings"
      );

      setFormData({
        businessName: res.data.businessName || "",
        upiId: res.data.upiId || "",
        paymentInstructions:
          res.data.paymentInstructions || "",
        supportNumber:
          res.data.supportNumber || "",
        supportEmail:
          res.data.supportEmail || "",
        qrImage: null,
      });

      if (res.data.qrImage) {
        setQrPreview(
          `https://sanvi-business-consultancy.onrender.com/uploads/payments/${res.data.qrImage}`
        );
      }

    } catch (error) {
      console.log(error);
      alert("Unable to load payment settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQR = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      qrImage: file,
    });

    setQrPreview(
      URL.createObjectURL(file)
    );
  };

  const saveSettings = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append(
        "businessName",
        formData.businessName
      );

      data.append(
        "upiId",
        formData.upiId
      );

      data.append(
        "paymentInstructions",
        formData.paymentInstructions
      );

      data.append(
        "supportNumber",
        formData.supportNumber
      );

      data.append(
        "supportEmail",
        formData.supportEmail
      );

      if (formData.qrImage) {
        data.append(
          "qrImage",
          formData.qrImage
        );
      }

      await axios.put(
        "https://sanvi-business-consultancy.onrender.com/api/payment-settings",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Payment Settings Updated Successfully"
      );

    } catch (error) {
      console.log(error);

      alert("Update Failed");

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="bg-white rounded-2xl shadow-sm p-20 text-center">
          <h2 className="text-3xl font-bold">
            Loading Payment Settings...
          </h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Payment Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Configure QR payment information.
        </p>

      </div>

      <form
        onSubmit={saveSettings}
        className="bg-white rounded-2xl shadow-sm p-8"
      >

        <h2 className="text-2xl font-bold mb-8">
          QR Payment Configuration
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div>

            <label className="font-semibold">
              Business Name
            </label>

            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-semibold">
              UPI ID
            </label>

            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              placeholder="example@oksbi"
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

        </div>
                {/* QR Code Upload */}

        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div>

            <label className="font-semibold">
              Upload QR Code
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleQR}
              className="w-full mt-2 border rounded-xl p-3"
            />

            <p className="text-sm text-gray-500 mt-2">
              Upload PhonePe / Google Pay / Paytm / UPI QR Code
            </p>

          </div>

          <div>

            <label className="font-semibold block mb-2">
              QR Preview
            </label>

            <div className="border rounded-2xl bg-slate-50 h-64 flex items-center justify-center overflow-hidden">

              {qrPreview ? (

                <img
                  src={qrPreview}
                  alt="QR Code"
                  className="object-contain h-full"
                />

              ) : (

                <p className="text-gray-400">
                  No QR Uploaded
                </p>

              )}

            </div>

          </div>

        </div>

        {/* Payment Instructions */}

        <div className="mb-10">

          <label className="font-semibold">
            Payment Instructions
          </label>

          <textarea
            rows={5}
            name="paymentInstructions"
            value={formData.paymentInstructions}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3 resize-none"
            placeholder="Enter payment instructions..."
          />

        </div>

        {/* Support Details */}

        <h2 className="text-2xl font-bold mb-6">
          Payment Support
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div>

            <label className="font-semibold">
              Support Number
            </label>

            <input
              type="text"
              name="supportNumber"
              value={formData.supportNumber}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-semibold">
              Support Email
            </label>

            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

        </div>

        {/* Information Card */}

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">

          <h3 className="text-lg font-bold text-blue-700 mb-4">
            Customer Payment Flow
          </h3>

          <ul className="space-y-2 text-gray-700">

            <li>✅ Customer submits an application.</li>

            <li>✅ Admin sends a quotation.</li>

            <li>✅ Customer scans the QR code.</li>

            <li>✅ Customer uploads payment screenshot.</li>

            <li>✅ Admin verifies payment.</li>

            <li>✅ Receipt is generated automatically.</li>

          </ul>

        </div>

        {/* Save Button */}

        <div className="flex justify-end">

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
          >
            {saving
              ? "Saving..."
              : "Save Payment Settings"}
          </button>

        </div>

      </form>

    </AdminLayout>
  );
}

export default PaymentSettings;