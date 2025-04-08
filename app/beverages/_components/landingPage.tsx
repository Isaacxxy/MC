'use client'
import React from 'react'
import Menu from './Menu';
import HeroSection from "@/components/heroSection";
import { FaAnglesDown } from 'react-icons/fa6';


const LandingPage = () => {
  const scrollToSection = (id: any) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <HeroSection
        images={[
          {
            src: "/drinks-assets/pic14.png",
            alt: "coffee cup",
            width: 300,
            position: "md:-top-5 md:left-1/2 -translate-x-1/2 top-0 left-11"
          },
          {
            src: "/drinks-assets/pic9.png",
            alt: "coffee beans",
            width: 200,
            position: "md:-bottom-2 md:left-40 bottom-64 left-11"
          },
          {
            src: "/drinks-assets/pic10.png",
            alt: "espresso",
            width: 200,
            position: "md:-bottom-2 md:left-80 bottom-64 left-36"
          },
          {
            src: "/drinks-assets/pic11.png",
            alt: "latte art",
            width: 200,
            position: "md:-bottom-4 md:right-11 bottom-64 right-36"
          },
          {
            src: "/drinks-assets/pic6.png",
            alt: "coffee scoop",
            width: 100,
            position: "md:-bottom-4 md:right-5 bottom-64 right-36"
          },
          {
            src: "/drinks-assets/pic1.png",
            alt: "coffee machine",
            width: 300,
            position: "md:-bottom-16 md:right-72 -bottom-20 right-16",
            rotate: "-19deg"
          }
        ]}
        title="Discover the art of coffee"
        subtitle="the perfect balance of rich aroma, smooth texture, and bold flavors."
        footerText="🧋Taste the Experience"
        bounceButton={{
          onClick: () => scrollToSection("section2"),
          icon: <FaAnglesDown />,
        }}
      />
      <div id="section2">
        <Menu />
      </div>
    </div>
  )
}

export default LandingPage