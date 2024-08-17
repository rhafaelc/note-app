import { z } from "zod";

export const noteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(2500, { message: "Password must be less than 2500 characters" }),
});
