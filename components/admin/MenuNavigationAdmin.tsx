"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import { navLinksAdmin } from '@/lib/navLinksAdmin'
import clsx from 'clsx'
import Link from 'next/link'
export const MenuNavigationAdmin = () => {
    const pathname = usePathname()
  return (
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
  )
}

