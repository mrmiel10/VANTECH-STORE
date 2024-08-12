"use client";
import React from "react";
import vStore from "../public/vStore.png";
import Link from "next/link";
import Image from "next/image";
import { allTabs } from "@/lib/navigation";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { fakePathname } from "./FirstHeader";
const WarrantyAndReturnInformation = [
  { id: "product warranty", href: "#" },
  { id: "return policy", href: "#" },
];
export const Footer2 = () => {
  // if(fakePathname.includes("/admin/dashboard/add-products")) return null
  
  const categoriesProducts = [...allTabs];
  //   const categoriesProducts = allTabs.filter((item, _) => item.isCategory);
  const customerService = [
    { id: "Privacy policy", href: "#" },
    { id: "Terms of sale", href: "#" },
    { id: "Return  and refund policy", href: "#" },
    { id: "FAQS", href: "#" },
  ];
  const paymentAndShipppingInformation = [
    { id: "Accepted payment method", href: "#" },
    { id: "Shipping times", href: "#" },
    { id: "Shipping costs", href: "#" },
  ];

  return (
    <footer className="p-8 pb-0 bg-muted/40  text-muted-foreground z-10 ">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-[150px_repeat(3,1fr)] gap-4 justify-items-start md:justify-items-center lg:justify-items-start">
          <SectionFooter
            section={categoriesProducts}
            nameSection={"Catégories"}
          />

          <SectionFooter
            section={customerService}
            nameSection={"Customer Service"}
          />
          <SectionFooter
            section={paymentAndShipppingInformation}
            nameSection={"Payment and shippping information"}
          />
          <SectionFooter
            section={WarrantyAndReturnInformation}
            nameSection={"Warranty and return information"}
          />
          <div className="space-y-2">
            <div className="flex flex-col">
              {/* <div>
                <h3 className="uppercase">Contact us</h3>
                <div>
                  <p>Douala-Cameroun Logbessou</p>
                  <p>VantechSolutions@gmail.com</p>
                  <Separator />
                </div>
                <div>
                  <p>
                    <Link href={"#"}>promo</Link>
                  </p>
                  <p>
                    {" "}
                    <Link href={"#"}>Best sells</Link>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
            <Button variant="defaultBtn" className="rounded-full">Abonnez vous à notre newsletter</Button></div>
        <div className="">
          <Separator />
          <div className="p-2 min-h-24 flex flex-col items-center gap-3">
            <div className="text-sm flex max-sm:gap-1 gap-2 flex-wrap items-center">
              <div>Place: Douala-Cameroun Logbessou</div>
              <Separator
                orientation="vertical"
                className="h-4    bg-blue-500"
              />
              <div>Email: VantechSolutions@gmail.com</div>
              <Separator orientation="vertical" className="h-4   bg-blue-500" />
              <div>Contact: 682790680</div>
            </div>

            <div className="text-blue-500 self-center text-center">
              © Copyright 2023. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


const SectionFooter = ({
  section,
  nameSection,
}: {
  section: {
    id: string;
    href: string;
    description?: string;
    isCategory?: boolean;
  }[];
  nameSection: string;
}) => {
  return (
    <div className="flex xs:col-span-2 lg:col-span-1 col-span-4">
      <div className="space-y-2">
        <h3 className="md:text-center lg:text-left text-blue-500 font-semibold">
          {nameSection}
        </h3>
        {/* <div className=""> */}
        <ul className="space-y-2">
          {section.map((item, index) => (
            <li
              key={item.id}
              className="relative group hover:text-blue-500 text-sm ease transition duration-150 text-left md:text-center lg:text-left"
            >
              <Link className="" href={item.href}>
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}{" "}
              </Link>
              <span className="absolute top-5 left-0 h-0.5 w-0 bg-blue-500 opacity-0  transition-all duration-300  group-hover:opacity-100 group-hover:w-10 "></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
