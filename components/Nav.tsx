"use client"
import React, { useCallback, useEffect } from 'react'
import { Popover, PopoverTrigger,PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { products } from '@/lib/products'
import { Heart } from 'lucide-react'
import { deleteProductInCart, deleteProductInFavorite, useCartStore } from '@/lib/cart.store'
import { Trash2,Trash2Icon  } from 'lucide-react'
import { truncateText } from '@/lib/truncate'


const Nav= () => {
  return (
    <div className='max-w-screen-xl w-full p-3 mx-auto sm:p-5'>
    <div className='flex justify-between items-center mb-2'>
        <div className=''>
            <span className='font-bold text-blue-500 antialiased'>Shopping</span>
            </div>
          
        <div className='flex gap-4 items-center'>
        <ButtonCart />
        <FavoriteButtonCart />
        </div>
    </div>
    <hr className='border border-gray-300' />
    </div>
  )
}

export default Nav
const ButtonCart = () => {
  const cart = useCartStore((s)=> s.cart)
  const totalQty = useCartStore(useCallback((s)=> s.totalQty,[]))
  const getQty = useCartStore(useCallback((s)=> s.getTotalQty,[]))
  useEffect(()=>{
   getQty()
   
  },[cart,getQty])
//   const selectedItems = products.filter((product) =>cart.includes(product.id))
return (
 <Popover >
  <PopoverTrigger asChild>
      <Button>
          <ShoppingCart className='size-5 mr-2' />
           <span>
          {totalQty}
          </span>
      </Button>
  </PopoverTrigger>
  <PopoverContent className='bg-black text-white'>
      <h2 className='font-bold text-xl text-white'>Mon panier</h2>
      <ul className='divide-y-2 divide-white'>
          {cart.map((product,index)=>(
              <li key={index}>
                  <div className='flex items-center justify-between'>
                      <div>
                          <h3 className='text-lg font-medium leading-none'>{product.name}</h3>
                          {/* <p>{product.description}</p> */}
                      </div>
                      <div className='font-bold'>{product.price}</div>
                    <Button onClick={()=> deleteProductInCart(product.id)} className=" group" variant={"secondary"}>
                      <Trash2 className='group-hover:text-white' />
                    </Button>
                  </div>
              </li>
          ))}

      </ul>
  </PopoverContent>
 </Popover>
)
}
const FavoriteButtonCart = () => {
  const favorites = useCartStore((s)=> s.favorites)
//   const selectedItems = products.filter((product) =>favorites.includes(product.id))

return (
 <Popover >
  <PopoverTrigger asChild>
      <Button variant={"secondary"}>
          <Heart className='size-5 mr-2' />{favorites.length}
      </Button>
  </PopoverTrigger>
  <PopoverContent className='text-gray-500  w-[400px]'>
    <div className='flex sm:items-center max-sm:flex-col  gap-4'>
    <h2 className='font-bold text-xl text-blue-500 '>My Favorites</h2>
    <Button>
        View all Products
    </Button>
    </div>
      
      <ul className='divide-y-2  space-y-2'>
          {favorites.map((product,index)=>(
              <li key={index} className='py-3'>
                  <div className='flex items-center justify-between'>
                      <div>
                      <p className='text-blue-500 font-bold'>$ {product.price}</p>
                          <h3 className='text-lg font-medium leading-none'>{truncateText(product.name)}</h3>
                        
                          {/* <p>{product.description}</p> */}
                      </div>
                    
                     <Button className='px-3 py-2' variant={"default"}>
                     <Trash2Icon size={17} onClick={()=> deleteProductInFavorite(product.id)} />
                     </Button>
                     
                  </div>
              </li>
          ))}

      </ul>
  </PopoverContent>
 </Popover>
)
}


