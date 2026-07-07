function StatusBadge({ status, type = "application" }) {
  const getClasses = () => {
    if (type === "payment") {
      switch (status) {
        case "Paid":
          return "bg-green-100 text-green-700 border border-green-200";

        case "Pending":
          return "bg-orange-100 text-orange-700 border border-orange-200";

        case "Failed":
          return "bg-red-100 text-red-700 border border-red-200";

        case "Refunded":
          return "bg-purple-100 text-purple-700 border border-purple-200";

        default:
          return "bg-gray-100 text-gray-700 border border-gray-200";
      }
    }

    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border border-green-200";

      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-200";

      case "Quote Sent":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";

      case "Under Review":
        return "bg-blue-100 text-blue-700 border border-blue-200";

      case "Completed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";

      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getClasses()}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;