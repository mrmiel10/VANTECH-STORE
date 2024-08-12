import { filtersByCategories, sortFilters } from "./listFiltersProducts";

export const handleFilterSearchParams = (searchParams?: {
    [key: string]: string;
  }) => {
    const filtersByFeatures: { [key: string]: string } = {};
    const filtersSort: { [key: string]: string } = {};
    const filterByCategory: { [key: string]: string } = {};
    // const searchValues = Object.values(searchParams!);
 
    const querySearch = searchParams?.query
    for (const paramFilter in searchParams) {
      if(paramFilter !== "query"){
        const existingFilterSort = sortFilters.find(
          (filter, index) =>
            filter.name === paramFilter &&
            filter.value === searchParams[paramFilter]
        );
        const existingFilterByCategory = filtersByCategories.find(
          (filter, index) =>
            filter.name === paramFilter &&
            filter.value === searchParams[paramFilter]
        );
        // const existingFilterByFeatures = filtersByFeatures.find(
        //   (filter, index) =>
        //     filter.name === paramFilter &&
        //     filter.value === searchParams[paramFilter]
        // );
    
        if (existingFilterByCategory)
          filterByCategory[existingFilterByCategory.name] =
            existingFilterByCategory.value;
        else if (existingFilterSort)
          filtersSort[existingFilterSort.name] = existingFilterSort.value;
        else filtersByFeatures[paramFilter] = searchParams[paramFilter];
      }
    
    }
  
    return {
     querySearch,
      filtersByFeatures,
      filtersSort,
      filterByCategory,
    };
  };
  