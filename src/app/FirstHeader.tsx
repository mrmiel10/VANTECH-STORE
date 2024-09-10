"use client";
import React from "react";

import { usePathname } from "next/navigation";
import TextFlip from "../../components/FlipText";
const FirstHeader = () => {
  const pathname = usePathname();
  const words = ["low", "competitive", "affordable", "incredible"];

  for (const pth of fakePathname) {
    if (pathname.startsWith(pth)) {
      return null;
    }
  }
  return (
    <div className="w-full bg-blue-500 text-muted-foreground shadow-sm flex justify-center items-center max-xs:min-h-8 min-h-12 px-4 py-2">
      <TextFlip />
    </div>
  );

  //   )
};

export default FirstHeader;
export const fakePathname = ["/editprofil", "/admin"];
