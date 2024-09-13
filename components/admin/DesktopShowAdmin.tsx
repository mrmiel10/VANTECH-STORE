"use client"
import React from 'react'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import profil from "../../public/profil.jpg"
import { EditAdminButton } from '../SubmitButtons';
import { DisplayDeleteAdminModalBtn } from '../DisplayModalDeleteAdminBtn';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GetPermissionsAdminBtn } from './GetPermissionsAdminBtn';

export const DesktopShowAdmin = () => {
  return (
    <Table className="text-muted-foreground font-caption hidden md:table ">
    <TableHeader className="rounded-lg text-left text-sm font-normal">
      <TableRow>
        <TableHead className=" w-[100px] px-4 py-5 font-medium sm:pl-6 shrink-0">
          <span className="sr-only">Image</span>
        </TableHead>
        <TableHead className=" px-4 py-5 font-medium ">
          Admin
        </TableHead>
        <TableHead className="px-4 py-5 font-medium ">
          Role
        </TableHead>
        <TableHead className="px-4 py-5 pl-6 pr-3 font-medium w-[300px]">
          Permission
        </TableHead>
        <TableHead className="relative px-4 py-3 w-[100px] ">
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="">
          <div className="w-full shrink-0 ">
              {/* <Avatar>
                  <AvatarImage>

                  </AvatarImage>
                  <AvatarFallback>XO</AvatarFallback>
              </Avatar> */}
            <Image
              src={profil}
              className="rounded-full aspect-square object-cover flex-shrink-0"
              width={50}
              height={50}
              alt={"dddd"}
            />
          </div>
        </TableCell>
        <TableCell className="whitespace-nowrap px-3 py-3">
          <p className='font-semibold'>Daryl</p>
          <p className='text-sm'>mbakongako@gmail.com</p>
        </TableCell>
        <TableCell className="whitespace-nowrap px-3 py-3">
          Admin
        </TableCell>
        <TableCell className="whitespace-nowrap px-3 pl-6 pr-3">
          <ul className="flex gap-2 items-center flex-wrap">
            <li className="bg-accent/30 font-caption border border-accent rounded-sm text-blue-500 px-1 py-0.5 hover:bg-accent-50 transition-colors">
              Add product
            </li>
            <li className="bg-accent/30 font-caption border border-accent rounded-sm text-blue-500 px-1 py-0.5 hover:bg-accent-50 transition-colors">
              Edit product
            </li>
            <li className="bg-accent/30 font-caption border border-accent rounded-sm text-blue-500 px-1 py-0.5 hover:bg-accent-50 transition-colors">
              Delete product
            </li>
          </ul>
        </TableCell>
        <TableCell className="whitespace-nowrap py-3 ">
          <div className="flex  gap-2 w-fit">
         <GetPermissionsAdminBtn />
            <DisplayDeleteAdminModalBtn adminId="dfgfdrr2r" />
            <EditAdminButton idAdmin="ddddd" />{" "}
      
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  )
}
