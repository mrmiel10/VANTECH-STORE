import React, { Suspense } from "react";
import { SkeletonProductsCards } from "../../../../components/ProductCard";
import TitleProductsByCategories from "../../../../components/componentsPerCategory/TitleProductsByCategories";
import ShowItems from "../../../../components/componentsPerCategory/ShowItems";

const DesktopProductsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  return (
    <div>
      <TitleProductsByCategories
        title="Nos ordinateurs de bureau"
        description="Découvrez notre collection d'ordinateurs de bureau"
      />
      <Suspense fallback={<SkeletonProductsCards />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default DesktopProductsPage;
