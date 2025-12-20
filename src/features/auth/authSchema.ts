import { z } from "zod";

// 1. Створюємо схему валідації
export const registerSchema = z.object({
  email: z.string().min(1, "Email обов'язковий").email("Невірний формат email"), // перевірка на @ і домен
  password: z
    .string()
    .min(6, "Пароль має бути мінімум 6 символів")
    .max(32, "Пароль занадто довгий"),
  name: z.string().min(2, "Ім'я має бути мінімум 2 символи"),
});

// 2. Магія Zod: автоматично створюємо TypeScript тип із схеми!
// Тобі більше не треба писати interface IRegisterParams вручну.
export type RegisterSchemaType = z.infer<typeof registerSchema>;
