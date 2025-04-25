"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import useUser from "@/context/UserContext";
import { Button } from "./ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, removeFromCart } = useUser();
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Cart ({user.cart.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="overflow-x-scroll pb-4">
              {user.cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <ul className="grid grid-flow-col gap-4">
                  {user.cart.map((book) => (
                    <motion.li
                      key={book.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex w-[400px] gap-4 p-2 border rounded-lg"
                    >
                      <img
                        src={book.imagePath}
                        alt={book.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500">${book.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(book.id)}
                        className="text-red-500"
                      >
                        <X size={16} />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex justify-between mb-4">
                <span>Total:</span>
                <span className="font-bold">
                  $
                  {user.cart
                    .reduce((sum, book) => sum + book.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <Button className="w-full" disabled={user.cart.length === 0}>
                Checkout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
