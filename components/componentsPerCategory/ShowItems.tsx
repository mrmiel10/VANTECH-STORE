import { handleFilterSearchParams } from '@/lib/handleFiltersSearchparams';
import React, { Suspense } from 'react'
import ProductCard from '../ProductCard';
import { products } from '@/lib/products';
import { SkeletonProductsCards } from '../ProductCard';

const ShowItems = async ({
    searchParams,
    category,
  }: {
    searchParams?: { [key: string]: string };
    category?:string
  }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(searchParams);
  
    const { filtersByFeatures, filtersSort, filterByCategory } =
      handleFilterSearchParams(searchParams);
      console.log(filtersByFeatures);
      console.log(filtersSort);
      console.log(filterByCategory);
    return (
      // <Suspense  fallback={<SkeletonProductsCards />}>
        <ProductCard products={products} />
    //   </Suspense>
     );
  };
  export default ShowItems
  