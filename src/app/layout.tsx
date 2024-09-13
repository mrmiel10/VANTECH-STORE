import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner } from "sonner";
import { CircleX } from "lucide-react";
import { CircleCheckIcon } from "lucide-react";
import { Navbar } from "./Navbar";
import FirstHeader from "./FirstHeader";
import { UserNav } from "./UserNav";
import { EdgeStoreProvider } from "../lib/edgestore";
import Footer from "./Footer";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Anek_Telugu } from "next/font/google";
import { cn } from "@/lib/utils";

const AnekTelugu = Anek_Telugu({ subsets: ["latin"],
  variable:"--font-caption"
 });
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vantech store",
  description: "Buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        AnekTelugu.variable,
        "font-sans flex flex-col min-h-screen "
      )}
       >
        <div className=" ">
          <div>
            <Navbar>
              <UserNav />
            </Navbar>
            <FirstHeader />
          </div>

          <main className="">
            <EdgeStoreProvider>
            {/* <div vaul-drawer-wrapper="" className="bg-background"> */}
            {children}
          {/* </div> */}
              </EdgeStoreProvider>
          </main>
          <div>
            <Footer />
         
          </div>

          <Sonner
            toastOptions={{
              classNames: {
                closeButton: "",
                title: "text-sm",
                content: "border-[1.5] border-green-500",
                default: "text-blue-500",
                icon: "size-4",

                success:
                  "border-2 border-green-200  bg-green-100 text-green-400",
                error: "border-2 border-red-200  bg-red-100 text-red-400",
              },
            }}
            closeButton
            //  richColors
            className=""
            icons={{
              info: <CircleX className="" />,
              error: <CircleX className="" />,
              success: <CircleCheckIcon className="" />,
            }}
          />
        </div>
      </body>
    </html>
  );
}
