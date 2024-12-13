import { z } from "zod";

const baseValidateUser = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be less than 30 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email format is invalid",
    })
    .max(100, { message: "Email should be under 100 characters" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be less than 20 characters" }),

  confirmPassword: z
    .string()
    .min(6, {
      message: "Confirm password must be at least 6 characters long",
    })
    .max(20, { message: "Confirm password must be less than 20 characters" }),
});

const signupSchema = baseValidateUser.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "The passwords must match.",
    path: ["confirmPassword"],
  }
);
const loginSchema = baseValidateUser.pick({
  name: true,
  password: true,
});

export { signupSchema, loginSchema };
