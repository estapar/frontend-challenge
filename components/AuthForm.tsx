"use client";
import { AppButton } from "@/components/app-button";
import { AppInput } from "@/components/app-Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { LoginSchema, loginSchema } from "@/schemas/forms/auth/loginSchema";
import { authService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FiUser, FiLock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const AuthForm = () => {
  const { checkAuth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setLoading(true);
      const res = await authService.login(data.username, data.password);
      if (res) {
        await checkAuth();
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Erro no login:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen">
      <Image
        width={140}
        height={140}
        src="/login-estapar.png"
        alt="Logo Fixa"
      />

      <div className="flex justify-center items-center ">
        <div className="w-[28rem] p-8 bg-white rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <h4 className="text-[#1E293B] font-semibold">
                Entre com suas credenciais para acessar o sistema
              </h4>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AppInput
                        label="Usuário"
                        placeholder="Digite seu usuário"
                        icon={<FiUser size={18} />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AppInput
                        label="Senha"
                        placeholder="Digite sua senha"
                        icon={<FiLock size={18} />}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AppButton
                type="submit"
                variant="default"
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {loading ? "Entrando..." : "Entrar"}
              </AppButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
