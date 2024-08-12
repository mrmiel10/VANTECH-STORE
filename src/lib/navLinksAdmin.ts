import { Home, Package, ShoppingCart, Users2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
export const navLinksAdmin = [
    {
      id: "dashboard",
      href: ["/admin/dashboard"],
      Icon: Home,
    },
    {
      id: "orders",
      href: ["/admin/dashboard/orders"],
      Icon: ShoppingCart,
      badge:true
    },
    {
      id: "products",
      href: ["/admin/dashboard/manage-products","/admin/dashboard/add-products"],
      Icon: Package,
    },
    {
      id: "customers",
      href: ["/admin/dasboard/customer"],
      Icon: Users2,
    },
  ];