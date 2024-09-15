import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
  // CredenzaOverlay
} from "@/components/ui/credenza";
import clsx from "clsx";
import { useMediaQuery } from "../use-media-query";
import { desktop } from "@/components/ui/credenza";
export const GetPermissionsAdminBtn = ({
  permissions,
}: {
  permissions: string[];
}) => {
  const isDesktop = useMediaQuery(desktop);
  return (
    <Credenza>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
      <CredenzaTrigger asChild>
              <Button  variant={"outline"} className="px-3 border-0">
                <Info className="font-normal" size={20} />
              </Button>
      </CredenzaTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-normal text-muted-foreground">
                Show more permissions
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-blue-500 text-2xl">
            Show permissions
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="p-0 text-muted-foreground">
          <div
            className={clsx("flex flex-col ", {
              "items-center justify-center text-center px-2":
                isDesktop === false,
            })}
          >
            <div className="flex flex-col gap-2 ">
              {isDesktop && permissions.length === 1 && (
                <p>
                  this admin has the right to all{" "}
                  <span className="text-blue-500 font-bold">permissions</span>
                </p>
              )}
                {permissions.length > 1 && (
                  <>
                     <p>this admin has the right to:</p>
                       
              <ul className="flex text-sm flex-col gap-1">
                
                { permissions.map((permission, _) => (
                   <li
                     key={permission.toLowerCase()}
                     className="font-normal text-blue-500"
                   >
                     {permission[0].toUpperCase() + permission.slice(1)}
                   </li>
                 ))}
             </ul>
                  </>
                )
         
                  }
            </div>
          </div>
        </CredenzaBody>
        {isDesktop && (
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button variant={"outline"}>cancel</Button>
            </CredenzaClose>
          </CredenzaFooter>
        )}
      </CredenzaContent>
    </Credenza>
  );
};
