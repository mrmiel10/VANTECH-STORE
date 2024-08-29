"use client"
import React from 'react'
import ButtonSortProducts from '../ButtonSortProducts'
import ButtonFiltersCategories from '../ButtonFiltersCategories'
import FiltersSheet from '../FiltersSheet'
export const TitleProductsByCategories = ({title,description}:{
    title:string,description:string
}) => {
  return (
    <div className="flex flex-col  items-start gap-8 text-muted-foreground">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-blue-500">
         {title}
          </h1>
          <p className="text-muted-foreground">
          {description}
          </p>
        </div>
        <div className="flex gap-2 w-full justify-end">
          <FiltersSheet  />
          <ButtonSortProducts />
          <ButtonFiltersCategories />
        </div>
      </div>
  )
}

