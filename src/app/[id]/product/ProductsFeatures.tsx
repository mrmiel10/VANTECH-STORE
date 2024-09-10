"use client";
import React, { useCallback, useState } from "react";
import {
  CartProductType,
  deleteProductInCart,
  useCartStore,
} from "@/lib/cart.store";
import { formatPrice } from "@/lib/utils";

import SetQuantity from "../../../../components/product/setQuantity";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Rating } from "@mui/material";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import { Review } from "@prisma/client";
import { ParseProductImages } from "@/lib/utils";
import clsx from "clsx";
const ProductsFeatures = ({ product }: { product: Product & {reviews:Review[]} }) => {
// const ProductsFeatures = ({ product }: { product: productsType }) => {
const productImages = ParseProductImages(product.images)
const [selectProductImage,setSelectProductImage] = useState<{
  image:string
}>(productImages[0])
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    category:product.category,
    status:product.status,
    quantity: 1,
    // image: product.image,
    images: productImages,
    // selectedImg: ParseImage(product.images)[0].image,
    price: product.price,
  });
  const { cart, toggleCart, isInCart } = useCartStore(
    useShallow((s) => ({
      cart: s.cart,
      toggleCart: s.toggleCart,
      isInCart: s.cart.some((item) => item.id === product.id),
    }))
  );

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => {
      if(prev && prev.quantity) {
        return { ...prev, quantity: ++prev.quantity }
      }
        
      
      return prev
    });
  }, [cartProduct]);
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      if(prev && prev.quantity) {
        return { ...prev, quantity: --prev.quantity }
      }
        
      
      return prev
    });
  }, [cartProduct]);
  const productRating =
  product.reviews.reduce((acc, item) => item.rating + acc, 0) /
  product.reviews.length;

  return (
    <div>
      <main className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-10 md:px-6 lg:max-w-7xl">
        <div className="flex flex-col  gap-4 shrink-0">
        
          {/* <div className="aspect-square w-full rounded-lg flex"> */}
        <div className="w-full aspect-square relative">
        <Image
              src={ selectProductImage.image}
              alt="Product Image"
             fill
              className=" w-full rounded-lg object-contain"
            />
      
        </div>
             
          {/* </div> */}
          <div className="border-2 border-slate-300 rounded-lg h-16 max-h-20 flex justify-center items-center">
            {productImages.map((imageProduct,_)=>(
              <div onClick={()=>setSelectProductImage((prev)=>{
                return {
                  ...prev,
                  image:imageProduct.image
                }
              })} key={imageProduct.image} className={clsx(
                "cursor-pointer p-1 rounded-md",
                imageProduct.image === selectProductImage.image ? "border" : "border-none"
              )}>
                 <div  className=" relative aspect-square h-10 w-10 rounded-md">
                <Image src={imageProduct.image} alt="image-du-produit" fill className="object-contain " />
              </div>
              </div>
             
            ))}
          </div>
         
        </div>
        <div className="grid gap-4">
          <div className="grid gap-8 ">
            <div className="flex max-sm:flex-col  sm:items-center max-sm:gap-4 gap-8 text-muted-foreground">
              <div className="space-x-2">
                <Badge
                  variant="outline"
                  className="text-sm text-blue-500 border-blue-500"
                >
                  Category:
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {/* //Laptop */}
                  {product.category}
                  </span>
              </div>
              <div className="space-x-2">
                <Badge
                  variant="outline"
                  className="text-sm text-blue-500 border-blue-500"
                >
                  Marque:
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {/* HP */}
                  {product.brand}
                  </span>
              </div>
            </div>
            <div className="space-y-3 h-auto">
              <h1 className="text-2xl font-bold text-blue-500">
                {product.name}
              </h1>
              <h4 className="font-medium leading-loose text-muted-foreground">
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consectetur, voluptatem aliquam! Sed aperiam quasi blanditiis
                quaerat eos, hic eligendi dolorem dolor maiores repellat
                adipisci incidunt at ut natus eveniet reprehenderit quam
                asperiores aspernatur. Tenetur illum officiis minima in,
                consequatur nobis. */}
                {product.description}
              </h4>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex flex-col  gap-1 font-semibold">
                <div className="flex">
                  <p>({productRating} out 5)</p>
                </div>

                <div className="flex max-sm:flex-col sm:items-center gap-1">
                  {" "}
                  <Rating
                    className="border-blue-400 mr-1"
                    value={productRating}
                    readOnly
                    precision={0.5}
                    size="large"
                  />
                    {product.reviews.length !==0  ? (
                        <span className="text-sm "> 
                  
                      ( {product.reviews.length}{" "}review(s))
    
                      </span>
                    ):(
                      <span className="text-sm "> 
                  
                      (No reviews)
  
                    </span>
                    )}
                
                </div>
              </div>
            </div>
            <div className="flex">
              {" "}
              <p className="text-4xl font-bold text-blue-500">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {isInCart ? (
              <div className="flex max-xs:flex-col gap-4">
                {cartProduct.id && (
                  <Button
                  onClick={() => {
                    deleteProductInCart(product.id);
                  }}
                  className="max-sm:order-2 hover:text-blue-500 transition ease text-muted-foreground"
                  variant={"outline"}
                >
                  Retirer du panier
                </Button>
                )}
                
                <Button  variant={"defaultBtn"} asChild>
                  <Link href="/cart">Voir le panier</Link>
                </Button>
              </div>
            ) : (
              <>
                <SetQuantity
                  cartProduct={cartProduct}
                  handleQtyIncrease={handleQtyIncrease}
                  handleQtyDecrease={handleQtyDecrease}
                />

                <Button
                  onClick={() => {
                    toggleCart(cartProduct);
                    toast("Product added to cart");
                  }}
                  size="lg"
                  className=" w-full"
                  variant="defaultBtn"
                >
                  Add to Cart
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProductsFeatures;
