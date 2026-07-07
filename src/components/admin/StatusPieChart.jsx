import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#F59E0B", // Pending
  "#3B82F6", // Processing
  "#22C55E", // Approved
  "#10B981", // Completed
  "#EF4444", // Rejected
];

function StatusPieChart({ data }) {
  if (!data) return null;

  const filteredData = data.filter(
    (item) => item.value > 0
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Application Status
        </h2>

        <p className="text-gray-500">
          Current application distribution
        </p>
      </div>

      {filteredData.length === 0 ? (
        <div className="flex items-center justify-center h-[320px] text-gray-500">
          No application data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              label
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default StatusPieChart;