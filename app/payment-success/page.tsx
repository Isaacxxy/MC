'use client'
import React from "react";
import { useUser } from "@/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const { user } = useUser();
  console.log("User in PaymentSuccess:", user);
  console.log("Wallet in PaymentSuccess:", user.wallet);
  console.log("Cart in PaymentSuccess:", user.cart);
  return (
    <main className="h-screen overflow-hidden flex flex-row">
      <div className="relative flex-1 overflow-hidden">
        <div className='absolute inset-0 h-screen bg-black opacity-[50%]'></div>
        <img src="/payment/successPayment.jpg" alt="" className="w-full h-full" />
      </div>
      <div className="w-[30%]">
        <div className="p-6 h-full flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center">
            <img
              src="/payment/checked.png"
              alt="Payment Successful"
              className="w-24 h-24 mb-4"
            />
            <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
            <p className="text-gray-700 mb-4">
              Thank you for your payment of ${amount}!
            </p>
            <p className="text-gray-700 mb-4">
              Your order is being processed and will be shipped soon.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Dialog>
              <DialogTrigger>
                <button className="bg-[#F2E1C1] text-[#3E3E3E] hover:bg-[#E1C99C]/90 text-base text-center font-semibold flex items-center justify-center gap-2 rounded-md px-4 py-2">
                  See Order Details
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl mb-4">Order Details</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  {user.cart.map((item, index) => {
                    if (item.itemType === 'book') {
                      const { book, quantity } = item;
                      return (
                        <div key={index} className="grid grid-cols-3 justify-start items-center">
                          <div className="col-span-1 flex justify-star items-end gap-2">
                            <img src={book.imagePath} alt={book.title} width={40} />
                            <div className="flex flex-col gap-1">
                              <h2 className="text-left text-sm line-clamp-1">{book.title}</h2>
                              <p className="text-left line-clamp-1 text-xs">{book.author}</p>
                            </div>
                          </div>

                          <p className="text-center">{quantity}</p>
                          <p className="text-center">{book.price.toFixed(2)}</p>
                        </div>
                      );
                    } else if (item.itemType === 'drink') {
                      const { drink, size, quantity } = item;
                      const drinkSize = drink.sizes[size];
                      return (
                        <div key={index} className="grid grid-cols-3 justify-start items-center">
                          <div className="col-span-1 flex justify-star items-center gap-2">
                            <img src={drink.imageUrl} alt={drink.name} width={40} className="bg-gray-100 py-2" />
                            <h2 className="text-left text-sm line-clamp-1">{drink.name} ({size})</h2>
                          </div>
                          <p className="text-center">{quantity}</p>
                          <p className="text-center">{drinkSize?.price.toFixed(2)}</p>
                        </div>
                      );
                    }
                  })}
                </div>
                <DialogFooter>

                </DialogFooter>
              </DialogContent>
            </Dialog>
            <button onClick={() => {
              window.location.href = "/library";
            }} className="bg-[#6A8D73] text-white hover:bg-[#5C7A65]/90 text-base text-center font-semibold flex items-center justify-center gap-2 rounded-md px-4 py-2">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}