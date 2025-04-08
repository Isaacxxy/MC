import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Footer from "@/components/layout/Footer";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pagina & Espresso",
  description: "A BookCoffee shop app",
  icons: {
    icon: "/next.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`"w-full bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <UserProvider>
            {/* <SidebarProvider defaultOpen={false}>
              <SidebarInset> */}
            <Navbar />
            {children}
            <Toaster />
            <Footer />
            {/* <SidebarTrigger className="sticky  bottom-3 right-0 ml-auto rotate-180" />
              </SidebarInset>
              <AppSidebar side="bottom" />
            </SidebarProvider> */}
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
