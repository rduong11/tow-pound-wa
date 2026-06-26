import LogoutButton from "./LogoutButton";

export default function DashboardHeader() {
  return (
    <header className="w-full bg-white border-b-2 border-[#ED2127] px-8 py-4 flex items-center justify-between">
      <h1 className="font-big-shoulders text-2xl font-bold text-[#194A8D]">
        Chicago Pound Clerk Dashboard
      </h1>
      <LogoutButton />
    </header>
  );
}
