import { filtersByCategories } from "@/lib/listFiltersProducts";
import { sortFilters } from "@/lib/listFiltersProducts";
import {
  typeFilterByCategory,
  typeFiltersSort,
} from "../../components/componentsPerCategory/ShowItems";
export const handleFilterSearchParams = (searchParams?: { [key: string]: string}
) => {
  let filtersByFeatures: string[]  = [];
  const filtersSort: typeFiltersSort | null = {};
  const filterByCategory: typeFilterByCategory |null  = {};
  const otherParams = ["rating", "price", "new","category"];
  const querySearch: string | undefined = searchParams?.query;
  for (const paramFilter in searchParams) {
    if (!otherParams.includes(paramFilter) && paramFilter !="query") {
      //filtersByFeatures.push(searchParams[paramFilter])
      filtersByFeatures =[...filtersByFeatures,searchParams[paramFilter]]
    }
    else{
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
          if (existingFilterByCategory){
            filterByCategory.category = existingFilterByCategory.value
          }
          if(existingFilterSort){
            let name:string = existingFilterSort.name
            console.log(existingFilterSort.value)
            console.log(name)
            if(name === "price" )  filtersSort.price = existingFilterSort.value
            else if(name === "rating")  filtersSort.rating = existingFilterSort.value
            else filtersSort.new = existingFilterSort.value
          }
    }
  }
  
  return {
    querySearch,
     filtersByFeatures,
     filtersSort,
     filterByCategory,
   };
};
