"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { TrashIcon } from "lucide-react";

import { toast } from "sonner";
import { useServerAction } from "zsa-react";

export const EditProductButton = ({ productId }: { productId: string }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`/admin/${productId}/editproduct`);
      }}
      className="text-muted-foreground hover:text-blue-500 p-2"
      variant={"outline"}
    >
      <Pencil className="size-5" />
    </Button>
  );
};
export const EditAdminButton = ({idAdmin }: { idAdmin: string }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`/admin/${idAdmin}/editadmin`);
      }}
      className=" text-muted font-medium border-none hover:bg-blue-500 hover:text-white  bg-blue-500"
      variant={"outline"}
    >
      Edit 
     
    </Button>
  );
};
export const DeleteAsAdmin = ()=>{
  return (
<Button
   
      className="text-muted-foreground font-normal  hover:text-blue-500  p-2"
      variant={"outline"}
    >
      {" "}
      Delete 
  
    </Button>
  )
}
