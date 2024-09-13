"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../db";
import { uploadImageType } from "@/app/admin/add-products/AddProductsForme";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { action } from "./zsa";
import {
  formValidateProducts,
  formValidateReview,
  schemaInfoUser,
  SchemaSafeProductsOrder,
  SchemaValidateAdmin,
} from "../../schemas/schema";
import { authedAction } from "./zsa";
import { updateProfileSchema } from "@/app/editprofil/EditProfil";
import { put, type PutBlobResult } from "@vercel/blob";
import { del } from "@vercel/blob";
import * as z from "zod";
import { useEdgeStore } from "./edgestore";
import { authedAdminAction } from "./zsa";
type product = {
  images: uploadImageType[];
  name: string;
  description: string | null;
  brand: string;
  category: string;
  status: string;
  price: number;
};
const ITEMS_PER_PAGE = 3;
export const addProductAction = authedAdminAction
  .input(formValidateProducts)

  .handler(async ({ input }) => {
    await prisma.product.create({
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
  });
  export const addAdminAction = authedAdminAction.input
  (SchemaValidateAdmin)
.handler(async({input})=>{
  const isAdmin =  await prisma.user.findUnique({
    where:{
      email:input.email,
      role:{
        in:["ADMIN","SUPERADMIN"]
      }
    }
  })
  if(isAdmin) throw new Error("the email associated with this person has been defined as admin!")
  if(input.role.toLowerCase() === "super admin" && input.permissions.length !== 0) throw new Error("super admin has all rights. there is no point in redefining these rights!")
  await prisma.user.update({
    where:{
      email:input.email
    },
    data:{
      permissions:input.role.toLowerCase() === "super admin" ? ["all"] : input.permissions,
    role:input.role.toLowerCase() === "admin" ? "ADMIN" : "SUPERADMIN"
    }
  })
})
export const getReviewsPages = async(filterRating:number | undefined) =>{
try {
 const count =  await prisma.review.count({
where:{
  OR: [
    {
      rating: {
        equals: filterRating,
      },
    },
    {
      rating: filterRating && {
        equals: filterRating + 0.5,
      },
    },
  ],
}
  })
  const totalPages = Math.ceil(Number(count) / 3);
  return totalPages
} catch (error) {
  
}
}
export const getProductsPages = async (
  searchProduct: string,
  productStatus: string
) => {
  try {
    const count = await prisma.product.count({
      where: {
        OR: [
          {
            name: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            status: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            price: {
              equals: Number(searchProduct) || undefined,
            },
          },
        ],
        status: productStatus
          ? {
              contains: productStatus,
              mode: "insensitive",
            }
          : undefined,
      },
    });
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return { totalPages, count };
  } catch (error) {
    throw error;
  }
};
export const getOrdersPages = async (
  searchOrder: string,
deliveryStatus: string,
paymentStatus?:string,
userId?:string
) => {
  try {
    const count = await prisma.order.count({
     
      where: {
        OR: [
          {
            status: {
              contains: searchOrder,
              mode: "insensitive",
            },
          },
          {
            deliveryStatus: {
              contains: searchOrder,
              mode: "insensitive",
            },
          },
          {
            user: {
              OR:[
               { firstName: {
                  contains: searchOrder,
                  mode: "insensitive",
                }
              },
              {  lastName: {
                  contains: searchOrder,
                  mode: "insensitive",
                }
              },
              {  email: {
                  contains: searchOrder,
                  mode: "insensitive",
                }
              }
              ]
             
            },
          },

          {
            status: {
              contains: searchOrder,
              mode: "insensitive",
            },
          },
          {
            amount: {
              equals: Number(searchOrder) || undefined,
            },
          },
        ],
        deliveryStatus: deliveryStatus
          ? {
           equals:deliveryStatus,
              mode: "insensitive",
            }
          : undefined,
          status: paymentStatus
          ? {
           equals:paymentStatus,
              mode: "insensitive",
            }:undefined,
          userId:userId ?? undefined
      },
    });
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return { totalPages, count };
  } catch (error) {
    throw error;
  }
};

export const getFilteredProducts = async (
  searchProduct: string,
  currentPage: number,
  productStatus: string
) => {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await prisma.product.findMany({
      
      take: ITEMS_PER_PAGE,
      skip: offset,
      where: {
        OR: [
          {
            name: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            status: {
              contains: searchProduct,
              mode: "insensitive",
            },
          },
          {
            price: {
              equals: Number(searchProduct) || undefined,
            },
          },
        ],
        status: productStatus
          ? {
              contains: productStatus,
              mode: "insensitive",
            }
          : undefined,
      },
      include: {
        reviews: true,
      },
    });
    return products;
  } catch (error) {
    throw error;
  }
};

export const getFilteredOrders = async (
  searchOrder: string,
  currentPage: number,
  deliveryStatus: string,
  paymentStatus?:string,
  orderByDate?:string,
  userId?:string

) => {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
console.log("createdDate",orderByDate)
  try {
    const orders= await prisma.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy:{
        createdDate:orderByDate
        ? orderByDate.toLowerCase() === "asc"
          ? "asc"
          : "desc"
       :undefined
      },
   
      where: {
        OR: [
          {
            id:{
              equals:searchOrder
            }
          },
          {
            status: {
              contains: searchOrder,
              mode: "insensitive",
            },
          },
          {
            deliveryStatus: {
              contains: searchOrder,
              mode: "insensitive",
            },
          },
          {
            user: {
              OR:[
               { firstName: {
                  contains: searchOrder,
                  mode: "insensitive",
                }
              },
              {  lastName: {
                  contains: searchOrder,
                  mode: "insensitive",
                }
              },
              {  email: {
                  contains: searchOrder,
                  mode: "insensitive",
                }
              }
              ]
             
            },
          },

          {
            status: {
              contains: searchOrder,
              mode: "insensitive",
            },
          },
          {
            amount: {
              equals: Number(searchOrder) || undefined,
            },
          },
        ],
        deliveryStatus: deliveryStatus
          ? {
           contains:deliveryStatus,
              mode: "insensitive",
            }
          : undefined,
        status: paymentStatus
          ? {
           contains:paymentStatus,
              mode: "insensitive",
            }
          : undefined,
          userId: userId ?? undefined,
      },
      include: {
        user: true,
      },
    });
    return orders;
  } catch (error) {
    throw error;
  }
};
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
  });
export const getAdmins = async(
  currentPage:number,
permissions:string[],
role?:string,
search?:string,


)=>{
  noStore()
  try {
 const admins =    await prisma.user.findMany({
      where:{
       AND:[
         {
            OR: [
              {   email:  {
                contains:search,
                mode:"insensitive"
               }
              }
               ,
    
             {  lastName: {
                contains:search,
                mode:"insensitive"
               }
              }
               ,
               
             {  firstName: {
                contains:search,
                mode:"insensitive"
               }
              }
            ],
          },
         {
            role:{
              in:["ADMIN","SUPERADMIN"]
            },
          //  permissions:{
          //  hasSome:permissions
          //  }
          
         }
       ]
        


      } 
    })
    return admins
  } catch (error) {
    throw error

}
}

export const getCurrentUser = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();
    if (!sessionUser) return null;
    const user = await prisma.user.findUnique({
      where: {
        kindeId: sessionUser.id,
      },
      include: {
        orders: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const isAdmin = async() =>{
  try {
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();
    if (!sessionUser) return null;
    const isAdmin = await prisma.user.findUnique({
      where: {
        kindeId: sessionUser.id,
        role: {
          in:["ADMIN","SUPERADMIN"]
        }
      },
     
    });
    return isAdmin
  } catch (error) {
    throw error
  }
  

}
export const editProductAction = authedAdminAction
  .input(
    z.intersection(
      formValidateProducts,
      z.object({
        id: z.string(),
      })
    )
  )

  .handler(async ({ input }) => {
    await prisma.product.update({
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
    revalidatePath("/admin/manage-products");
  });
export const deleteImagesProductAction = authedAdminAction
  .input(
    z.array(
      z.object({
        image: z.string(),
      })
    )
  )
  .handler(async ({ input }) => {
    const images = input;
    images.map(async (item, _) => {
      const { edgestore } = useEdgeStore();
      await edgestore.publicFiles.delete({
        url: item.image,
      });
    });
  });

export const deleteProductAction =authedAdminAction
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
  });

export const createTodoAction = action
  .input(
    z.object({
      title: z.string().min(2, { message: "at least 2 characters" }),
    })
  )
  .handler(async ({ input }) => {
    console.log(input);
  });
export const fileUploadAction = action
  .input(
    z.object({
      name: z.string(),
      file: z
        .instanceof(File)

        .refine(
          (file) => file.size > 0 && file.size < 1048576,
          "File size must be less than 1Mo"
        ),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    const { name, file } = input;
    console.log(file);
    return "File uploaded successfully";
  });
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
  });
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
    //console.log(input)
    await prisma.order.update({
      data:{
        deliveryStatus:input.status
        
        },
      where:{
        id:input.orderId

      },
      
    })
    console.log(input);
  });
export const deleteImageProfil = async (userImage: string) => {
  await del(userImage);
};
export const createOrderAction = authedAction
  .input(
    //SchemaSafeProductsOrder
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
  });

export const getAmountOrdersOfPeriod = async(start?:Date,end?:Date)=>{
 // noStore()
 
 const totalAmount =  await prisma.order.aggregate({
  //la semaine en cours, je recupere le montant total des commandes passées
    where:{
      createdDate:start && end ? {
        gte:start,
        lte:end
      } : undefined
    },
    _sum:{
      amount:true,
    },
   
  }) 
  return totalAmount._sum.amount
}

export const getPaidOrUnpaidOrdersOfPeriod = async(status:string,start?:Date,end?:Date) =>{
  const orders =  await prisma.order.aggregate({
    //En fonction du status de paiment, je recupere le montal total de commandes et le nombre de commandes

    where:{
      createdDate:start && end ? {
        gte:start,
        lte:end
      } : undefined,
status
    },
    _sum:{
      amount:true
    },
 _count:true
  }) 
  const amountOrders = orders._sum.amount
  const totalOrders = orders._count
 return{
  amountOrders,
  totalOrders
 }
}