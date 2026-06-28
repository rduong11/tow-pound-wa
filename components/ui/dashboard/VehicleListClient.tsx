"use client";

import { useState } from "react";
import VehicleCard from "./VehicleCard";
import { VehicleStatus } from "@/utils/schemas/vehicle.schema";
import { Input } from "../shadcn/input";
import { Search } from "lucide-react";

type Vehicle = {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  status: VehicleStatus;
  year: number;
  pickupCode: string | null;
  created_at: string;
};

type VehicleListClientProps = {
  vehicles: Vehicle[];
};

export default function VehicleListClient({
  vehicles,
}: VehicleListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = vehicles.filter((v) =>
    v.plateNumber.includes(searchTerm.toUpperCase())
  );

  return (
    <div className="px-6">
      {/* Search input */}
      <div className="flex items-center bg-white border rounded-lg px-4 mb-6 max-w-sm shadow-sm">
        <Search size={16} className="text-muted-foreground shrink-0" />
        <Input
          value={searchTerm}
          placeholder="Search by plate number..."
          className="border-none shadow-none focus-visible:ring-0 text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Results */}
      {filteredVehicles.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No vehicles found matching &quot;{searchTerm}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              id={vehicle.id}
              plateNumber={vehicle.plateNumber}
              make={vehicle.make}
              model={vehicle.model}
              color={vehicle.color}
              status={vehicle.status}
              year={vehicle.year}
              pickupCode={vehicle.pickupCode}
              created_at={vehicle.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}
