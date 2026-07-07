import {
  Bell,
  Search,
  UserCircle2,
  LayoutDashboard,
} from "lucide-react";

import { useLocation } from "react-router-dom";

function AdminTopbar() {
  const location = useLocation();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/applications": "Applications",
    "/admin/customers": "Customers",
    "/admin/services": "Services",
    "/admin/messages": "Messages",
    "/admin/testimonials": "Testimonials",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
  };

  const currentPage =
    pageTitles[location.pathname] || "Admin Panel";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, Administrator 👋
        </h1>

        <div className="flex items-center gap-3 mt-1">

          <p className="text-sm text-gray-500">
            {today}
          </p>

          <span className="text-gray-300">|</span>

          <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">

            <LayoutDashboard size={15} />

            {currentPage}

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

      

        {/* Profile */}

        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">

          <UserCircle2
            size={42}
            className="text-slate-700"
          />

          <div>

            <h3 className="font-semibold text-slate-800">

              Surekha Sagar Kurundwade
            </h3>

            <p className="text-xs text-gray-500">

              System Administrator

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminTopbar;