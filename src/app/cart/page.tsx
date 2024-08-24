import { searchParamsCache } from "@/lib/nuqs";
import { ClientCart } from "./ClientCart";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getCurrentUser } from "@/lib/actions";
import prisma from "../../../db";
import { getPrice } from "@/lib/cart.store";
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
export const PayOrderButton = async() => {
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
  const totalPrice = await getPrice()
  console.log(totalPrice)
return (
  
  <form>
    <Button formAction={async()=>{
      "use server"
      const totalPrice = await getPrice()
      console.log(totalPrice)
      //await prisma.order


console.log("fffff")
}}>Proceed to Checkout</Button>
  </form>

)
}
