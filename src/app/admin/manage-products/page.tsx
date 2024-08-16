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
import { AdminSearchProducts } from "../../../../components/admin/AdminSearchProducts";

import { ProductsTable } from "../../../../components/admin/ProductsTable";
import { Suspense } from "react";
import { searchParamsCache } from "@/lib/nuqs";
import {  getProductsPages } from "@/lib/actions";
import { PaginationProduct } from "../../../../components/cart/pagination";
export default function ManageProducts({
  searchParams,
 }: {
 searchParams: Record<string, string | string[] | undefined>
 }) {
  const paramSearch = searchParamsCache.parse(searchParams)
  const currentPage = paramSearch.page
  
  return (
    <div>
    
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8">
        <AdminSearchProducts placeholder="search products..." />
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
              <Button size="sm" className="h-8 gap-1" asChild>
                <Link href="/add-products">
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
            <Card x-chunk="">
              <CardHeader>
                <CardTitle className="text-blue-500">Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
              
                  <Suspense fallback={"Loading"}>
                  <DisplayProductsAndPagination currentPage={currentPage} />
                  </Suspense>
                
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
export const DisplayProductsAndPagination = async({currentPage}:{currentPage:number})=>{
  const searchProduct = searchParamsCache.get("searchProduct")
  const totalPages = await getProductsPages(searchProduct)
  return(
    <>
     <ProductsTable />
     <PaginationProduct totalPages={totalPages} />
    </>
  )
}
