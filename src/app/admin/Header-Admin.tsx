"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { navLinksAdmin } from "@/lib/navLinksAdmin";
import { MenuIcon } from "lucide-react";
import Breadcrumbs from "./breadcrumbs";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
export const HeaderAdmin = (props: PropsWithChildren) => {
  const pathname = usePathname();
  return (
    <header className=" justify-between sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:static lg:h-auto lg:border-0 lg:bg-transparent lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="lg:hidden ">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-4 items-start px-2 py-4 text-sm font-medium lg:px-4">
            {navLinksAdmin.map((item, _) => (
              <Link
                key={item.id}
                href={item.href[0]}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-500 hover:bg-muted",
                  
                   
                      item.href.includes(pathname) ? "bg-muted text-blue-500": "text-muted-foreground"
                
                )}
              >
                <item.Icon className="size-4" />
                {/* <Home className="h-4 w-4" /> */}
                {item.id}
                {item.badge}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden lg:flex">
        <Breadcrumbs />
      </div>
      {props.children}
    </header>
  );
};
