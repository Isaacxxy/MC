'use client'
import React from 'react'
import BookCard from './BookCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Book as BookType } from '@/types/type'
import { Separator } from '@/components/ui/separator'

interface BookCarouselProps {
  books: BookType[];
}

const BookCarousel = ({ books }: BookCarouselProps) => {
  const groupedBooks = books.reduce((acc, book) => {
    acc[book.category] = acc[book.category] || [];
    acc[book.category].push(book);
    return acc;
  }, {} as Record<string, BookType[]>);

  return (
    <div className="relative flex flex-col gap-16 w-full max-w-[80%] mx-auto px-4 py-6">
      {Object.entries(groupedBooks).map(([category, books]) => (
        <div key={category}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold capitalize text-gray-800">{category}</h2>
          </div>

          <Carousel
            className="w-full"
            key={category}
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
          >
            <div className='mt-4'>
              <CarouselContent className=''>
                {books.map((book) => (
                  <CarouselItem key={book.id} className="basis-full sm:basis-1/2  lg:basis-1/5 px-2">
                    <BookCard
                      book={book}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default BookCarousel;
