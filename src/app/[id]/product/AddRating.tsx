"use client"
import React from 'react'
import { Rating } from '@mui/material'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const formValidateReview = z.object({
  comment: z
    .string({
      required_error: "votre commentaire est vide",
    }).trim().min(1,{message:"commentaire incorrecte"})
   
    .max(50, { message: "commentaire trop long" }),
  rating: z.coerce.number(
),
});


const AddRating = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  }
  function onSubmit(values: z.infer<typeof formValidateReview>){
    setIsLoading(true)
    console.log(values)
    if(values.rating === 0){
      setIsLoading(false)
      return toast.error("Rating haven't selected");
    }
  }
  return (
    <div className="grid gap-8">
          <h2 className="text-2xl font-bold text-blue-500">Leave a Review</h2>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          <div className="flex flex-col gap-1">
              <Label htmlFor="rating" className="text-lg text-muted-foreground font-semibold">
                Rating
              </Label>
              <div className="flex items-center gap-2">
              <Rating
                    className="border-blue-400 mr-1"
                   
                  onChange={(_,newValue)=>{
                     setCustomValue("rating",newValue)
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
              <Label htmlFor="review" className="text-lg text-muted-foreground font-semibold">
                Review
              </Label>
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
            {isLoading ? (
               <Button disabled variant={"defaultBtn"} size="lg" className="w-full">
               <Loader2Icon className='text-white animate-spin' />
             </Button>
            ):(
              <Button variant={"defaultBtn"} size="lg" className="w-full">
              Submit Review
            </Button>
            )}
            
         
            {/* <div className="flex flex-col gap-1">
              <Label htmlFor="review" className="text-lg text-muted-foreground font-semibold">
                Review
              </Label>
              <Textarea
                id="review"
                placeholder="Write your review here..."
                className="h-32"
              />
            </div> */}
           
          </form>
          </Form>
         
        </div>
  )
}

export default AddRating
