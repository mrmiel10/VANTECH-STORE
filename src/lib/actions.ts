"use server";
import prisma from "../../db";
import { uploadImageType } from "@/app/admin/add-products/AddProductsForme";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { action } from "./zsa";
import { del } from "@vercel/blob";
import * as z from "zod";
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

export const getReviewsPages = async (filterRating: number | undefined) => {
  try {
    const count = await prisma.review.count({
      where: {
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
      },
    });
    const totalPages = Math.ceil(Number(count) / 3);
    return totalPages;
  } catch (error) {}
};
export const getProductsPages = async (
  searchProduct: string,
  productStatus: string
) => {
  try {
    const count = await prisma.product.count({
      where: {
        AND: [
          {
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
          },
          {
            status: productStatus
              ? {
                  contains: productStatus,
                  mode: "insensitive",
                }
              : undefined,
          },
        ],
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
  paymentStatus?: string,
  userId?: string
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
              OR: [
                {
                  firstName: {
                    contains: searchOrder,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: searchOrder,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: searchOrder,
                    mode: "insensitive",
                  },
                },
              ],
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
              contains: deliveryStatus,
              mode: "insensitive",
            }
          : undefined,

        status: paymentStatus
          ? {
              equals: paymentStatus,
              mode: "insensitive",
            }
          : undefined,
        userId: userId ?? undefined,
      },
    });
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return { totalPages, count };
  } catch (error) {
    throw error;
  }
};
export const getFilteredOrders = async (
  searchOrder: string,
  currentPage: number,
  deliveryStatus: string,
  paymentStatus?: string,
  orderByDate?: string,
  userId?: string
) => {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log("createdDate", orderByDate);
  try {
    const orders = await prisma.order.findMany({
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: {
        createdDate: orderByDate
          ? orderByDate.toLowerCase() === "asc"
            ? "asc"
            : "desc"
          : undefined,
      },

      where: {
        OR: [
          {
            id: {
              equals: searchOrder,
            },
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
              OR: [
                {
                  firstName: {
                    contains: searchOrder,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: searchOrder,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: searchOrder,
                    mode: "insensitive",
                  },
                },
              ],
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
              contains: deliveryStatus,
              mode: "insensitive",
            }
          : undefined,
        status: paymentStatus
          ? {
              contains: paymentStatus,
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

export const getAdmins = async (
  currentPage: number,
  permissions: string[],
  role?: string,
  search?: string
) => {
  console.log(permissions);
  noStore();
  try {
    const admins = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },

              {
                lastName: {
                  contains: search,
                  mode: "insensitive",
                },
              },

              {
                firstName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
          {
            role:
              role === "ADMIN"
                ? {
                    equals: "ADMIN",
                  }
                : role === "SUPER ADMIN"
                  ? {
                      equals: "SUPERADMIN",
                    }
                  : {
                      in: ["ADMIN", "SUPERADMIN"],
                    },
            //   ,
            //  permissions:{

            //  hasSome:permissions
            //  }
          },
        ],
      },
    });

    return admins;
  } catch (error) {
    throw error;
  }
};

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
export const isAdmin = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();
    if (!sessionUser) return null;
    const isAdmin = await prisma.user.findUnique({
      where: {
        kindeId: sessionUser.id,
        role: {
          in: ["ADMIN", "SUPERADMIN"],
        },
      },
    });
    return isAdmin;
  } catch (error) {
    throw error;
  }
};

// export const createTodoAction = action
//   .input(
//     z.object({
//       title: z.string().min(2, { message: "at least 2 characters" }),
//     })
//   )
//   .handler(async ({ input }) => {
//     console.log(input);
//   });
// export const fileUploadAction = action
//   .input(
//     z.object({
//       name: z.string(),
//       file: z
//         .instanceof(File)

//         .refine(
//           (file) => file.size > 0 && file.size < 1048576,
//           "File size must be less than 1Mo"
//         ),
//     }),
//     {
//       type: "formData",
//     }
//   )
//   .handler(async ({ input }) => {
//     const { name, file } = input;
//     console.log(file);
//     return "File uploaded successfully";
//   });

export const deleteImageProfil = async (userImage: string) => {
  await del(userImage);
};

export const getAmountOrdersOfPeriod = async (start?: Date, end?: Date) => {
  // noStore()

  const totalAmount = await prisma.order.aggregate({
    //la semaine en cours, je recupere le montant total des commandes passées
    where: {
      createdDate:
        start && end
          ? {
              gte: start,
              lte: end,
            }
          : undefined,
    },
    _sum: {
      amount: true,
    },
  });
  return totalAmount._sum.amount;
};

export const getPaidOrUnpaidOrdersOfPeriod = async (
  status: string,
  start?: Date,
  end?: Date
) => {
  const orders = await prisma.order.aggregate({
    //En fonction du status de paiment, je recupere le montal total de commandes et le nombre de commandes

    where: {
      createdDate:
        start && end
          ? {
              gte: start,
              lte: end,
            }
          : undefined,
      status,
    },
    _sum: {
      amount: true,
    },
    _count: true,
  });
  const amountOrders = orders._sum.amount;
  const totalOrders = orders._count;
  return {
    amountOrders,
    totalOrders,
  };
};
