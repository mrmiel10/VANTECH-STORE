"use client ";
import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useDeleteProductModal, useModal } from "@/lib/DeleteStore";
import { useShallow } from "zustand/react/shallow";
export const DisplayDeleteProductDialogBtn = ({
  productId,
  images,
}: {
  productId: string;
  images: {
    image: string;
  }[];
}) => {
  const { setProduct } = useDeleteProductModal(
    useShallow((s) => ({
      setProduct: s.setProduct,
    }))
  );
  const { onOpen } = useModal(
    useShallow((s) => ({
      onOpen: s.onOpen,
    }))
  );
  return (
    <Button
      onClick={() => {
        setProduct(productId, images);
        onOpen();
      }}
      className="text-muted-foreground  hover:text-blue-500  p-2"
      variant={"outline"}
    >
      {" "}
      <TrashIcon className="size-5" />
    </Button>
  );
};
