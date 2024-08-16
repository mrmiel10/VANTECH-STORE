import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { User2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { Settings } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../Navbar/UserNav";
import DefaultUser from "../../public/defaultUser.png";
export const AdminBtn = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  if (user && user.role != "ADMIN") redirect("/");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <div>
            {user ? (
              <Avatar>
                <AvatarFallback>
                  {getInitials(user.firstName, user.lastName,user.email)}
                </AvatarFallback>
                <AvatarImage
                  alt="profile user"
                  src={
                    (user.picture as string) ??
                    `https://api.dicebear.com/9.x/adventurer/svg?seed=Buster`
                  }
                />
              </Avatar>
            ) : (
              
              <Image
                src={DefaultUser}
                alt="defaultImageUser"
                className="object-contain rounded-full size-10 border border-muted"
              />
            )}
          </div>
        {/* <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full ml-auto"
        >
          <Image
            src="/placeholder-user.jpg"
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-muted-foreground w-44">
        <DropdownMenuItem className="flex flex-col gap-2 focus:bg-transparent items-start">
          <div>
            {user?.firstName || user?.lastName ? (
              <div className="font-semibold text-blue-500">
                {user?.firstName} {user?.lastName}
              </div>
            ) : (
              <div className="font-semibold text-blue-500">
                {user?.username}
              </div>
            )}

            <Button
              asChild
              variant={"defaultBtn"}
              className="self-start text-white"
            >
              <Link href="/editprofil"> Edit profil</Link>
            </Button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="text-blue-500 size-4 mr-2" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">
            {" "}
            <User2 className="mr-2 text-blue-500 size-4" /> Pass to user
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:text-blue-500" asChild>
          <LogoutLink>
            {" "}
            <LogOut className="size-4 mr-2 group-hover:transition group-hover:ease group-hover:duration-150 text-blue-500" />
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
