'use client'

import React from 'react'
import { Book as BookType } from '@/types/type'
import { Button } from './ui/button'
import { X, ShoppingBasket } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/context/UserContext'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { user, removeFromCart } = useUser()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBasket size={20} />
                  Your Cart ({user.cart.length})
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {user.cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {user.cart.map((book) => (
                      <motion.li
                        key={book.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex gap-4 p-2 border rounded-lg"
                      >
                        <img
                          src={book.imagePath}
                          alt={book.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{book.title}</h3>
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
              </div>

              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span>Total:</span>
                  <span className="font-bold">
                    ${user.cart.reduce((sum, book) => sum + book.price, 0).toFixed(2)}
                  </span>
                </div>
                <Button className="w-full" disabled={user.cart.length === 0}>
                  Checkout
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSidebar