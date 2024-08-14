"use client"
import { filtersByCategories, sortFilters } from "./listFiltersProducts";

export const HandleFilterSearchParams = (searchParams?: {
    [key: string]: string;
  }) => {
    const filtersByFeatures: { [key: string]: string } = {};
//    const filtersSort: { price:string,rating:string,new:string} | null = null;
    const filterByCategory: { [key: string]: string } = {};
  const [filtersSort,setFiltersSort] = useState< { price:string,rating:string,new:string} | null>(null)
 
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
      
    
        if (existingFilterByCategory)
          filterByCategory[existingFilterByCategory.name] =
            existingFilterByCategory.value;
        else if (existingFilterSort && !filtersSort)
          filtersSort[existingFilterSort.name]! = existingFilterSort.value;
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
  