"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { TrashIcon } from "lucide-react";

import { deleteProductAction, deleteImagesProductAction } from "@/lib/actions";

import { toast } from "sonner";
import clsx from "clsx";

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

export const  DeleteProductBtn = ({
  id,
  images,
}: {
  id: string;
  images: { image: string }[];
}) => {
  const router = useRouter();
  const deleteImagesProduct = useServerAction(deleteImagesProductAction, {
    onSuccess: () => {
      router.refresh();
      toast.success("Delete product images successfully!");
    },
    onError: () => {
      toast.error("Not deleted images!");
    },
  });
  const deleteProduct = useServerAction(deleteProductAction, {
    onSuccess: () => {
      router.refresh();
      toast.success("the status of the product has been deleted successfully");
    },
    onError: () => {
      toast.error("Not deleted!");
    },
  });

  return (
    <Button
      disabled={deleteProduct.isPending || deleteImagesProduct.isPending}
      onClick={async () => {
        await Promise.all([
          deleteProduct.execute({ id }),
         deleteImagesProduct.execute(images),
        ]);
      }}
      className="text-muted-foreground  hover:text-blue-500  p-2"
      variant={"outline"}
    >
      {" "}
      <TrashIcon className="size-5" />
    </Button>
  );
};
