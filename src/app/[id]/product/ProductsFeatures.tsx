"use client";
import React, { useCallback, useEffect, useState } from "react";
import { products } from "@/lib/products";
import { productsType } from "@/lib/typeProducts";
import {
  CartProductType,
  deleteProductInCart,
  useCartStore,
} from "@/lib/cart.store";
import { formatPrice } from "@/lib/formatPrice";

import SetQuantity from "../../../../components/product/setQuantity";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Rating } from "@mui/material";
import { toast } from "sonner";
import { Product } from "@prisma/client";
import { Review } from "@prisma/client";
import { ParseImage } from "../../../../components/ProductCard";
const ProductsFeatures = ({ product }: { product: Product & {reviews:Review[]} }) => {
// const ProductsFeatures = ({ product }: { product: productsType }) => {
const productImages = ParseImage(product.images)
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: Number(product.id),
    name: product.name,
    description: product.description,
    brand: product.brand,
    category:product.category,
    quantity: 1,
    // image: product.image,
    image: ParseImage(product.images)[0].image,
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
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct]);
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);
  const productRating =
  product.reviews.reduce((acc, item) => item.rating + acc, 0) /
  product.reviews.length;
  const Router = useRouter();
  return (
    <div>
      <main className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-10 md:px-6 lg:max-w-7xl">
        <div className="flex flex-col justify-end gap-4">
        
          {/* <div className="aspect-square w-full rounded-lg flex"> */}
          <Image
            src={cartProduct.image}
            alt="Product Image"
             width={600}
             height={600}
            className=" w-full rounded-lg object-contain"
          />
          {/* </div> */}
          <div className="border-2 border-muted-foreground rounded-lg h-20 max-h-20 flex justify-center items-center">
            {productImages.map((imageProduct,_)=>(
              <div key={imageProduct.image} className="relative aspect-square w-10">
                <Image src={imageProduct.image} alt="image-du-produit" fill className="object-contain " />
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
                  <p>(4.5 out 5)</p>
                </div>

                <div className="flex max-sm:flex-col sm:items-center gap-1">
                  {" "}
                  <Rating
                    className="border-blue-400 mr-1"
                    value={4.5}
                    readOnly
                    precision={0.5}
                    size="large"
                  />
                  <span className="text-sm "> (12 reviews)</span>
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
                <Button
                  onClick={() => {
                    deleteProductInCart(cartProduct.id);
                  }}
                  className="max-sm:order-2 hover:text-blue-500 transition ease text-muted-foreground"
                  variant={"outline"}
                >
                  Retirer du panier panier
                </Button>
                <Button variant={"defaultBtn"} asChild>
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
                  className="group w-full"
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
