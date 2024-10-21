import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password is Required to login"),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "name is Required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimus Password is Required to Register is 6"),
  // confirmPassword: z.string().min(4, "Confirm Password is Required to Register")
});
