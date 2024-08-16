import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const CardTotalOrders = async() => {
  return (
    <Card >
    <CardHeader className="pb-3">
      <CardDescription className="max-w-lg text-balance ">
        All
      </CardDescription>
      <CardTitle className="text-blue-500 text-4xl">
        {/* <Card className="h-16 w-52 flex justify-center items-center text-blue-500 antialiased border-2 border-blue-500 ">192 Orders</Card> */}
        192 orders
      </CardTitle>
    </CardHeader>
    <CardFooter>
      <div className="grid grid-cols-2 gap-8 text-muted-foreground text-sm">
        <Card className="px-2 py-1 text-muted-foreground ">
          {" "}
          <div className="grid grid-cols-1">
            <div> 50 unpaid orders </div>

            <div className="font-semibold text-blue-500 text-xs">
              $122,99
            </div>
          </div>
        </Card>

        <Card>
          {" "}
          <div className="grid grid-cols-1">
            <div> 50 unpaid orders </div>

            <div className="font-semibold text-blue-500 text-xs">
              $122,99
            </div>
          </div>
        </Card>
      </div>
    </CardFooter>
  </Card>
  )
}

