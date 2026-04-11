"use client";
import { cn } from "@/lib/utils";
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
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "@/utils/actions/userAuth.actions";
import validateEmail from "@/utils/validations/validateEmail";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    // validate email

    // pass email to server action
    try {
      const emailValidation = validateEmail(email);
      if (!emailValidation.success) {
        toast.error("Please enter a valid address");
        return { error: emailValidation.error };
      }
      const formData = new FormData();
      formData.append("email", email);

      const loginUser = await login(formData);
      if (loginUser?.error) {
        toast.error("Something went wrong with signing in.");
        return;
      }

      toast.success("Check your email for the login link!");

      // redirect or reroute
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" onClick={handleLogin}>
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
