import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Popover, PopoverTrigger,PopoverContent } from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { products } from '@/lib/products'
import { useCartStore } from '@/lib/cart.store'
const ButtonCart = () => {
    const {cart} = useCartStore()
    const selectedItems = products.filter((product) =>cart.includes(product.id))
  return (
   <Popover >
    <PopoverTrigger asChild>
        <Button>
            <ShoppingCart className='size-5 mr-2' />{cart.length}
        </Button>
    </PopoverTrigger>
    <PopoverContent className='bg-black text-white'>
        <h2 className='font-bold text-xl text-white'>Cart</h2>
        <ul className='divide-y-2 divide-white'>
            {selectedItems.map((product,index)=>(
                <li key={index}>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h3 className='text-lg font-medium leading-none'>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                        <div className='font-bold'>{product.price}</div>
                    </div>
                </li>
            ))}

        </ul>
    </PopoverContent>
   </Popover>
  )
}

export default ButtonCart