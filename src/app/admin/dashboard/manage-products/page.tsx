import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  User,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { MenuIcon } from "lucide-react";
import Breadcrumbs from "../../../../../components/admin/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { EllipsisIcon } from "lucide-react";
import Shoe from "../../../../../public/blackShoe.jpg";
import Image from "next/image";
import Status from "../../../../../components/admin/Status";
import AdminNav from "../../../../../components/admin/AdminNav";
import FilterStatusProducts from "../../../../../components/admin/FilterStatusProducts";
import MobileProducts from "../../../../../components/admin/MobileProducts";
import AdminSearchItems from "../../../../../components/admin/AdminSearchItems";
import { navLinksAdmin } from "@/lib/navLinksAdmin";
import ProductsTable from "../../../../../components/admin/ProductsTable";
export default function Dashboard() {

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
        <nav className="grid gap-4 items-start px-2 py-4 text-sm font-medium lg:px-4">
          {navLinksAdmin.map((item, _) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary bg-muted text-primary"
            >
              <item.Icon className="size-4" />
              {/* <Home className="h-4 w-4" /> */}
              {item.id}
              {item.badge}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col lg:gap-4 lg:py-4 lg:pr-8 lg:pl-52">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:static lg:h-auto lg:border-0 lg:bg-transparent lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden ">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-4 items-start px-2 py-4 text-sm font-medium lg:px-4">
                {navLinksAdmin.map((item, _) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary bg-muted text-primary"
                  >
                    <item.Icon className="size-4" />

                    {item.id}

                    {item.badge && (
                      <Badge className="text-white ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        4
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden lg:flex">
            <Breadcrumbs
              breadcrumbs={[
                { label: "dashboard", href: "admin/dashboard" },
    {
      label: "manage products",
      href: "admin/dashboard/add-products",
    },
    {
      label: "manage products",
      href: "admin/dashboard/manage-products",
      active: true,
    },
              ]}
            />
          </div>
          <AdminNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8">
          <AdminSearchItems placeholder="search products..." />
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <FilterStatusProducts />

                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="">
                <CardHeader>
                  <CardTitle className="text-blue-500">Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <MobileProducts />

                  <Table className="text-muted-foreground hidden md:table">
                    <TableHeader className="">
                      <TableRow>
                        <TableHead className=" w-[100px]">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className="text-blue-500 font-semibold ">
                          Name
                        </TableHead>
                        <TableHead className="text-blue-500 font-semibold ">
                          Status
                        </TableHead>
                        <TableHead className="text-blue-500 font-semibold ">
                          Price
                        </TableHead>
                        <TableHead className="text-blue-500 font-semibold ">
                          Total Sales
                        </TableHead>

                        <TableHead>
                          <span className="sr-only w-7">others features</span>
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-muted-foreground">
                          Laser Lemonade Machine Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Repudiandae quod o
                          fficia laudantium nisi, consequatur aspernatur
                          doloremque reprehenderit,
                        </TableCell>

                        <TableCell>
                          <Status status="active" />
                        </TableCell>
                        <TableCell className="font-semibold">$499.99</TableCell>
                        <TableCell className="font-semibold">25</TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="px-4 py-2 text-muted-foreground "
                            >
                              <DropdownMenuLabel className="text-blue-500">
                                Others Features
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="focus:bg-transparent">
                                Catégorie: Laptop
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:bg-transparent">
                                Marque:
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:bg-transparent">
                                12 Reviews
                              </DropdownMenuItem>
                              <DropdownMenuLabel className="text-blue-500">
                                Set product Status
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuCheckboxItem
                                className="focus:text-blue-500"
                                checked
                              >
                                Active
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                className="focus:text-blue-500"
                                checked
                              >
                                Draft
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                className="focus:text-blue-500"
                                checked
                              >
                                Archive
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                        <TableCell className="text-center">
                          <div className="flex gap-2">
                            {" "}
                            <Button
                              className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
                              variant={"outline"}
                            >
                              <Pencil className="size-5" />
                            </Button>
                            <Button
                              className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
                              variant={"outline"}
                            >
                              {" "}
                              <TrashIcon className="size-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          Hypernova Headphones
                        </TableCell>
                        <TableCell>
                          <Status status="active" />
                        </TableCell>
                        <TableCell className="">$129.99</TableCell>
                        <TableCell className="">100</TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          AeroGlow Desk Lamp
                        </TableCell>
                        <TableCell>
                          <Status status="active" />
                        </TableCell>
                        <TableCell className="">$39.99</TableCell>
                        <TableCell className="">50</TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          TechTonic Energy Drink
                        </TableCell>
                        <TableCell>
                          <Status status="draft" />
                        </TableCell>
                        <TableCell className="">$2.99</TableCell>
                        <TableCell className="">0</TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table> */}
                  <ProductsTable />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
