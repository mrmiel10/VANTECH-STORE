"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../db";
import { uploadImageType } from "@/app/admin/add-products/AddProductsForm";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { ParseImages } from "../../components/admin/ProductsTable";
import firebaseApp from "./firebase";

type product = {
  images: uploadImageType[];
  name: string;
  description: string;
  brand: string;
  category: string;
  status: string;
  price: number;
};

const addProducts = async (products: product) => {
  try {
    await prisma.product.create({
      data: {
        name: products.name,
        description: products.description,
        brand: products.brand,
        category: products.category,
        status: products.status,
        price: products.price,
        images: products.images,
      },
    });
  } catch (error) {
    throw error;
  }
};
export default addProducts;
export const getProductsPages = async (searchProduct: string) => {
  try {
    const products = await prisma.product.count({
      where: {
        OR: [
          {
            name: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            description: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            category: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            brand: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            status: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            price:
              searchProduct && Number(searchProduct)
                ? {
                    equals: Number(searchProduct),
                  }
                : undefined,
          },
        ],
      },
    });
    return products;
  } catch (error) {
    throw error;
  }
};
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
const ITEMS_PER_PAGE = 3;
export const getFilteredProducts = async (
  searchProduct: string,
  currentPage: number
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
            name: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            description: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            category: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            brand: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            status: searchProduct
              ? {
                  contains: searchProduct,
                  mode: "insensitive",
                }
              : undefined,
          },
          {
            price:
              searchProduct && Number(searchProduct)
                ? {
                    equals: Number(searchProduct),
                  }
                : undefined,
          },
        ],
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
export const handleSetStatusProduct = async (formData: FormData) => {
  const status = formData.get("status") as string;
  const productId = formData.get("productId") as string;
  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status,
      },
    });
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
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const editProduct = async (productData: product, productId: string) => {
  await prisma.product.update({
    where: {
      id: productId,
    },
    data:{
      name:productData.name,
      description:productData.description ?? undefined,
      price:productData.price,
      category:productData.category,
      status:productData.status
    }
  });
};
export const deleteStorageImages = async(images:{image:string}[]) =>{
  const storage = getStorage(firebaseApp);
  for(const item of ParseImages(images)){
    const imageRef = ref(storage, item.image)
    await deleteObject(imageRef)
    console.log("image supprimée",item.image)
}
}
export const deleteProduct = async(productId:string) =>{
  try {
    await prisma.product.delete({
      where:{
        id:productId
      }
    })
  } catch (error) {
    throw error
  }

}
