import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart.store"
import { productsType } from "@/lib/typeProducts"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useShallow } from "zustand/react/shallow"

export const ToggleLikeButton = ({product}:{product:productsType}) =>{
    // const favorites = useCartStore((s) => s.favorites)
    // const toggleFavorite = useCartStore((s) => s.toggleFavorite)
    const [cartProduct,setCartProduct] = useState({
      id: product.id,
      name: product.name,
      description: product.description,   
      brand: product.brand,
      quantity:1,
      image:product.image,
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