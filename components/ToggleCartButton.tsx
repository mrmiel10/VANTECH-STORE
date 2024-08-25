import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart.store"
import { productsType } from "@/lib/typeProducts"
import { CartProductType } from "@/lib/cart.store"
import clsx from "clsx"
import { Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { ParseImages } from "./admin/ProductsTable"
export const ToggleCartButton = ({ product }: { product:CartProductType }) => {
    const [cartProduct, setCartProduct] = useState({
      id: product.id,
      name: product.name,
      description: product.description,
      category:product.category,
      brand: product.brand,
      quantity: 1,
      image: ParseImages(product.images),
      price: product.price,
    });
  
    const { isInCart, toggleCart } = useCartStore(
      useShallow((s) => ({
        isInCart: s.cart.some((item) => item.id === cartProduct.id),
        toggleCart: s.toggleCart,
      }))
    );
    return (
      <Button
        className=""
        variant={isInCart ? "defaultBtn" : "outline"}
        onClick={() => toggleCart(cartProduct)}
      >
        <ShoppingCart
          className={clsx(isInCart ? "text-white" : "text-blue-500")}
          size={16}
          fill={isInCart ? "white" : "none"}
        />
      </Button>
    );
  };
  