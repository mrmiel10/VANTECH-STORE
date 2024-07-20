"use client"
import React, { useCallback } from "react";
import { CartProductType, useCartStore } from "@/lib/cart.store";
import { Plus } from "lucide-react";
import { MinusIcon } from "lucide-react";


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
      <div className="flex space-x-4 items-center">
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
      </div>
    </div>
  );
};

export default SetQuantity;
