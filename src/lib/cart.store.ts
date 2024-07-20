import { StaticImageData } from "next/image";
import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
export type CartProductType = {
    id: string;
    name: string;
    description?: string;   
    brand: string;  
    quantity:number
    price: number;
    image: string | StaticImageData
}
  
export type FavoriteProductType = {
    id: string;
    name: string;
    description?: string;   
    brand: string;  
    price: number;
    image: string | StaticImageData
  };
type CartStoreType = {
    cart:CartProductType[],
    totalQty:number,
    favorites:FavoriteProductType[],
    // getTotalPrice:()=> void
    toggleCart:(product:CartProductType) => void,
    toggleFavorite:(product:FavoriteProductType) => void,
    handleQtyIncrease:(product:CartProductType) => void
    getTotalQty:()=> void
    // handleAddProductToCart: (product:CartProductType) => void
    // setCart:(cart:string[]) => void
}

export const useCartStore = create(persist<CartStoreType>((set) =>(

    {
       
    cartTotalAmount : 0,
    cart:[],
    totalQty:1,
    favorites:[],
   toggleFavorite: (product) => set((state) =>({
    favorites:state.favorites.some((item) => item.id === product.id) ? state.favorites.filter((item) => item.id !== product.id ) : [...state.favorites,product]
   })),
    toggleCart:(product) =>set((state)=>({
        cart:state.cart.some((item) => item.id === product.id ) ? state.cart.filter((item)=> item.id !== product.id):
        [...state.cart,product]
    })),
    handleQtyIncrease:(product) => {
        const cart = useCartStore.getState().cart
            let updatedCart
        
            if(cart){
                updatedCart = [...cart]
              
                const existingIndex = cart.findIndex((item) => item.id === product.id)
                if (existingIndex > -1 ){
                    updatedCart[existingIndex].quantity == ++updatedCart[existingIndex].quantity
                  
            }
    }
  
    },
    getTotalQty:()=> {
        const cart = useCartStore.getState().cart
           // if(cart){
                const totalqty = cart.reduce((qty, item) =>
                {
                               
                    qty += item.quantity
   
                    return qty
    
                },
               0
                )
           //  return totalqty
              
           // }
           useCartStore.setState({
            totalQty:totalqty
        })
        }
    
    
    // getQuantity:()=>{
    //     const cart = useCartStore.getState().cart
    //     if(cart){
    //         const qty = cart.reduce((acc, item) =>
    //         {
                           
    //             acc += item.quantity

    //             return acc

    //         },
    //        0
    //         )
          
    //     }
    // }
    // toggleCart:(id) =>set((state)=>({
    //     cart:state.cart.includes(id) ? state.cart.filter((i)=> i !== id):
    //     [...state.cart,id]
    // }))

    
}),{
    name:"cartStorage"
}))
export const deleteProductInCart = (id:string) => {
    const cart = useCartStore.getState().cart
    useCartStore.setState({
        cart:cart.filter((item) => item.id !== id )
    })
}
export const deleteProductInFavorite = (id:string) => {
    const favorites = useCartStore.getState().favorites
    useCartStore.setState({
        favorites:favorites.filter((item) => item.id !== id )
    })
}
// export const handleQtyIncrease = (product:CartProductType)=> {
//     const cart = useCartStore.getState().cart
//     let updatedCart

//     if(cart){
//         updatedCart = [...cart]
      
//         const existingIndex = cart.findIndex((item) => item.id === product.id)
//         if (existingIndex > -1 ){
//             updatedCart[existingIndex].quantity == ++updatedCart[existingIndex].quantity
          
//     }
// }
   
// }
export const handleQtyDecrease = (product:CartProductType)=> {
    const cart = useCartStore.getState().cart
    let updatedCart

    if(cart){
        updatedCart = [...cart]
      
        const existingIndex = cart.findIndex((item) => item.id === product.id)
        if (existingIndex > -1 ){
            updatedCart[existingIndex].quantity == --updatedCart[existingIndex].quantity
          
    }
}
   
}
