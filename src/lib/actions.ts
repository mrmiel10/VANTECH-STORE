"use server"
import prisma from "../../db"
import { uploadImageType } from "@/app/admin/dashboard/add-products/AddProductsForm"


type product = {
    images: uploadImageType[];
    name: string;
    description: string;
    brand: string;
    category: string;
    status:string
    price: number;

   
  }



 const addProducts = async(products:product) => {
  try {
    await prisma.product.create({
      data:{
        name:products.name,
        description:products.description,
        brand:products.brand,
        category:products.category,
        status:products.status,
        price:products.price,
       images:products.images
      }
     })
  } catch (error) {
    throw error
  }
 
}
export default addProducts
export const findProducts = async() => {
  try {
    const products  = await prisma.product.findMany({
      include:{
        reviews:true
      }
    })
    return products
  } catch (error) {
    throw error
  }
}
// export const findProducts = async() => {
//   try {
//     const products  = await prisma.product.findMany({
//       include:{
//         reviews:true
//       }
//     })
//     return products
//   } catch (error) {
//     throw error
//   }
// }
