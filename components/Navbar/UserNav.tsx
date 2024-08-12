"use client";
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
} from "@kinde-oss/kinde-auth-nextjs/components";
import DefaultUser from "../public/default-user.jpeg";
export const UserNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const getInitials = (
    firstName: string | null,
    lastName: string | null
  ): string => {
    if (firstName === null && lastName === null) return "XO";

    const firstInitial = firstName?.charAt(0).toUpperCase();
    const lastInitial = lastName?.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <>
      <p>ddddd</p>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
          {user ? (
            <Avatar>
              <AvatarImage src={user?.picture as string} />
              <AvatarFallback>
                {getInitials(user.given_name, user.family_name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarImage
                src={
                  "https://img.freepik.com/vecteurs-libre/jeune-homme-barbu_24877-82119.jpg?t=st=1723002802~exp=1723006402~hmac=245926a627ec25c84f62979a8893a3f49b740b68cbef5df5acbcc89a177c5c7c&w=740"
                }
              />
              <AvatarFallback>KO</AvatarFallback>
            </Avatar>
          )}
          </div>
          
        
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="text-muted-foreground z-40 bg-white w-72"
        >
          {user ? (
            <>
              <DropdownMenuItem className="focus:bg-transparent focus:text">
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="font-semibold text-blue-500">user407211</p>
                    <p className="font-semibold text-blue-500">
                      {user.family_name} {user.given_name}
                    </p>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>

                  <Button
                    asChild
                    variant={"defaultBtn"}
                    className="self-start text-white bg-blue-500 border-none outline-none"
                  >
                    <Link href="/editprofil"> Edit profil</Link>
                  </Button>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:text-blue-500">
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
              <DropdownMenuItem className="focus:text-blue-500">
                <Link href="/orders">
                  {" "}
                  <ShoppingBag className="size-4 mr-2 transition ease grduration-150 text-blue-500" />
                  My orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-blue-500">
                <Link href="/dashboard">
                  {" "}
                  <LayoutDashboard className="size-4 mr-2 transition ease grduration-150 text-blue-500" />
                  Mon dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:text-blue-500">
                <LogOut className="size-4 mr-2 group-hover:transition group-hover:ease group-hover:duration-150 text-blue-500" />
                Log out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {/* <DropdownMenuItem className="focus:text-blue-500">
                <LoginLink>Sign in</LoginLink>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-blue-500">
                <RegisterLink>Sign up</RegisterLink>
              </DropdownMenuItem> */}
             <DropdownMenuItem className="focus:text-blue-500">
               ddddd
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
