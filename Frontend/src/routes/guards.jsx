import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }) {
  const { user, isLoaded } = useAuth();
  const location = useLocation();
  if (!isLoaded) return null;
  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

// Keeps signed-in users away from login/signup.
export function GuestRoute({ children }) {
  const { user, isLoaded } = useAuth();
  if (!isLoaded) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
}
