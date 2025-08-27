import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (username:string, password:string) => {
    setLoading(true);
    setError("");
    try {
      const result = await authService.login(username, password);
      console.log("Login response:", result);
      console.log("Token de login recebido");
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido"
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = () => {
    const token = authService.getToken();
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return { login, loading, error, checkAuth };
};
