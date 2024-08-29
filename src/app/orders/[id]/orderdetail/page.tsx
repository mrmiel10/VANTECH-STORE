import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, CreditCard, Truck } from "lucide-react";
import { formatDateToLocal } from "@/lib/formatData";
import { formatPrice } from "@/lib/formatData";
import AccordionExample from "../../../../../components/Accordion";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import PaymentStatus from "../../../../../components/admin/orders/PaymentStatus";
import { DeliveryStatusOrder } from "../../../../../components/admin/orders/DeliveryStatusOrder";
import { Info } from "lucide-react";
import prisma from "../../../../../db";
import Image from "next/image";
import laptop from "../../../../../public/PC3.jpeg"
import { ParseProducts } from "@/lib/parseData";
import { ParseProductImages } from "@/lib/parseData";
interface IParams {
  id: string;
}
export default async function PageOrderDetail({ params }: { params: IParams }) {
  //await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log(params.id);
  const orderById = await prisma.order.findUnique({
    where:{id:params.id}
  })

if(!orderById) return <p>Pas de commande associé</p>
const productsOrders = ParseProducts(orderById.products)
  return (
    <div className="container text-muted-foreground flex flex-col gap-8 justify-center items-center px-5 md:px-10 py-10 md:py-20 max-w-5xl">
      <h1 className="text-blue-500 max-md:text-3xl text-4xl font-bold text-center">
        See your order details
      </h1>

      <Card className="w-full">
        <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-500">
          
            <Info className="size-5 mr-1" />
          Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-500">
          <p>
            Order ID:{" "}
            <span className="text-muted-foreground">{orderById.id}</span>
          </p>
          <p>
            Order date :{" "}
            <span className="text-muted-foreground">{formatDateToLocal(orderById.createdDate.toDateString())}</span>
          </p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-500">
            <Package className="h-5 w-5 mr-1" />
            Products List
          </CardTitle>
        </CardHeader>
        <CardContent>
         
          <div className="grid gap-8">
            {productsOrders.map((productOrder,_)=>(
               <div key={productOrder.id} className="grid auto-rows-max auto-cols-max gap-2 md:gap-8 grid-cols-1 md:grid-cols-[150px_1fr_150px] text-center place-content-center">
               <div className="relative h-32 w-full md:h-full  aspect-square">
                   <Image src={ParseProductImages(productOrder.images)[0].image} alt="ordi" fill className="object-contain "  />
                 </div>
                 <div className="">
                   <div className="">
                     <span>
                     {productOrder.name}
                     </span>
   
                     <span className="ml-2 text-blue-500 font-semibold">x {productOrder.quantity}</span>
                   </div>
                   {/* <Accordion>
                     <AccordionTrigger asChild>
                     <div>See more details</div>
                     </AccordionTrigger>
                     <AccordionContent>
                       <AccordionItem><p>Category: Desktop</p></AccordionItem>
                       <AccordionItem><p>Category: Desktop</p></AccordionItem>
                                    
                     </AccordionContent>
                   </Accordion> */}
                   <div>See more details</div>
                   {/* <AccordionExample /> */}
                 </div>
   
                 <div className="col-span-1">
                   <span className="text-blue-500 font-semibold">
                     {formatPrice(productOrder.price)}
                   </span>
                 </div>
               </div>
            ))}
       
         
          </div>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-blue-500">
              <div className="flex max-xs:flex-col justify-center xs:items-center mr-auto">
                <CreditCard className="h-5 w-5 mr-1 max-xs:mb-1" />
                Paymement status
              </div>

              <PaymentStatus status={orderById.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            <li className="flex items-center justify-between">
              <span className="">Subtotal</span>
              <span>{formatPrice(orderById.amount)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="">Shipping</span>
              <span>{formatPrice(5)}</span>
            </li>
          
            <li className="text-blue-500 flex items-center justify-between font-semibold">
              <span className="">Total</span>
              <span>{formatPrice(orderById.amount)}</span>
            </li>
          </CardContent>
        </Card>

        <Card className="flex flex-col md:items-end w-full">
          <CardHeader className="w-full">
            <CardTitle className="text-blue-500 flex items-center gap-2">
              <DeliveryStatusOrder status={orderById.deliveryStatus} className="max-md:order-last max-md:ml-auto" />

              <div className="flex max-xs:flex-col justify-center xs:items-center md:ml-auto ">
                <Truck className="h-5 w-5 mr-1  max-xs:mb-1" />
                <span>Delivery status</span>
                
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
