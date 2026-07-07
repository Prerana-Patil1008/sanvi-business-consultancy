import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardCharts({
  pending,
  processing,
  approved,
  rejected,
}) {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Processing",
      value: processing,
    },
    {
      name: "Approved",
      value: approved,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  const colors = [
    "#facc15",
    "#3b82f6",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        Applications Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    colors[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardCharts;