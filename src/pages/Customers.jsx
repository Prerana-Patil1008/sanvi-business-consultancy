import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/customers"
      );

      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://sanvi-business-consultancy.onrender.com/api/customers/${id}`,
        { status }
      );

      fetchCustomers();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://sanvi-business-consultancy.onrender.com/api/customers/${id}`
      );

      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-400">
          Customer Management
        </h1>

        <p className="text-slate-400 mt-2">
          View and manage customer applications.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold">
          Total Customers: {customers.length}
        </h2>
      </div>

      {loading ? (
        <div className="bg-slate-900 p-6 rounded-2xl">
          Loading customers...
        </div>
      ) : customers.length === 0 ? (
        <div className="bg-slate-900 p-6 rounded-2xl">
          No customers found.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-400 text-black">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">mobile</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Service</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-b border-slate-700 hover:bg-slate-800"
                  >
                    <td className="p-4">
                      {customer.name}
                    </td>

                    <td className="p-4">
                      {customer.mobile || "N/A"}
                    </td>

                    <td className="p-4">
                      {customer.email || "N/A"}
                    </td>

                    <td className="p-4">
                      {customer.service}
                    </td>

                    <td className="p-4">
                      <select
                        value={customer.status}
                        onChange={(e) =>
                          updateStatus(
                            customer._id,
                            e.target.value
                          )
                        }
                        className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>
                      </select>
                    </td>

                    <td className="p-4">
                      {customer.createdAt
                        ? new Date(
                            customer.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          deleteCustomer(customer._id)
                        }
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;