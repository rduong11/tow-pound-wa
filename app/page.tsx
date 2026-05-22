import { Button } from "@/components/ui/shadcn/button";
import { Field } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";

export default function Home() {
  return (
    <div>
      Landing Page
      <Field orientation="horizontal">
        <Input type="vehicle-search" placeholder="AB12345" />
        <Button>Search</Button>
      </Field>
    </div>
  );
}
