"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import SearchComponent from "../SearchComponent";
import logo from "../public/vStore.png";
import { UserNav } from "./UserNav";

import { allTabs } from "@/lib/navigation";
import { ChevronDownIcon } from "lucide-react";
import ButtonCartNav from "./ButtonCartNav";
import clsx from "clsx";
import { MenuNavigation } from "../MenuNavigationUser";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
export function Navbar(props:PropsWithChildren) {

const navigationAllTabs = allTabs;
const pathname  = usePathname()
if(pathname.startsWith("/admin")) return null

  return (
    <header className="bg-background">
      <div className="container mx-auto px-8 py-3 gap-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="#" className="flex items-center" prefetch={false}>
            <p>Vantech V-store</p>
          </Link>
        </div>
        <div className="flex max-sm:hidden items-center w-full max-w-md mx-auto">
          <div className="relative flex-1">
            <SearchComponent placeholder="rechercher votre article..." />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <UserNav /> */}
          {props.children}
          <ButtonCartNav />
        </div>
      </div>
      <div className="sm:hidden px-8 py-3 flex items-center w-full max-w-md mx-auto">
        <SearchComponent placeholder="rechercher votre article..." />
      </div>
      <div className="bg-muted/40 container mx-auto px-4 flex items-center justify-center gap-4 ">
        <nav className=" py-3 text-muted-foreground flex items-center gap-2 flex-wrap">
         
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="max-sm:hidden">
                <Button
                  className={clsx(
                    "foucs:ring-0 px-6 py-2  rounded-full hover:text-blue-500"
                  )}
                  variant={"outline"}
                >
                  All
                  <ChevronDownIcon className="size-4 mt-0.5 ml-1 " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="min-w-72 min-h-52 grid grid-cols-1 sm:grid-cols-2"
              >
                {navigationAllTabs.map((item, _) => (
                  <DropdownMenuItem key={item.id}>
                    <div className="grid p-2">
                      <div className="group text-sm font-medium leading-none group-hover:underline">
                        {item.id}
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <MenuNavigation />
       
        </nav>
      </div>
    </header>
  );
}
