import { ActionsOrderUser } from "@/app/orders/(overview)/ShowOrdersUser";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import CopyPasteButton from "./CopyPasteButton";
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
  const customerReviewsLength_PER_PAGE = 3;
  const SkeletonsReviews = Array.from({ length: 3 }, (_, i) => (
    <ReviewLoading key={i} />
  ));
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
      {SkeletonsReviews}
    </div>
  );
};
export const ProductCartLoading = () => {
  return (
    <div>
      <ProductFeaturesLoading />;
      <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-12 md:px-6 lg:max-w-7xl">
        <CustomerReviewsLoading />
        <LeaveReviewLoading />
      </section>
    </div>
  );
};
const LeaveReviewLoading = () => {
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
  );
};
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
  );
};
export const SkeletonCartLoading = ({ length }: { length: number }) => {
  const SkeletonItems = Array.from({ length }, (_, i) => (
    <SkeletonItemCartLoading key={i} />
  ));
  return <div className="grid gap-8">{SkeletonItems}</div>;
};
export const SkeletonItemCartLoading = () => {
  return (
    <div className="grid grid-cols-[150px_1fr_auto] items-center gap-y-8  sm:gap-4">
      <div className=" h-32 flex justify-center items-center col-span-2 sm:col-span-1">
        <Skeleton className="w-full h-full " />
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
  );
};
export const SkeletonLoadingOrdersTable = () => {
  const SkeletonOrdersTable = Array.from({ length: 3 }, (_, i) => (
    <RowSkeletonOrderTable key={i} />
  ));
  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Payment status</TableHead>
          <TableHead className="hidden sm:table-cell">
            Delivery Status
          </TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{SkeletonOrdersTable}</TableBody>
    </Table>
  );
};
export const RowSkeletonOrderTable = () => {
  return (
    <TableRow className="">
      <TableCell className="flex flex-col gap-2">
        <Skeleton className="w-36 h-5" />
        <Skeleton className="w-32 h-4" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="w-32 h-7 rounded-full" />
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Skeleton className="w-32 h-7 rounded-full" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="w-12 h-7" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-7" />
      </TableCell>
    </TableRow>
  );
};
export const RowSkeletonOrderMobileUser = () =>{
  return (
    <Card className="grid grid-col-1 gap-2 text-muted-foreground sm:hidden">
    <div className="flex pl-4 py-2  w-full items-center">
      <div className="mr-auto flex gap-2">
     <Skeleton className="w-36 h-5" />
       
        <CopyPasteButton className="bg-muted flex items-center justify-center size-6 rounded-md  text-muted-foreground hover:text-blue-500 " />
      
      </div>
   <MoreHorizontal className="mr-2" />
    </div>
  
    <div className="grid gap-3 px-8  py-4 sm:text-blue-500">
      <div className="flex">
        <div className="mr-auto text-blue-500 font-semibold">Order Date</div>
      <Skeleton className="w-24 h-6 " />
      </div>
      <div className="flex ">
        <div className="mr-auto text-blue-500 font-semibold">  Items order </div>
        <Skeleton className="w-9 h-6 " />
      </div>
      <div className="flex ">
        <div className="mr-auto text-blue-500 font-semibold">  Amount </div>
        <Skeleton className="w-28 h-6 " />
      </div>
      <div className="flex ">
        <div className="mr-auto text-blue-500 font-semibold"> Paymentstatus</div>
        <Skeleton className="w-24 h-6 rounded-full " />
      </div>
      <div className="flex ">
      <div className="mr-auto text-blue-500 font-semibold"> Deliverystatus</div> 
      <Skeleton className="w-24 h-6 rounded-full" />
  
    </div>
    </div>
  </Card>
  )
}
export const SkeletonLoadingOrdersUser = () =>{
  const SkeletonsOrdersMobileUser = Array.from({ length: 3 }, (_, i) => (
    <RowSkeletonOrderMobileUser key={i} />
  ));
  const SkeletonOrdersTable = Array.from({ length: 3 }, (_, i) => (
    <RowSkeletonLoadingOrderTableUser key={i} />
  ));
  return (
    <div>
    <div className="grid grid-cols-1 gap-4 md:hidden">{SkeletonsOrdersMobileUser} </div>
    <Table className=" hidden md:table">
    <TableHeader className="">
      <TableRow>
        <TableHead className="">Date</TableHead>
        <TableHead className="hidden sm:table-cell">Payment status</TableHead>
        <TableHead className="hidden sm:table-cell">
          Delivery Status
        </TableHead>
    
        <TableHead className="text-right">Amount</TableHead>
        <TableHead className=""></TableHead>
       
      </TableRow>
    </TableHeader>
      <TableBody>{SkeletonOrdersTable}</TableBody>
    </Table>
  </div>
  )
}
export const RowSkeletonLoadingOrderTableUser = () =>{
  
  return (
    <TableRow>
      {/* <div className="flex flex-row items-center justify-between border-b border-muted py-4"> */}
      <TableCell>
        {" "}
        <Skeleton className="w-16 h-6" />
      </TableCell>

      <TableCell>
        {" "}
        <Skeleton className=" w-24 h-6 rounded-full" />
      </TableCell>
      <TableCell>
        {" "}
        <Skeleton className=" w-24 h-6 rounded-full" />
      </TableCell>
      <TableCell className="text-left">
        {" "}
        <Skeleton className=" w-24 h-6" />
      </TableCell>

      <TableCell className="flex justify-end">
     
      <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      
      </TableCell>
    </TableRow>
  );
}
export const SkeletonLoadingManageProducts = () => {
  const SkeletonsManageMobileProducts = Array.from({ length: 3 }, (_, i) => (
    <RowSkeletonManageMobileProducts key={i} />
  ));
  const SkeletonManageProductTable = Array.from({ length: 3 }, (_, i) => (
    <RowSkeletonLoadingProductTable key={i} />
  ));
  return (
    <div>
      <div className="md:hidden block">{SkeletonsManageMobileProducts} </div>
      <Table className=" hidden md:table">
        <TableHeader className="">
          <TableRow>
            <TableHead className=" w-[100px]">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead className="text-blue-500 font-semibold ">Name</TableHead>
            <TableHead className="text-blue-500 font-semibold ">
              Status
            </TableHead>
            <TableHead className="text-blue-500 font-semibold ">
              Price
            </TableHead>
            <TableHead className="text-blue-500 font-semibold ">
              Total Sales
            </TableHead>

            <TableHead>
              <span className="sr-only w-7">others features</span>
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{SkeletonManageProductTable}</TableBody>
      </Table>
    </div>
  );
};
export const RowSkeletonManageMobileProducts = () => {
  return (
    <div>
      <div className="flex">
        <EllipsisIcon className="size-5 ml-auto" />
      </div>

      <div className="flex flex-col w-full px-3">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-1 max-sm:gap-2">
          <div className="flex items-center justify-center">
            <Skeleton className="size-24 shrink-0" />
          </div>
          <div className="col-span-2  flex flex-col gap-2 ">
            <div>
              <Skeleton className="w-20 h-5 rounded-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-20" />
            </div>

            <div>
              <Skeleton className="w-full h-20" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <div className="w-full flex flex-row items-center justify-between">
            <Skeleton className="w-24 h-9 rounded-full" />

            <div className="flex gap-2 ml-auto">
              <Skeleton className="w-9 h-10" />
              <Skeleton className="w-9 h-10" />
            </div>
          </div>

          <Separator className="my-4 w-full" />
        </div>
      </div>
    </div>
  );
};
export const RowSkeletonLoadingProductTable = () => {
  return (
    <TableRow>
      {/* <div className="flex flex-row items-center justify-between border-b border-muted py-4"> */}
      <TableCell>
        {" "}
        <Skeleton className="size-16" />
      </TableCell>

      <TableCell>
        {" "}
        <Skeleton className=" h-16 w-96" />
      </TableCell>
      <TableCell>
        {" "}
        <Skeleton className="rounded-full h-5 w-20" />
      </TableCell>
      <TableCell>
        {" "}
        <Skeleton className=" h-7 w-28" />
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-10 rounded-full" />
        </div>
      </TableCell>
    </TableRow>
  );
};
export const SkeletonLoadingCardOrder = ({
  description,
}: {
  description: string;
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="max-w-lg  h-5">
          {description}
        </CardDescription>
        <CardTitle className="">
          <Skeleton className="w-40 h-10" />
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div className=" max-md:gap-4 gap-8 flex flex-row items-stretch">
          <div className="flex-1 flex flex-col gap-2 ">
            {" "}
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-28 h-5" />
          </div>
          <Separator orientation="vertical" className="h-full min-h-12" />
          <div className="flex-1 flex flex-col gap-2  ">
            {" "}
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-28 h-5" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export const SkeletonRowOrderDetail = () =>{
  
  return (
    <div className="grid auto-rows-max auto-cols-max gap-4 md:gap-8 grid-cols-1 md:grid-cols-[150px_1fr_150px] text-center place-content-center">
    <div className="flex justify-center relative h-32 w-full md:h-full  aspect-square">
        <Skeleton className="size-36" />
      </div>
      <div className="mt-4   flex flex-col gap-2 max-md:items-center">
      
       <Skeleton className=" self-center w-full h-12 md:h-16" />
   
      <Skeleton className="self-center w-[300px] sm:w-[400px] md:w-[500px] h-5  " />
      {/* <Skeleton className="flex-shrink-1 self-center w-[500px] h-5  " /> */}
      
     
 
      <Skeleton className="px-16 self-center w-[200px] sm:w-[300px] md:w-[400px] h-5 " />    
   

     <Skeleton className="self-center h-5 w-20" /></div>
       
    

      <div className="col-span-1 flex  justify-center">
       <Skeleton className=" h-5 w-28" />
      </div>
    </div>

  )
}