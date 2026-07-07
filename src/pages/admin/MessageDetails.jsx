import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";

function MessageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadMessage();
  }, []);

  const loadMessage = async () => {
    try {
      const res = await axios.get(
        `https://sanvi-business-consultancy.onrender.com/api/contacts/${id}`
      );

      setMessage(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load message.");
    }
  };

  if (!message) {
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
        onClick={() => navigate("/admin/messages")}
        className="mb-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        ← Back to Messages
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-4xl font-bold mb-8">
          Message Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold">
              Name
            </label>

            <input
              value={message.name}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={message.email}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Phone
            </label>

            <input
              value={message.phone}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Subject
            </label>

            <input
              value={message.subject}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

        </div>

        <div className="mt-8">

          <label className="font-semibold">
            Message
          </label>

          <textarea
            rows={8}
            value={message.message}
            readOnly
            className="w-full border rounded-xl p-4 mt-2 bg-gray-100 resize-none"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div>
            <label className="font-semibold">
              Status
            </label>

            <input
              value={message.status}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Received On
            </label>

            <input
              value={new Date(message.createdAt).toLocaleString()}
              readOnly
              className="w-full border rounded-xl p-3 mt-2 bg-gray-100"
            />
          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default MessageDetails;