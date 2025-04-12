import React from 'react'
import CarouselUi from './_components/Carousel'
import { imagesCarousel } from '@/data'
import { books } from '@/data'
import BookCarousel from './_components/BookCarousel'
const page = () => {
  return (
    <div className='space-y-20'>
      <CarouselUi images={imagesCarousel} />
      <BookCarousel books={books} />
    </div>
  )
}

export default page