"use client"
import React, { PropsWithChildren } from 'react'
import { productsType } from '@/lib/typeProducts'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { truncateText } from '@/lib/truncate'
import { useRouter } from 'next/navigation'
  //h-72 md:h-40 lg:h-52
// const ProductCard = ({product,toggleCart,isInCart,favorite,toggleFavorite}:{
//     toggleCart?: () => void,
//     toggleFavorite:() => void
//     product:productsType,
//     isInCart:boolean,
//     favorite:boolean,

// })
const ProductCard = (product:PropsWithChildren<productsType> & {className?:string}) => {
  const Router = useRouter()

  return (
    // <div className=''>
      <div className='text-muted-foreground flex flex-col w-full shadow-md rounded-md overflow-hidden  cursor-pointer '>
       <div  onClick={()=> Router.push(`/${product.id}/product`)} className=' w-full relative aspect-square overflow-hidden h-52'>
        <Image fill src={product.image} alt={product.description} className='object-contain' />
       </div>
       <div className='border-t flex flex-col flex-grow gap-y-3 min-h-5  bg-white text-sm p-4  '>
        <p className='font-semibold'>{truncateText(product.name)}</p>
        <p>{product.description}</p>
        <div className='flex justify-between items-center'>
          <p className='font-semibold'>$ {product.price}</p>
          <div className='flex gap-2'>
            {product.children}
          {/* <Button variant={"outline"} className='px-4 py-2 text-white cursor-pointer inline-flex bg-blue-500 hover:bg-blue-400 transition rounded-md' onClick={()=>{toggleCart?.()}}>{isInCart ? "remove" : "Add to cart"}</Button>
          <Button className='px-4 py-2 text-white cursor-pointer rounded-md' onClick={()=>{toggleFavorite?.()}}>
          <Heart fill={favorite ? "red" : "none"} />
            
          </Button> */}
          </div>
   
        </div>
       </div>
        
    </div>
    // </div>
    
  )
}

export default ProductCard  