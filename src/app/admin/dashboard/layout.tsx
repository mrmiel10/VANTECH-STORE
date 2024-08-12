"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { navLinksAdmin } from "@/lib/navLinksAdmin";
import { MenuIcon } from "lucide-react";
import Breadcrumbs from "../../../../components/admin/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import AdminNav from "../../../../components/admin/AdminNav";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-muted-foreground">
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-52 flex-col border-r bg-background lg:flex">
      <Link
        href="#"
        className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
      >
        Vantech V-store
      </Link>
      <Separator />
      <nav className="grid gap-4 items-start px-2 py-4 text-sm font-medium lg:px-4">
        {navLinksAdmin.map((item, _) => (
          <Link
            key={item.id}
            href={item.href[0]}
            className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-blue-500  hover:bg-muted ",
                { "bg-muted text-blue-500" : item.href.includes(pathname)},
            )}
          >
            <item.Icon className="size-4" />
            {/* <Home className="h-4 w-4" /> */}
            {item.id}
            {item.badge}
          </Link>
        ))}
      </nav>
    </aside>
    <div className="flex flex-col lg:gap-4 lg:py-4 lg:pr-8 lg:pl-52">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:static lg:h-auto lg:border-0 lg:bg-transparent lg:px-6">
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
                "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-blue-500  hover:bg-muted text-primary",
                { "bg-muted-foreground text-blue-500" : item.href.includes(pathname)},
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
          <Breadcrumbs
      
          />
        </div>
        <AdminNav />
      </header>
     {children}
    </div>
  </div>
  );
}