"use client";
import React, { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImagesCarousel } from "@/types/type";

interface CarouselUiProps {
  images: ImagesCarousel[];
}

const CarouselUi = ({ images }: CarouselUiProps) => {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, active: true })
  );
  const [isGrabbing, setIsGrabbing] = useState(false);
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-[60%] mt-28 mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
        skipSnaps: false,
        align: "center",
      }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="h-[60vh] p-1">
              <img
                src={image.url}
                alt={image.alt}
                className={`object-center w-full h-full rounded-xl ${isGrabbing ? "cursor-grabbing" : "cursor-grab"
                  }`}
                onMouseDown={() => setIsGrabbing(true)}
                onMouseUp={() => setIsGrabbing(false)}
                onMouseLeave={() => setIsGrabbing(false)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselUi;