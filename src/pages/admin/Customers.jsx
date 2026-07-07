import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";

import {
  Users,
  Search,
  RefreshCcw,
  Eye,
  Trash2,
} from "lucide-react";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Load customers
useEffect(() => {
  loadCustomers();
}, []);

// Search
useEffect(() => {

  const value = search.toLowerCase();

  const filtered = customers.filter((customer) =>

    customer.name.toLowerCase().includes(value) ||

    customer.email.toLowerCase().includes(value) ||

    customer.phone.includes(value)

  );

  setFilteredCustomers(filtered);

}, [search, customers]);

// Fetch Customers
const loadCustomers = async () => {

  try {

    setLoading(true);

    const res = await axios.get(
      "http://localhost:5000/api/users"
    );

    setCustomers(res.data);

  } catch (err) {

    console.log(err);

    alert("Unable to load customers.");

  } finally {

    setLoading(false);

  }

};

// Delete Customer
const deleteCustomer = async (id) => {

  if (!window.confirm("Delete this customer?"))
    return;

  try {

    await axios.delete(
      `http://localhost:5000/api/users/${id}`
    );

    loadCustomers();

  } catch (err) {

    console.log(err);

    alert("Delete failed");

  }

};

// Dashboard Counts
const totalCustomers =
  filteredCustomers.length;

const activeCustomers =
  filteredCustomers.filter(
    (customer) => customer.isActive !== false
  ).length;

const inactiveCustomers =
  filteredCustomers.filter(
    (customer) => customer.isActive === false
  ).length;

  return (
  <AdminLayout>

    {/* Header */}

    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Customers
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all registered customers
        </p>

      </div>

      <button
        onClick={loadCustomers}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
      >

        <RefreshCcw size={18} />

        Refresh

      </button>

    </div>

    {/* Dashboard Cards */}

    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <DashboardCard
        title="Total Customers"
        value={totalCustomers}
        icon={Users}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />

      <DashboardCard
        title="Active Customers"
        value={activeCustomers}
        icon={Users}
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />

      <DashboardCard
        title="Inactive Customers"
        value={inactiveCustomers}
        icon={Users}
        iconBg="bg-red-100"
        iconColor="text-red-600"
      />

    </div>

    {/* Search */}

    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

    </div>

    {loading ? (

  <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

    <h2 className="text-2xl font-bold">

      Loading Customers...

    </h2>

  </div>

) : (

  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">Customer</th>

            <th className="text-left p-4">mobile</th>

            <th className="text-left p-4">Registered On</th>

            <th className="text-center p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredCustomers.length > 0 ? (

            filteredCustomers.map((customer) => (

              <tr
                key={customer._id}
                className="border-b hover:bg-slate-50 transition"
              >

                {/* Customer */}

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                      {customer.name
                        ?.charAt(0)
                        ?.toUpperCase()}

                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-800">

                        {customer.name}

                      </h3>

                      <p className="text-sm text-gray-500">

                        {customer.email}

                      </p>

                    </div>

                  </div>

                </td>

                {/* mobile */}

                <td className="p-4">

                  {customer.mobile || "-"}

                </td>

                {/* Registered */}

                <td className="p-4">

                  {new Date(
                    customer.createdAt
                  ).toLocaleDateString("en-IN")}

                </td>

                {/* Actions */}

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button

                      onClick={() =>
                        setSelectedCustomer(customer)
                      }

                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"

                    >

                      <Eye size={18} />

                    </button>

                    <button

                      onClick={() =>
                        deleteCustomer(customer._id)
                      }

                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"

                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="4"
                className="text-center py-12 text-gray-500"
              >

                No Customers Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>

)}

{selectedCustomer && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white w-[650px] rounded-3xl shadow-2xl p-8">

<div className="flex justify-between items-center mb-8">

<h2 className="text-3xl font-bold">

Customer Details

</h2>

<button

onClick={()=>setSelectedCustomer(null)}

className="text-2xl font-bold hover:text-red-600"

>

×

</button>

</div>

<div className="grid grid-cols-2 gap-6">

<div>

<label className="font-semibold">

Name

</label>

<input

disabled

value={selectedCustomer.name}

className="w-full mt-2 border rounded-xl p-3 bg-slate-100"

/>

</div>

<div>

<label className="font-semibold">

Email

</label>

<input

disabled

value={selectedCustomer.email}

className="w-full mt-2 border rounded-xl p-3 bg-slate-100"

/>

</div>

<div>

<label className="font-semibold">

Mobile

</label>

<input

disabled

value={selectedCustomer.mobile || "-"}

className="w-full mt-2 border rounded-xl p-3 bg-slate-100"

/>

</div>

<div>

<label className="font-semibold">

Registered On

</label>

<input

disabled

value={new Date(
selectedCustomer.createdAt
).toLocaleDateString()}

className="w-full mt-2 border rounded-xl p-3 bg-slate-100"

/>

</div>

<div className="col-span-2">

<label className="font-semibold">

User ID

</label>

<input

disabled

value={selectedCustomer._id}

className="w-full mt-2 border rounded-xl p-3 bg-slate-100"

/>

</div>

</div>

<div className="flex justify-end mt-8">

<button

onClick={()=>setSelectedCustomer(null)}

className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

>

Close

</button>

</div>

</div>

</div>

)}

  </AdminLayout>
);

}

export default Customers;