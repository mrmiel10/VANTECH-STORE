
import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
import { User,Order as typeOrder } from "@prisma/client";
export type Order = {

}
type OrderStoreType  ={
  order:typeOrder & {user:User} | null
}
export const useOrderStore = create(persist<OrderStoreType>((set) =>(

    {
       
order:null
    
    
}),{
    name:"orderDetailStorage"
}))
export const setOrder = (order:typeOrder & {user:User} | null)=>{
    useOrderStore.setState({
        order
    })
}