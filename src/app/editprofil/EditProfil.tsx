"use client"
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import profilUser from "../../../public/profil.png";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import toast from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PencilIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const EditProfil = () => {

  const [name,setName] = useState<string>("cccc")
  console.log(name)
  const updateProfileSchema = z.object({
    firstName: z.string().trim().optional(),
    //.min(1, { message: "Entrer correctement le firstname" }),
    lastName:z.string().trim().optional(),
    // email: z.string().email(),
    bio: z.string().trim().optional()
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  console.log(imageFile)
  console.log(imageFile?.name)
  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setImageFile(file);
    }

    const reader = new FileReader();
    console.log(reader)
   
    reader.onload = function (e) {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result);
        //setImageUrl(e.target.result)
      }
    };
    if (file) reader.readAsDataURL(file);
  };
  const uploadImage = () => {
    setIsUploadImage(true);

    try {
      if (!imageFile) return;
      const form = new FormData();
      form.append("image", imageFile);
      console.log(imageFile);
    } catch (error) {
      throw error;
    }
  };
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
    //   email: undefined,
      bio: undefined,
    },
  });
    function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    // setIsValidateProfil(true);
    console.log(values);
  }
  return (
    <Card className="w-full max-w-2xl  text-blue-500">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl font-bold text-blue-500">
          Account info
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          View and update your account details
        </CardDescription>
        <div className="relative mt-4">
          <Input
            onChange={handlePhotoChange}
            className="hidden"
            id="chooseImage"
            type="file"
            name="imagePreview"
          />
          <Avatar className="size-40 border">
            <AvatarImage src={imagePreview!} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            variant="defaultBtn"
            className="  size-12 absolute bottom-0 right-0 p-1 rounded-full"
          >
            <label className="w-full h-full flex items-center justify-center" htmlFor="chooseImage">
              {/* <CameraIcon className=" size-6 text-white" /> */}
              <PencilIcon className=" size-6 text-white" />
            </label>
          </Button>
        </div>
      </CardHeader>
   
      <CardContent className="space-y-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">username</Label>
                <Input
                  disabled
                  id="username"
               
                  className="disabled:bg-muted text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">email</Label>
                <Input
                  disabled
                  id="email"
             
                  className="disabled:bg-muted text-muted-foreground"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">My firstname</Label>
                      <Input
                       
                        id="firstName"
                      
                        className="text-muted-foreground"
                        {...field}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">My lastname</Label>
                      <Input
                        {...field}
                        id="lastName"
                       
                        className="text-muted-foreground"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
         
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      {...field}
                      placeholder="Enter your bio"
                      className=" text-muted-foreground min-h-[150px]"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
               
         </form>
         </Form>
      </CardContent>
      <CardFooter className="flex">
        {/* <Button variant="outline" className=" text-white">
          Customize
        </Button> */}
        <div className="flex space-x-2 ml-auto">
          <Button
            variant="outline"
            className="text-muted-foreground hover:text-blue-500"
          >
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} variant={"defaultBtn"} className=" text-white">
            Save
          </Button>
        </div>
      </CardFooter>
     
    </Card>
  );
};

export default EditProfil;
