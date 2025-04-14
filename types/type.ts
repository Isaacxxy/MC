export type Book = {
  id: string;
  title: string;
  author: string;
  imageWidth: number;
  imageHeight: number;
  imagePath: string;
  rating?: number;
  price: number;
  description: string;
  publisher: string;
  publishDate: Date | string;
  pages?: number;
  language: string;
  isValid: boolean;
  category:
    | "Science Fiction"
    | "Fantasy"
    | "Romance"
    | "Mystery"
    | "Thriller"
    | "Non-Fiction"
    | "Biography"
    | "Self-Help"
    | "Historical Fiction"
    | "Young Adult"
    | "Children's Literature";
  isSold?: boolean;
  reviews?: { user: string | "anonyme"; comment: string; rating: number }[];
};

export type Drink = {
  id: number;
  name: string;
  category:
    | "Latte"
    | "Espresso Specialties"
    | "Black coffee"
    | "Hot & Iced Chocolates"
    | "Refreshas"
    | "Coffee Frappuccino"
    | "Cream Frappuccino"
    | "Teavana - Milk Tea"
    | "Teavana - Iced Tea"
    | "Teavana - Hot Teas"
    | "Waters & Juices";

  description: string;
  ingredients: string[];
  sizes: {
    small?: {
      price: number;
      stock: number;
      points: number;
      sugarContent?: number;
    };
    medium?: {
      price: number;
      stock: number;
      points: number;
      sugarContent?: number;
    };
    large?: {
      price: number;
      stock: number;
      points: number;
      sugarContent?: number;
    };
  };
  imageUrl: string;
  temperature: "hot" | "cold";
  rating?: number;
};

export type Row = {
  id: string;
  name: string;
};

export type Coupon = {
  id: string;
  title: string;
  pointsRequired: number;
  discount: number;
  status: string;
  barcode: string;
  bgTop: string;
  bgBottom: string;
};

export type RowProp = {
  row: Row;
  coupons: Coupon[];
};

export type CouponCardProp = {
  coupon: Coupon;
};

export type User = {
  points: number;
  wallet: Coupon[];
  cart: CartItem[];
};

export type ImagesCarousel = {
  id: string;
  url: string;
  alt: string;
};

export type CartItem =
  | {
      itemType: "book";
      book: Book;
      quantity: number;
    }
  | {
      itemType: "drink";
      drink: Drink;
      size: keyof Drink["sizes"];
      quantity: number;
    };

export type Notification = {};
