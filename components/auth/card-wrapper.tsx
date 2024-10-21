"use client";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import BackButtun from "./back-button";
import Header from "./header";
import Social from "./social";

type CardWrapperProps = {
  children: React.ReactNode;
  headerLable: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerLable,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLable}></Header>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButtun label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
