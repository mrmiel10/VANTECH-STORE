import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonner } from "sonner";
import { CircleX } from "lucide-react";
import { CircleCheckIcon } from "lucide-react";
import { Navbar } from "../../components/Navbar/Navbar";
import FirstHeader from "../../components/FirstHeader";
import Footer from "../../components/Footer";
import { Footer2 } from "../../components/Footer2";
import { UserNav } from "../../components/Navbar/UserNav";
import { EdgeStoreProvider } from '../lib/edgestore';
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen  w-full ">
          <div>
          <Navbar >
           
              <UserNav />

              </Navbar>
            <FirstHeader />
          </div>

          <main className=""><EdgeStoreProvider>{children}</EdgeStoreProvider></main>
          <div>
            <Footer2 />
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
