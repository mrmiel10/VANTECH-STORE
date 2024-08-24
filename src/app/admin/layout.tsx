import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AdminBtn } from "../../../components/admin/AdminBtn";
import { HeaderAdmin } from "../../../components/admin/Header-Admin";
import { MenuNavigationAdmin } from "../../../components/admin/MenuNavigationAdmin";
import { AsideNav } from "../../../components/admin/AsideNav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-muted-foreground">
    <AsideNav />
      <div className="flex flex-col lg:gap-4 lg:py-4 lg:pr-8 lg:pl-52">
        <HeaderAdmin>
          <AdminBtn />
        </HeaderAdmin>
        {children}
      </div>
    </div>
  );
}
