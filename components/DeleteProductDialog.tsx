"use client";
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
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { deleteProductAction, deleteImagesProductAction } from "@/lib/actions";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import {useDeleteProductModal,useModal } from "@/lib/DeleteStore";
import { Button } from "@/components/ui/button";
import { useShallow } from "zustand/react/shallow";
import { Info } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { desktop } from "@/components/ui/credenza";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

export const DeletePorductDialog = () => {
  const { product } = useDeleteProductModal(
    useShallow((s) => ({
      product: s.product,
    }))
  );
  const { isOpen, onClose } = useModal(
    useShallow((s) => ({
      isOpen: s.isOpen,
      onClose: s.onClose,
    }))
  );
  console.log(product);
  console.log(isOpen);
  const isDesktop = useMediaQuery(desktop);
  const router = useRouter();
  const deleteImagesProduct = useServerAction(deleteImagesProductAction, {
    onSuccess: () => {
      router.refresh();
      onClose()
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
    onError: (err) => {
      console.log(err.err.message);
      toast.error(err.err.message);
      // toast.error("Not deleted!");
    },
  });

  return (
    <Credenza open={isOpen}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="text-blue-500">
            Delete product
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="p-0 text-muted-foreground">
          <div
            className={clsx("flex flex-col px-2 text-center", {
              "items-center justify-center": isDesktop === false,
            })}
          >
            <p className="">Are you sure you want to delete this product?</p>
            <p className="items-center text-sm text-destructive flex gap-1 ">
              <Info size={16} />
              <span> this product will be permanently deleted</span>
            </p>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
              className={clsx("px-16", { "order-last": isDesktop === false })}
              onClick={onClose}
              variant={"outline"}
            >
              cancel
            </Button>
            {/* <CredenzaClose asChild>
            <Button variant={"outline"}>cancel</Button>
          </CredenzaClose> */}
            <Button
              disabled={
                deleteProduct.isPending || deleteImagesProduct.isPending
              }
              onClick={async () => {
                if (!product.idProduct || !product.images) return null;
                await Promise.all([
                  deleteProduct.execute({ id: product.idProduct }),
                  deleteImagesProduct.execute(product.images),
                ]);
              }}
              className=" px-16"
              variant={"defaultBtn"}
            >
              {" "}
              {deleteProduct.isPending || deleteImagesProduct.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <span>Delete</span>
              )}
            </Button>
          </div>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};
