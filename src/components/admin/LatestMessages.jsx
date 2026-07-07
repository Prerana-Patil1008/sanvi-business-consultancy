import { Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function getStatusBadge(status) {
  switch (status) {
    case "Unread":
      return "bg-red-100 text-red-600";

    case "Read":
      return "bg-green-100 text-green-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
}

function LatestMessages({ messages = [] }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200">

      <div className="flex justify-between items-center p-6 border-b">

        <div>

          <h2 className="text-2xl font-bold">
            Latest Messages
          </h2>

          <p className="text-gray-500 mt-1">
            Recently received enquiries
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/messages")}
          className="text-blue-600 font-semibold hover:text-blue-700"
        >
          View All
        </button>

      </div>

      {messages.length === 0 ? (

        <div className="p-10 text-center text-gray-500">
          No Messages Found
        </div>

      ) : (

        <div className="divide-y">

          {messages.map((message) => (

            <div
              key={message._id}
              className="flex items-center justify-between p-5 hover:bg-slate-50 transition"
            >

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">

                  <Mail
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {message.subject}
                  </h3>

                  <p className="text-gray-500">
                    {message.name}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(
                      message.createdAt
                    ).toLocaleDateString("en-IN")}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                    message.status
                  )}`}
                >
                  {message.status}
                </span>

                <button
                  onClick={() =>
                    navigate("/admin/messages")
                  }
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                  Open

                  <ArrowRight size={16} />

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default LatestMessages;