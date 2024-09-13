"use client"
import React from "react";
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

import { Button } from "@/components/ui/button";
import { useShallow } from "zustand/react/shallow";

import { useMediaQuery } from "usehooks-ts";
import { desktop } from "@/components/ui/credenza";

import { useModal } from "@/lib/DeleteStore";

export const GetPermissionsAdminModal = () => {
  const isDesktop = useMediaQuery(desktop);
  const { isOpen, onClose } = useModal(
    useShallow((s) => ({
      isOpen: s.isOpen,
      onClose: s.onClose,
    }))
  );
  return (
    <Credenza open={isOpen}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-blue-500 text-2xl">
            Show permissions
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="p-0 text-muted-foreground">
          <div>
          
            <span>
            this admin has the right to add:
            </span>
            <ul className="flex gap-3">
                <li>Add product</li>
                <li>Edit product</li>

            </ul>

          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <div className="flex items-center justify-center gap-2 flex-wrap">
        
            <Button
            
              onClick={onClose}
              variant={"outline"}
            >
              cancel
            </Button>
          </div>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};
