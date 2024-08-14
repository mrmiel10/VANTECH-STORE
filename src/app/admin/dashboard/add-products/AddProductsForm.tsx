"use client"
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
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import addProducts from "@/lib/actions";

export type imageType = {
  image: File | null;
};
export type uploadImageType = {
  image: string;
};
export const AddProductsForm = () => {
  const imageItem = {
    image: null,
  };
const Router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<imageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  console.log(images);
  const form = useForm<z.infer<typeof formValidateProducts>>({
    resolver: zodResolver(formValidateProducts),
    defaultValues: {
      name: undefined,
      description: undefined,
      brand: undefined,
      category: undefined,
      status: undefined,
      images: [],
      // price: undefined,
      quantity: undefined,
    },
  });

  useEffect(() => {
    if (!images) return;
    const filenameImages = images?.map((item, _) => {
      if (item.image) return item.image?.name;
    });
    setCustomValue("images", filenameImages);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      form.reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [form]);
  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const addImageToState = useCallback((value: imageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      if (prev.some((item) => item.image?.name === value.image?.name))
        return [...prev];
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: imageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => String(item.image?.name) !== String(value.image?.name)
        );

        console.log(filteredImages);
        return filteredImages;
      }
      return prev;
    });
  }, []);
  async function onSubmit(values: z.infer<typeof formValidateProducts>) {
    setIsLoading(true);
    console.log(values);
console.log()
    let uploadedImages: uploadImageType[] = [];
    console.log(uploadedImages);
    if(!images) return
    const handleImageUploads = async() => {
      toast("creating product,please wait...");
      try {
        for(const item of images){
          if(item.image){
            const filename = new Date().getTime() + "-" + item.image.name;
           
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Eror uploading image", error);
                  return toast.error("Error handling image uploads");

                  reject(error);

                },
                () => {
                  {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref)
                      .then((downloadURL) => {
                        uploadedImages.push({
                          ...item,
                          image: downloadURL,
                        });
                        console.log("File available at", downloadURL);
                        resolve();
                      })
                      .catch((error) => {
                        console.log("Error getting the download URL", error);
                        return toast.error("Error handling image uploads");

                        reject(error);
                      });
                  }
                }
              );
            });
          }else return null
        
          
        }
      } catch (error) {
        console.log("Error handling image uploads", error);
        toast.error("Error handling image uploadse");

      }finally{
        setIsLoading(false);
      }
    }
    await handleImageUploads();
    const productData = { ...values, images: uploadedImages };
    console.log(productData);
    console.log(uploadedImages);
    try {
      const product = await addProducts(productData);
      toast.success("This product has been created");
      Router.refresh();
    } catch (error) {
      toast.error("Error creating product");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-blue-500">
              Add Product
            </h1>
            {/* <Badge variant="outline" className="ml-auto sm:ml-0">
      In stock
    </Badge> */}
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              {/* <Button variant="outline" size="sm">
        Discard
      </Button> */}
      {isLoading ? (
   <Button variant={"defaultBtn"} size="sm">
  <Loader2 className="animate-spin" />
 </Button>
      ):(
        <Button variant={"defaultBtn"} size="sm">
        Add Product
      </Button>
      )}
           
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle className="text-blue-500">
                    Product Details
                  </CardTitle>
                  <CardDescription>
                    Add name and description of a product
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
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle className="text-blue-500">Stock</CardTitle>
                  <CardDescription>
                    Add brand,price and the quantity of a product
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
                {/* <CardFooter className="justify-center border-t p-4">
          <Button size="sm" variant="ghost" className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            Add Variant
          </Button>
        </CardFooter> */}
              </Card>
              <Card x-chunk="chunk-2">
                <CardHeader>
                  <CardTitle className="text-blue-500">
                    Product Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                              <SelectItem value="laptops">
                               Laptops
                              </SelectItem>
                              <SelectItem value="mouses">
                               Mouses
                              </SelectItem>
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
              <Card x-chunk="dashboard-07-chunk-3">
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
              <Card className="overflow-hidden" x-chunk="chunk-4">
                <CardHeader>
                  <CardTitle className="text-blue-500">
                    Product Images
                  </CardTitle>
                  <CardDescription>
                    select images for the product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2 text-destructive font-medium">
                    {form.formState.errors["images"] &&
                      form.formState.errors["images"].message}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <SelectImage
                      className="h-44 col-span-2 "
                      item={imageItem}
                      addImageToState={addImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                      images={images}
                    />
                    <SelectImage
                      className="h-28 "
                      item={imageItem}
                      addImageToState={addImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                      images={images}
                    />
                    <SelectImage
                      className="h-28 "
                      item={imageItem}
                      addImageToState={addImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                      images={images}
                    />
                    <SelectImage
                      className="h-44 col-span-2"
                      item={imageItem}
                      addImageToState={addImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                      images={images}
                    />
                    {/* <div className=" h-28 w-full rounded-lg col-span-2 flex justify-center items-center border-dashed border-muted-foreground text-sm text-blue-500 border cursor-pointer hover:bg-muted">
          <Upload />
        </div> */}
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-5">
                <CardHeader>
                  <CardTitle>Archive Product</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                  <Button size="sm" variant="secondary">
                    Archive Product
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-centermd:hidden">
            {/* <Button variant="outline" size="sm">
              Discard
            </Button> */}
            <Button size="sm">Add Product</Button>
          </div>
        </form>
      </Form>
    </>
  );
};
