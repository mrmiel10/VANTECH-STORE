import React from 'react'
import { cn } from '@/lib/utils';
export type SpacingProps ={
   size:"sm"| "md" | "lg" | "xs";
}
export const Spacing = ({size = "md"}:SpacingProps) => {
  return (
    <div 
    
    className={cn({
      "h-4 lg:h-8": size ==="xs",
        "h-8 lg:h-10": size ==="sm",
        "h-10 lg:h-24": size === "md",
        "h-24 lg:h-32": size === "lg",
    })}
    
    />
  )
}
