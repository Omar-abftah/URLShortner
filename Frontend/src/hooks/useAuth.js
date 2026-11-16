import { useMemo } from "react";
import { useAuth as useClerkAuth, useClerk, useUser } from "@clerk/react";

export function useAuth() {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();

  const user = useMemo(() => {
    if (!isSignedIn || !clerkUser) return null;
    return {
      id: clerkUser.id,
      name:
        clerkUser.fullName ||
        clerkUser.username ||
        clerkUser.primaryEmailAddress?.emailAddress ||
        "there",
    };
  }, [isSignedIn, clerkUser]);

  return { user, isLoaded, getToken, logout: () => signOut() };
}
