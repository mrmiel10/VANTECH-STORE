import React from 'react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { allTabs } from '@/lib/navigation';
const MenuNavigation = () => {
  return (
    <Sheet>
    <SheetTrigger asChild>
      <MenuIcon className="size-6 sm:hidden" />
    </SheetTrigger>
    <SheetContent
      side={"left"}
      className=" text-muted-foreground text-sm px-0 pl-5 py-8 overflow-y-auto w-[248px] xs:w-[300px]  bg-white"
    >
      <div className="grid gap-2">
        <SheetTitle className="text-blue-500">
          Vantech v-store
        </SheetTitle>
        <Separator />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold text-blue-500 text-base">
              Articles
            </AccordionTrigger>
            <AccordionContent className="">
              <div className="grid gap-4">
                {allTabs.map(
                  (item, _) =>
                    item.isCategory && (
                      <div key={item.id}>{item.id}</div>
                    )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

   
        </Accordion>
        <Separator />
        <div className="flex flex-col gap-4 mt-4">
          <Link
            className="hover:text-blue-500 transition ease"
            href="/promo"
          >
            promo
          </Link>

          <Link
            className="hover:text-blue-500 transition ease"
            href="/promo"
          >
            best sells
          </Link>

          <Link
            className="hover:text-blue-500 transition ease"
            href="/promo"
          >
            FAQS
          </Link>
          <Link
            className="hover:text-blue-500 transition ease"
            href="/"
          >
            Sign in
          </Link>
        </div>
      </div>
    </SheetContent>
  </Sheet>
  )
}

export default MenuNavigation