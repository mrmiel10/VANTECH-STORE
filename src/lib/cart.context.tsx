"use client"
import { createContext, PropsWithChildren, useContext, useState } from "react"

type CartContextType = {
    cart:string[],
    
    setCart:(cart:string[]) => void
}
export  const CartContext = createContext<CartContextType | null>(null)
export const CartContextProvider = (props:PropsWithChildren) =>{
    const [cart,setCart] = useState<string[]>([])
    return (
     <CartContext.Provider value={{cart,setCart}}>
        {props.children}
        </CartContext.Provider>
    )
}
export const useCart = () =>{
    const context = useContext(CartContext)
    if(context === null) {
        throw new Error('useCart must be used within a CartContext')
    }
    return context
}