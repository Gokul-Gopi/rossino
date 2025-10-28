import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.email("Invalid email"),
    name: z
      .string("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    password: z
      .string("Password is required")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      }),
    confirmPassword: z.string("Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string("Password is required"),
});

export type LoginData = z.infer<typeof loginSchema>;
