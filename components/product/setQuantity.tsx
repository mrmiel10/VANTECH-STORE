"use client"
import React, { useCallback } from "react";
import { CartProductType, useCartStore } from "@/lib/cart.store";
import { Plus } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantité:</div>}
      
     
    <div className="  rounded-md overflow-hidden flex items-center bg-accent">
      <Button   onClick={handleQtyDecrease} className="group px-3 py-0  rounded-none "  variant={"outline"}>
        <MinusIcon size={16} className="group-hover:text-blue-500"/>
      </Button>
      <div className="px-4  text-sm">
      {cartProduct.quantity}
      </div>
      <Button   onClick={handleQtyIncrease}  variant={"outline"} className="group px-3 py-0 flex items-center justify-center rounded-none">
        <Plus size={16} className="group-hover:text-blue-500" />
      </Button>
    </div>
      {/* <div className="flex space-x-4 items-center">
        {" "}
        <MinusIcon
        onClick={handleQtyDecrease}
        className="hover:text-blue-900 hover:cursor-pointer ease duration-100 transition"
        />
        <span className="text-blue-900 font-semibold">{cartProduct.quantity}</span>
        <Plus
         onClick={handleQtyIncrease}
         className="hover:text-blue-900 hover:cursor-pointer ease duration-100 transition"
        />
      </div> */}
    </div>
  );
};

export default SetQuantity;
