"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter } from "lucide-react"
import vsMobile from "../../public/vs-mobile.png"
import vsDesktop from "../public/vs-desktop.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Image from "next/image" 
import Link from "next/link"
import { usePathname } from "next/navigation";
export default function Footer() {
    const pathname  = usePathname()
    if(pathname.startsWith("/admin")) return null
  return (
    <footer className="bg-muted/40 text-blue-500 pt-12 pb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image alt="logo vs-store" className="w-32 " src={vsMobile} />
            {/* <Image alt="logo vs-store" className="w-32 hidden sm:block " src={vsDesktop} /> */}
           
            <p className="mt-2 text-sm text-muted-foreground">
            buy your computer equipment and other accessories from us


            </p>
          </div>
          <div className="text-blue-500 font-semibold flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <a href="#" className="text-sm ">About</a>
            <a href="#" className="text-sm ">Contact</a>
            <a href="#" className="text-sm">FAQ</a>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm flex items-center">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuItem className="">
                  <Link href="/desktops">Desktops</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                  <Link href="#">Laptops</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                  <Link href="#">mouses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                  <Link href="#">Fashion Tips</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#" className="text-sm hover:text-white">Terms</a>
            <a href="#" className="text-sm hover:text-white">Privacy</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-blue-500">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </Link>
           
            <Link href="#" className="text-muted-foreground hover:text-blue-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
        {/* <Separator className="bg-blue-500"  /> */}
        <div className="text-blue-500 mt-8  flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; 2024 <span className="font-semibold text-blue-500">vantech v-store</span>. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <Input
              type="email"
              placeholder="Your email"
              className="w-48  text-sm placeholder-muted-foreground "
            />
            <Button variant={"defaultBtn"} type="submit" className="ml-2 text-sm">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}