import { searchParamsCache } from "@/lib/nuqs";
import { ClientCart } from "./ClientCart";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getCurrentUser } from "@/lib/actions";
import prisma from "../../../db";
import { CartProductType, getPrice } from "@/lib/cart.store";

const PageCart = async({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const user = await getCurrentUser()
  const paramSearch = searchParamsCache.parse(searchParams);
  
  return (
   <ClientCart user={user} />
  
  );
};

export default PageCart;

