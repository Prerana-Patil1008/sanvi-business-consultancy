import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 h-full">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Monthly Applications
        </h2>

        <p className="text-gray-500 mt-1">
          Applications received month-wise
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="applications"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyChart;