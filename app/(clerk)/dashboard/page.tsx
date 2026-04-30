"use client";
import ButtonDialog from "@/components/ui/dashboard/ButtonDialog";
import { useState } from "react";

export default function DashboardPage() {
  const [plateNumber, setPlateNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [color, setColor] = useState("");

  const handleChange = (field: string, value: string | number) => {
    const setters: Record<string, (val: string | number) => void> = {
      plateNumber: (val) => setPlateNumber(val as string),
      make: (val) => setMake(val as string),
      model: (val) => setModel(val as string),
      year: (val) => setYear(val as number),
      color: (val) => setColor(val as string),
    };
    setters[field]?.(value);
  };

  return (
    <div className="relative min-h-screen">
      Dashboard page
      <ButtonDialog
        plateNumber={plateNumber}
        make={make}
        model={model}
        year={year}
        color={color}
        onChange={handleChange}
      />
    </div>
  );
}
