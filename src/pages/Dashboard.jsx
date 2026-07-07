function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-10 py-32">

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-400">
          Customer Dashboard
        </h1>

        <p className="mt-6 text-xl text-gray-200">
          Professional analytics and customer management.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-4 gap-8 mt-20">

        {/* Total Customers */}
        <div className="bg-slate-900 border border-slate-800 backdrop-blur-md p-10 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">
          
          <h2 className="text-2xl font-bold text-amber-400">
            Total Customers
          </h2>

          <p className="text-6xl font-bold mt-6">
            250
          </p>

        </div>

        {/* Services */}
        <div className="bg-slate-900 border border-slate-800 backdrop-blur-md p-10 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">
          
          <h2 className="text-2xl font-bold text-amber-400">
            Services
          </h2>

          <p className="text-6xl font-bold mt-6">
            15
          </p>

        </div>

        {/* Completed */}
        <div className="bg-slate-900 border border-slate-800 backdrop-blur-md p-10 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">
          
          <h2 className="text-2xl font-bold text-amber-400">
            Completed Work
          </h2>

          <p className="text-6xl font-bold mt-6">
            180
          </p>

        </div>

        {/* Pending */}
        <div className="bg-slate-900 border border-slate-800 backdrop-blur-md p-10 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">
          
          <h2 className="text-2xl font-bold text-amber-400">
            Pending Requests
          </h2>

          <p className="text-6xl font-bold mt-6">
            70
          </p>

        </div>

      </div>

      {/* Customer Table */}
      <div className="mt-24 bg-slate-900 border border-slate-800 backdrop-blur-md rounded-3xl p-10 shadow-2xl">

        <h2 className="text-4xl font-bold text-amber-400 mb-10">
          Recent Customers
        </h2>

        <div className="overflow-x-auto">
          
          <table className="w-full text-left">
            
            <thead>
              <tr className="border-b border-white/20 text-xl">
                <th className="pb-4">Customer</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Year</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-white/10">
                <td className="py-5">Rahul Sharma</td>
                <td>GST Services</td>
                <td className="text-green-300">Completed</td>
                <td>2026</td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="py-5">Priya Patel</td>
                <td>Business Consultancy</td>
                <td className="text-amber-400">Pending</td>
                <td>2026</td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="py-5">Aman Verma</td>
                <td>Legal Documentation</td>
                <td className="text-green-300">Completed</td>
                <td>2026</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;