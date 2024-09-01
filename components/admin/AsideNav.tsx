import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { MenuNavigationAdmin } from "./MenuNavigationAdmin";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DefaultUser from "../../public/defaultUser.png";
import { getInitials } from "../Navbar/UserNav";
import { getCurrentUser } from "@/lib/actions";
import { Circle } from "lucide-react";
import { redirect } from "next/navigation";
export const AsideNav = async () => {
  // const user = await getCurrentUser()
  // if(!user) redirect("/")
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
      <div className="mt-auto flex flex-col items-center justify-center pb-2 px-4 gap-2">
        {/* <Avatar  className="size-32">
          <AvatarFallback>
            {getInitials(user?.firstName ,user?.lastName,user?.email)}
        
          </AvatarFallback>
          <AvatarImage
          className="object-cover"
            alt="profile user"
            src={
              (user.picture as string) ??
              `https://api.dicebear.com/9.x/adventurer/svg?seed=Buster`
            }
          />
        </Avatar> */}
        <div className="text-sm text-blue-500  flex flex-col justify-center items-center">
        <div className=" font-semibold">Admin</div>
        <div className="">
          {/* {user?.email}   */}
          {/* mbakopngako@gmail.com */}
          </div>
        </div>
      <div className="text-xs flex gap-2 mt-4">
        <div className="flex items-center "> <span className="flex-1 hover:text-blue-500">FAQS</span><Circle fill="#c0c0c0" stroke="none"  className="size-2 ml-1"/></div>
        <div className="flex items-center"> <span className="flex-1 hover:text-blue-500">Privacy</span><Circle fill="#c0c0c0" stroke="none"  className="size-2 ml-1"/></div>
        <div className="flex items-center"> <span className="flex-1 hover:text-blue-500">About</span></div>
       
        
      </div>
      </div>
    </aside>
  );
};
