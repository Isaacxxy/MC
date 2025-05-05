"use client";
import { IoIosPricetags } from "react-icons/io";
import { GiWallet } from "react-icons/gi";
import React, { useState } from "react";
import PointsSection from "./PointsCard ";
import { X } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Playfair_Display } from "next/font/google";
import DragDrop from "./DragDrop";
import HeroSection from "@/components/heroSection";

const playfair = Playfair_Display({ subsets: ["latin"] });

const LandingPage = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const { user } = useUser();

  const handleDtaClick = () => {
    setSelected(true);
  };
  const scrollToSection = (id: any) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const isWalletEmpty = user.wallet.length === 0;

  return (
    <div className="flex flex-col gap-32">
      <HeroSection
        images={[
          {
            src: "/rewards/pic3.png",
            alt: "coffee",
            width: 400,
            position: "md:-top-20 md:left-1/2 -translate-x-1/2 top-0 left-11",
          },
          {
            src: "/rewards/pic2.png",
            alt: "coffee",
            width: 100,
            position: "md:bottom-[37%] md:right-[65%] -bottom-20 right-16",
            rotate: "70deg",
          },
        ]}
        title="Welcome to our special rewards corner!"
        subtitle="Every time you order a book with a drink, you earn points that can be exchanged for amazing discounts!"
        buttons={[
          {
            text: "Our Rewards",
            onClick: () => scrollToSection("section2"),
            icon: <IoIosPricetags className="w-5 h-5" />,
            bgColor: "bg-[#112c11]",
            hoverBgColor: "bg-[#275527]",
          },
          {
            text: "Check my wallet",
            onClick: handleDtaClick,
            icon: <GiWallet className="w-5 h-5" />,
            bgColor: "bg-green-800",
            hoverBgColor: "bg-[#5a7d63]",
          },
        ]}
      />
      <div>
        <PointsSection />
      </div>
      <div className="" id="section2">
        <DragDrop />
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full min-h-[50vh] max-h-[90vh] overflow-y-auto flex flex-col items-center justify-start gap-10 p-4">
            <div className="flex justify-between items-start w-full h-fit">
              <h1
                className={`hidden sm:flex items-center justify-center space-x-2 text-2xl font-bold text-center ${playfair.className}`}
              >
                Pagina & Espresso
              </h1>
              <button
                onClick={() => setSelected(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            {isWalletEmpty ? (
              <div className="flex flex-col items-center justify-between flex-1">
                <div className="flex items-center justify-center w-full flex-1">
                  <p className="text-gray-500 text-lg font-medium bg-white dark:bg-black p-6 rounded-full">
                    Your wallet is empty
                  </p>
                </div>
                <button
                  onClick={() => {
                    scrollToSection("section2");
                    setSelected(false);
                  }}
                  className={`flex items-center gap-2 bg-[#112c11] hover:bg-[#275527] text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-300`}
                >
                  <span className="w-5 h-5">
                    <IoIosPricetags className="w-5 h-5" />
                  </span>
                  Buy a Coupons
                </button>
              </div>
            ) : (
              <div className="w-full grid grid-cols-3 gap-4">
                {user.wallet.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="rounded-lg border p-4 shadow-sm"
                  >
                    <h3 className="font-medium">{coupon.title}</h3>
                    <p className="mt-2 text-sm">
                      {coupon.pointsRequired} points required
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
