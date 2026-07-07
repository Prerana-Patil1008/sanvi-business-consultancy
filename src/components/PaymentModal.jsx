import { useEffect, useState } from "react";
import axios from "axios";
import { X, Copy, Upload, CreditCard } from "lucide-react";

function PaymentModal({
  open,
  onClose,
  application,
  onSuccess,
}) {
  const [settings, setSettings] = useState(null);

  const [transactionId, setTransactionId] =
    useState("");

  const [screenshot, setScreenshot] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (open) {

      loadPaymentSettings();

    }

  }, [open]);

  const loadPaymentSettings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/payment-settings"
      );

      setSettings(res.data);

    } catch (error) {

      console.log(error);

      alert("Unable to load payment settings.");

    }

  };

  const copyUPI = () => {

    navigator.clipboard.writeText(
      settings.upiId
    );

    alert("UPI ID Copied");

  };

  const chooseFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setScreenshot(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  const submitPayment = async () => {

    if (!screenshot) {

      return alert(
        "Please upload payment screenshot."
      );

    }

    try {

      setLoading(true);

      const data = new FormData();

      data.append(
        "applicationId",
        application._id
      );

      data.append(
        "transactionId",
        transactionId
      );

      data.append(
        "screenshot",
        screenshot
      );

      await axios.post(
        "http://localhost:5000/api/payments/upload",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Payment submitted successfully."
      );

      onClose();

      if (onSuccess) {

        onSuccess();

      }

    } catch (error) {

      console.log(error);

      alert("Payment upload failed.");

    } finally {

      setLoading(false);

    }

  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 rounded-t-3xl flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold flex items-center gap-3">

              <CreditCard />

              QR Payment

            </h2>

            <p className="text-blue-100 mt-2">

              Complete your payment securely.

            </p>

          </div>

          <button

            onClick={onClose}

            className="hover:bg-white/20 p-2 rounded-lg"

          >

            <X />

          </button>

        </div>

        <div className="p-8">
                      {/* Service & Amount */}

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div className="bg-slate-100 rounded-2xl p-5">

              <p className="text-gray-500 text-sm">
                Service
              </p>

              <h3 className="text-xl font-bold mt-2">
                {application.service}
              </h3>

            </div>

            <div className="bg-green-100 rounded-2xl p-5">

              <p className="text-gray-500 text-sm">
                Amount to Pay
              </p>

              <h2 className="text-3xl font-bold text-green-700 mt-2">
                ₹{application.quotedAmount}
              </h2>

            </div>

          </div>

          {/* QR Code */}

          <div className="text-center mb-8">

            <h3 className="text-xl font-bold mb-4">
              Scan QR Code
            </h3>

            {settings?.qrImage ? (

              <img
                src={`http://localhost:5000/uploads/payments/${settings.qrImage}`}
                alt="QR Code"
                className="w-64 h-64 mx-auto border rounded-2xl shadow"
              />

            ) : (

              <div className="w-64 h-64 mx-auto border-2 border-dashed rounded-2xl flex items-center justify-center text-gray-400">

                QR Code Not Uploaded

              </div>

            )}

          </div>

          {/* UPI */}

          <div className="mb-8">

            <label className="font-semibold block mb-2">
              UPI ID
            </label>

            <div className="flex gap-3">

              <input
                value={settings?.upiId || ""}
                readOnly
                className="flex-1 border rounded-xl p-3 bg-gray-100"
              />

              <button
                onClick={copyUPI}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl flex items-center gap-2"
              >
                <Copy size={18} />

                Copy

              </button>

            </div>

          </div>

          {/* Instructions */}

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">

            <h3 className="font-bold text-blue-700 mb-3">
              Payment Instructions
            </h3>

            <p className="text-gray-700">

              {settings?.paymentInstructions}

            </p>

          </div>

          {/* Transaction */}

          <div className="mb-8">

            <label className="font-semibold">
              Transaction ID (Optional)
            </label>

            <input
              type="text"
              value={transactionId}
              onChange={(e) =>
                setTransactionId(e.target.value)
              }
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Enter UPI Reference Number"
            />

          </div>

          {/* Upload */}

          <div className="mb-8">

            <label className="font-semibold">
              Upload Payment Screenshot
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={chooseFile}
              className="w-full mt-3 border rounded-xl p-3"
            />

          </div>

          {preview && (

            <div className="mb-8 text-center">

              <img
                src={preview}
                alt="Preview"
                className="max-h-72 mx-auto rounded-2xl border shadow"
              />

            </div>

          )}

          {/* Support */}

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-8">

            <h3 className="font-bold text-yellow-700 mb-3">

              Need Help?

            </h3>

            <p>

              <strong>Support:</strong>{" "}
              {settings?.supportNumber}

            </p>

            <p>

              <strong>Email:</strong>{" "}
              {settings?.supportEmail}

            </p>

          </div>

          {/* Submit */}

          <button
            onClick={submitPayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition"
          >

            {loading ? (

              "Submitting..."

            ) : (

              <>
                <Upload
                  className="inline mr-2"
                  size={20}
                />

                Submit Payment
              </>

            )}

          </button>

        </div>

      </div>

    </div>

  );
}

export default PaymentModal;
        