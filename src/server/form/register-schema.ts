import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must be at least 4 characters long" }).max(255, { message: "Name must be less than 255 characters" }),
    email: z.string().email().min(1, { message: "Email is required" }).max(255, { message: "Email must be less than 255 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }).max(255, { message: "Password must be less than 255 characters" }),
    confirmPassword: z.string().min(6).max(255, { message: "Password must be less than 255 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });
