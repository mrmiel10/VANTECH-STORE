"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { generatePagination } from "@/lib/generatePagination";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";


export default  function PaginationTable({totalPages}:
  {
  totalPages:number
}
) {

  const pathname = usePathname();
   const searchParams = useSearchParams();
   const currentPage = Number(searchParams.get("page")) || 1;
  // const currentPage = searchParamsCache.get('page')
  const allPages = generatePagination(currentPage, totalPages);
  const createPageURL = (pageNumber:string | number) => {
        const params = new URLSearchParams(searchParams);
      
   params.set("page", pageNumber.toString());
    // setPage(pageNumber.toString())
    return `${pathname}?${params.toString()}`;
  };

  
  return(
    <>
    {totalPages ? (
        <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
            isDisabled={currentPage <= 1 }
            className={clsx(
              "text-muted-foreground",
              currentPage <= 1 ? "pointer-events-none text-muted-foreground" : ""
            )}
         
              href={createPageURL(currentPage - 1)}
            />
          </PaginationItem>
          {allPages.map((page,_) => (
             page === "..." ? (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              ):
             (
              <PaginationItem key={page}>
                <PaginationLink
                className={clsx(
                 { "text-muted-foreground":currentPage !== page}
                )
                
                }
                // className="text-muted-foreground"
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          ))}
         
          <PaginationItem>
            <PaginationNext
             isDisabled={currentPage >= totalPages }
             className={clsx(
              "text-muted-foreground",
              currentPage >= totalPages  ? "pointer-events-none text-muted-foreground" : ""
            )}
         
              href={createPageURL(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
    ):null}
   
    
    </>
  );
}
