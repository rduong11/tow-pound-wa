import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import { Spinner } from "../shadcn/spinner";

type OTPTokenFormProps = {
  token: string;
  loading: boolean;
  onTokenChange: (value: string) => void;
  onSubmit: () => void;
};

export default function OTPTokenForm({
  token,
  loading,
  onTokenChange,
  onSubmit,
}: OTPTokenFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            Enter the one-time code we sent you. Check your junk/spam too.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="token">One-time code</FieldLabel>
              <Input
                value={token}
                onChange={(e) => onTokenChange(e.target.value)}
                id="token"
                type="text"
                placeholder="Enter your code"
                required
              />
            </Field>
            <Field>
              <Button type="button" onClick={onSubmit} disabled={loading}>
                <Spinner>{loading ? <Spinner /> : "Verify"}</Spinner>
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
