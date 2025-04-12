import { Playfair_Display } from "next/font/google";
import { Coupon } from "@/types/type";
import { cn } from "@/lib/utils";
import { useUser } from '@/context/UserContext';

interface CouponCardProps {
  coupons: Coupon;
  className?: string;
  badge?: boolean;
}
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export const CouponCard = ({ coupons, className, badge = false }: CouponCardProps) => {
  const { user } = useUser();
  const isDisabled = user.points < coupons.pointsRequired;
  return (
    <div className={cn(`relative w-[250px]`, className)}>
      <div className={`text-white h-[94px] p-4 flex flex-col gap-2 justify-between items-center rounded-t-[24px]`}
        style={{ backgroundColor: coupons.bgTop }}>
        <div>
          <h2 className="font-bold">{coupons.title}</h2>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-sm bg-white/5 rounded-full px-1">{coupons.pointsRequired} pts</p>
          <div className="flex flex-col justify-center items-center gap-0 w-[70px]">
            <img
              src="/coupons/barcode.png"
              alt="barcode"
              className="object-contain w-fit h-fit bg-white"
            />
            <p className="text-[8px] tracking-widest text-center">{coupons.barcode}</p>
          </div>
        </div>
      </div>

      <div className={`text-center h-[144px] px-3 py-2 ${coupons.id === "2" ? "text-black" : "text-white"} rounded-b-[24px] flex flex-col justify-between items-center border-t border-dashed`}
        style={{
          backgroundColor: coupons.bgBottom,
          borderTopColor: coupons.bgTop,
        }}>
        <div className="">
          <p className="text-xs">Gift Coupon</p>
          <p className={`${playfair.className} font-bold text-lg !italic`}>BOOK</p>
        </div>
        <img src="/books.png" alt="book stack" className="w-16 mx-auto" />
        <p className={`${playfair.className} text-sm font-bold text-center`}>Pagina & Espresso</p>
      </div>
      {badge && <div className={`absolute top-5 left-5 ${isDisabled ? 'bg-red-500' : 'bg-green-500'} p-1 rounded-full`} />}
    </div>
  )
}
