import React from 'react'
import { FlipWords } from './animation/flipword';
const FirstHeader = () => {
    const words = ["low", "competitive", "affordable", "incredible"];
  return (
    <div className='w-full text-sm text-muted-foreground shadow-sm flex justify-center items-center min-h-10 px-4 py-2'>   <div className="flex max-sm:flex-col">
    <div className="text-center flex items-center"> the best place to buy computer equipment at</div>
    <div className="flex justify-center">
      {" "}
      <FlipWords
        words={words}
        className="text-blue-500 text-sm font-semibold"
      /> <span className="">prices</span>
    </div>
    </div>
  
</div>
  )
}

export default FirstHeader