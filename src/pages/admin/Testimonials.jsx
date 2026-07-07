import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";

import {
  Search,
  RefreshCcw,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";

function Testimonials() {

  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {

    const value = search.toLowerCase();

    setFilteredTestimonials(

      testimonials.filter((item) =>
        item.customerName.toLowerCase().includes(value) ||
        item.service.toLowerCase().includes(value)
      )

    );

  }, [search, testimonials]);

  const loadTestimonials = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/testimonials/all"
      );

      setTestimonials(res.data);

    } catch (error) {

      console.log(error);

      alert("Unable to load testimonials.");

    } finally {

      setLoading(false);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `https://sanvi-business-consultancy.onrender.com/api/testimonials/${id}`,
        { status }
      );

      loadTestimonials();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteTestimonial = async (id) => {

    if (!window.confirm("Delete testimonial?"))
      return;

    try {

      await axios.delete(
        `https://sanvi-business-consultancy.onrender.com/api/testimonials/${id}`
      );

      loadTestimonials();

    } catch (error) {

      console.log(error);

    }

  };

  const totalTestimonials =
    filteredTestimonials.length;

  const pendingTestimonials =
    filteredTestimonials.filter(
      (t) => t.status === "Pending"
    ).length;

  const approvedTestimonials =
    filteredTestimonials.filter(
      (t) => t.status === "Approved"
    ).length;

  const rejectedTestimonials =
    filteredTestimonials.filter(
      (t) => t.status === "Rejected"
    ).length;

  return (
    <AdminLayout>

  {/* Header */}

  <div className="flex justify-between items-center mb-8">

    <div>

      <h1 className="text-4xl font-bold text-slate-800">
        Testimonials
      </h1>

      <p className="text-gray-500 mt-2">
        Manage customer testimonials
      </p>

    </div>

    <button
      onClick={loadTestimonials}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
    >
      <RefreshCcw size={18} />
      Refresh
    </button>

  </div>

  {/* Dashboard Cards */}

  <div className="grid md:grid-cols-4 gap-6 mb-8">

    <DashboardCard
      title="Total"
      value={totalTestimonials}
      icon={Star}
      iconBg="bg-blue-100"
      iconColor="text-blue-600"
    />

    <DashboardCard
      title="Pending"
      value={pendingTestimonials}
      icon={Star}
      iconBg="bg-yellow-100"
      iconColor="text-yellow-600"
    />

    <DashboardCard
      title="Approved"
      value={approvedTestimonials}
      icon={CheckCircle2}
      iconBg="bg-green-100"
      iconColor="text-green-600"
    />

    <DashboardCard
      title="Rejected"
      value={rejectedTestimonials}
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
        placeholder="Search testimonials..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

  </div>

  {/* Table */}

  {loading ? (

    <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

      <h2 className="text-2xl font-bold">
        Loading Testimonials...
      </h2>

    </div>

  ) : (

    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left p-4">
                Service
              </th>

              <th className="text-left p-4">
                Rating
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
            {filteredTestimonials.length > 0 ? (

  filteredTestimonials.map((testimonial) => (

    <tr
      key={testimonial._id}
      className="border-b hover:bg-slate-50 transition"
    >

      {/* Customer */}

      <td className="p-4">

        <div>

          <h3 className="font-semibold text-slate-800">
            {testimonial.customerName}
          </h3>

        </div>

      </td>

      {/* Service */}

      <td className="p-4">
        {testimonial.service}
      </td>

      {/* Rating */}

      <td className="p-4">

        <div className="flex">

          {Array.from({
            length: testimonial.rating,
          }).map((_, index) => (
            <Star
              key={index}
              size={18}
              className="text-yellow-500 fill-yellow-500"
            />
          ))}

        </div>

      </td>

      {/* Status */}

      <td className="p-4">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            testimonial.status === "Approved"
              ? "bg-green-100 text-green-700"
              : testimonial.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {testimonial.status}
        </span>

      </td>

      {/* Date */}

      <td className="p-4">

        {new Date(
          testimonial.createdAt
        ).toLocaleDateString("en-IN")}

      </td>

      {/* Actions */}

      <td className="p-4">

        <div className="flex justify-center gap-2">

          {/* View */}

          <button
  onClick={() =>
    navigate(`/admin/testimonials/${testimonial._id}`)
  }
  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
>
  <Eye size={18} />
</button>

          {/* Approve */}

          {testimonial.status !== "Approved" && (

            <button
              onClick={() =>
                updateStatus(
                  testimonial._id,
                  "Approved"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-lg text-sm"
            >
              Approve
            </button>

          )}

          {/* Reject */}

          {testimonial.status !== "Rejected" && (

            <button
              onClick={() =>
                updateStatus(
                  testimonial._id,
                  "Rejected"
                )
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 rounded-lg text-sm"
            >
              Reject
            </button>

          )}

          {/* Delete */}

          <button
            onClick={() =>
              deleteTestimonial(
                testimonial._id
              )
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
      No Testimonials Found
    </td>

  </tr>

)}

          </tbody>

        </table>

      </div>

    </div>

  )}

</AdminLayout>

);

}

export default Testimonials;