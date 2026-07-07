import {
  FileText,
  Users,
  Mail,
  Star,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import StatCard from "./StatCard";

function DashboardStats({ stats }) {
  if (!stats) return null;

  const cards = [
    {
      title: "Applications",
      value: stats.totalApplications,
      subtitle: "Total Applications",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      subtitle: "Registered Customers",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      subtitle: "Contact Messages",
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      subtitle: "Customer Reviews",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "Pending",
      value: stats.pending,
      subtitle: "Applications Pending",
      icon: Clock3,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Approved",
      value: stats.approved,
      subtitle: "Applications Approved",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-6">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          {...card}
        />
      ))}
    </div>
  );
}

export default DashboardStats;