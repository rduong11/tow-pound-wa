"use client";

import { useRouter } from "next/navigation";
import { Button } from "../shadcn/button";

export default function RefreshButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-4"
      onClick={() => router.refresh()}
    >
      Check Status
    </Button>
  );
}
