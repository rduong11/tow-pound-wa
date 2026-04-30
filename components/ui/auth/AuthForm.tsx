"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { useAppContext } from "@/context/AppContext";
import { login, verifyToken } from "@/utils/actions/auth";
import { loginSchema } from "@/utils/schemas/auth.schema";
import OTPTokenForm from "@/components/ui/auth/OTPTokenForm";
import LoginForm from "./LoginForm";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpScreen, setOtpScreen] = useState(false);
  // const { setSession } = useAppContext();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = loginSchema.safeParse({ email });
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      const loginUser = await login({ email });

      if (loginUser?.error) {
        toast.error("Something went wrong with signing in.");
        return;
      }

      setOtpScreen(true);
      toast.success("Check your email for the login link!");
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async () => {
    try {
      setLoading(true);
      const otpVerification = await verifyToken({ email, token });

      if (otpVerification?.error) {
        toast.error(otpVerification.error);
        return;
      }
      if (otpVerification?.session) {
        toast.success("You are now logged in!");
        // setSession(otpVerification.session);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    } finally {
      setLoading(false);
    }
  };

  return otpScreen ? (
    <OTPTokenForm
      token={token}
      loading={loading}
      onTokenChange={setToken}
      onSubmit={handleVerifyToken}
    />
  ) : (
    <LoginForm
      email={email}
      loading={loading}
      onEmailChange={setEmail}
      onSubmit={handleLogin}
    />
  );
}
