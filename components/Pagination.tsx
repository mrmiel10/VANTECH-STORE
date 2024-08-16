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
              className={`${currentPage <= 1 ? "pointer-events-none" : ""}`}
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
              className={`${
                currentPage >= totalPages ? "pointer-events-none" : ""
              }`}
              href={createPageURL(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
    ):null}
   
    
    </>
  );
}
