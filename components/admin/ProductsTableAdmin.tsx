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
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import * as z from "zod";
import { Product, Review } from "@prisma/client";
import { ParseProductImages } from "@/lib/utils";
import { EditProductButton } from "../SubmitButtons";
import { HandleSetStatusProduct } from "./HandleSetStatusProduct";
import { DeleteProductBtn } from "../SubmitButtons";

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
            <TableCell className="flex-shrink-0">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-contain flex-shrink-0"
                height="64"
                src={ParseProductImages(product.images)[0].image}
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
                  className=" py-2 text-muted-foreground "
                >
                  <DropdownMenuLabel className="text-blue-500">
                    More details
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="focus:bg-transparent">
                    no sales
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-transparent">
                    Category: {product.category}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-transparent">
                    Brand:{product.brand}
                  </DropdownMenuItem>
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuLabel className="text-blue-500">
                    Status
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuSeparator /> */}
                  <HandleSetStatusProduct
                    status={product.status}
                    productId={product.id}
                  />
                  <DropdownMenuSeparator />
                  {/* 
                    <TotalSalesRowOrderTable productId={product.id} />
                  <DropdownMenuItem className="focus:bg-transparent">
                 no sales
                  </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>

            <TableCell className="text-center">
              <div className="flex gap-2">
                {" "}
                <EditProductButton productId={product.id} />
                <DeleteProductBtn
                  images={ParseProductImages(product.images)}
                  id={product.id}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
