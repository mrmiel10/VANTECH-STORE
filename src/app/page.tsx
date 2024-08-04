import Filters from "../../components/Filters";
import FiltersSheet from "../../components/FiltersSheet";
import TitleProductsByCategories from "../../components/componentsPerCategory/TitleProductsByCategories";
import ShowItems from "../../components/componentsPerCategory/ShowItems";
import { SkeletonProductsCards } from "../../components/ProductCard";
import React, { Suspense } from 'react'
export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {

  return (
    <div className="container mx-auto px-4 lg:px-6 grid lg:grid-cols-[270px_1fr] gap-10 items-start">
      <FiltersSheet />
      <Filters />
      <div className="grid gap-6 md:gap-8">
        <TitleProductsByCategories
          title=" Nos produits"
          description=" Découvrez notre collection de produits !"
        />
         <Suspense fallback={<SkeletonProductsCards />}> 
        <ShowItems searchParams={searchParams} />
         </Suspense> 
      </div>
     
    </div>
  );
}
// const ShowItems = async ({
//   searchParams,
//   category,
// }: {
//   searchParams?: { [key: string]: string };
//   category?:string
// }) => {
//   // await new Promise((resolve) => setTimeout(resolve, 3000));
//   console.log(searchParams);

//   const { filtersByFeatures, filtersSort, filterByCategory } =
//     handleFilterSearchParams(searchParams);
//     console.log(filtersByFeatures);
//     console.log(filtersSort);
//     console.log(filterByCategory);
//   return (
//     <Suspense  fallback={<SkeletonProductsCards />}>
//       <ProductCard products={products} />
//     </Suspense>
//   );
// };
