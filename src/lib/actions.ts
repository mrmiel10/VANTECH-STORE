"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../db";
import { uploadImageType } from "@/app/admin/add-products/AddProductsForme";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ParseImages } from "../../components/admin/ProductsTable";
import firebaseApp from "./firebase";
import { action } from "./zsa";
import {
  formValidateProducts,
  formValidateReview,
  schemaInfoUser,
  SchemaSafeProductsOrder,
} from "../../schemas/schema";
import { authedAction } from "./zsa";
import { updateProfileSchema } from "@/app/editprofil/EditProfil";
import { put, type PutBlobResult } from "@vercel/blob";
import { del } from "@vercel/blob";
import * as z from "zod";
import { useEdgeStore } from "./edgestore";
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
export const addProductAction = authedAction
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
deliveryStatus: string
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
  deliveryStatus: string
) => {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const orders= await prisma.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: offset,
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
export const handleSetStatusProductAction = action
  .input(
    z.object({
      productStatus: z.string(),
      productId: z.string(),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    const newStatus = input.productStatus;
    const productId = input.productId;

    const update = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status: newStatus,
      },
    });
    return update
    // revalidatePath("/admin/manage-products");
  });

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
export const editProductAction = authedAction
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
export const deleteImagesProductAction = authedAction
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

export const deleteProductAction = authedAction
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
    await prisma.review.create({
      data: {
        comment: input.comment,
        rating: input.rating,
        productId: input.productId,
        userId: input.userId,
      },
    });
  });
export const handleSetDeliveryOrderStatusAction = authedAction
  .input(
    z.object({
      status: z.string(),
      productId: z.string(),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
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
