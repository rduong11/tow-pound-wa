import CityHeader from "@/components/ui/landing/CityHeader";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CityHeader variant="slim" />
      {children}
    </div>
  );
}
