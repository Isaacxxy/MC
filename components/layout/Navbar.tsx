"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconCoffee, IconHome, IconInfoCircle } from "@tabler/icons-react";
import { IoPricetagOutline } from "react-icons/io5";
import { LibraryBig } from "lucide-react";




export default function Navbar({
  className2,
}: {
  className2?: string;
}

) {
  const [active, setActive] = useState<string | null>(null);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Library",
      link: "/library",
      icon: <LibraryBig className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Beverages",
      link: "/beverages",
      icon: (
        <IconCoffee className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Rewards",
      link: "/rewards",
      icon: (
        <IoPricetagOutline className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "About Us",
      link: "/aboutUs",
      icon: (
        <IconInfoCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className={cn("relative", className2)}>
      <FloatingNav navItems={navItems} className="flex justify-between" />
    </div>
  )
}

