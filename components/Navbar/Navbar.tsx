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
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ShoppingCartIcon, ChevronDown } from "lucide-react";
import { Package2Icon } from "lucide-react";
import Image from "next/image";
import SearchComponent from "../SearchComponent";
import logo from "../public/vStore.png";
import UserNav from "./UserNav";
import MenuNavigation from "./MenuNavigation";
import { allTabs } from "@/lib/navigation";
import { ChevronDownIcon } from "lucide-react";
import ButtonCartNav from "./ButtonCartNav";
import clsx from "clsx";
import { usePathname } from "next/navigation";
export default function Component() {
  const pathname  = usePathname()
  const navigationAllTabs = allTabs;
  // const navigationAllTabs = allTabs.slice(0, 2);
  return (
    <header className="bg-background">
      <div className="container mx-auto px-8 py-3 gap-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-muted-foreground">
          <MenuNavigation />
          <Link href="#" className="flex items-center" prefetch={false}>
            {/* <div className="w-20 h-20  border-1 relative"> */}
            {/* <Image 
            src={logo}
            alt="logo"
             width={150}
             height={150}
           
            className="object-cover "
            /> */}
            {/* </div> */}

            {/* <Package2Icon className="h-6 w-6 text-primary" /> */}
            <p>Vantech V-store</p>
          </Link>
        </div>
        <div className="flex max-sm:hidden items-center w-full max-w-md mx-auto">
          <div className="relative flex-1">
            <SearchComponent placeholder="rechercher votre article..." />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UserNav />
        <ButtonCartNav />
        </div>
      </div>
      <div className="sm:hidden px-8 py-3 flex items-center w-full max-w-md mx-auto">
        <SearchComponent placeholder="rechercher votre article..." />
      </div>
      <nav className="bg-muted/40 py-3 text-muted-foreground">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 ">
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="max-sm:hidden">
                <Button
              
                  className={clsx(
                    "foucs:ring-0 px-6 py-2  rounded-full hover:text-blue-500",

                  )}
                  variant={  "outline"}
                >
                  All
                  <ChevronDown className="size-4 mt-0.5 ml-1 " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="min-w-72 min-h-52 grid grid-cols-1 sm:grid-cols-2"
              >
                {allTabs.map((item, _) => (
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

            {navigationAllTabs.map((item, index) => (
              <Button
                disabled
                key={index}
                variant={pathname === item.href ? "defaultBtn" : "outline"}
                asChild
                className={clsx(
                  "rounded-full", 
                  pathname === item.href ? "hover:text-white" : "hover:text-blue-500"
                )}
              >
                <Link  href={item.href}> {item.id}</Link>
              </Button>
            ))}
          </div>

          {/* <NavigationMenu >
            <NavigationMenuList>
              <NavigationMenuItem >
                <NavigationMenuTrigger className="rounded-full border border-input">
                  <span>All Categories</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent >
                  <div className="grid w-[400px] p-2">
                    {allTabs.map((item,index) => (
                      <NavigationMenuLink key={index} asChild>
                        <Link
                          href={item.href}
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                          prefetch={false}
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline">
                            {item.id}
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <div></div>
              {navigationAllTabs.map((item, _) => (
                <NavigationMenuLink key={item.id} asChild>
                  <Button
                    variant={"outline"}
                    asChild
                    className="rounded-full hover:text-blue-500"
                  >
                    <Link href={item.href}> {item.id}</Link>
                  </Button>
                 
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>
      </nav>
    </header>
  );
}
