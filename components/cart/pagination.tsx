"use client"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { generatePagination } from '@/lib/generatePagination';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

export const PaginationProductCart = ({totalPages}:{totalPages:number}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const allPages = generatePagination(currentPage, totalPages);
    const createPageURL = (pageNumber:string | number) => {
        const params = new URLSearchParams(searchParams);
      
   params.set("page", pageNumber.toString());
    // setPage(pageNumber.toString())
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
    {totalPages ? (
        <Pagination className=''>
        <PaginationContent >
          <PaginationItem className='max-xs:order-2'>
            <PaginationPrevious
            isDisabled={currentPage <= 1 }
              className={`${currentPage <= 1 ? "pointer-events-none" : ""}`}
              href={createPageURL(currentPage - 1)}
            />
          </PaginationItem>
          <div className='flex max-xs:order-1'>
          {allPages.map((page,index) => (
             page === "..." ? (
                <PaginationItem key={index} >
                  <PaginationEllipsis />
                </PaginationItem>
              ):
             (
              <PaginationItem key={index}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          ))}</div>
        
         
          <PaginationItem className='max-xs:order-3'>
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
  )
}

