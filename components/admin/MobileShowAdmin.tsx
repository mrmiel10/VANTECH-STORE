"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profil from "../../public/profil.jpg";
import { Badge } from "@/components/ui/badge";
import { DeleteAsAdmin, EditAdminButton } from "../SubmitButtons";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DisplayDeleteAdminModalBtn } from "../DisplayModalDeleteAdminBtn";
import { GetPermissionsAdminBtn } from "./GetPermissionsAdminBtn";
export const MobileShowAdmin = () => {
  return (
    <Card className="py-2 sm:py-4 px-2 text-muted-foreground  md:hidden flex flex-col gap-4">
      <div className="px-4 grid gap-6">
      <div className=" flex justify-between items-center">
        <div className="grid gap-2">
          <div className="flex items-start gap-2">
              {/* <Avatar>
                  <AvatarImage>

                  </AvatarImage>
                  <AvatarFallback>XO</AvatarFallback>
              </Avatar> */}
            <Image
              alt="image"
              src={profil}
              width={50}
              height={50}
              className="rounded-full aspect-square object-cover"
            />
            <div className="flex flex-col">
              <p className="text-blue-500 font-extrabold">Daryl boris</p>
              <p className="text-sm font-caption">mbakopngako@gmail.com</p>
              <Badge className="w-fit xs:hidden rounded-full bg-accent/30 font-caption border border-accent  text-blue-500 px-2 py-0.5 hover:bg-accent-50 transition-colors">
          admin
        </Badge>
            </div>
          </div>
        </div>

        <Badge className="max-xs:hidden block rounded-full bg-accent/30 font-caption border border-accent  text-blue-500 px-2 py-0.5 hover:bg-accent-50 transition-colors">
          admin
        </Badge>
      </div>
      <div className="flex">
        <div className="flex-1" />
        <div className="flex gap-2">
       <GetPermissionsAdminBtn />
          <EditAdminButton idAdmin="ddddd" />
        <DisplayDeleteAdminModalBtn adminId="dddd" />
        </div>
      </div>
      </div>
      <Separator/>
    </Card>
  );
};
