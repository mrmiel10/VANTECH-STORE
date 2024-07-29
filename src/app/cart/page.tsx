
import React from 'react'
import ClientCart from './ClientCart'

const PageCart = ({
  searchParams,
 }: {
 searchParams: Record<string, string | string[] | undefined>
 }) => {
    const currentPage = Number(searchParams?.page) || 1;
  return (
    
     <div className='flex  justify-center items-center'> 
      
        <ClientCart currentPage={currentPage}/>
    </div>
  )
}

export default PageCart