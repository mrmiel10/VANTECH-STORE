import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { MenuNavigationAdmin } from "./MenuNavigationAdmin";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DefaultUser from "../../public/defaultUser.png";
import { getInitials } from "../Navbar/UserNav";
export const AsideNav = async () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-52 flex-col border-r bg-background lg:flex">
      <div>
        <Link
          href="#"
          className="flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary"
        >
          Vantech V-store
        </Link>
        <Separator />
        <MenuNavigationAdmin />
      </div>
      <div className="mt-auto flex flex-col items-center justify-center py-8 px-4 gap-2">
        <Avatar  className="size-32">
          <AvatarFallback>
            {getInitials("D", "B","E")}
          </AvatarFallback>
          <AvatarImage
            alt="profile user"
            // src={
            //   (user.picture as string) ??
            //   `https://api.dicebear.com/9.x/adventurer/svg?seed=Buster`
            // }
          />
        </Avatar>
        <div className="text-sm text-blue-500  flex flex-col justify-center items-center">
        <div className=" font-semibold">Admin</div>
        <div className="">mbakopngako@gmail.com</div>
        </div>
      
      </div>
    </aside>
  );
};
