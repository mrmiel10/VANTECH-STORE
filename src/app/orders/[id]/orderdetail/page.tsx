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
import { formatDateToLocal } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
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
interface IParams {
  id: string;
}
export default function PageOrderDetail({ params }: { params: IParams }) {
  console.log(params.id);

  return (
    <div className="container text-muted-foreground flex flex-col gap-8 justify-center items-center px-5 md:px-10 py-10 md:py-20 max-w-5xl">
      <h1 className="text-blue-500 max-md:text-3xl text-4xl font-bold">
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
            <span className="text-muted-foreground">{"defff1f4f4f55f454d54f54"}</span>
          </p>
          <p>
            Order date :{" "}
            <span className="text-muted-foreground">{"22/03/2024"}</span>
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
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Prix unitaire</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commande.produits.map((produit, index) => (
                <TableRow key={index}>
                  <TableCell>{produit.nom}</TableCell>
                  <TableCell>{produit.quantite}</TableCell>
                  <TableCell>{produit.prix.toFixed(2)} €</TableCell>
                  <TableCell>{(produit.quantite * produit.prix).toFixed(2)} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <div className="grid gap-8">
            <div className="grid gap-4 grid-cols-3 justify-items-end">
              <div className="col-span-2">
                <div className="">
                  <span>
                    Ordinateur de bureau Lenovo M81 SFF d'occasion avec
                    processeur Intel Core i3, mémoire 4Go, disque dur 250G et
                    Windows10 (moniteur non inclus), noir, 3GHZ
                  </span>

                  <span className="ml-2 text-blue-500 font-semibold">x 4</span>
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
                  {formatPrice(500000)}
                </span>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-3 justify-items-end">
              <div className="col-span-2">
                <div className="">
                  <span>
                    Ordinateur de bureau Lenovo M81 SFF d'occasion avec
                    processeur Intel Core i3, mémoire 4Go, disque dur 250G et
                    Windows10 (moniteur non inclus), noir, 3GHZ
                  </span>

                  <span className="ml-2 text-blue-500 font-semibold">x 4</span>
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
                  {formatPrice(500000)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-blue-500">
              <div className="flex justify-center items-center mr-auto">
                <CreditCard className="h-5 w-5 mr-1" />
                Paymement status
              </div>

              <PaymentStatus status="paid" />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            <li className="flex items-center justify-between">
              <span className="">Subtotal</span>
              <span>{formatPrice(50000)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="">Shipping</span>
              <span>{formatPrice(5)}</span>
            </li>
          
            <li className="text-blue-500 flex items-center justify-between font-semibold">
              <span className="">Total</span>
              <span>{formatPrice(100000)}</span>
            </li>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-end w-full">
          <CardHeader className="w-full">
            <CardTitle className="text-blue-500 flex items-center gap-2">
              <DeliveryStatusOrder status={"dispatched"} />

              <div className="flex justify-center items-center ml-auto">
                <Truck className="h-5 w-5 mr-1" />
                Delivery status
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
