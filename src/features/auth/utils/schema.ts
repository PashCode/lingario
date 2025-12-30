import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().min(1, "Email обов'язковий").email("Невірний формат email"),
  password: z
    .string()
    .min(6, "Пароль має бути мінімум 6 символів")
    .max(32, "Пароль занадто довгий"),
  name: z.string().min(2, "Ім'я має бути мінімум 2 символи"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
