"use server";
import { signOut } from "@/auth";
// log out actions
export const Logout = async () => {
  await signOut({
    redirect: true,
    redirectTo: "/",
  });
};
