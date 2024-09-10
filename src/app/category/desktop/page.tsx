import React, { Suspense } from "react";
import { SkeletonProductsCards } from "../../../../components/ProductCard";
import { HeaderProductsPage } from "../../../../components/GenericComponentsPage/HeaderProductsPage";
import { ShowItems } from "../../../../components/GenericComponentsPage/ShowItems";
import FiltersSheet from "../../../../components/GenericComponentsPage/FiltersSheet";
import ButtonSortProducts from "../../../../components/GenericComponentsPage/ButtonSortProducts";
import ButtonFiltersCategories from "../../../../components/GenericComponentsPage/ButtonFiltersCategories";
import { Spacing } from "../../../../components/Spacing";
const DesktopProductsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  return (
    <section>
      <HeaderProductsPage
        title="Ours desktops computers"
        description="Découvrez notre collection d'ordinateurs de bureau"
      />
    <Spacing size="md" />
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
          <ShowItems searchParams={searchParams} category="desktops" />
        </Suspense>
      
    </section>
  );
};

export default DesktopProductsPage;
