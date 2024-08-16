import React from 'react'
import prisma from '../../../../db'
import { EditProductForm } from './EditProductForm'
const EditProductPage = async({ params }: { params: { id: string } }) => {
    console.log(params.id)
    const product = await prisma.product.findUnique({
        include:{
            reviews:true
        },
        where:{
            id:params.id
        }
    })

    
    if(!product) return <p>no product</p>
  return (
   <EditProductForm product={product} />
  )
}

export default EditProductPage