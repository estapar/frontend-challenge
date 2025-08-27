import z from "zod";


export const loginSchema = z.object({
    username: z.string().min(3, "Username deve ter no mínimo 3 caracteres"),
    password: z
      .string()
      .min(3, "Senha deve ter no mínimo 6 caracteres")
      .max(20, "Senha não pode exceder 20 caracteres"),
  });

export type LoginSchema = z.infer<typeof loginSchema>;