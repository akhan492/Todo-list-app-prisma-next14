import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type BackButtunProps = {
  href: string;
  label: string;
};
function BackButtun({ href, label }: BackButtunProps) {
  return (
    <Button asChild className="w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default BackButtun;
