'use client'
import React, { useState } from 'react'
import BookCard from '@/components/BookCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Book as BookType } from '@/types/type'
import CartSidebar from '@/components/PanierSide'

interface BookCarouselProps {
  books: BookType[];
}


const BookCarousel = ({ books }: BookCarouselProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const groupedBooks = books.reduce((acc, book) => {
    acc[book.category] = acc[book.category] || [];
    acc[book.category].push(book);
    return acc;
  }, {} as Record<string, BookType[]>);
  return (
    < div className="relative w-[80%] mx-auto px-4 py-2" >
      {Object.entries(groupedBooks).map(([category, books]) => (
        <Carousel
          className="w-full mt-28 mx-auto"
          key={category}
          opts={{
            align: "start",
          }}
        >
          <h2 className='text-2xl font-bold capitalize mb-4'>{category}</h2>
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem key={book.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 grid place-items-center">
                <BookCard
                  key={book.id}
                  book={book}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ))
      }
    </div >
  )
}

export default BookCarousel