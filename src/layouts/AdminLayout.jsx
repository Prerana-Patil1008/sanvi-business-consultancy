import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* Sidebar */}

      <AdminSidebar />

      {/* Right Section */}

      <div className="flex flex-col flex-1">

        {/* Top Navigation */}

        <AdminTopbar />

        {/* Main Content */}

        <main className="flex-1 overflow-y-auto p-8">

          {children}

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;