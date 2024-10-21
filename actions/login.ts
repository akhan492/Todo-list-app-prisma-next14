"use server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<{ success: string } | { error: string }> => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { email, password } = validatedFields.data;
  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }
  // try {
  //   await signIn("credentials", {
  //     email,
  //     password,
  //     redirectTo: DEFAULT_LOGIN_REDIRECT,
  //   });
  //   return {
  //     success: "Logged In Successfully",
  //   };
  // } catch (error) {
  //   if (error instanceof AuthError) {
  //     switch (error.type) {
  //       case "CredentialsSignin":
  //         return {
  //           error: "Invalid email or password",
  //         };
  //       default:
  //         return {
  //           error: "An error has occurred",
  //         };
  //     }
  //   }
  //   console.error("Unhandled error occurred during login", error);
  //   return {
  //     error: "An unexpected error occurred",
  //   };
  // }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return {
      success: "Logged In Successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
