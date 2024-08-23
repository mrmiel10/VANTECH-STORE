"use client";
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
import { toast } from "sonner";
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
import {
  updateImageProfilAction,
  editProfilAction,
  deleteImageProfil,
} from "@/lib/actions";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Loader2 } from "lucide-react";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";

export const updateProfileSchema = z.object({
  firstName: z.string().trim().optional(),
  //.min(1, { message: "Entrer correctement le firstname" }),
  lastName: z.string().trim().optional(),
  // email: z.string().email(),
  bio: z.string().trim().optional(),
  image: z.optional(
    z
      .instanceof(File)
      .refine((file) => file && file.type.match("image/"), "Format incorrect")
      .refine(
        (file) =>
          file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
        "Seuls les fichiers JPG,JPEGE,PNG sont autorisés"
      )
      .refine(
        (file) => file && file.size < 1024 * 1024 * 3,
        "The maximum file size is 3MB"
      )
  ),
});
const EditProfil = ({ user }: { user: User }) => {
  const router = useRouter();
  const updateImageProfil = useServerAction(updateImageProfilAction, {
    onSuccess: () => {
      router.refresh();
      toast.success("image user updated!");
    },
    onError: (err) => {
      toast.error(err.err.message);
      toast.error("Error uploading image");
    },
  });
  const editProfil = useServerAction(editProfilAction, {
    onSuccess: () => {
      router.refresh();

      toast.success("Your profil has been successfully updated!");
    },
    onError: () => {
      toast.error("Error updated!");
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File>();


  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setImageFile(file);
      setCustomValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      bio: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    // setIsValidateProfil(true);
    console.log(values);

    if (values.image) {
      const form = new FormData();
      form.append("urlImage", values.image);
      const [data, err] = await updateImageProfil.execute(form);
      console.log(data);
      await editProfil.execute({
        id: user.id,
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.bio,
        urlImage: data ?? undefined,
      });
      await deleteImageProfil(user.picture);
    }
    await editProfil.execute({
      id: user.id,
      firstName: values.firstName,
      lastName: values.lastName,
      bio: values.bio,
      urlImage: undefined,
    });
  }
  return (
    <Card className="w-full max-w-2xl  text-blue-500">
      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="text-2xl font-bold text-blue-500">
          Account info
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          View and update your account details
        </CardDescription>
        <div className="relative mt-4">
          <Avatar className="size-40 border">
            <AvatarImage
              src={imagePreview ?? user.picture}
              alt="User Avatar"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button
            variant="defaultBtn"
            className="  size-12 absolute bottom-0 right-0 p-1 rounded-full"
          >
            <label
              className="w-full h-full flex items-center justify-center"
              htmlFor="chooseImage"
            >
              <PencilIcon className=" size-6 text-white" />
            </label>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="flex justify-center">
                  <FormItem>
                    <div className="space-y-2">
                      <Input
                        accept=""
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="chooseImage"
                        type="file"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">username</Label>
                <Input
                  defaultValue={user.username ?? ""}
                  disabled
                  id="username"
                  className="disabled:bg-muted text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">email</Label>
                <Input
                  defaultValue={user.email ?? ""}
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
                        defaultValue={user.firstName ?? ""}
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
                        defaultValue={user.lastName ?? ""}
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
                      // defaultValue={user.}
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
     
        <div className="flex space-x-2 ml-auto">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="text-muted-foreground hover:text-blue-500"
          >
            {}
            Cancel 
          </Button>
          <Button
            disabled={updateImageProfil.isPending || editProfil.isPending}
            onClick={form.handleSubmit(onSubmit)}
            variant={"defaultBtn"}
            className=" text-white"
          >
            {updateImageProfil.isPending || editProfil.isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditProfil;
