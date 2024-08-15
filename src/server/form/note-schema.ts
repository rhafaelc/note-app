import { z } from "zod";

export const noteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});
