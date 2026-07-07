import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";

import {
  Search,
  RefreshCcw,
  Plus,
  Edit,
  Trash2,
  Briefcase,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function Services() {

  const [services, setServices] = useState([]);

  const [filteredServices, setFilteredServices] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  

  const [selectedService, setSelectedService] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    icon: "🌐",
    status: "Active",
  });

  // Load Services
useEffect(() => {
  loadServices();
}, []);

// Search
useEffect(() => {

  const value = search.toLowerCase();

  const filtered = services.filter((service) =>

    service.title.toLowerCase().includes(value) ||

    service.category.toLowerCase().includes(value)

  );

  setFilteredServices(filtered);

}, [search, services]);

// Fetch Services
const loadServices = async () => {

  try {

    setLoading(true);

    const res = await axios.get(
      "https://sanvi-business-consultancy.onrender.com/api/services"
    );

    setServices(res.data);

  } catch (err) {

    console.log(err);

    alert("Unable to load services.");

  } finally {

    setLoading(false);

  }

};

// Delete Service
const deleteService = async (id) => {

  if (!window.confirm("Delete this service?"))
    return;

  try {

    await axios.delete(
      `https://sanvi-business-consultancy.onrender.com/api/services/${id}`
    );

    loadServices();

  } catch (err) {

    console.log(err);

    alert("Delete Failed");

  }

};

// Save Service
const saveService = async () => {
  try {

    if (selectedService) {

      await axios.put(
        `https://sanvi-business-consultancy.onrender.com/api/services/${selectedService._id}`,
        formData
      );

      alert("Service Updated Successfully");

    } else {

      await axios.post(
        "https://sanvi-business-consultancy.onrender.com/api/services",
        formData
      );

      alert("Service Added Successfully");

    }

    setShowModal(false);

    setSelectedService(null);

    setFormData({
      title: "",
      category: "",
      description: "",
      price: "",
      icon: "🌐",
      status: "Active",
    });

    loadServices();

  } catch (err) {

    console.log(err);

    alert("Unable to save service.");

  }
};

// Form Change
const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};

// Dashboard Counts
const totalServices =
  filteredServices.length;

const activeServices =
  filteredServices.filter(
    (service) => service.status === "Active"
  ).length;

const inactiveServices =
  filteredServices.filter(
    (service) => service.status === "Inactive"
  ).length;

  return (

  <AdminLayout>

    {/* Header */}

    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Services
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all business services
        </p>

      </div>

      <div className="flex gap-3">

        <button
          onClick={loadServices}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>

        <button
          onClick={() => {

  setSelectedService(null);

  setFormData({
    title: "",
    category: "",
    description: "",
    price: "Contact Us",
    icon: "🌐",
    status: "Active",
  });

  setShowModal(true);

}}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Service
        </button>

      </div>

    </div>

    {/* Dashboard Cards */}

    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <DashboardCard
        title="Total Services"
        value={totalServices}
        icon={Briefcase}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />

      <DashboardCard
        title="Active"
        value={activeServices}
        icon={CheckCircle2}
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />

      <DashboardCard
        title="Inactive"
        value={inactiveServices}
        icon={XCircle}
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
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>

    {loading ? (

  <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

    <h2 className="text-2xl font-bold">
      Loading Services...
    </h2>

  </div>

) : (

  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">Service</th>

            <th className="text-left p-4">Category</th>

            <th className="text-left p-4">Price</th>

            <th className="text-left p-4">Status</th>

            <th className="text-left p-4">Created</th>

            <th className="text-center p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredServices.length > 0 ? (

            filteredServices.map((service) => (

              <tr
                key={service._id}
                className="border-b hover:bg-slate-50 transition"
              >

                {/* Service */}

                <td className="p-4">

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-500 truncate max-w-sm">
                      {service.description}
                    </p>

                  </div>

                </td>

                {/* Category */}

                <td className="p-4">
                  {service.category}
                </td>

                {/* Price */}

                <td className="p-4">
                  {service.price}
                </td>

                {/* Status */}

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      service.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.status}
                  </span>

                </td>

                {/* Created */}

                <td className="p-4">

                  {new Date(
                    service.createdAt
                  ).toLocaleDateString("en-IN")}

                </td>

                {/* Actions */}

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => {
                        setSelectedService(service);

                        setFormData({
                          title: service.title,
                          category: service.category,
                          description: service.description,
                          price: service.price,
                          icon: service.icon,
                          status: service.status,
                        });

                        setShowModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() =>
                        deleteService(service._id)
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
                colSpan="6"
                className="text-center py-12 text-gray-500"
              >

                No Services Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>

)}

{/* Add / Edit Service Modal */}

{showModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

  <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8">

    <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold">

        {selectedService
          ? "Edit Service"
          : "Add New Service"}

      </h2>

      <button
        onClick={() => {
          setShowModal(false);
          setSelectedService(null);
        }}
        className="text-3xl font-bold"
      >
        ×
      </button>

    </div>

    <div className="space-y-5">

      <input
        type="text"
        name="title"
        placeholder="Service Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-xl p-4"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded-xl p-4"
      >

        <option value="">
          Select Category
        </option>

        <option value="Pan India">
          Pan India
        </option>

        <option value="Karnataka">
          Karnataka
        </option>

      </select>

      <textarea
        rows="4"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-xl p-4"
      />

      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border rounded-xl p-4"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-xl p-4"
      >

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>

      </select>

    </div>

    <div className="flex justify-end gap-4 mt-8">

      <button
        onClick={() => {
          setShowModal(false);
          setSelectedService(null);
        }}
        className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
      >
        Cancel
      </button>

      <button
        onClick={saveService}
        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
      >
        {selectedService
          ? "Update Service"
          : "Add Service"}
      </button>

    </div>

  </div>

</div>

)}

  </AdminLayout>

);

}

export default Services;