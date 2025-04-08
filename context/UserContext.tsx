'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Book, Coupon, User, CartItem, Drink } from '@/types/type'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { ShoppingBag } from 'lucide-react'
import { ToastAction } from '@radix-ui/react-toast'
import { useUser as useClerkUser } from '@clerk/nextjs';

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  addToWallet: (coupon: Coupon) => void;
  removeFromWallet: (couponId: string) => void;
  deductPoints: (amount: number) => void;
  addPoints: (amount: number) => void;
  addToCart: (book: Book, options?: { drinks?: { drink: Drink; size: keyof Drink['sizes']; quantity: number; }[] }) => void;
  removeFromCart: (bookId: string) => void;
  updateCartItem: (bookId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user: clerkUser } = useClerkUser();
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User>({
    points: 1000,
    wallet: [],
    cart: [],
  })

  const addToWallet = (coupon: Coupon) => {
    setUser(prev => ({
      ...prev,
      wallet: [...prev.wallet, coupon],
    }))
  }

  const removeFromWallet = (couponId: string) => {
    setUser(prev => ({
      ...prev,
      wallet: prev.wallet.filter(c => c.id !== couponId),
    }))
  }

  const deductPoints = (amount: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points - amount,
    }))
  }

  const addPoints = (amount: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + amount,
    }))
  }

  const addToCart = (
    book: Book,
    options?: {
      drinks?: {
        drink: Drink;
        size: keyof Drink['sizes'];
        quantity: number;
      }[];
    }
  ) => {
    setUser(prev => {
      const existingItemIndex = prev.cart.findIndex(item => item.book.id === book.id);

      const toastMessage = () => {
        let description = `"${book.title}" added to cart`;

        if (options?.drinks?.length) {
          const drinksDescription = options.drinks
            .map(d => `${d.quantity}x ${d.drink.name} (${d.size})`)
            .join(', ');
          description = `"${book.title}" with ${drinksDescription}`;
        }

        toast({
          title: options?.drinks?.length ? "Book + Drinks added!" : "Book added to cart",
          description,
          action: (
            <ToastAction
              altText={'Go To Cart'}
              onClick={() => router.push('/cart')}
              className="flex justify-center items-center gap-2 text-sm text-nowrap font-semibold text-blue-500 bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-1"
            >
              <ShoppingBag size={16} />
              View Cart ({prev.cart.length + (existingItemIndex >= 0 ? 0 : 1)})
            </ToastAction>
          ),
        });
      };

      if (existingItemIndex >= 0) {
        const updatedCart = [...prev.cart];
        const existingItem = updatedCart[existingItemIndex];

        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          selectedDrinks: options?.drinks
            ? [...(existingItem.selectedDrinks || []), ...options.drinks]
            : existingItem.selectedDrinks
        };

        toastMessage();
        return {
          ...prev,
          cart: updatedCart
        };
      }

      toastMessage();
      return {
        ...prev,
        cart: [...prev.cart, {
          book,
          quantity: 1,
          selectedDrinks: options?.drinks || []
        }]
      };
    });
  };

  const updateCartItem = (bookId: string, updates: Partial<CartItem>) => {
    setUser(prev => ({
      ...prev,
      cart: prev.cart.map(item =>
        item.book.id === bookId ? { ...item, ...updates } : item
      ),
    }))
  }

  const removeFromCart = (bookId: string) => {
    setUser(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.book.id !== bookId),
    }))
  }

  const clearCart = () => {
    const pointsEarned = user.cart.reduce((sum, item) => {
      if (item.selectedDrinks) {
        return sum + item.selectedDrinks.reduce(
          (drinkSum, selection) => drinkSum + ((selection.drink.sizes[selection.size]?.points ?? 0) * selection.quantity),
          0
        )
      }
      return sum
    }, 0)

    if (pointsEarned > 0) {
      toast({
        title: `🎉 ${pointsEarned} points earned!`,
        description: "You can now redeem them for discounts",
      })
    }

    setUser(prev => ({
      ...prev,
      cart: [],
      points: prev.points + pointsEarned
    }))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        addToWallet,
        removeFromWallet,
        deductPoints,
        addPoints,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export default useUser