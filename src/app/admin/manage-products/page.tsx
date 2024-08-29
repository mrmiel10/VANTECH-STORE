import Link from "next/link";
import {
  File,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  User,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Status from "../../../../components/admin/Status";
import FilterStatusProducts from "../../../../components/admin/FilterStatusProducts";
// import MobileProducts from "../../../../../components/admin/MobileProductsAdmin";
import { AdminSearch } from "../../../../components/admin/AdminSearch";

import { ProductsTable } from "../../../../components/admin/ProductsTable";
import { Suspense } from "react";
import { searchParamsCache } from "@/lib/nuqs";
import { getProductsPages,} from "@/lib/actions";
import PaginationTable from "../../../../components/Pagination";
import { SkeletonLoadingManageProducts } from "../../../../components/Skeletons";
import { Alert,AlertTitle,AlertDescription } from "@/components/ui/alert";
import searchInTable from "../../../../public/search.png";

export default function ManageProducts({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const paramSearch = searchParamsCache.parse(searchParams);
  const currentPage = paramSearch.page;

  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8">
        <AdminSearch placeholder="search products..." />
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived" className="hidden sm:flex">
                Archived
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <FilterStatusProducts />

              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button
                variant={"defaultBtn"}
                size="sm"
                className="h-8 gap-1"
                asChild
              >
                <Link href="/admin/add-products">
                  {" "}
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-500 ">Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<SkeletonLoadingManageProducts />}>
                  <DisplayProductsAndPagination currentPage={currentPage} />
                </Suspense>
              </CardContent>
              <CardFooter>
                <ShowingNumberProducts />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
const DisplayProductsAndPagination = async ({
  currentPage,
}: {
  currentPage: number;
}) => {
  //await new Promise((resolve) => setTimeout(resolve, 20000));
  const searchProduct = searchParamsCache.get("search");
  const productStatus = searchParamsCache.get("status");
  const { totalPages } = await getProductsPages(searchProduct, productStatus);
  console.log(`totalsPages:${totalPages}`);
  if(totalPages === 0 ) return <NoProducts />
  return (
    <div className="grid grid-cols-1 auto-rows-max gap-4">
      <ProductsTable />
      <PaginationTable totalPages={totalPages} />
    </div>
  );
};
const ShowingNumberProducts = async () => {

  const searchProduct = searchParamsCache.get("search");
  const productStatus = searchParamsCache.get("status");
  const currentPage = searchParamsCache.get("page");
  const ITEMS_PER_PAGE = 3;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { count } = await getProductsPages(searchProduct, productStatus);
  console.log("count",count)
  const totalProducts = count;
  const lastProduct = count > (offset + ITEMS_PER_PAGE) ? (offset + ITEMS_PER_PAGE) : count
  if (totalProducts === 0) return null;
  return (
    <div className="text-xs text-muted-foreground">
    
      {(offset + 1)  === totalProducts ? (
        <div>Showing one product</div>
      ) : (
        <div>
          {" "}
          Showing{" "}
          <strong>
            {offset + 1} - {lastProduct}
          </strong>{" "}
          of <strong>{totalProducts}</strong> products
        </div>
      )}
    </div>
  );
};
const NoProducts = () =>{
  return (
    <div className="container flex flex-col gap-8 justify-center items-center px-5 md:px-10  max-w-5xl">
          <Alert className="p-6">
    <div className="flex sm:items-stretch max-sm:flex-col items-center">
      <div className="relative w-64 aspect-square">
        <Image src={searchInTable} alt={"cartImage"} className=" object-contain" />
      </div>
      <div className="max-sm:self-stretch">
        <div className="h-full flex flex-col mt-8 max-sm:space-y-2 gap-4">
          <div className="text-lg space-y-2">
            <AlertTitle className="font-bold text-blue-500">
        No products match your filter!
            </AlertTitle>
            <AlertDescription className="text-muted-foreground">
        Please try another filter
            </AlertDescription>
          </div>
        
        
        </div>
      </div>
    </div>
  </Alert>
    </div>

  )

}