import React, { Suspense } from "react";
import { SkeletonProductsCards } from "../../../../components/ProductCard";
import { TitleProductsByCategories } from "../../../../components/componentsPerCategory/TitleProductsByCategories";
import { ShowItems } from "../../../../components/componentsPerCategory/ShowItems";

const DesktopProductsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  return (
    <div>
      <Suspense fallback={"loading"}>
      <TitleProductsByCategories
        title="Nos ordinateurs de bureau"
        description="Découvrez notre collection d'ordinateurs de bureau"
      />
      </Suspense>
      
      <Suspense fallback={<SkeletonProductsCards />}>
        <ShowItems searchParams={searchParams} category="desktops" />
      </Suspense>
    </div>
  );
};

export default DesktopProductsPage;
