'use client'
import React from 'react'
import { DotBackgroundDemo } from '@/components/ui/dotBackground'
import { Playfair_Display } from "next/font/google";
import { useRouter, usePathname } from 'next/navigation'
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });


const Footer = () => {
  const pathname = usePathname();
  if (pathname === '/payment-success' || pathname.startsWith('/library/')) return null;
  return (

    <div className='w-[80%] mx-auto flex flex-col justify-between relative pb-0 rounded-lg border border-[#824124] overflow-hidden my-20'>
      <DotBackgroundDemo className='-z-20 absolute h-full ' Container />
      <div className='flex xl:flex-row flex-col '>
        <div className='w-1/2 md:p-9 p-2'>
          <h1 className={`text-zinc-600 text-3xl font-semibold ${playfair.className}`}>Pagina & Espresso</h1>
          <p className='text-zinc-700 md:text-3xl lg:text-5xl font-bold text-lg  md:leading-[54px] md:w-[700px] w-[300px] md:mt-9 mt-0'>
            Discover the perfect blend of books and coffee.
          </p>
        </div>
        <div className='flex items-center xl:justify-end justify-start w-full md:px-10 xl:px-0'>
          <div className="grid grid-cols-2 md:grid-cols-3 justify-end md:w-1/2 w-[80%] md:gap-10 gap-20 xl:mt-32 mt-5 mr-10 px-2">
            <div className="flex flex-col gap-4">
              <h1 className="font-extrabold">Pages</h1>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">Library</a>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">Beverages</a>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">Rewards</a>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">About Us</a>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">Blog</a>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-extrabold">Legal</h1>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">Privacy Policy</a>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">Terms of Service</a>
              <a className="font-normal text-zinc-700 text-nowrap" href="/">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="border-[#824124] border-dashed border-t w-full h-1 mt-32"></div>
        <div className="h-20 flex justify-center items-center md:gap-10 gap-2 mb-36 md:mb-0">
          <p className="text-zinc-700 font-normal md:text-lg text-xs text-nowrap">
            &copy; 2023 Pagina & Espresso. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer