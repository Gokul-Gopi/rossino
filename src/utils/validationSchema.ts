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

export const addTaskSchema = z.object({
  title: z
    .string({ error: "" })
    .min(1, { error: "" })
    .max(100, "Name must be at most 100 characters"),
});

export type AddTaskData = z.infer<typeof addTaskSchema>;

export const settingsSchema = z.object({
  autoStartBreak: z.boolean(),
  autoStartPomo: z.boolean(),
  pomoDuration: z
    .number()
    .min(5, "Pomodoro duration must be at least 5 minutes")
    .max(180, "Pomodoro duration must be at most 180 minutes"),
  shortBreakDuration: z
    .number()
    .min(1, "Short break duration must be at least 1 minute")
    .max(60, "Short break duration must be at most 60 minutes"),
  longBreakDuration: z
    .number()
    .min(5, "Long break duration must be at least 5 minutes")
    .max(120, "Long break duration must be at most 120 minutes"),
  longBreakInterval: z
    .number()
    .min(1, "Long break interval must be at least 1")
    .max(10, "Long break interval must be at most 10"),
  notificationsEnabled: z.boolean(),
  nextSessionReminder: z
    .number()
    .min(0, "Next session reminder must be at least 0 minutes")
    .max(60, "Next session reminder must be at most 60 minutes"),
  timeLeftReminder: z
    .number()
    .min(0, "Time left reminder must be at least 0 minutes")
    .max(60, "Time left reminder must be at most 60 minutes"),
});

export type SettingsData = z.infer<typeof settingsSchema>;
