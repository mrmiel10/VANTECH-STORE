"use client"
import { clsx } from "clsx";
import Link from "next/link";

interface typeBreadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { tabAddProductActive, tabOrdersActive } from "@/lib/breadCrumbsAdmin";
import { tabManageProductActive } from "@/lib/breadCrumbsAdmin";

import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  let breadcrumbs:{label:string,href:string,active?:boolean}[] = []
  const pathname = usePathname()
  if(pathname === "/admin/add-products") breadcrumbs = [...tabAddProductActive]
  if(pathname === "/admin/manage-products") breadcrumbs = [...tabManageProductActive]
  if(pathname === "/admin/orders") breadcrumbs = [...tabOrdersActive]
  
  return (
    <Breadcrumb className="">
      <BreadcrumbList className="text-sm">
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.active === true ? (
            <>
              <BreadcrumbItem key={breadcrumb.label}>
                <BreadcrumbPage className="text-blue-500">
                  {breadcrumb.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 ? <BreadcrumbSeparator /> : null}
            </>
          ) : (
            < >
              <BreadcrumbItem key={breadcrumb.label}>
                <BreadcrumbLink
                  asChild
                  className="text-muted-foreground hover:text-blue-500"
                >
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 ? <BreadcrumbSeparator /> : null}
            </>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
