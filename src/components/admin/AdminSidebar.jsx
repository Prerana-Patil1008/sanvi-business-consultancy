import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  Mail,
  Star,
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

function AdminSidebar() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] =
    useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      title: "Applications",
      icon: FileText,
      path: "/admin/applications",
    },

    {
      title: "Payments",
      icon: CreditCard,
      path: "/admin/payments",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/admin/customers",
    },
    {
      title: "Services",
      icon: Briefcase,
      path: "/admin/services",
    },
    {
      title: "Messages",
      icon: Mail,
      path: "/admin/messages",
    },
    {
      title: "Testimonials",
      icon: Star,
      path: "/admin/testimonials",
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },

    {
      title: "Payment Settings",
      icon: CreditCard,
      path: "/admin/payment-settings",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

    navigate("/admin/login");
  };

  return (
    <aside
      className={`bg-slate-900 text-white h-screen sticky top-0 transition-all duration-300 flex flex-col ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Logo */}

      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800">

        {!collapsed && (
          <div>

            <h1 className="text-2xl font-bold text-amber-400">
              SANVI
            </h1>

            <p className="text-sm text-gray-400">
              Business Consultancy
            </p>

          </div>
        )}

        <button
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
          className="hover:bg-slate-800 p-2 rounded-lg"
        >
          {collapsed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )}
        </button>

      </div>

      {/* Menu */}

      <nav className="flex-1 mt-6 px-3">

        {menuItems.map((item) => {
          const Icon =
            item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-slate-800 text-gray-300"
                }`
              }
            >
              <Icon size={22} />

              {!collapsed && (
                <span className="font-medium">
                  {item.title}
                </span>
              )}
            </NavLink>
          );
        })}

      </nav>

      {/* Bottom */}

      <div className="border-t border-slate-800 p-4">

        {!collapsed && (
          <div className="mb-4">

            <p className="text-sm text-gray-400">
              Logged in as
            </p>

            <p className="font-semibold">
              Administrator
            </p>

          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition"
        >
          <LogOut size={20} />

          {!collapsed && "Logout"}
        </button>

      </div>
    </aside>
  );
}

export default AdminSidebar;