"use client"
import React from 'react'
import ButtonSortProducts from '../ButtonSortProducts'
import ButtonFiltersCategories from '../ButtonFiltersCategories'

export const TitleProductsByCategories = ({title,description}:{
    title:string,description:string
}) => {
  return (
    <div className="flex flex-col  items-start gap-4 text-muted-foreground">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-blue-500">
         {title}
          </h1>
          <p className="text-muted-foreground">
          {description}
          </p>
        </div>
        <div className="flex gap-1">
          <ButtonSortProducts />
          <ButtonFiltersCategories />
        </div>
      </div>
  )
}

