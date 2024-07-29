"use client"
import React, { useCallback, useEffect, useState } from "react";
import { products } from "@/lib/products";
import { productsType } from "@/lib/typeProducts";
import { CartProductType, deleteProductInCart, useCartStore } from "@/lib/cart.store";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { LucideCheckCircle } from "lucide-react";
import SetQuantity from "../../../../components/product/setQuantity";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart.context";
import { Separator } from "@/components/ui/separator";
import { useShallow } from "zustand/react/shallow";
import ProductDetails from "./productDetails";
interface IParams {
    id:string
}
const PageProduct = ({params} : {params:IParams}) => {
    console.log(params. id)
  const product = products.find((item) => item.id === params.id);
  if (!product) return <p>Pas de produit disponible</p>;
  return (
    <div className="overflow-hidden min-h-10">
      {/* <ProductDetails /> */}
      <ProductsFeatures product={product} />
    </div>
  );
};

export default PageProduct;
const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};
 const ProductsFeatures = ({ product }: { product: productsType }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    quantity: 1,
    image: product.image,
    price: product.price,
  });
  const {cart,toggleCart,isInCart} = useCartStore(useShallow((s)=>({
    cart:s.cart,
    toggleCart:s.toggleCart,
   isInCart:s.cart.some((item)=> item.id === product.id)
   })))
  
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
//   useEffect(()=>{
//     if (cart) {
//         const existingIndex = cart.findIndex(
//           (item) => item.id === product.id
//         );
//         if (existingIndex > -1) setIsProductInCart(true);
//       }
//   },[cart,product.id])
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
  
  const Router = useRouter()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage cartProduct={cartProduct} />
      <div>
        <div className=" grid grid-cols-1 gap-8 text-muted-foreground text-sm">
          <div className="">
          <h2 className="mb-3 text-3xl font-medium text-blue-700">{product.name}</h2>
          <p className="font-bold text-lg">{formatPrice(product.price)}</p>
          <Separator orientation="horizontal" />
          </div>
         
         
          {/* <Horizontal /> */}
          <div className="text-justify ">
            <p>{product.description}</p>
            <Separator orientation="horizontal" />
          </div>
         

          {/* <Horizontal /> */}

          <div className="">
            <span className="font-semibold">marque: </span>
            <span>{product.brand}</span>
            <Separator orientation="horizontal" />
          </div>
        
          {/* <Horizontal /> */}
          {isInCart ? (
            <div>
              <p className="mb-2 text-gray-500 flex items-center gap-1">
                <LucideCheckCircle className="text-teal-400" size={20} />
                <span>Produit ajouté au panier</span>
              </p>
              <div className="flex gap-4">
             
                <Button
                variant={"outline"}
                  onClick={() => deleteProductInCart(cartProduct.id)}
                  className=" max-w-[300px] hover:text-blue-500"
                >
                 Retirer du panier
                </Button>
                <Button
                variant={"default"}
                  onClick={() => Router.push("/cart")}
                  className="  max-w-[300px] bg-blue-500 hover:bg-blue-500/90"
                >
                  Voir le panier
                </Button>
             
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              < SetQuantity
                cartProduct={cartProduct}
                 handleQtyIncrease={handleQtyIncrease}
                 handleQtyDecrease={handleQtyDecrease}
              />
              
              {/* <Horizontal /> */}
              <div>
                <Button
                variant={"default"}
                  onClick={() => toggleCart(cartProduct)}
                  className="max-w-[300px] bg-blue-500 hover:bg-blue-500/90"
                >
                  Ajouter au panier
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 const ProductImage = ({
    cartProduct
}: {
    cartProduct: CartProductType;
}) => {
  return (
    <div
      className="
    w-full
  h-full
  max-h-[400px]
  min-h-[300px]
  sm:min-h-[500px]
  relative aspect-square"
    >
      <Image
        fill
        className="w-full
               h-full
                object-contain"
        src={cartProduct.image}
        alt={cartProduct.name}
      />
    </div>
  );
};
