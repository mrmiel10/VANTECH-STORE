"use client"
import React from 'react'
import { FlipWords } from '../animations/flipwords';
import { usePathname } from 'next/navigation';
import TextFlip from './FlipText';
const FirstHeader = () => {
   
    const pathname = usePathname()
    const words = ["low", "competitive", "affordable", "incredible"];


    for(const pth of fakePathname){
      if(pathname.startsWith(pth)){
        return null
      }
    }
  return (
    <div className='w-full bg-blue-500 text-muted-foreground shadow-sm flex justify-center items-center max-xs:min-h-8 min-h-12 px-4 py-2'>  
   <TextFlip />
  
</div>
  )
//   return (
//     <div className='w-full text-sm text-muted-foreground shadow-sm flex justify-center items-center min-h-10 px-4 py-2'>   <div className="flex max-sm:flex-col">
//     <div className="text-center flex items-center"> the best place to buy computer equipment at</div>
//     <div className="flex justify-center">
//       {" "}
//       <FlipWords
//         words={words}
//         className="text-blue-500 text-sm font-semibold"
//       /> <span className="">prices</span>
//     </div>
//     </div>
  
// </div>
//   )
}

export default FirstHeader
export const fakePathname = ["/editprofil","/admin"]