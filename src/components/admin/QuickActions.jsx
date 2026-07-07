import {
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Applications",
      description: "Manage customer applications",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
      path: "/admin/applications",
    },
    {
      title: "Messages",
      description: "View customer enquiries",
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
      path: "/admin/messages",
    },
    {
      title: "Reports",
      description: "View business reports",
      icon: BarChart3,
      color: "bg-purple-100 text-purple-600",
      path: "/admin/reports",
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: Settings,
      color: "bg-orange-100 text-orange-600",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800">
        Quick Actions
      </h2>

      <p className="text-gray-500 mt-1 mb-6">
        Frequently used admin shortcuts
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color} mx-auto`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {action.description}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}

export default QuickActions;