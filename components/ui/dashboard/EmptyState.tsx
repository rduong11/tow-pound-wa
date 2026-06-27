import { Car } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Car size={32} className="text-[#194A8D]" />
      </div>
      <h3 className="text-lg font-semibold text-[#194A8D] mb-1">
        No vehicles on record
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        New entries will appear here once added.
      </p>
    </div>
  );
}
