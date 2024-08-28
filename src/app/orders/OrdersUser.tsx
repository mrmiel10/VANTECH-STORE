import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToLocal } from "@/lib/formatDate";
import PaymentStatus from "../../../components/admin/orders/PaymentStatus";
import { DeliveryStatusOrder } from "../../../components/admin/orders/DeliveryStatusOrder";
import { Ellipsis, ListOrderedIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { Copy } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { CopyIdOrder } from "./CopyIdOrder";
const OrdersUser = () => {
  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          <TableHead className="">Date</TableHead>
          <TableHead className="hidden sm:table-cell">Payment status</TableHead>
          <TableHead className="hidden sm:table-cell">
            Delivery Status
          </TableHead>
      
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-accent text-muted-foreground">
          <TableCell className="text-muted-foreground">2023-06-23</TableCell>
          <TableCell className="hidden sm:table-cell">
            <PaymentStatus status={"pending"} />
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <DeliveryStatusOrder status="Delivered" />
          </TableCell>
        
          <TableCell className="text-right">{formatPrice(250000)}</TableCell>
          <TableCell className="flex justify-end">
          <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className=" text-muted-foreground "
                >
                  {/* <DropdownMenuLabel className="text-blue-500">
                    Others Features
                  </DropdownMenuLabel> */}

                  <DropdownMenuItem className="flex gap-1 items-center justify-center">
                  <ListOrderedIcon className="size-5" />
                  see order details
                  </DropdownMenuItem>
                <CopyIdOrder />
                </DropdownMenuContent>
              </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrdersUser;
