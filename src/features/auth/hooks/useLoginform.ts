"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { authenticate, AuthError } from "@/src/services/auth.services";

import { loginSchema, LoginSchema } from "../schema";
import { hasValidSession, saveSession } from "../utils/session";

export function useLoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    useEffect(() => {
        if (hasValidSession()) {
            router.replace("/dashboard");
        }
    }, [router]);

    async function onSubmit(data: LoginSchema) {
        try {
            const authData = await authenticate(data);

            saveSession(authData);

            router.push("/dashboard");
        } catch (error) {
            setError("root", {
                message:
                    error instanceof AuthError
                        ? error.message
                        : "Não foi possível autenticar. Tente novamente.",
            });
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    };
}
