import Filters from "../../components/Filters";
import FiltersSheet from "../../components/FiltersSheet";
import { TitleProductsByCategories } from "../../components/componentsPerCategory/TitleProductsByCategories";
import { ShowItems } from "../../components/componentsPerCategory/ShowItems";
import { SkeletonProductsCards } from "../../components/ProductCard";
import React, { Suspense } from "react";


export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  return (
    <div className="container mx-auto max-w-screen-2xl py-5 lg:py-10 px-4 lg:px-6 ">

    <div className=" grid lg:grid-cols-[270px_1fr] gap-10 items-start">
      {/* <FiltersSheet /> */}
      <Filters />
      <div className="grid gap-6 md:gap-8 h-ful auto-rows-max">
        <TitleProductsByCategories
          title="Explore our product categories"
          description=" Find the best computer equipment for your personnal or professionnal needs"
        />

        <Suspense fallback={<SkeletonProductsCards />}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
    
    </div>
    </div>
  );
}
