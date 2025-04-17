"use client"

import * as React from "react"
import {
  BookOpen,
  BookOpenCheck,
  CircleUser,
  LayoutDashboard,
  Settings2,
  ShoppingBasket,
} from "lucide-react"
import { Playfair_Display } from "next/font/google";
import { useUser as useClerkUser } from "@clerk/nextjs"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useClerkUser()
  if (!user) return;
  const data = {
    user: {
      name: user.fullName || "Anonymous",
      email: user.emailAddresses[0]?.emailAddress,
      avatar: user.imageUrl,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/profile",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "My Products",
        url: "/profile/myProducts",
        icon: BookOpenCheck,
        // items: [
        //   {
        //     title: "Sold",
        //     url: "#",
        //   },
        //   {
        //     title: "In progress",
        //     url: "#",
        //   },
        //   {
        //     title: "Rejected",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "My Orders",
        url: "/profile/myOrders",
        icon: ShoppingBasket,
        // items: [
        //   {
        //     title: "In Progress",
        //     url: "#",
        //   },
        //   {
        //     title: "Delivered",
        //     url: "#",
        //   },
        //   {
        //     title: "Canceled",
        //     url: "#",
        //   },
        // ],
      },
    ],
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              </div>
              <span className={`text-lg font-semibold text-black text-nowrap ${playfair.className}`}>Pagina & Espresso</span>
            </SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>


      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
