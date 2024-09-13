"use client ";
import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useDeleteAdminModal, useModal } from "@/lib/DeleteStore";
import { useShallow } from "zustand/react/shallow";
export const DisplayDeleteAdminModalBtn = ({
 adminId
}: {
  adminId:string}) => {
  const { setAdmin} = useDeleteAdminModal(
    useShallow((s) => ({
        setAdmin: s.setAdmin,
    }))
  );
  const { onOpen } = useModal(
    useShallow((s) => ({
      onOpen: s.onOpen,
    }))
  );
  return (
    <Button
   onClick={()=>{
    setAdmin(adminId)
    onOpen()
   }}
    className="text-muted-foreground font-normal  hover:text-blue-500  p-2"
    variant={"outline"}
  >
    {" "}
    Delete 

  </Button>
  );
};
