export type Drink = {
  id: number;
  name: string;
  category:
    | "Latte"
    | "Espresso Specialities"
    | "Black coffee"
    | "Hot & Iced Chocolates"
    | "Refreshas"
    | "Coffee Frappuccino"
    | "Cream Frappuccino"
    | "Teavana - Milk Tea"
    | "Teavan - Iced Tea"
    | "Teavana - Hot Teas"
    | "Waters & Juices";
  description: string;
  ingredients: string[];
  sizes: {
    small?: {
      price: number;
      stock: number;
      sugarContent?: number;
    };
    medium?: { price: number; stock: number; sugarContent?: number };
    large?: { price: number; stock: number; sugarContent?: number };
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

export type CouponType = {
  idCoupon: number;
  imageUrl: string;
  title: string;
  pointsRequired: number;
  discount: number;
};

export interface Book {
  idBook: string;
  title: string;
  author: string;
  imageWidth?: number;
  imageHeight?: number;
  imageUrl: string;
  rating: number;
  price: number;
  stock: number;
  description: string;
  publisher: string;
  publishDate: string;
  pages: number;
  language: string;
  isValid: boolean;
  category:
    | ""
    | "Science Fiction"
    | "Historical Fiction"
    | "Biography"
    | "Fantasy"
    | "Romance"
    | "Mystery"
    | "Thriller"
    | "Self-Help"
    | "Children's Literature"
    | "Young Adult"
    | "Non-Fiction";
  issold: boolean;
  reviews?: { user: string; comment: string; rating: number }[];
}
