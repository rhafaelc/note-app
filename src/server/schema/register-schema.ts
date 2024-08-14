import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must be at least 4 characters long" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });
