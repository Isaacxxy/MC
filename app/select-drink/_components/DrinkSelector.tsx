'use client'

import { Drink } from '@/types/type'
import { useState } from 'react'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'

interface DrinkSelectorProps {
  drinks: Drink[]
  onSelectionsChange: (selections: {
    drink: Drink
    size: keyof Drink['sizes']
    quantity: number
  }[]) => void
}

export const DrinkSelector = ({ drinks, onSelectionsChange }: DrinkSelectorProps) => {
  const [selections, setSelections] = useState<{ drink: Drink; size: keyof Drink['sizes']; quantity: number }[]>([])

  const handleSelectionChange = (
    drink: Drink,
    size: keyof Drink['sizes'],
    quantity: number
  ) => {
    const existingIndex = selections.findIndex(
      (s) => s.drink.id === drink.id && s.size === size
    )

    let newSelections = [...selections]

    if (quantity > 0) {
      if (existingIndex >= 0) {
        newSelections[existingIndex] = { ...newSelections[existingIndex], quantity }
      } else {
        newSelections.push({ drink, size, quantity })
      }
    } else {
      newSelections = newSelections.filter(
        (s) => !(s.drink.id === drink.id && s.size === size)
      )
    }

    setSelections(newSelections)
    onSelectionsChange(newSelections)
  }

  const getQuantity = (drink: Drink, size: keyof Drink['sizes']) => {
    const selection = selections.find(
      (s) => s.drink.id === drink.id && s.size === size
    )
    return selection ? selection.quantity : 0
  }

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
        <p className="text-sm text-gray-500">
          Add drinks to earn bonus points (1 point = $0.01 discount)
        </p>

        <div className="divide-y divide-gray-200">
          {drinks.map((drink) => (
            <div key={drink.id} className="py-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={drink.imageUrl}
                    alt={drink.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover w-20 h-20"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{drink.name}</h4>
                  <p className="text-sm text-gray-500">{drink.description}</p>

                  <div className="mt-3 space-y-3">
                    {Object.entries(drink.sizes).map(([size, details]) => (
                      <div key={size} className="flex items-center justify-between">
                        <div>
                          <span className="capitalize font-medium">{size}</span>
                          <span className="ml-2 text-sm text-gray-500">
                            ${details.price.toFixed(2)} • +{details.points} pts
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleSelectionChange(
                                drink,
                                size as keyof Drink['sizes'],
                                Math.max(0, getQuantity(drink, size as keyof Drink['sizes']) - 1)
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                            disabled={getQuantity(drink, size as keyof Drink['sizes']) === 0}
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {getQuantity(drink, size as keyof Drink['sizes'])}
                          </span>
                          <button
                            onClick={() =>
                              handleSelectionChange(
                                drink,
                                size as keyof Drink['sizes'],
                                getQuantity(drink, size as keyof Drink['sizes']) + 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      {selections.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Your drink selections:</h4>
          <ScrollArea className="h-[30vh] w-full rounded-md border p-4">
            <ul className="space-y-2">
              {selections.map((selection, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>
                    {selection.quantity}x {selection.drink.name} ({selection.size})
                  </span>
                  <span>
                    +{(selection.drink.sizes[selection.size]?.points ?? 0) * selection.quantity} pts
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <div className="mt-3 pt-3 border-t font-medium flex justify-between">
            <span>Total points:</span>
            <span>
              {selections.reduce(
                (sum, selection) => sum + ((selection.drink.sizes[selection.size]?.points ?? 0) * selection.quantity),
                0
              )} pts
            </span>
          </div>
        </div>
      )}
    </div>
  )
}