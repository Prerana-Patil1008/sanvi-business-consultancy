import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

import {
  Search,
  RefreshCcw,
  Eye,
  Trash2,
  FileText,
  Clock3,
  Loader,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function Applications() {

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [serviceFilter, setServiceFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

const [quotedAmount, setQuotedAmount] = useState("");

const [sendingQuote, setSendingQuote] = useState(false);

  // Load applications
useEffect(() => {
  loadApplications();
}, []);

// Search + Filters
useEffect(() => {
  const value = search.toLowerCase();

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(value) ||
      app.email.toLowerCase().includes(value) ||
      app.phone.includes(value) ||
      app.service.toLowerCase().includes(value);

    const matchesStatus =
      statusFilter === "All" ||
      app.status === statusFilter;

    const matchesService =
      serviceFilter === "All" ||
      app.service === serviceFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesService
    );
  });

  setFilteredApplications(filtered);

}, [
  applications,
  search,
  statusFilter,
  serviceFilter,
]);

// Load Applications
const loadApplications = async () => {
  try {

    setLoading(true);

    const res = await axios.get(
      "http://localhost:5000/api/applications"
    );

    setApplications(res.data);

  } catch (err) {

    console.log(err);

    alert("Unable to load applications.");

  } finally {

    setLoading(false);

  }
};

// Delete
const deleteApplication = async (id) => {

  if (
    !window.confirm(
      "Delete this application?"
    )
  )
    return;

  try {

    await axios.delete(
      `http://localhost:5000/api/applications/${id}`
    );

    loadApplications();

  } catch (err) {

    console.log(err);

    alert("Delete failed");

  }

};

const sendQuote = async () => {

  if (!quotedAmount) {
    return alert("Enter quoted amount");
  }

  try {

    setSendingQuote(true);

    await axios.put(
      `http://localhost:5000/api/applications/${selectedApplication._id}/quote`,
      {
        quotedAmount,
      }
    );

    alert("Payment quote sent successfully.");

    loadApplications();

    setSelectedApplication(null);

  } catch (err) {

    console.log(err);

    alert("Unable to send quote.");

  } finally {

    setSendingQuote(false);

  }

};

// Update
const updateApplication = async () => {

  try {

    await axios.put(
      `http://localhost:5000/api/applications/${selectedApplication._id}`,
      {
        status,
        remarks,
      }
    );

    alert("Application Updated");

    setSelectedApplication(null);

    loadApplications();

  } catch (err) {

    console.log(err);

    alert("Update Failed");

  }

};

// Dashboard Counts
const total = filteredApplications.length;

const pending =
  filteredApplications.filter(
    (a) => a.status === "Pending"
  ).length;

const processing =
  filteredApplications.filter(
    (a) => a.status === "Under Review"
  ).length;

const approved =
  filteredApplications.filter(
    (a) => a.status === "Approved"
  ).length;

const rejected =
  filteredApplications.filter(
    (a) => a.status === "Rejected"
  ).length;

// Services Dropdown
const services = [
  "All",
  ...new Set(
    applications.map(
      (app) => app.service
    )
  ),
];

const exportToExcel = () => {

  const exportData = filteredApplications.map((app) => ({
    Name: app.name,
    Email: app.email,
    Phone: app.phone || "-",
    Service: app.service,
    Status: app.status,
    Remarks: app.remarks || "-",
    Applied: new Date(app.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Applications"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Applications_Report.xlsx");
};

  return (
  <AdminLayout>

    {/* Header */}

    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Applications
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all customer applications
        </p>
      </div>

      <div className="flex gap-3">

  <button
    onClick={loadApplications}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
  >
    <RefreshCcw size={18} />
    Refresh
  </button>

  <button
    onClick={exportToExcel}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
  >
    <Download size={18} />
    Export Excel
  </button>

</div>

    </div>

    {/* Dashboard Cards */}

    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">

      <DashboardCard
        title="Total Applications"
        value={total}
        icon={FileText}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />

      <DashboardCard
        title="Pending"
        value={pending}
        icon={Clock3}
        iconBg="bg-yellow-100"
        iconColor="text-yellow-600"
      />

      <DashboardCard
        title="Processing"
        value={processing}
        icon={Loader}
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
      />

      <DashboardCard
        title="Approved"
        value={approved}
        icon={CheckCircle2}
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />

      <DashboardCard
        title="Rejected"
        value={rejected}
        icon={XCircle}
        iconBg="bg-red-100"
        iconColor="text-red-600"
      />

    </div>

    {/* Search & Filters */}

    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

      <div className="flex flex-col lg:flex-row gap-4">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Status */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 min-w-[200px]"
        >

          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>

        </select>

        {/* Service */}

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 min-w-[240px]"
        >

          {services.map((service) => (

            <option
              key={service}
              value={service}
            >
              {service === "All"
                ? "All Services"
                : service}
            </option>

          ))}

        </select>

      </div>

    </div>

    {loading ? (

  <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

    <h2 className="text-2xl font-bold">
      Loading Applications...
    </h2>

  </div>

) : (

  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">Customer</th>

            <th className="text-left p-4">Service</th>

            <th className="text-left p-4">Phone</th>

            <th className="text-left p-4">Status</th>

            <th className="text-left p-4">Applied</th>

            <th className="text-center p-4">Documents</th>

            <th className="text-center p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredApplications.length > 0 ? (

            filteredApplications.map((app) => (

              <tr
                key={app._id}
                className="border-b hover:bg-slate-50 transition"
              >

                {/* Customer */}

                <td className="p-4">

                  <h3 className="font-semibold text-slate-800">
                    {app.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {app.email}
                  </p>

                </td>

                {/* Service */}

                <td className="p-4">
                  {app.service}
                </td>

                {/* Phone */}

                <td className="p-4">
                  {app.mobile || "-"}
                </td>

                {/* Status */}

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium

                    ${
                      app.status === "Approved"
                        ? "bg-green-100 text-green-700"

                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-700"

                        : app.status === "Under Review"
                        ? "bg-blue-100 text-blue-700"

                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {app.status}

                  </span>

                </td>

                {/* Date */}

                <td className="p-4">

                  {new Date(
                    app.createdAt
                  ).toLocaleDateString("en-IN")}

                </td>

                {/* Documents */}

                <td className="p-4 text-center">

                  {app.documents &&
                  app.documents.length > 0 ? (

                    app.documents.map((doc, index) => (

                      <a
                        key={index}
                        href={`http://localhost:5000/uploads/${doc}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-blue-600 hover:underline"
                      >

                        View {index + 1}

                      </a>

                    ))

                  ) : (

                    <span className="text-gray-400">

                      No Documents

                    </span>

                  )}

                </td>


                



                {/* Actions */}

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button

                      onClick={() => {

                        setSelectedApplication(app);

                        setStatus(app.status);

                        setRemarks(app.remarks || "");

                        setQuotedAmount(app.quotedAmount || "");

                      }}

                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"

                    >

                      <Eye size={18} />

                    </button>

                    <button

                      onClick={() =>
                        deleteApplication(app._id)
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
                colSpan="7"
                className="text-center py-12 text-gray-500"
              >

                No Applications Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

      

    </div>

  </div>

)}

{selectedApplication && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

  <div className="bg-white rounded-3xl shadow-2xl w-[700px] p-8">

    <div className="flex justify-between items-center mb-6">

      <h2 className="text-3xl font-bold">
        Application Details
      </h2>

      <button
        onClick={() => setSelectedApplication(null)}
        className="text-2xl font-bold hover:text-red-600"
      >
        ×
      </button>

    </div>

    <div className="grid grid-cols-2 gap-5">

      <div>
        <label className="font-semibold">
          Name
        </label>

        <input
          disabled
          value={selectedApplication.name}
          className="w-full mt-2 border rounded-xl p-3 bg-slate-100"
        />
      </div>

      <div>
        <label className="font-semibold">
          Email
        </label>

        <input
          disabled
          value={selectedApplication.email}
          className="w-full mt-2 border rounded-xl p-3 bg-slate-100"
        />
      </div>

      <div>
        <label className="font-semibold">
          Mobile
        </label>

        <input
          disabled
          value={selectedApplication.mobile|| "-"}
          className="w-full mt-2 border rounded-xl p-3 bg-slate-100"
        />
      </div>

      <div>
        <label className="font-semibold">
          Service
        </label>

        <input
          disabled
          value={selectedApplication.service}
          className="w-full mt-2 border rounded-xl p-3 bg-slate-100"
        />
      </div>

    </div>

    <div className="mt-6">

      <label className="font-semibold">
        Status
      </label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full mt-2 border rounded-xl p-3"
      >
        <option value="Pending">Pending</option>
        <option value="Under Review">Under Review</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
        <option value="Completed">Completed</option>
      </select>

    </div>

    <div className="mt-6">

      <label className="font-semibold">
        Admin Remarks
      </label>

      <textarea
        rows={5}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="w-full mt-2 border rounded-xl p-4"
      />

    </div>

    <hr className="my-8" />

<h3 className="text-xl font-bold mb-4">
  Payment Information
</h3>

<div className="grid grid-cols-2 gap-5">

  <div>

    <label className="font-semibold">
      Quoted Amount (₹)
    </label>

    <input
      type="number"
      value={quotedAmount}
      onChange={(e) =>
        setQuotedAmount(e.target.value)
      }
      disabled={selectedApplication.paymentLocked}
      className="w-full mt-2 border rounded-xl p-3"
    />

  </div>

  <div>

    <label className="font-semibold">
      Payment Status
    </label>

    <input
      disabled
      value={
        selectedApplication.paymentStatus ||
        "Awaiting Quote"
      }
      className="w-full mt-2 border rounded-xl p-3 bg-slate-100"
    />

  </div>

</div>

    <div className="flex justify-end gap-4 mt-8">

      <button

  onClick={sendQuote}

  disabled={sendingQuote || selectedApplication.paymentLocked}

  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"

>

  {sendingQuote
    ? "Sending..."
    : "Send Payment Request"}

</button>

      <button
        onClick={() => setSelectedApplication(null)}
        className="px-6 py-3 rounded-xl bg-gray-200"
      >
        Close
      </button>

      <button
        onClick={updateApplication}
        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
      >
        Save Changes
      </button>

    </div>

  </div>

</div>

)}

</AdminLayout>

);

}



export default Applications;