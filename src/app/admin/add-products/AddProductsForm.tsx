"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectImage from "../../../../components/admin/SelectImage";
import { formValidateProducts } from "../../../../schemas/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
//import addProducts from "@/lib/actions";
import { useServerAction } from "zsa-react";
import { addProductAction } from "@/lib/actions";
import { FileState } from "../../../../components/MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { UploadImageProduct } from "../../../../components/UploadImageProduct";

export type uploadImageType = {
  image: string;
};
export const AddProductsForm = () => {
  const Router = useRouter();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [isUploadImage, setUploadImage] = React.useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  console.log(fileStates)
  const { edgestore } = useEdgeStore();
  console.log(fileStates);

  const addProduct = useServerAction(addProductAction, {
    onSuccess: () => {
      console.log(addProduct.data)
      form.reset({
        name: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        quantity: 0,
        status: "",
      });
    
      setFileStates([]);
  
      // await edgestore.publicFiles.confirmUpload({
      //   url: urlToConfirm,
      // });
      Router.refresh();
      toast.success("the product has been created successfully");
    },
    onError: (err) => {
      toast.error(err.err.message);
      //  toast.error("Error for creating product!");
    },
  });

  const form = useForm<z.infer<typeof formValidateProducts>>({
    resolver: zodResolver(formValidateProducts),
    defaultValues: {
      name: undefined,
      description: undefined,
      brand: undefined,
      category: undefined,
      status: undefined,
      images: [],
      price: undefined,
      quantity: undefined,
    },
  });

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const createImageFile = (files: FileState[]) => {
    
   /// if (!files || files.length === 0) return;
    const imagesFile = files.map((img) => {
      if (typeof img.file !=="string" ) return { image: img.file.name };
    });
    setCustomValue("images", imagesFile);
    console.log("images:",imagesFile)
  };
  async function onSubmit(values: z.infer<typeof formValidateProducts>) {
    console.log(values)
    setUploadImage(true);
    console.log(values);
    let uploadedImages: uploadImageType[] = [];
    console.log(uploadedImages);
    await Promise.all([
      fileStates.map(async (fileState, index) => {
        try {
          if (
            fileState.progress !== "PENDING" ||
            typeof fileState.file === "string"
            // typeof values.images[index].image === "string"
          ) {
            return;
          }
          const res = await edgestore.publicFiles.upload({
            file: fileState.file,
            options:{
              temporary:true
            },
           // input: { type: "product" },
  
            onProgressChange: async (progress) => {
              updateFileProgress(progress, setFileStates, fileState.key);
              if (progress === 100) {
                // wait 1 second to set it to complete
                // so that the user can see the progress bar
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress("COMPLETE", setFileStates, fileState.key);
              }
            },
          });
          console.log("resUrl:", res.url)
          uploadedImages.push({
            ...values.images[index],
            image: res.url,
          });
          console.log("uploadimages:",uploadedImages)
         if(index === fileStates.length - 1){
      const [data,e] =   await addProduct.execute({ ...values, images: uploadedImages })
    console.log(data) 
    if(data){
     uploadedImages.map(async(image,_)=>{
        await edgestore.publicFiles.confirmUpload({
          url: image.image,
        });
      })
    }    
    }  
        } catch (err) {
          updateFileProgress("ERROR", setFileStates, fileState.key);
        } 
        finally {
           setUploadImage(false);
         }
      }),
     // await addProduct.execute({ ...values, images: uploadedImages })
    ])
   
    // console.log('uploadedImages:',uploadedImages),
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={(e) => {
                e.preventDefault();
                Router.push("/admin/manage-products");
              }}
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-blue-500">
              Add Product
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                disabled={isUploadImage || addProduct.isPending}
                variant={"defaultBtn"}
                size="sm"
              >
                {" "}
                {isUploadImage || addProduct.isPending ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  <span>Add Product</span>
                )}{" "}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_400px] lg:grid-cols-3 lg:gap-16">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader className="px-12">
                  <CardTitle className="text-blue-500">
                    Product Details
                  </CardTitle>
                  <CardDescription>
                    Add name and description of a product
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-12">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid gap-3">
                            <Label htmlFor="name" className="text-blue-500">
                              Name
                            </Label>
                            <Textarea
                              {...field}
                              id="name"
                              className="min-h-20 text-muted-foreground"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid gap-3">
                            <Label
                              htmlFor="description"
                              className="text-blue-500"
                            >
                              Description
                            </Label>
                            <Textarea
                              {...field}
                              id="description"
                              className="min-h-32 text-muted-foreground"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="px-12">
                  <CardTitle className="text-blue-500">Stock</CardTitle>
                  <CardDescription>
                    Add brand,price and the quantity of a product
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-12">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid gap-3">
                            <Label htmlFor="brand" className="text-blue-500">
                              Brand
                            </Label>
                            <Input
                              {...field}
                              id="brand"
                              type="text"
                              name="brand"
                              className="w-full text-muted-foreground "
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid gap-3">
                            <Label htmlFor="quantity" className="text-blue-500">
                              Quantity
                            </Label>
                            <Input
                              {...field}
                              id="quantity"
                              type="text"
                              name="quantity"
                              className="w-full text-muted-foreground"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid gap-3">
                            <Label htmlFor="price" className="text-blue-500">
                              Price
                            </Label>
                            <Input
                              defaultValue={""}
                              {...field}
                              id="price"
                              type="text"
                              name="price"
                              className="w-full text-muted-foreground "
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="px-12">
                  <CardTitle className="text-blue-500">
                    Product Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-12">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-3">
                          <Label htmlFor="category" className="text-blue-500">
                            Category
                          </Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue
                                placeholder="Select category"
                                className="w-full"
                              />
                            </SelectTrigger>
                            <SelectContent id="category">
                              <SelectItem value="desktops">Desktops</SelectItem>
                              <SelectItem value="laptops">Laptops</SelectItem>
                              <SelectItem value="mouses">Mouses</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-500">
                    Product Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid gap-3">
                            <Label htmlFor="status" className="text-blue-500">
                              Status
                            </Label>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                id="status"
                                aria-label="Select status"
                              >
                                <SelectValue
                                  className="text-muted-foreground font-bold"
                                  placeholder="Select status"
                                />
                              </SelectTrigger>
                              <SelectContent className=" text-muted-foreground">
                                <SelectItem className="" value="draft">
                                  Draft
                                </SelectItem>
                                <SelectItem className="" value="published">
                                  Active
                                </SelectItem>
                                <SelectItem className="" value="archived">
                                  Archived
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="">
                  <CardTitle className="text-blue-500">
                    Product Images
                  </CardTitle>
                  <CardDescription>
                    select images for the product
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <p className="text-sm mb-2 text-destructive font-medium">
                    {form.formState.errors["images"] &&
                      form.formState.errors["images"].message}
                  </p>
                  <div>
                    <UploadImageProduct
                      fileStates={fileStates}
                      createImageFile={createImageFile}
                      setFileStates={setFileStates}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center ml:auto md:hidden">
              <Button
                disabled={isUploadImage || addProduct.isPending}
                variant={"defaultBtn"}
                size="sm"
              >
                {" "}
                {isUploadImage || addProduct.isPending ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  <span>Add Product</span>
                )}{" "}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export function updateFileProgress(
  progress: FileState["progress"],
  setFileStates: React.Dispatch<React.SetStateAction<FileState[]>>,
  key?: string
) {
  setFileStates((fileStates) => {
    const newFileStates = structuredClone(fileStates);
    const fileState = newFileStates.find((fileState) => fileState.key === key);
    if (fileState) {
      fileState.progress = progress;
    }
    return newFileStates;
  });
}
