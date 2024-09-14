"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaValidateAdmin } from "../../../../../schemas/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Info } from "lucide-react";
import { PageProps, Permissions } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

import Link from "next/link";
import { User } from "@prisma/client";
import { editAdminAction } from "@/lib/actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
export const EditAdminForm = ({ admin }: { admin: User }) => {
  const router = useRouter();
  const editAdmin = useServerAction(editAdminAction, {
    onSuccess: () => {
      toast.success("Roles and permissions have been changed successfully!");
      router.push("/admin/manage-admins");
      router.refresh()
    },
    onError: (err) => {
      toast.error(err.err.message);
    },
  });
  console.log(admin.permissions);
  console.log(admin.role);
  const [displayPermission, setDisplayPermission] =
    React.useState<boolean>(false);
  console.log(displayPermission);
  const form = useForm<z.infer<typeof SchemaValidateAdmin>>({
    resolver: zodResolver(SchemaValidateAdmin),
    defaultValues: {
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
    },
  });
  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  React.useEffect(() => {
    admin.role === "ADMIN" && setDisplayPermission(true);
    if (!displayPermission) setCustomValue("permissions", []);
    else setCustomValue("permissions", admin.permissions.filter((permission,_)=>permission.toLowerCase() !="all"));
  }, [displayPermission, admin.role, admin.permissions]);
  async function onSubmit(values: z.infer<typeof SchemaValidateAdmin>) {
    console.log(values);
    await editAdmin.execute(values);
  }
  return (
    <div className="flex items-start h-full justify-center">
      <section className="px-8 lg:px-12 flex-col w-full items-start max-w-3xl  flex">
        <div className="flex  items-center gap-2 mb-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <Link href={"/admin/manage-admins"}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-blue-500">
            Edit admin role & permissions
          </h1>
        </div>
        <Card className="w-full min-h-20 px-8 lg:px-16 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                 name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <div className="">
                          <Label
                            htmlFor="email"
                            className="font-normal text-blue-500"
                          >
                            Email
                          </Label>
                        
                        </div>

                        <Input
                        defaultValue={admin.email}
                        disabled
                          {...field}
                          id="email"
                          type="text"
                          name="email"
                          className=""
                         
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <div className="">
                          <Label
                            htmlFor="status"
                            className="font-normal text-blue-500"
                          >
                            Role
                          </Label>
                          <p className="flex text-destructive items-center gap-1 ">
                            <Info size={16} />
                            <span className="text-sm">
                              The super admin has all permissions
                            </span>
                          </p>
                        </div>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            value === "ADMIN"
                              ? setDisplayPermission(true)
                              : setDisplayPermission(false);
                          }}
                          defaultValue={admin.role}
                        >
                          <SelectTrigger id="role" aria-label="Select role">
                            <SelectValue
                              className="text-muted-foreground font-bold"
                              placeholder="Select role"
                            />
                          </SelectTrigger>
                          <SelectContent className=" text-muted-foreground">
                            <SelectItem className="" value="ADMIN">
                              ADMIN
                            </SelectItem>
                            <SelectItem className="" value="SUPERADMIN">
                              SUPER ADMIN
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {displayPermission && (
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-3">
                          <div className="mb-3">
                            <FormLabel className="text-blue-500">
                              Permissions
                            </FormLabel>
                            <FormDescription className="flex items-center text-sm ">
                              Attribute permissions
                            </FormDescription>
                          </div>
                          {Permissions.map((permission, _) => (
                            <FormField
                              key={permission.id}
                              name="permissions"
                              render={({ field }) => {
                                return (
                                  <FormItem key={permission.id}>
                                    <div className="flex items-center gap-2">
                                      <FormControl>
                                        <Checkbox
                                          className="border-muted-foreground border"
                                          checked={field.value?.includes(
                                            permission.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  permission.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: string) =>
                                                      value !== permission.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>

                                      <FormLabel className="text-muted-foreground font-normal">
                                        {permission.label}
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="flex justify-center mt-4">
                <Button disabled={editAdmin.isPending} variant={"defaultBtn"}>
                  {editAdmin.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <span>Edit role & permissions</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </section>
    </div>
  );
};
