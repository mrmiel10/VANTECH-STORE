import { AdminBtn } from "./AdminBtn";
import { HeaderAdmin } from "./Header-Admin";

import { AsideNav } from "./AsideNav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-muted-foreground">
      <AsideNav />
      <div className="flex flex-col h-full lg:gap-4 lg:py-4 lg:pr-8 lg:pl-52">
        <HeaderAdmin>
          <AdminBtn />
        </HeaderAdmin>
        <main className="min-h-screen grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8">
        {children}
        </main>
     
      </div>
    </div>
  );
}
