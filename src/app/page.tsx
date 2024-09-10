import ButtonFiltersCategories from "../../components/GenericComponentsPage/ButtonFiltersCategories";
import ButtonSortProducts from "../../components/GenericComponentsPage/ButtonSortProducts";
import Filters from "../../components/GenericComponentsPage/Filters";
import FiltersSheet from "../../components/GenericComponentsPage/FiltersSheet";
import { HeaderProductsPage } from "../../components/GenericComponentsPage/HeaderProductsPage";
import { ShowItems } from "../../components/GenericComponentsPage/ShowItems";
import { SkeletonProductsCards } from "../../components/ProductCard";
import React, { Suspense } from "react";
import { Spacing } from "../../components/Spacing";
import type { PageProps } from "@/lib/utils";
export default function Home({
  params,
  searchParams,
}: PageProps) {
  return (
    // <div className="container mx-auto max-w-screen-2xl py-5 lg:py-10 px-4 lg:px-6 ">
      <div className="container m-auto p-8 lg:py-16  grid lg:grid-cols-[270px_1fr] gap-10 items-start">
        {/* <FiltersSheet /> */}
        <Filters />
        <div className="">
          <HeaderProductsPage
            title="Explore our product categories"
            description=" Find the best computer equipment for your personnal or professionnal needs"
          />
             <Spacing size="sm" />
          <div className="flex w-full">
            <div className="flex-1" />
            <div className="flex gap-2 flex-wrap">
            <FiltersSheet />
            <ButtonSortProducts />
            <ButtonFiltersCategories />
            </div>
          
          </div>
          <Spacing size="xs" />
          <Suspense fallback={<SkeletonProductsCards />}>
            <ShowItems searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
   
  );
}
