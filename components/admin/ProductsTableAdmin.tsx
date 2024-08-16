import Link from "next/link";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Status from "./Status";

import { Pencil } from "lucide-react";
import { TrashIcon } from "lucide-react";

import Image from "next/image";

import { formatPrice } from "@/lib/formatPrice";
import * as z from "zod";

import prisma from "../../db";
import {
  deleteProduct,
  deleteStorageImages,
  editProduct,
  handleSetStatusProduct,
} from "@/lib/actions";

import { revalidatePath } from "next/cache";

import { Product, Review } from "@prisma/client";
import { MapStatus } from "./ProductsTable";
import { ParseImages } from "./ProductsTable";
import { EditProductButton } from "../SubmitButtons";
import clsx from "clsx";
import { allTabs } from "@/lib/navigation";
import { toast } from "sonner";
export const ProductsTableAdmin = ({
  products,
}: {
  products: (Product & { reviews: Review[] })[];
}) => {
  // }
  return (
    <Table className="text-muted-foreground hidden md:table">
      <TableHeader className="">
        <TableRow>
          <TableHead className=" w-[100px]">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead className="text-blue-500 font-semibold ">Name</TableHead>
          <TableHead className="text-blue-500 font-semibold ">Status</TableHead>
          <TableHead className="text-blue-500 font-semibold ">Price</TableHead>
          <TableHead className="text-blue-500 font-semibold ">
            Total Sales
          </TableHead>

          <TableHead>
            <span className="sr-only w-7">others features</span>
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, i) => (
          <TableRow key={product.id}>
            <TableCell className="">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src={ParseImages(product.images)[0].image}
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium text-muted-foreground">
              {product.name}
            </TableCell>

            <TableCell>
              <Status status={product.status} />
            </TableCell>
            <TableCell className="font-semibold">
              {formatPrice(product.price)}
            </TableCell>
            <TableCell className="font-semibold">25</TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="px-4 py-2 text-muted-foreground "
                >
                  <DropdownMenuLabel className="text-blue-500">
                    Others Features
                  </DropdownMenuLabel>

                  <DropdownMenuItem className="focus:bg-transparent">
                    Category: {product.category}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-transparent">
                    Brand:{product.brand}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="text-blue-500">
                    Set product Status
                  </DropdownMenuLabel>
                  {/* <DropdownMenuSeparator /> */}
                  {MapStatus.map((status, _) => (
                    <DropdownMenuItem
                      key={"status"}
                      className={clsx("focus:text-blue-500 cursor-pointer", {
                        "bg-muted-foreground text-blue-500 pointer-events-none":
                          product.status === status,
                      })}
                    >
                      <form
                        // action={createProduct}
                        action={async (formData) => {
                          // "use server";
                          try {
                            await handleSetStatusProduct(formData);
                            revalidatePath("admin/dashboard/manage-products");
                            toast.success(" updated!");
                          } catch (error) {
                            toast.error("error updated!");
                          }
                        }}
                      >
                        <input type="hidden" name="status" value={status} />
                        <input
                          type="hidden"
                          name="productId"
                          value={product.id}
                        />
                        <Button type="submit">
                          {status[0].toUpperCase() + status.slice(1)}
                        </Button>
                      </form>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>

            <TableCell className="text-center">
              <div className="flex gap-2">
                {" "}
                <EditProductButton productId={product.id} />
                {/* <Button
                onClick={()=>{router.push(`/${product.id}/editProduct`)}}
                  className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
                  variant={"outline"}
                >
                  <Pencil className="size-5" />
                </Button> */}
                <Button
                  onClick={async () => {
                    try {
                      await Promise.all([
                        deleteProduct(product.id),
                        deleteStorageImages(ParseImages(product.images)),
                      ]);
                      revalidatePath("/admin/manage-products");
                      toast.success(" delete product!");
                    } catch (error) {
                      toast.error("Error deleting product!");
                    }
                  }}
                  className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
                  variant={"outline"}
                >
                  {" "}
                  <TrashIcon className="size-5" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
