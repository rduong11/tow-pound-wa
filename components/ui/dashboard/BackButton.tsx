"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
      <ArrowLeft /> Back
    </Button>
  );
}
