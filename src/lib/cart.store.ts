import { StaticImageData } from "next/image";
import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
export type CartProductType = {
    id: string;
    name: string;
    description: string | null;   
    brand: string;
    category:string,  
    quantity:number
    price: number;
    image: {
        image: string;
    }[]
} 
  
export type FavoriteProductType = {
    id: string;
    name: string;
    description: string | null;   
    brand: string;
    category:string,    
    price: number;
    image: {
        image: string;
    }[]
  } ;
type CartStoreType = {
    cart:CartProductType[],
    totalQty:number,
    totalPrice:number,
    favorites:FavoriteProductType[],
    // getTotalPrice:()=> void
    toggleCart:(product:CartProductType) => void,
    toggleFavorite:(product:FavoriteProductType) => void,
    //handleQtyIncrease:(product:CartProductType) => void,
    // handleQtyIncrease:(id:string,qty:number) => void,
    getTotalQty:()=> void
    getTotalPrice:()=> void
   
}

export const useCartStore = create(persist<CartStoreType>((set) =>(

    {
       
    cartTotalAmount : 0,
    cart:[],
    totalQty:0,
    totalPrice:0,
    favorites:[],
   toggleFavorite: (product) => set((state) =>({
    favorites:state.favorites.some((item) => item.id === product.id) ? state.favorites.filter((item) => item.id !== product.id ) : [product,...state.favorites]
   })),
    toggleCart:(product) =>set((state)=>({
        cart:state.cart.some((item) => item.id === product.id ) ? state.cart.filter((item)=> item.id !== product.id):
        [product,...state.cart]
    })),
  
  
    getTotalQty:()=> {
        const cart = useCartStore.getState().cart
           // if(cart){
                const totalqty = cart.reduce((qty, item) =>
                {
                               
                    qty += item.quantity!
   
                    return qty
    
                },
               0
                )
           //  return totalqty
              
           // }
           useCartStore.setState({
            totalQty:totalqty
        })
        },
        getTotalPrice:()=>{
            const cart = useCartStore.getState().cart
            if(cart){
                  
            const totalPrice = cart.reduce((total,item)=>
                {
                    const itemTotal = item.price! * item.quantity!
                    total +=itemTotal
                    return total 
                },0)

                useCartStore.setState({
                    
                    totalPrice:totalPrice
                })
            }
         
        }
    
    
    
    
}),{
    name:"cartStorage"
}))
export const deleteProductInCart = (id:string) => {
    const cart = useCartStore.getState().cart
    useCartStore.setState({
        cart:cart.filter((item) => item.id !== id )
    })
}
export const deleteAllProductsInCart = () => {
    // const cart = useCartStore.getState().cart
    useCartStore.setState({
        cart:[]
    })
}
export const deleteProductInFavorite = (id:string) => {
    const favorites = useCartStore.getState().favorites
    useCartStore.setState({
        favorites:favorites.filter((item) => item.id !== id )
    })
}
export const handleQtyIncrease = (product:CartProductType)=> {
    if(product.quantity === 99) return
    const cart = useCartStore.getState().cart
    let updatedCart

    if(cart){
        updatedCart = [...cart]
      
        const existingIndex = cart.findIndex((item) => item.id === product.id)
        if (existingIndex > -1 ){
            updatedCart[existingIndex].quantity == ++updatedCart[existingIndex].quantity!
          
    }
    useCartStore.setState({
        cart:updatedCart
    })
}
   
}
export const handleQtyDecrease = (product:CartProductType)=> {
    if(product.quantity === 1) return
    const cart = useCartStore.getState().cart
    let updatedCart

    if(cart){
        updatedCart = [...cart]
      
        const existingIndex = cart.findIndex((item) => item.id === product.id)
        if (existingIndex > -1 ){
            updatedCart[existingIndex].quantity == --updatedCart[existingIndex].quantity!
          
    }
    useCartStore.setState({
        cart:updatedCart
    })
}
   
}
