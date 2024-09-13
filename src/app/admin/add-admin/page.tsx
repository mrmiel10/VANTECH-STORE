"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
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
import { SchemaValidateAdmin } from "../../../../schemas/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Info } from "lucide-react";
import { Permissions } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "@radix-ui/react-select";
import Link from "next/link";
import { addAdminAction } from "@/lib/actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
const AddAdminPage = () => {
  const addAdmin = useServerAction(addAdminAction, {
    onSuccess: () => {
      toast.success("this role has been changed successfully!");
    },
    onError: (err) => {
      toast.error(err.err.message);
    },
  });
  const [displayPermission, setDisplayPermission] =
    React.useState<boolean>(false);
  console.log(displayPermission);
  const form = useForm<z.infer<typeof SchemaValidateAdmin>>({
    resolver: zodResolver(SchemaValidateAdmin),
    defaultValues: {
      email: undefined,
      role: undefined,
      permissions: [],
    },
  });

  React.useEffect(() => {
    displayPermission === false &&
      form.setValue("permissions", [], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
  }, [displayPermission]);
  async function onSubmit(values: z.infer<typeof SchemaValidateAdmin>) {
    console.log(values);
    await addAdmin.execute(values);
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
            Add Admin
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
                          <p className="flex gap-1 text-destructive items-center ">
                            <Info size={16} />
                            <span className="text-sm">
                              The email must be registred in the database
                            </span>
                          </p>
                        </div>

                        <Input
                          {...field}
                          id="email"
                          type="text"
                          name="email"
                          className=""
                          placeholder="enter an email..."
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
                            value.toLowerCase() === "super admin"
                              ? setDisplayPermission(false)
                              : setDisplayPermission(true);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="role" aria-label="Select role">
                            <SelectValue
                              className="text-muted-foreground font-bold"
                              placeholder="Select role"
                            />
                          </SelectTrigger>
                          <SelectContent className=" text-muted-foreground">
                            <SelectItem className="" value="admin">
                              Admin
                            </SelectItem>
                            <SelectItem className="" value="super admin">
                              Super admin
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
                <Button disabled={addAdmin.isPending} variant={"defaultBtn"}>
                  {addAdmin.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <span> Save as Admin</span>
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
export default AddAdminPage;
