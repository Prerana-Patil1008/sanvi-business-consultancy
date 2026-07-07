import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function getBadge(status) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function PendingApplications({
  applications = [],
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200">

      <div className="flex justify-between items-center p-6 border-b">

        <div>

          <h2 className="text-2xl font-bold">
            Pending Applications
          </h2>

          <p className="text-gray-500 mt-1">
            Applications waiting for action
          </p>

        </div>

        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-semibold">
          {applications.length} Pending
        </span>

      </div>

      {applications.length === 0 ? (

        <div className="p-10 text-center text-gray-500">
          🎉 No Pending Applications
        </div>

      ) : (

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Service
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-center p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map(app => (

              <tr
                key={app._id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4 font-semibold">
                  {app.name}
                </td>

                <td className="p-4">
                  {app.service}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getBadge(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>

                </td>

                <td className="p-4">

                  {new Date(
                    app.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="text-center">

                  <button
  onClick={() =>
    navigate(`/admin/applications/${app._id}`)
  }
>
  <Eye size={18} />
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default PendingApplications;