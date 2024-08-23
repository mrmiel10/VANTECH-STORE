import React from 'react'
import prisma from '../../../../../db'
import { EditProductForm } from './EditProductForm'
const EditProductPage = async({ params }: { params: { id: string } }) => {
    console.log(params.id)
    const product = await prisma.product.findUnique({
      
        where:{
            id:params.id
        }
    })

    
    if(!product) return <p>no product</p>
  return (
    <div>
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8">
      <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max ">
      <EditProductForm product={product} />
    
      </div>
    </main>
  </div>
  
  )
}

export default EditProductPage