"use client";

import { Button } from "../ui/button";
import { GlobeIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
function Social() {
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button className="w-full">
        <GlobeIcon className="text-2xl" />
      </Button>
      <Button className="w-full">
        <GitHubLogoIcon className="text-2xl" />
      </Button>
    </div>
  );
}

export default Social;
