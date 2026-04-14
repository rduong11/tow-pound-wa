import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

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
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
