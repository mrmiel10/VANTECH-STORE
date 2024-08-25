"use client"
import React, { useCallback } from "react";
import { CartProductType, useCartStore } from "@/lib/cart.store";
import { Plus } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
   handleQtyDecrease: () => void;
}
const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
   handleQtyDecrease,
}) => {
    const cart = useCartStore((s)=> s.cart)
  
  return (
     <div className="flex items-center gap-2">
        {cartCounter ? null :   <Label htmlFor="quantity" className="text-base text-muted-foreground">
            Quantity:
          </Label>}
       
          <div className="flex items-center gap-2">
            <Button className="group" onClick={handleQtyDecrease} variant="outline" size="icon">
              <MinusIcon className="text-muted-foreground size-4 group-hover:text-blue-500 hover:cursor-pointer ease transition" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <p className="text-muted-foreground">{cartProduct.quantity}</p>
            {/* <Input    id="quantity"  value={cartProduct.quantity } className="w-16 text-center text-muted-foreground" /> */}
            <Button className="group"   onClick={handleQtyIncrease} variant="outline" size="icon">
              <PlusIcon className="text-muted-foreground size-4  group-hover:text-blue-500 hover:cursor-pointer ease  transition" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>  

  );
};

export default SetQuantity;
