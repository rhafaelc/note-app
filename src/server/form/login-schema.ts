import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }).max(255, { message: "Email must be less than 255 characters" }),
  password: z.string().min(1, { message: "Password is required" }).max(255, { message: "Password must be less than 255 characters" }),
});
