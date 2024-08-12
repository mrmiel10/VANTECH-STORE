import React from 'react'
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { User2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { Settings } from 'lucide-react';
const AdminNav = () => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-full ml-auto"
      >
        <Image
          src="/placeholder-user.jpg"
          width={36}
          height={36}
          alt="Avatar"
          className="overflow-hidden rounded-full"
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className='text-muted-foreground'>
      <DropdownMenuItem className="focus:bg-transparent focus:text f">
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-semibold text-blue-500">user407211</p>
            <p className="text-muted-foreground">
              mbakopngako@gmail.com
            </p>
          </div>

          <Button
            asChild
            variant={"default"}
            className="self-start text-white bg-blue-500 border-none outline-none"
          >
            <Link href="/editprofil"> Edit profil</Link>
          </Button>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className='focus:text-blue-500'><Settings className='text-blue-500 size-4 mr-2'/> Settings</DropdownMenuItem>
      <DropdownMenuItem className='focus:text-blue-500'><User2 className='mr-2 text-blue-500 size-4' /> Pass to user</DropdownMenuItem>

      <DropdownMenuSeparator />
      <DropdownMenuItem className='focus:text-blue-500'>
        <LogOut className="text-blue-500 size-4 mr-2" />
        
        Logout

      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default AdminNav