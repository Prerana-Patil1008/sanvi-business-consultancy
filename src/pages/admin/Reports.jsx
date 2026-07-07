import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";

import {
  Users,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  Briefcase,
  Star,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Pie,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Reports() {

  const [report, setReport] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadReport();

  }, []);

  const loadReport = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://sanvi-business-consultancy.onrender.com/api/reports/dashboard"
      );

      setReport(res.data);

    } catch (err) {

      console.log(err);

      alert("Unable to load reports.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="bg-white rounded-2xl shadow-sm p-20 text-center">

          <h2 className="text-3xl font-bold">

            Loading Reports...

          </h2>

        </div>

      </AdminLayout>

    );

  }

  // ===========================
  // Charts
  // ===========================

  const barData = {

    labels: report.monthlyApplications.map(
      (item) => `Month ${item._id.month}`
    ),

    datasets: [

      {

        label: "Applications",

        data: report.monthlyApplications.map(
          (item) => item.total
        ),

        backgroundColor: "#2563eb",

      },

    ],

  };

  const pieData = {

    labels: [

      "Approved",

      "Pending",

      "Rejected",

    ],

    datasets: [

      {

        data: [

          report.approvedApplications,

          report.pendingApplications,

          report.rejectedApplications,

        ],

        backgroundColor: [

          "#16a34a",

          "#f59e0b",

          "#dc2626",

        ],

      },

    ],

  };

  return (

    <AdminLayout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          Reports & Analytics

        </h1>

        <p className="text-gray-500 mt-2">

          Business performance overview

        </p>

      </div>

      {/* Dashboard Cards */}

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

  <DashboardCard
    title="Customers"
    value={report.totalCustomers}
    icon={Users}
    iconBg="bg-blue-100"
    iconColor="text-blue-600"
  />

  <DashboardCard
    title="Applications"
    value={report.totalApplications}
    icon={FileText}
    iconBg="bg-purple-100"
    iconColor="text-purple-600"
  />

  <DashboardCard
    title="Approved"
    value={report.approvedApplications}
    icon={CheckCircle2}
    iconBg="bg-green-100"
    iconColor="text-green-600"
  />

  <DashboardCard
    title="Pending"
    value={report.pendingApplications}
    icon={Clock3}
    iconBg="bg-yellow-100"
    iconColor="text-yellow-600"
  />

  <DashboardCard
    title="Rejected"
    value={report.rejectedApplications}
    icon={XCircle}
    iconBg="bg-red-100"
    iconColor="text-red-600"
  />

  <DashboardCard
    title="Services"
    value={report.totalServices}
    icon={Briefcase}
    iconBg="bg-indigo-100"
    iconColor="text-indigo-600"
  />

  <DashboardCard
    title="Testimonials"
    value={report.totalTestimonials}
    icon={Star}
    iconBg="bg-orange-100"
    iconColor="text-orange-600"
  />

</div>
      
      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* Monthly Applications */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-2xl font-bold mb-6">
            Monthly Applications
          </h2>

          <Bar data={barData} />

        </div>

        {/* Application Status */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-2xl font-bold mb-6">
            Application Status
          </h2>

          <div className="max-w-sm mx-auto">

            <Pie data={pieData} />

          </div>

        </div>

      </div>

      {/* Top Services */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-10">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Top Requested Services
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Service
              </th>

              <th className="text-right p-4">
                Applications
              </th>

            </tr>

          </thead>

          <tbody>

            {report.topServices.length > 0 ? (

              report.topServices.map((service) => (

                <tr
                  key={service._id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4">

                    {service._id}

                  </td>

                  <td className="p-4 text-right font-semibold">

                    {service.total}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="2"
                  className="text-center py-10 text-gray-500"
                >

                  No Data Available

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
            {/* Recent Applications */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Recent Applications
          </h2>

        </div>

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
                  Status
                </th>

                <th className="text-left p-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {report.recentApplications.length > 0 ? (

                report.recentApplications.map((app) => (

                  <tr
                    key={app._id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4">

                      <div>

                        <h3 className="font-semibold">
                          {app.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {app.email}
                        </p>

                      </div>

                    </td>

                    <td className="p-4">
                      {app.service}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>

                    </td>

                    <td className="p-4">

                      {new Date(
                        app.createdAt
                      ).toLocaleDateString("en-IN")}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
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

    </AdminLayout>

  );

}

export default Reports;