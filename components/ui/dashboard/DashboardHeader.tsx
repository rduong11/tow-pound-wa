import LogoutButton from "./LogoutButton";

export default function DashboardHeader() {
  return (
    <header className="flex items-centers justify-between mb-8 ">
      <h1 className="text-2xl font-semibold">Clerk Dashboard</h1>
      <LogoutButton />
    </header>
  );
}
