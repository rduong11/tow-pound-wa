"use client";

import { logout } from "@/utils/actions/auth";
import { Button } from "../shadcn/button";

export default function LogoutButton() {
  return (
    <Button variant="destructive" onClick={() => logout()}>
      Log Out
    </Button>
  );
}
