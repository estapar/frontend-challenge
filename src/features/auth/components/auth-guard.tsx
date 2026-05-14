"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { LoadingState } from "@/src/components/feedback/loading-state";

import { clearSession, hasValidSession } from "../utils/session";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    function validateSession() {
      if (!hasValidSession()) {
        clearSession();
        router.replace("/");
        return;
      }

      setIsCheckingSession(false);
    }

    validateSession();

    const intervalId = window.setInterval(validateSession, 1000);

    window.addEventListener("storage", validateSession);
    window.addEventListener("focus", validateSession);
    document.addEventListener("visibilitychange", validateSession);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("storage", validateSession);
      window.removeEventListener("focus", validateSession);
      document.removeEventListener("visibilitychange", validateSession);
    };
  }, [router]);

  if (isCheckingSession) {
    return <LoadingState />;
  }

  return <>{children}</>;
}
