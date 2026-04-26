import { Button } from "@/components/ui/shadcn/button";
import { CirclePlus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      Dashboard page
      <Button className="fixed bottom-6 right-6 text-lg px-6 py-6 shadow-lg hover:bg-chart-2 hover:text-primary-foreground transition-colors duration-200">
        <CirclePlus /> New Entry
      </Button>
    </div>
  );
}
