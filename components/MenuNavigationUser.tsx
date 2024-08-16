"use client"
import React from 'react'
import { allTabs } from "@/lib/navigation";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export const MenuNavigation = () => {
    const pathname  = usePathname()
    const navigationAllTabs = allTabs;
    return (
        <>
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
        </>

  )
}
