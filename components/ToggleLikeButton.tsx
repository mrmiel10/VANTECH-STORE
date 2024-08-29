import { Button } from "@/components/ui/button"
import { CartProductType, useCartStore } from "@/lib/cart.store"
import { productsType } from "@/lib/typeProducts"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { ParseProductImages } from "@/lib/parseData"
export const ToggleLikeButton = ({product}:{product:CartProductType}) =>{
    // const favorites = useCartStore((s) => s.favorites)
    // const toggleFavorite = useCartStore((s) => s.toggleFavorite)
    const [cartProduct,setCartProduct] = useState({
      id: product.id,
      name: product.name,
      description: product.description,   
      category:product.category,
      brand: product.brand,
      status:product.status,
      quantity:1,
      images:ParseProductImages(product.images),
      price: product.price,
    })
    const {isFavorite,toggleFavorite} = useCartStore(useShallow((s)=>({
      isFavorite:s.favorites.some((product) => product.id === cartProduct.id),
      toggleFavorite:s.toggleFavorite
    })))
    // const isFavorite = favorites.includes(id)
    return (
      <Button variant={"outline"} onClick={()=> toggleFavorite(cartProduct)}>
        <Heart  className="text-muted-foreground" size={16} fill={isFavorite ? "blue" :"none"} />
        </Button>
    )
  }