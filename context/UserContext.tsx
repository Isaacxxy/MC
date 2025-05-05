"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Book, Coupon, User, CartItem, Drink } from "@/types/type";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { ToastAction } from "@radix-ui/react-toast";
import { useUser as ClerkUser } from "@clerk/nextjs";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  addToWallet: (coupon: Coupon) => void;
  removeFromWallet: (couponId: string) => void;
  deductPoints: (amount: number) => void;
  addPoints: (amount: number) => void;
  addToCart: (
    item: Book | Drink,
    options?: {
      size?: keyof Drink["sizes"];
      quantity?: number;
      drinks?: { drink: Drink; size: keyof Drink["sizes"]; quantity: number }[];
    }
  ) => void;
  removeFromCart: (
    itemId: string,
    itemType: "book" | "drink",
    size?: keyof Drink["sizes"]
  ) => void;
  updateCartItem: (
    itemId: string,
    itemType: "book" | "drink",
    updates: Partial<Omit<CartItem, "itemType">>,
    size?: keyof Drink["sizes"]
  ) => void;
  clearCart: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user: clerkUser } = ClerkUser();

  const [user, setUser] = useState<User>({
    points: 0,
    wallet: [],
    cart: [],
  });

  const updatePointsInDatabase = async (userId: string, newPoints: number) => {
    try {
      const response = await fetch(`/api/points/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ points: newPoints }),
      });

      if (!response.ok) {
        throw new Error("Failed to update points in database");
      }

      console.log("Points updated successfully in database");
    } catch (error) {
      console.error("Error updating points in database:", error);
    }
  };

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const userId = clerkUser?.id;

        if (!userId) {
          return;
        }

        const res = await fetch(`/api/points/${userId}`);

        if (!res.ok) {
          console.error("Échec de la requête:", res.status);
          throw new Error("Failed to fetch points");
        }

        const data = await res.json();
        console.log("Données reçues:", data);

        setUser((prev) => ({ ...prev, points: data.points }));
      } catch (error) {
        console.error("Erreur complète:", error);
      }
    };

    fetchPoints();
  }, [clerkUser?.id]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const userId = clerkUser?.id;

        if (!userId) {
          return;
        }

        const res = await fetch(`/api/coupons/${userId}`);

        if (!res.ok) {
          console.error("Échec de la requête:", res.status);
          throw new Error("Failed to fetch coupons");
        }

        const data = await res.json();
        console.log("Received data:", data);

        setUser((prev) => ({ ...prev, wallet: data }));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCoupons();
  }, [clerkUser?.id]);

  const addToWallet = (coupon: Coupon) => {
    setUser((prev) => ({
      ...prev,
      wallet: Array.isArray(prev.wallet) ? [...prev.wallet, coupon] : [coupon],
    }));
  };

  const removeFromWallet = (couponId: string) => {
    setUser((prev) => ({
      ...prev,
      wallet: Array.isArray(prev.wallet)
        ? prev.wallet.filter((c) => c.id !== couponId)
        : [],
    }));
  };

  const deductPoints = (amount: number) => {
    setUser((prev) => {
      const newPoints = prev.points - amount;
      if (clerkUser?.id) {
        updatePointsInDatabase(clerkUser.id, newPoints);
      }
      return {
        ...prev,
        points: newPoints,
      };
    });
  };

  const addPoints = (amount: number) => {
    setUser((prev) => {
      const newPoints = prev.points + amount;
      if (clerkUser?.id) {
        updatePointsInDatabase(clerkUser.id, newPoints);
      }
      return {
        ...prev,
        points: newPoints,
      };
    });
  };

  const addToCart = (
    item: Book | Drink,
    options?: {
      size?: keyof Drink["sizes"];
      quantity?: number;
      drinks?: { drink: Drink; size: keyof Drink["sizes"]; quantity: number }[];
    }
  ) => {
    setUser((prev) => {
      if ("title" in item) {
        toast({
          title: "Book added to cart",
          description: `"${item.title}" added to cart`,
          action: (
            <ToastAction
              altText="Go to cart"
              onClick={() => router.push("/cart")}
              className="flex gap-2"
            >
              <p>view cart </p>
              <ShoppingBag size={24} />
            </ToastAction>
          ),
        });

        return {
          ...prev,
          cart: [
            ...prev.cart,
            {
              itemType: "book",
              book: item,
              quantity: options?.quantity || 1,
            },
          ],
        };
      } else {
        if (!options?.size) {
          console.error("Size is required for drinks");
          return prev;
        }
        return {
          ...prev,
          cart: [
            ...prev.cart,
            {
              itemType: "drink",
              drink: item,
              size: options.size,
              quantity: options?.quantity || 1,
            },
          ],
        };
      }
    });
  };

  const removeFromCart = (
    itemId: string,
    itemType: "book" | "drink",
    size?: keyof Drink["sizes"]
  ) => {
    setUser((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => {
        if (itemType === "book") {
          return !(item.itemType === "book" && item.book.idBook === itemId);
        } else {
          return !(
            item.itemType === "drink" &&
            item.drink.id === Number(itemId) &&
            item.size === size
          );
        }
      }),
    }));
  };

  const updateCartItem = (
    itemId: string,
    itemType: "book" | "drink",
    updates: Partial<Omit<CartItem, "itemType">>,
    size?: keyof Drink["sizes"]
  ) => {
    setUser((prev) => ({
      ...prev,
      cart: prev.cart.map((item) => {
        if (
          itemType === "book" &&
          item.itemType === "book" &&
          item.book.idBook === itemId
        ) {
          return { ...item, ...updates };
        } else if (
          itemType === "drink" &&
          item.itemType === "drink" &&
          item.drink.id === Number(itemId) &&
          item.size === size
        ) {
          return { ...item, ...updates };
        }
        return item;
      }),
    }));
  };

  const clearCart = () => {
    setUser((prev) => {
      const pointsEarned = prev.cart.reduce((sum, item) => {
        if (item.itemType === "drink") {
          const drinkPoints = item.drink.sizes[item.size]?.points ?? 0;
          return sum + drinkPoints * item.quantity;
        }
        return sum;
      }, 0);

      const newPoints = prev.points + pointsEarned;

      if (clerkUser?.id) {
        updatePointsInDatabase(clerkUser.id, newPoints);
      }

      if (pointsEarned > 0) {
        toast({
          title: `🎉 ${pointsEarned} points earned!`,
          description: "You can now redeem them for discounts",
        });
      }

      return {
        ...prev,
        cart: [],
        points: newPoints,
      };
    });
  };

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
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useUser;
