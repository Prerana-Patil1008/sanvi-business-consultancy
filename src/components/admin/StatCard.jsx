import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  bg,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden"
    >
      <div className="p-6">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-gray-500 font-medium">
              {title}
            </p>

            <h1 className="text-5xl font-bold mt-4 text-slate-800">
              {value}
            </h1>

            <p className="text-sm text-gray-400 mt-3">
              {subtitle}
            </p>

          </div>

          <div
            className={`${bg} w-16 h-16 rounded-2xl flex items-center justify-center`}
          >
            <Icon
              size={30}
              className={color}
            />
          </div>

        </div>

      </div>

      {/* Bottom Accent */}

      <div
        className={`h-2 ${bg}`}
      ></div>

    </motion.div>
  );
}

export default StatCard;