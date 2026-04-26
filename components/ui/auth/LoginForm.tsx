import { cn } from "@/lib/utils";
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

type LoginFormProps = {
  email: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
};

export default function LoginForm({
  email,
  loading,
  onEmailChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <Button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="hover:bg-chart-2 hover:text-primary-foreground transition-colors duration-200"
              >
                {loading ? <Spinner /> : "Log in"}
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
