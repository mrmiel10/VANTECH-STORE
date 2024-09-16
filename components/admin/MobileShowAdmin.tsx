"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profil from "../../public/profil.jpg";
import { Badge } from "@/components/ui/badge";
import { DeleteAsAdmin, EditAdminButton } from "../SubmitButtons";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DisplayDeleteAdminModalBtn } from "../DisplayModalDeleteAdminBtn";
import { GetPermissionsAdminBtn } from "./GetPermissionsAdminBtn";
import { User } from "@prisma/client";
import { getInitials } from "@/app/UserNav";
import { useMediaQuery } from "usehooks-ts";
import clsx from "clsx";
export const MobileShowAdmin = ({ admins }: { admins: User[] }) => {
  const matches = useMediaQuery("(min-width: 510px)");
  return (
    <Card className="py-2 sm:py-4 px-2 text-muted-foreground  md:hidden flex flex-col gap-4">
      {admins.map((admin, _) => (
        <div key={admin.id} className="px-4 grid gap-6">
          <div className=" flex justify-between items-center">
            <div className="grid gap-2">
              <div className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage
                    alt="image"
                    src={admin.picture}
                    width={50}
                    height={50}
                    className="rounded-full aspect-square object-cover"
                  ></AvatarImage>
                  <AvatarFallback>
                    {getInitials(admin.firstName, admin.lastName, admin.email)}
                  </AvatarFallback>
                </Avatar>
                {/* <Image
          alt="image"
          src={profil}
          width={50}
          height={50}
          className="rounded-full aspect-square object-cover"
        /> */}
                <div className="flex flex-col">
                  <h4 className="text-blue-500 font-extrabold">
                    {admin.firstName} {admin.lastName}
                  </h4>
                  <p className="text-sm font-caption">{admin.email}</p>
                  {!matches && (
                    <Badge
                      className="w-fit  rounded-full bg-accent/30 font-caption border border-accent  text-blue-500 px-2 py-0.5 hover:bg-accent-50 transition-colors"
                      
                    >
                        {admin.role === "ADMIN" ? admin.role : "SUPER ADMIN"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {matches && (
              <Badge className="rounded-full bg-accent/30 font-caption border border-accent  text-blue-500 px-2 py-0.5 hover:bg-accent-50 transition-colors">
                {admin.role === "ADMIN" ? admin.role : "SUPER ADMIN"}
              </Badge>
            )}
          </div>
          <div className="flex items-center">
          
              {!admin.permissions || admin.permissions.length === 0 && <div className="bg-accent/30 font-caption border border-accent rounded-sm text-blue-500 px-1 py-0.5 hover:bg-accent-50 transition-colors">No permission</div>  }
              {admin.permissions.some((permission,_)=>permission === "all") && <div className="bg-accent/30 font-caption border border-accent rounded-sm text-blue-500 px-1 py-0.5 hover:bg-accent-50 transition-colors">All permissions</div>  }
          
            <div className="flex-1" />
            <div className="flex gap-2">
              {admin.permissions.every((permission,_)=>permission !== "all") &&   <GetPermissionsAdminBtn permissions={admin.permissions} />}
             
              <EditAdminButton idAdmin={admin.id} />
              <DisplayDeleteAdminModalBtn adminId={admin.id} />
            </div>
          </div>
          <Separator />
        </div>
      ))}
    </Card>
  );
};
