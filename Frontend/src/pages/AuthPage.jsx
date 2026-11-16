import { SignIn, SignUp } from "@clerk/react";
import "./AuthPage.css";

export default function AuthPage({ mode }) {
  return (
    <div className="auth-page">
      {mode === "login" ? (
        <SignIn routing="path" path="/login" signUpUrl="/signup" fallbackRedirectUrl="/dashboard" />
      ) : (
        <SignUp routing="path" path="/signup" signInUrl="/login" fallbackRedirectUrl="/dashboard" />
      )}
    </div>
  );
}
