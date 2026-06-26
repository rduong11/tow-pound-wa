import { createClient } from "@/utils/supabase/server";
import { VehicleStatus, statusMetaData } from "@/utils/schemas/vehicle.schema";

async function fetchVehicleStats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("status")
    .is("archivedAt", null);

  if (error) {
    console.log("Error fetching stats", error);
    return null;
  }

  return data;
}

const STAT_STATUSES: VehicleStatus[] = ["pending", "in_progress", "ready"];

export default async function StatsBar() {
  const data = await fetchVehicleStats();

  if (!data) return null;

  const total = data.length;

  const counts = STAT_STATUSES.reduce((acc, status) => {
    acc[status] = data.filter((v) => v.status === status).length;
    return acc;
  }, {} as Record<VehicleStatus, number>);

  const stats = [
    {
      label: "Total Active",
      count: total,
      color: "border-[#194A8D]",
      textColor: "text-[#194A8D]",
    },
    {
      label: statusMetaData["pending"].label,
      count: counts["pending"],
      color: `border-${statusMetaData["pending"].color.replace("bg-", "")}`,
      textColor: `text-${statusMetaData["pending"].color.replace("bg-", "")}`,
    },
    {
      label: statusMetaData["in_progress"].label,
      count: counts["in_progress"],
      color: `border-${statusMetaData["in_progress"].color.replace("bg-", "")}`,
      textColor: `text-${statusMetaData["in_progress"].color.replace(
        "bg-",
        ""
      )}`,
    },
    {
      label: statusMetaData["ready"].label,
      count: counts["ready"],
      color: `border-${statusMetaData["ready"].color.replace("bg-", "")}`,
      textColor: `text-${statusMetaData["ready"].color.replace("bg-", "")}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-white rounded-xl border-l-4 ${stat.color} p-4 shadow-sm`}
        >
          <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.count}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
