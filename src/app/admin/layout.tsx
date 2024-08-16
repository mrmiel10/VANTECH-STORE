import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AdminBtn } from "../../../components/admin/AdminBtn";
import { HeaderAdmin } from "../../../components/admin/Header-Admin";
import { MenuNavigationAdmin } from "../../../components/admin/MenuNavigationAdmin";
export default function Layout({ children }: { children: React.ReactNode }) {
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
        <MenuNavigationAdmin />
      </aside>
      <div className="flex flex-col lg:gap-4 lg:py-4 lg:pr-8 lg:pl-52">
        <HeaderAdmin>
          <AdminBtn />
        </HeaderAdmin>
        {children}
      </div>
    </div>
  );
}
