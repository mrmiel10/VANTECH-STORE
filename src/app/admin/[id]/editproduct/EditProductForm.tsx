"use client";
import { Product, Review } from "@prisma/client";
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
import SelectImage from "../../../../../components/admin/SelectImage";
import { formValidateProducts } from "../../../../../schemas/schema";
import { toast } from "sonner";
import firebaseApp from "@/lib/firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { redirect, useRouter } from "next/navigation";
import { deleteImagesProductAction, editProductAction } from "@/lib/actions";
import {
  imageType,
  uploadImageType,
} from "@/app/admin/add-products/AddProductsForme";
import { ParseProductImages } from "@/lib/parseData";
import { revalidatePath } from "next/cache";
import { useServerAction } from "zsa-react";
import { updateFileProgress } from "../../add-products/AddProductsForm";
import { FileState } from "../../../../../components/MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { UploadImageProduct } from "../../../../../components/UploadImageProduct";
export const EditProductForm = ({
  product,
}: {
  product: Product
}) => {
  const router = useRouter();
   console.log(product);
  console.log("yessssss")
  console.log(ParseProductImages(product.images));
const safeImages = ParseProductImages(product.images)
  const images:{
    file: File | string;
    //file: File | string;
    key?: string; // used to identify the file in the progress callback
    progress: "PENDING" | "COMPLETE" | "ERROR" | number;
  }[] = safeImages.map((image,_)=>{
    
   return {file:image.image,progress:"COMPLETE"}
  }
  )
  const [isUploadImage, setUploadImage] = React.useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>(images);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const { edgestore } = useEdgeStore(); 
  const editProduct = useServerAction(editProductAction, {
    onSuccess: () => {
      setIsProductCreated(true);
      form.reset();
      toast.success("the product has been updated sucessfully!");
   
      router.push("/admin/manage-products");
      // Router.refresh();
    },
    onError: () => {
      toast.error("error updating product!");
    },
  });
  const deleteImagesProduct = useServerAction(deleteImagesProductAction, {
    onSuccess: () => {
      toast.success("Delete Images successfully!")
    },
    onError: () => {
      toast.error("Not deleted images product")
    },
  });
  const createImageFile = (files: FileState[]) => {
if(files.length !=0) return
    const imagesFile = files.map((i) => {
      if(typeof i.file ==='string') return {image:i.file}
      return { image: i.file.name };
    });
    setCustomValue("images", imagesFile);
  };

  const form = useForm<z.infer<typeof formValidateProducts>>({
    resolver: zodResolver(formValidateProducts),
    defaultValues: {
      name: product.name,
      description: product.description ?? undefined,
      brand: product.brand,
      category: product.category,
      status: product.status,
      images: ParseProductImages(product.images),
       price: product.price,
      quantity: product.quantity,
    },
  });

  useEffect(() => {
    if (isProductCreated) {
      form.reset();
      setFileStates([]);
      setIsProductCreated(false);
    }
  }, [form, isProductCreated]);

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  async function onSubmit(values: z.infer<typeof formValidateProducts>) {
 setUploadImage(true)
    console.log(values);

    let uploadedImages: uploadImageType[] = [];
    console.log(uploadedImages);
    await Promise.all([
      fileStates.map(async (fileState, index) => {
        try {
          if (
            fileState.progress !== "PENDING" || typeof fileState.file === "string"
            // typeof values.images[index].image === "string"
          ) {
            uploadedImages.push({
              ...values.images[index]
            })
            return;
          }
          const res = await edgestore.publicFiles.upload({
            file: fileState.file,
            input:{type:"product"},
            options: {},
            onProgressChange: async (progress) => {
              updateFileProgress(progress,setFileStates,fileState.key);
                if (progress === 100) {
                  // wait 1 second to set it to complete
                  // so that the user can see the progress bar
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  updateFileProgress("COMPLETE",setFileStates,fileState.key);
                }
            },
          });
          uploadedImages.push({
            ...values.images[index],
            image: res.url,
          });
         
        } catch (err) {
          updateFileProgress("ERROR",setFileStates,fileState.key);
          setUploadImage(false);
        }
      }),
     // console.log(uploadedImages),
     editProduct.execute({ ...values, images: uploadedImages,id:product.id}),
       deleteImagesProduct.execute(ParseProductImages(product.images)),    
    ]);
 
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4 mb-4">
          <Button onClick={(e)=>{
            e.preventDefault()
            router.push("/admin/manage-products")}} variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-blue-500">
            Edit Product
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
      
              <Button
                disabled={editProduct.isPending || deleteImagesProduct.isPending || isUploadImage}
                variant={"defaultBtn"}
                size="sm"
              >
                {editProduct.isPending || deleteImagesProduct.isPending || isUploadImage ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Edit product"
                )}
              </Button>
        
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle className="text-blue-500">Product Details</CardTitle>
                <CardDescription>
                  Edit name and description of the product
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                          <Input
                         
                            {...field}
                            id="name"
                            className="text-muted-foreground"
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
              <CardHeader>
                <CardTitle className="text-blue-500">Stock</CardTitle>
                <CardDescription>
                  Edit brand,price and the quantity of a product
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                            className="w-full text-muted-foreground"
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
                            className="w-full text-muted-foreground "
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
            <Card >
              <CardHeader>
                <CardTitle className="text-blue-500">
                  Product Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="category"
                  defaultValue={product.category}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <Label htmlFor="category" className="text-blue-500">
                          Category
                        </Label>
                        <Select
                        defaultValue={product.category}
                          onValueChange={field.onChange}
                        
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
                <CardTitle className="text-blue-500">Product Status</CardTitle>
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
                              defaultValue={product.status}
                            onValueChange={field.onChange}
                           
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
                              Published
                              </SelectItem>
                              <SelectItem className="" value="archive">
                                Archive
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
            <Card className="overflow-hidden" x-chunk="chunk-4">
              <CardHeader>
                <CardTitle className="text-blue-500">Product Images</CardTitle>
                <CardDescription>select images for the product</CardDescription>
              </CardHeader>
              <CardContent>
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
           
            <Button variant={"defaultBtn"} size="sm">
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
