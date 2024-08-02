import React, { Suspense } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Rating } from "@mui/material";

import FiltersByRating from "./FiltersByRating";
import { searchParamsCache } from "@/lib/nuqs";
const ListRating = () => {

const filterRating = searchParamsCache.get("rating")!

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold text-blue-500">Customer Reviews</h2>
    <FiltersByRating />
     <p>Vous avez sélectionnez {Number(filterRating )} étoiles</p> 
      <div className="grid gap-6">
       
        <div className="flex gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="image-user" src="/placeholder-user.jpg" />
            <AvatarFallback className="text-blue-500">CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-2">
            <div className="flex md:items-center max-md:gap-2 gap-4 max-md:flex-col">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold text-blue-500">Alex Smith</h3>
                <time className=" text-muted-foreground italic font-bold">3 weeks ago</time>
              </div>
              <div className="flex items-center gap-0.5 md:ml-auto">
                <Rating
                  className="border-blue-400 mr-1"
                  value={4.5}
                  readOnly
                  precision={0.5}
                  size="small"
                />
              </div>
            </div>
            <div className="text-sm leading-loose text-muted-foreground">
              <p>
                I recently purchased this t-shirt and I'm really happy with it.
                The fit is great and the material is high quality. I would
                definitely recommend this to anyone looking for a new t-shirt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRating;
// const ShowReviews = async({
  
// }) =>{
//   return (
//     <Suspense fallback>

//     </Suspense>
//   )
//   <div className="grid gap-6">
//   <div className="flex gap-4">
//     <Avatar className="w-10 h-10 border">
//       <AvatarImage src="/placeholder-user.jpg" />
//       <AvatarFallback>CN</AvatarFallback>
//     </Avatar>
//     <div className="grid gap-2">
//       <div className="flex items-center gap-4">
//         <div className="grid gap-0.5 text-sm">
//           <h3 className="font-semibold">Sarah Johnson</h3>
//           <time className="text-sm text-muted-foreground">
//             2 days ago
//           </time>
//         </div>
//         <div className="flex items-center gap-0.5 ml-auto">
//           <Rating
//             className="border-blue-400 mr-1"
//             value={4.5}
//             readOnly
//             precision={0.5}
//             size="small"
//           />
//         </div>
//       </div>
//       <div className="text-sm leading-loose text-muted-foreground">
//         <p>
//           I've been wearing this t-shirt for a few weeks now and I'm
//           really impressed with the quality. The fabric is soft and
//           comfortable, and it's held up well to washing. Highly recommend!
//         </p>
//       </div>
//     </div>
//   </div>
//   <div className="flex gap-4">
//     <Avatar className="w-10 h-10 border">
//       <AvatarImage src="/placeholder-user.jpg" />
//       <AvatarFallback className="text-blue-500">CN</AvatarFallback>
//     </Avatar>
//     <div className="grid gap-2">
//       <div className="flex items-center gap-4">
//         <div className="grid gap-0.5 text-sm">
//           <h3 className="font-semibold text-blue-500">Alex Smith</h3>
//           <time className=" text-muted-foreground italic font-bold">3 weeks ago</time>
//         </div>
//         <div className="flex items-center gap-0.5 ml-auto">
//           <Rating
//             className="border-blue-400 mr-1"
//             value={4.5}
//             readOnly
//             precision={0.5}
//             size="small"
//           />
//         </div>
//       </div>
//       <div className="text-sm leading-loose text-muted-foreground">
//         <p>
//           I recently purchased this t-shirt and I'm really happy with it.
//           The fit is great and the material is high quality. I would
//           definitely recommend this to anyone looking for a new t-shirt.
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// }