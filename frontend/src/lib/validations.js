import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().trim().min(1, "required").email("Invalid email address"),
});

