"use server"
import { revalidatePath } from "next/cache";
import prisma from "../../db";
import { action, authedDeleteProductAction, authedEditProductAction } from "./zsa";
import {
  formValidateProducts,
  formValidateReview,
  schemaInfoUser,
  SchemaSafeProductsOrder,
  SchemaValidateAdmin,
} from "../../schemas/schema";
import { authedAction } from "./zsa";

import { put, type PutBlobResult } from "@vercel/blob";
import { del } from "@vercel/blob";
import * as z from "zod";
import { useEdgeStore } from "./edgestore";
import { authedAdminAction } from "./zsa";
import { authedAddAdminAction } from "./zsa";
import { authedAddProductAction } from "./zsa";
export const editAdminAction = authedAddAdminAction.input(
    (SchemaValidateAdmin)
    
  )
  .handler(async({input})=>{
    if(input.role !== "ADMIN" && input.role !== "SUPERADMIN") throw new Error("role ADMIN or SUPER ADMIN only authorized")

      if(input.role === "SUPERADMIN" && input.permissions.length !== 0) throw new Error("super admin has all rights. there is no point in redefining these rights!")
        await prisma.user.update({
          where:{
            email:input.email
          },
          data:{
            permissions:input.role === "SUPERADMIN" ? ["all"] : input.permissions,
          role:input.role === "ADMIN" ? "ADMIN" : "SUPERADMIN"
          }
        })
      })
//ajouter un produit
export const addProductAction = authedAddProductAction
  .input(formValidateProducts)

  .handler(async ({ input }) => {
 const data =    await prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        brand: input.brand,
        category: input.category,
        status: input.status,
        price: input.price,
        images: input.images,
        quantity: input.quantity,
      },
    });
    return data
  })
  //modifier l'image de l'utilisateur
  export const updateImageProfilAction = authedAction
  .input(
    z.object({
      urlImage: z.instanceof(File),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    const blob = await put(`profil/${input.urlImage.name}`, input.urlImage, {
      access: "public",
      token: "vercel_blob_rw_lZDzY7eapvafpA4c_uUSQrz3kPjTBkImIZzysRPVfFLOFOE",
    });
    console.log(blob.url);
    return blob.url;
  });
//modifier le status de livraison de la commande(pending,delivered,cancelled)
  export const handleSetDeliveryOrderStatusAction =authedAdminAction
  .input(
    z.object({
      status: z.string(),
     orderId: z.string(),
    }),
    {
      type: "formData",
    }
  )
  .handler(async({ input }) => {
    await prisma.order.update({
      data:{
        deliveryStatus:input.status
        
        },
      where:{
        id:input.orderId

      },
      
    })
    console.log(input);
  })
  //ajouter un administrateur
  export const addAdminAction = authedAddAdminAction .input
  (SchemaValidateAdmin)
.handler(async({input})=>{
  const existingEmail = await prisma.user.findUnique({
    where:{
      email:input.email,
    
    }
  })
  if(!existingEmail) throw new Error("this email doesn't registred in the database")
  const isAdmin =  await prisma.user.findUnique({
    where:{
      email:input.email,
      role:{
        in:["ADMIN","SUPERADMIN"]
      }
    }
  })
  if(isAdmin) throw new Error("the email associated with this person has been defined as admin!")
  if(input.role !== "ADMIN" && input.role !== "SUPERADMIN") throw new Error("role ADMIN or SUPER ADMIN only authorized")

  if(input.role === "SUPERADMIN" && input.permissions.length !== 0) throw new Error("super admin has all rights. there is no point in redefining these rights!")
  await prisma.user.update({
    where:{
      email:input.email
    },
    data:{
      permissions:input.role === "SUPERADMIN" ? ["all"] : input.permissions,
    role:input.role === "ADMIN" ? "ADMIN" : "SUPERADMIN"
    }
  })
})
export const editProductAction = authedEditProductAction
  .input(
    z.intersection(
      formValidateProducts,
      z.object({
        id: z.string(),
      })
    )
  )

  .handler(async ({ input }) => {
  const datas =   await prisma.product.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        description: input.description ?? undefined,
        price: input.price,
        category: input.category,
        status: input.status,
        images: input.images,
      },
    });
    return datas
  })
  export const deleteAdminAction = authedAddAdminAction.input(
    ( z.object({
     idAdmin:z.string().min(1,{message:"ID admin is required!"})
    }))
   )
   .handler(async({input})=>{
     try {
       await prisma.user.update({
         where:{
           id:input.idAdmin
         },
         data:{
           role:"USER"
         }
       })
     } catch (error) {
       throw error
     }
    
   })
   //modifier le status d'un produit(published,draft,archive)
   export const handleSetStatusProductAction = authedAdminAction
   .input(
     z.object({
       productStatus: z.enum(["published","archive","draft"]),
       productId: z.string(),
     }),
     {
       type: "formData",
     }
   )
   .handler(async ({ input }) => {
     const newStatus = input.productStatus;
     const productId = input.productId;
 console.log(input)
     const update = await prisma.product.update({
       where: {
         id: productId,
       },
       data: {
         status: newStatus,
       },
     });
   // return update
     revalidatePath("/admin/manage-products");
   })
 
//supprimer un produit
export const deleteProductAction =authedDeleteProductAction
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const productId = input.id;
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  })
  //commenter un produit
  export const commentProductAction = authedAction
  .input(
    z.intersection(
      formValidateReview,
      z.object({
        productId: z.string(),
        userId: z.string(),
      })
    )
  )
  .handler(async ({ input }) => {
    console.log(input)
    await prisma.review.create({
      data: {
        comment: input.comment,
        rating: input.rating,
        productId: input.productId,
        userId: input.userId,
      },
    });
  })
  //passer une commande
  export const createOrderAction = authedAction
  .input(
   
    z.object({
      cartOrder: SchemaSafeProductsOrder,
      userId: z.string(),
      totalPrice: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const userId = input.userId;
    const amount = input.totalPrice;
    const products = input.cartOrder;
    await prisma.order.create({
      data: {
        currency: "xaf",
        status:"pending",
        deliveryStatus: "pending",
        amount,
        products,
        userId,
      },
    });
    console.log(input.cartOrder);
    console.log(input.userId);
    return input;
  })
  //modifier  le profil d'un utilisateur
  export const editProfilAction = action
  .input(schemaInfoUser)
  .handler(async ({ input }) => {
    await prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        firstName: input.firstName ?? undefined,
        lastName: input.lastName ?? undefined,
        picture: input.urlImage ?? undefined,
      },
    });
  });
