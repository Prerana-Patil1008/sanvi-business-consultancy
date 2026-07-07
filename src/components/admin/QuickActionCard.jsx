import { motion } from "framer-motion";

function QuickActionCard({
  icon: Icon,
  title,
  color,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-3xl shadow-sm hover:shadow-lg p-6 border border-slate-100 transition"
    >
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
      >
        <Icon
          size={30}
          className="text-white"
        />
      </div>

      <h3 className="font-semibold text-slate-800 mt-5">
        {title}
      </h3>
    </motion.div>
  );
}

export default QuickActionCard;