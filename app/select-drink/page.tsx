'use client'

import { Button } from "@/components/ui/button"
import { useUser } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { DrinkSelector } from "./_components/DrinkSelector"
import { drinks } from "@/data"
import { useState } from "react"
import { Drink } from "@/types/type"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SelectDrinkPage() {
  const router = useRouter()
  const { user, updateCartItem } = useUser()
  const [selections, setSelections] = useState<
    { drink: Drink; size: keyof Drink['sizes']; quantity: number }[]
  >([])

  const handleProceedToCheckout = () => {
    user.cart.forEach(item => {
      updateCartItem(item.book.id, {
        selectedDrinks: selections
      })
    })

    router.push('/checkout')
  }

  return (
    <div className="container mx-auto py-8 px-4 mt-10">
      <div className="w-[80%] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Select Your Drinks</h1>
        <p className="mb-6 text-gray-600">
          Choose drinks to accompany your books and earn bonus points for discounts!
        </p>

        <DrinkSelector
          drinks={drinks}
          onSelectionsChange={setSelections}
        />



        <div className="max-w-2xl mx-auto mt-8 flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            Back to Cart
          </Button>
          <Button
            className="flex-1 bg-[#272927]"
            onClick={handleProceedToCheckout}
            disabled={selections.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
