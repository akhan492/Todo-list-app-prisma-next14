"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
type buttonProps = {
  children: ReactNode;
  mode?: "redirect" | "model";
  asChild?: boolean;
};
function LoginButton({ mode = "redirect", children, asChild }: buttonProps) {
  const router = useRouter();
  const onClick = () => {
    if (mode === "redirect") {
      router.push("auth/login");
    } else {
      return;
    }
  };
  return <span onClick={onClick}>{children}</span>;
}

export default LoginButton;
