import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";

// import DashboardHeader from "../../components/admin/DashboardHeader";
import DashboardStats from "../../components/admin/DashboardStats";
import QuickActions from "../../components/admin/QuickActions";
import MonthlyChart from "../../components/admin/MonthlyChart";
import StatusPieChart from "../../components/admin/StatusPieChart";
import PendingApplications from "../../components/admin/PendingApplications";
import LatestMessages from "../../components/admin/LatestMessages";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setDashboard(res.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <h1 className="text-3xl font-bold text-slate-700">
            Loading Dashboard...
          </h1>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      

     

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2">

          <MonthlyChart
            data={dashboard.monthlyApplications}
          />

        </div>

        <div>

          <StatusPieChart
            data={dashboard.statusChart}
          />

        </div>

      </div>

      <div className="mt-8">

  <PendingApplications
    applications={dashboard.pendingApplications}
  />

</div>

<div className="mt-8">

  <LatestMessages
    messages={dashboard.latestMessages}
  />

</div>

<div className="mt-8">

  <QuickActions />

</div>

     
    </AdminLayout>
  );
}

export default Dashboard;