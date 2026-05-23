import OwnerSubmissionForm from "@/components/ui/owner/OwnerSubmissionForm";

export default async function OwnerVehicleFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <OwnerSubmissionForm vehicleId={id} />
    </div>
  );
}
