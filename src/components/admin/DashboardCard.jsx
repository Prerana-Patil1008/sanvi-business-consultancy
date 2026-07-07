import { motion } from "framer-motion";

function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "text-blue-600",
  bg = "bg-blue-100",
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.90,
      }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-gray-500 text-sm font-medium">
              {title}
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-3">
              {value}
            </h2>

            {subtitle && (
              <p className="text-sm text-gray-400 mt-2">
                {subtitle}
              </p>
            )}

          </div>

          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bg}`}
          >
            <Icon
              size={30}
              className={color}
            />
          </div>

        </div>

      </div>

      <div
        className={`h-1 rounded-b-3xl ${bg}`}
      />
    </motion.div>
  );
}

export default DashboardCard;