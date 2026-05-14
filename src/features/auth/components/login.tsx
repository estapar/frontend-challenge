"use client";

import Image from "next/image";
import { Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useLoginForm } from "../hooks/useLoginform";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    } = useLoginForm();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f5f6] px-4 py-10">
            <Image
                width={180}
                height={72}
                src="/logo.png"
                alt="Logo Estapar"
                priority
                className="mb-12 h-auto w-45"
            />

            <Card className="w-full max-w-[465px]">
                <CardHeader>
                    <CardTitle>
                        Entre com suas credenciais para acessar o sistema
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <Input
                            id="username"
                            type="text"
                            label="Usuário"
                            icon={<User />}
                            placeholder="Digite seu usuário"
                            error={errors.username?.message}
                            disabled={isSubmitting}
                            {...register("username")}
                        />

                        <Input
                            id="password"
                            type="password"
                            label="Senha"
                            icon={<Lock />}
                            placeholder="Digite sua senha"
                            error={errors.password?.message}
                            disabled={isSubmitting}
                            {...register("password")}
                        />

                        {errors.root?.message && (
                            <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                                {errors.root.message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            loading={isSubmitting}
                            className="h-11 w-full bg-[#7ad33e] text-sm font-semibold text-white hover:bg-[#66c934]"
                        >
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};
