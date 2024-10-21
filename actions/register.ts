"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bycrpt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bycrpt.hash(password, 10);
  // Check if an existing user exists
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        error: "User already exists",
      };
    }
    // Create a new user
    await db.user.create({
      data: { name, email, password: hashedPassword },
    });
    return {
      success: "User Created",
    };

    // Proceed with user creation
  } catch (error) {
    console.error("Error checking for existing user: ", error);
    return {
      error: "An unexpected error occurred",
    };
  }
};
