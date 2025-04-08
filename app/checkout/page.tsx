'use client'
import React, { useState } from 'react'
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useUser from '@/context/UserContext';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from '@/components/ui/scroll-area';


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const { user } = useUser()
  console.log('user >>', user)
  const totalBookPrice = user.cart.reduce(
    (sum, item) => sum + (item.book.price * item.quantity), 0
  )
  const totalDrinkPrice = user.cart.reduce(
    (sum, item) => sum + (item.selectedDrinks?.reduce(
      (drinkSum, selection) => drinkSum + ((selection.drink.sizes[selection.size]?.price ?? 0) * selection.quantity),
      0
    ) ?? 0), 0
  )
  let amount = (totalBookPrice + totalDrinkPrice);
  amount === 0 && (amount = 20)


  return (
    <main className="h-[80vh] p-16 relative overflow-hidden flex flex-col md:flex-row justify-center items-start rounded-3xl mt-20 w-[80%] mx-auto">
      <div className="flex-1">
        <ScrollArea className="h-[50vh] rounded-md overflow-hidden bg-black/5 border">
          <div>
            <div className="grid grid-cols-3 items-center text-lg py-4 font-semibold sticky top-0 p-4 shadow bg-white">
              <h3 className="text-start">Books</h3>
              <p className='text-center'>Quantity</p>
              <p className="text-end">Unit Price</p>
            </div>
            {user.cart.map((item) => (
              <div className="">
                <Separator className="" />
                <div key={item.book.id} className="grid grid-cols-3 p-4 text-sm">
                  <h3 className="text-start font-medium line-clamp-1">{item.book.title}</h3>
                  <p className='text-center'>{item.quantity}</p>
                  <p className="text-end font-bold">${item.book.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className=''>
            {user.cart.some(item => (item.selectedDrinks ?? []).length > 0) && (
              <div className=''>

                <div className="grid grid-cols-3 items-center text-lg py-4 font-bold sticky top-0 p-4 shadow bg-white">
                  <h3 className="text-start">Drinks</h3>
                  <p className='text-center'>Quantity</p>
                  <p className="text-end">Unit Price</p>
                </div>
                {user.cart.map((item, idx) => (
                  (item.selectedDrinks ?? []).length > 0 && (
                    <div key={idx} className="">
                      {item.selectedDrinks?.map((drink, index) => (
                        <div>
                          <Separator className="" />
                          <div className='grid grid-cols-3 p-4 text-sm'>
                            <p key={index} className="text-start font-medium">{drink.drink.name} ({drink.size})</p>
                            <p className='text-center'>{drink.quantity}</p>
                            <p className="text-end font-bold">
                              ${drink.drink.sizes[drink.size]?.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className='flex-1'>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </main>
  );
}