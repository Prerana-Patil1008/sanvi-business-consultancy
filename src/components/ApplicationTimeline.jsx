import {
  CheckCircle,
  Clock,
  Circle,
} from "lucide-react";

function ApplicationTimeline({
  status,
  paymentStatus,
}) {
  const steps = [
    "Application Submitted",
    "Quote Sent",
    "Payment Completed",
    "Processing",
    "Completed",
  ];

  const getStepStatus = (step) => {

    switch (step) {

      case "Application Submitted":
        return "completed";

      case "Quote Sent":
        return (
          status === "Quote Sent" ||
          status === "Under Review" ||
          status === "Approved" ||
          status === "Completed"
        )
          ? "completed"
          : "pending";

      case "Payment Completed":

        if (paymentStatus === "Paid")
          return "completed";

        if (
          paymentStatus ===
          "Verification Pending"
        )
          return "current";

        return "pending";

      case "Processing":

        if (status === "Under Review")
          return "current";

        if (
          status === "Approved" ||
          status === "Completed"
        )
          return "completed";

        return "pending";

      case "Completed":

        return status === "Completed"
          ? "completed"
          : "pending";

      default:
        return "pending";
    }
  };

  return (
    <div className="mt-8">

      <h3 className="text-lg font-semibold mb-5">
        Application Progress
      </h3>

      <div className="space-y-5">

        {steps.map((step) => {

          const state =
            getStepStatus(step);

          return (
            <div
              key={step}
              className="flex items-center gap-4"
            >
              {state === "completed" ? (
                <CheckCircle
                  size={24}
                  className="text-green-600"
                />
              ) : state === "current" ? (
                <Clock
                  size={24}
                  className="text-orange-500"
                />
              ) : (
                <Circle
                  size={22}
                  className="text-gray-300"
                />
              )}

              <span
                className={`font-medium ${
                  state === "completed"
                    ? "text-green-700"
                    : state === "current"
                    ? "text-orange-600"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ApplicationTimeline;