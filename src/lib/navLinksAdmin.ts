import { Home, Package, ShoppingCart, Users2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Shield } from 'lucide-react';
export const navLinksAdmin = [
    {
      id: "dashboard",
      href: ["/admin/dashboard"],
      Icon: Home,
    },
    {
      id: "orders",
      href: ["/admin/orders"],
      Icon: ShoppingCart,
      badge:true
    },
    {
      id: "products",
      href: ["/admin/manage-products","/admin/add-products"],
      Icon: Package,
    },
    {
      id: "customers",
      href: ["/admin/customer"],
      Icon: Users2,
    },
    {
      id: "admins",
      href: ["/admin/manage-admins","/admin/manage-admins"],
      Icon: Shield,
    },
  ];