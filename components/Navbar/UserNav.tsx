import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { User } from "lucide-react";
import CountFavorites from "./CountFavorites";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import DefaultUser from "../../public/defaultUser.png";
import Image from "next/image";
import prisma from "../../db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions";
export   const getInitials = (
  firstName: string | null,
  lastName: string | null,
  email:string | null
): string => {
  if (firstName === null && lastName === null){
    const emailInitial = email?.charAt(0).toUpperCase()
    return `${emailInitial}`
  } 

  const firstInitial = firstName?.charAt(0).toUpperCase();
  const lastInitial = lastName?.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};
export const UserNav = async () => {
 const user = await getCurrentUser()

  console.log(user);


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="text-muted-foreground z-40 bg-white w-72"
        >
          {user ? (
            <>
              <DropdownMenuItem className="flex flex-col gap-2 focus:bg-transparent focus:text-blue-500 items-start">
                <div className="flex flex-wrap">
                  {user.firstName || user.lastName ? (
                    <div className="font-semibold text-blue-500">
                      {user.firstName} {user.lastName}
                    </div>
                  ) : (
                    <div className="font-semibold text-blue-500">
                    {user.username}
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  variant={"defaultBtn"}
                  className="self-start text-white bg-blue-500 border-none outline-none"
                >
                  <Link href="/editprofil"> Edit profil</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:text-blue-500" asChild>
                <Link href="favourites" className="w-full">
                  <div className="flex items-center w-full">
                    <div className="flex items-center">
                      <Heart className="size-4 mr-2 transition ease grduration-150 text-blue-500" />
                      My favourites
                    </div>

                    <CountFavorites />
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-blue-500" asChild>
                <Link href="/orders">
                  {" "}
                  <ShoppingBag className="size-4 mr-2 transition ease grduration-150 text-blue-500" />
                  My orders
                </Link>
              </DropdownMenuItem>
              {user?.role === "ADMIN" && (
                <DropdownMenuItem className="focus:text-blue-500" asChild>
                  <Link href="/admin/dashboard">
                    {" "}
                    <LayoutDashboard className="size-4 mr-2 transition ease grduration-150 text-blue-500" />
                    Mon dashboard
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:text-blue-500" asChild>
                <LogoutLink>
                  {" "}
                  <LogOut className="size-4 mr-2 group-hover:transition group-hover:ease group-hover:duration-150 text-blue-500" />
                  Log out
                </LogoutLink>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem className="focus:text-blue-500">
                <LoginLink className="w-full">Sign in</LoginLink>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-blue-500">
                <RegisterLink className="w-full">Sign up</RegisterLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
