import { Skeleton } from "@/components/ui/skeleton";
import ListRating from "@/app/[id]/product/ListRating";
export const ProductFeaturesLoading = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-10 md:px-6 lg:max-w-7xl">
      <Skeleton className="w-full rounded-lg" />
      <div className="grid gap-4">
        <div className="grid gap-8 ">
          <div className="flex max-sm:flex-col  sm:items-center max-sm:gap-4 gap-8">
            <div className="flex gap-2 items-center">
              <Skeleton className="w-24 h-7 rounded-full" />
              <Skeleton className="w-11 h-4" />
            </div>

            <div className="flex gap-2 items-center">
              <Skeleton className="w-24 h-7 rounded-full" />
              <Skeleton className="w-11 h-4" />
            </div>
          </div>
          <div className="flex flex-col gap-4 h-auto">
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-40" />
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex flex-col  gap-1">
              <Skeleton className="w-16 h-6" />
              <div className="flex max-sm:flex-col sm:items-center gap-1">
                <Skeleton className="w-36 h-7" />
                <Skeleton className="w-24 h-5" />
              </div>
            </div>
          </div>
          <Skeleton className="w-52 h-10" />
        </div>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-16 h-6" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-10" />
              <Skeleton className="h-6 w-3" />
              <Skeleton className="size-10" />
            </div>
          </div>

          <Skeleton className="w-full h-11" />
        </div>
      </div>
    </div>
  );
};
const CustomerReviewsLoading = () => {
  const customerReviewsLength_PER_PAGE = 3
  const SkeletonsReviews = Array.from({length:3},(_,i)=> (
    <ReviewLoading key={i} />
  ))
  return (
    <div className="grid gap-4">
      <Skeleton className="w-56 h-8" />
      <div className="flex max-md:flex-col max-md:items-start items-center  mb-4 gap-2 ">
     <Skeleton className="w-28 h-6" />
      <div className="flex gap-2">
        <Skeleton className=" size-10" />
        <Skeleton className=" size-10" />
        <Skeleton className=" size-10" />
        <Skeleton className=" size-10" />
        <Skeleton className=" size-10" />
      </div>
    </div>
     { SkeletonsReviews }
    </div>
  );
};
export const ProductCartLoading = () => {
  return(
    <div>
<ProductFeaturesLoading />;
<section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-12 md:px-6 lg:max-w-7xl">
   
    <CustomerReviewsLoading />
    <LeaveReviewLoading  />
   </section>
    </div>
   
  ) 
};
const LeaveReviewLoading = () =>{
  return (
    <div className="grid gap-8">
    <Skeleton className="w-48 h-8" />
    <div className="grid gap-8">
      <div className="flex flex-col gap-1">
        <Skeleton className="w-14 h-7" />
        <Skeleton className="w-28 h-6" />

        
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-14 h-7" />
        <Skeleton className="w-full h-32" />
      </div>
      <Skeleton className="w-full h-11" />
    </div>
    </div>
  )
}
const ReviewLoading = () => {
  return (
    <div className="grid gap-6">
    <div className="flex gap-4 w-full">
      <Skeleton className="size-10 rounded-full" />
      <div className="grid gap-2 w-full">
        <div className="flex md:items-center max-md:gap-2 gap-4  max-md:flex-col w-full">
          <div className="grid gap-1">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-24 h-5" />
          </div>
          <Skeleton className="flex w-24 h-4 md:ml-auto" />
        </div>
        <Skeleton className="w-full h-36 sm:h-20 " />
      </div>
     
    </div>
   
  </div>
  )
}
export const SkeletonItemCartLoading = () => {
  return (
    <div className="grid grid-cols-[150px_1fr_auto] items-center gap-y-8  sm:gap-4">
     <div className=" h-32 flex justify-center items-center col-span-2 sm:col-span-1">
     <Skeleton className="w-full h-full "/>
     </div>
    
      <div className="grid gap-2 col-span-2 sm:col-span-1">
        <div className="space-y-4">
          <Skeleton className="w-full h-24 sm:h-16 md:h-12 " />
          <div className="max-sm:justify-center flex max-sm:flex-row gap-1">
          <Skeleton className="w-14 h-5" />
          <Skeleton className="w-14 h-5" />
          </div>
         
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <div className="flex items-center gap-2 max-sm:justify-center">
          <Skeleton className="size-10" />
          <Skeleton className="w-2 h-5" />
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
          <Skeleton className="size-10" />
        </div>
      </div>
    </div>
  )
}