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
interface IParams {
    id:string
}
const PageProduct = ({params} : {params:IParams}) => {
    console.log(params. id)
  const product = products.find((item) => item.id === params.id);
  if (!product) return <p>Pas de produit disponible</p>;
  return (
    <div className="overflow-hidden min-h-10">
      <ProductsFeatures product={product} />
    </div>
  );
};

export default PageProduct;
const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};
export const ProductsFeatures = ({ product }: { product: productsType }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    quantity: 1,
    image: product.image,
    price: product.price,
  });
  const cart = useCartStore((s)=>s.cart)
  const toggleCart = useCartStore((s)=>s.toggleCart)
  const isInCart = useCartStore(useCallback((s)=> s.cart.some((item) => item.id === product.id),[cart]))
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
        <div className="flex flex-col gap-1 text-gray-500 text-sm">
          <h2 className="text-3xl font-medium text-blue-700">{product.name}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>

          <Horizontal />
          <div className="text-justify">{product.description}</div>
          <Horizontal />

          <div>
            <span className="font-semibold">marque: </span>
            <span>{product.brand}</span>
          </div>

          <Horizontal />
          {isInCart ? (
            <>
              <p className="mb-2 text-gray-500 flex items-center gap-1">
                <LucideCheckCircle className="text-teal-400" size={20} />
                <span>Produit ajouté au panier</span>
              </p>
              <div className="flex gap-4">
              <Button
                variant={"outline"}
                  onClick={() => Router.push("/cart")}
                  className="border bg-transparent border-orange-500 max-w-[300px] text-orange-500 hover:bg-transparent"
                >
                  Voir le panier
                </Button>
                <Button
                variant={"default"}
                  onClick={() => deleteProductInCart(cartProduct.id)}
                  className="border bg-transparent border-orange-500 max-w-[300px] text-orange-500 hover:bg-transparent"
                >
                 Retirer du panier
                </Button>
             
              </div>
            </>
          ) : (
            <>
              < SetQuantity
                cartProduct={cartProduct}
                 handleQtyIncrease={handleQtyIncrease}
                 handleQtyDecrease={handleQtyDecrease}
              />
              <Horizontal />
              <div>
                <Button
                  onClick={() => toggleCart(cartProduct)}
                  className="max-w-[300px] bg-orange-500 hover:bg-orange-700"
                >
                  Ajouter au panier
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export const ProductImage = ({
    cartProduct
}: {
    cartProduct: CartProductType;
}) => {
  return (
    <div
      className="
  h-full
  max-h-[500px]
  min-h-[300px]
  sm:min-h-[400px]
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
