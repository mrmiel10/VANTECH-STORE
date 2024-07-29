"use client"
import Image, { StaticImageData } from "next/image";
import { Star } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import shoe from '../../public/blackShoe.jpg'
import { products } from "@/lib/products";
import ProductCard from "../../components/ProductCard";
import Nav from "../../components/Nav";
import { CartContextProvider } from "@/lib/cart.context";
import { useCart } from "@/lib/cart.context";
import { CartProductType, useCartStore } from "@/lib/cart.store";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { productsType } from "@/lib/typeProducts";
import clsx from "clsx";
export default function Home() {
  //  const {cart,toggleCart,favorites,toggleFavorite} = useCartStore()

  return (
    // <CartContextProvider>
    <div>
  
    {/* <Nav /> */}
    <div className="max-w-screen-xl p-5 mx-auto sm:p-10 md:p-16"> 
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
     {/* <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider> */}
    {products.map((product,index)=> (
   
        <ProductCard
        
      //   toggleCart={()=>{
      //  toggleCart(product.id)
      //   }} 
      //   toggleFavorite={()=>{
      //  toggleFavorite(product.id)
      //   }} 
      //   isInCart={cart.includes(product.id)}
      //        product={product}
      //        favorite={favorites.includes(product.id)} 
       key={index} 
       {...product}
      
       >
        <ToggleLikeButton product={product} />
        <ToggleCartButton product={product} />
        </ProductCard>
      
       
      )
    )}
  </div>
  </div>

  </div>
  // </CartContextProvider>

  );
}
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
const ToggleCartButton = ({product}:{product:productsType}) =>{
  const [cartProduct,setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,   
    brand: product.brand,
    quantity:1,
    image:product.image,
    price: product.price,
  })
  // const cart = useCartStore((s) => s.cart)
  // const toggleCart = useCartStore((s) => s.toggleCart)
  // const isInCart = cart.includes(id)
  const {isInCart,toggleCart} = useCartStore(useShallow((s)=>({
    isInCart:s.cart.some((item) => item.id === cartProduct.id),
    toggleCart: s.toggleCart
  })))
  return (
    <Button className="" variant={isInCart ? "defaultBtn" : "outline"} onClick={()=> toggleCart(cartProduct)}>
      <ShoppingCart className={clsx(
    
    isInCart ? "text-white" : "text-blue-500"
  )} size={16} fill={isInCart ? "white" :"none"} />
      </Button>
  )
}
