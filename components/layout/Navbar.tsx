"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconCoffee, IconHome, IconInfoCircle } from "@tabler/icons-react";
import { LibraryBig, Tags, User } from "lucide-react";
import { useAuth } from "@clerk/nextjs";





export default function Navbar({
  className2,
}: {
  className2?: string;
}

) {
  const [active, setActive] = useState<string | null>(null);
  const { userId } = useAuth()
  const allNavItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome />,
    },
    {
      name: "Library",
      link: "/library",
      icon: <LibraryBig />,
    },
    {
      name: "Beverages",
      link: "/beverages",
      icon: (
        <IconCoffee />
      ),
    },
    {
      name: "Rewards",
      link: "/rewards",
      icon: (
        <Tags />
      ),
    },
    {
      name: "Profile",
      link: "/profile",
      icon: (
        <User />
      ),
    },
    {
      name: "About Us",
      link: "/aboutUs",
      icon: (
        <IconInfoCircle />
      ),
    },
  ];
  const navItems = allNavItems.filter(item => userId || item.name !== "Profile");

  return (
    <div className={cn("relative", className2)}>
      <FloatingNav navItems={navItems} className="flex justify-between" />
    </div>
  )
}

