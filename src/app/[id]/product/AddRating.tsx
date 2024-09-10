"use client";
import React from "react";
import { Rating } from "@mui/material";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2,} from "lucide-react";
import { toast } from "sonner";
import { formValidateReview, SchemaSafeProductsOrder } from "../../../../schemas/schema";
import { User,Order,Product, Review } from "@prisma/client";
import { commentProductAction} from "@/lib/actions";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";

export const ParseProductsOrder = (items:any)=>{
return SchemaSafeProductsOrder.parse(JSON.parse(JSON.stringify(items)))
}
export const AddRating =({user,product}:{user:User & {orders:Order[]} | null , product:Product & {reviews:Review[]}}) => {
  const router= useRouter()

  const deliveredOrder = user?.orders.some(order =>ParseProductsOrder(order.products).find(item => item.id === product.id) && order.deliveryStatus.toLowerCase() === "delivered")
    const userReview = product?.reviews.find((review:Review)=>{
        return review.userId === user?.id 
    })
  
const commentProduct = useServerAction(commentProductAction,{
  onSuccess:()=>{
    toast.success("your review has been submitted Thanks you!")
    router.refresh()
  },
  onError:(err)=>{
    toast.error(err.err.message)
  }
})
  const form = useForm<z.infer<typeof formValidateReview>>({
    resolver: zodResolver(formValidateReview),
    defaultValues: {
      comment: undefined,
      rating: 0,
    },
  });
  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  async function onSubmit(values: z.infer<typeof formValidateReview>) {
 
    console.log(values);
    if (values.rating === 0) {
    
      return toast.error("Rating haven't selected");
     
    }
    if(!user) return null
    await commentProduct.execute({...values,userId:user?.id,productId:product.id})
  }
  if(userReview || !deliveredOrder){
    return null
}
  return (
    <div className="grid gap-8">
      <div className="flex">
        {" "}
        <h2 className="text-2xl font-bold text-blue-500">Leave a Review</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          <div className="flex flex-col gap-1">
            <div className="flex">
              {" "}
              <Label
                htmlFor="rating"
                className="text-lg text-muted-foreground font-semibold"
              >
                Rating
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Rating
                className="border-blue-400 mr-1"
                onChange={(_, newValue) => {
                  setCustomValue("rating", newValue);
                }}
                precision={0.5}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex">
                      <Label
                        htmlFor="review"
                        className="text-lg text-muted-foreground font-semibold"
                      >
                        Review
                      </Label>
                    </div>

                    <Textarea
                      id="review"
                      placeholder="Write your review here..."
                      className="h-32"
                      {...field}
                    />
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        
            <Button disabled={commentProduct.isPending} variant={"defaultBtn"} size="lg" className="w-full">
              {commentProduct.isPending ? (
<Loader2 className="animate-spin size-5" />
              ):"Submit Review"} 
            </Button>
        
        </form>
      </Form>
    </div>
  );
};
