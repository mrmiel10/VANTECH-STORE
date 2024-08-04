import React from 'react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, LogOut, ShoppingBag } from "lucide-react";

import { LayoutDashboard } from "lucide-react";

import { User } from "lucide-react";
import CountFavorites from './CountFavorites';
const UserNav = () => {
    

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-blue-500">CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="text-muted-foreground z-40 bg-white w-72"
    >
      <DropdownMenuItem className="focus:bg-transparent focus:text">
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-semibold text-blue-500">user407211</p>
            <p className="text-muted-foreground">
              mbakopngako@gmail.com
            </p>
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
            {/* <Button
              disabled
              variant={"defaultBtn"}
              className="disabled:opacity-75 hover:disabled ml-auto bg-blue-500 rounded-full text-white size-4 p-3"
            >
              3
            </Button> */}
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
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default UserNav