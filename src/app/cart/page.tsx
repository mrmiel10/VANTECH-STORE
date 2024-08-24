import { searchParamsCache } from "@/lib/nuqs";
import { ClientCart } from "./ClientCart";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getCurrentUser } from "@/lib/actions";
import prisma from "../../../db";
import { CartProductType, getPrice } from "@/lib/cart.store";
const PageCart = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const paramSearch = searchParamsCache.parse(searchParams);
  
  return (
   <ClientCart >
    <PayOrderButton />
   </ClientCart >
  );
};

export default PageCart;
const PayOrderButton = async() => {
  // const cart:any = localStorage.getItem("cartStorage")
  // const getItems:CartProductType[] | null = JSON.parse(cart)
  // const user = await getCurrentUser()
  // if(!user) return    <Button onClick={(e)=>{
  //   const totalPrice = getPrice()
  //   console.log(totalPrice)
  // }} variant={"defaultBtn"}>
  //    {/* <RegisterLink postLoginRedirectURL="/cart">
  // Proceed to Checkout
  // </RegisterLink> */}
  // eeeeeeeee
  // </Button>
  const totalPrice = getPrice()
  console.log(totalPrice)
return (
  
  <form>
    <Button formAction={async()=>{
      "use server"
      const totalPrice = getPrice()
      console.log(totalPrice)
      //await prisma.order


console.log("fffff")
}}>Proceed to Checkout</Button>
  </form>

)
}
