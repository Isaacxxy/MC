import React from 'react'
import { CouponCardProp } from '@/types/type'
import { useDraggable } from '@dnd-kit/core';
import { useUser } from '@/context/UserContext';
import { CouponCard as CouponCardui } from "@/components/coupon";


const CouponCard = ({ coupon }: CouponCardProp) => {
  const { user } = useUser();
  const isDisabled = user.points < coupon.pointsRequired;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: coupon.id,
    disabled: isDisabled,
  });

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    opacity: isDisabled ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`relative flex-1 flex justify-center items-center
    ${isDisabled
          ? 'cursor-not-allowed'
          : isDragging
            ? 'border-dotted border-black cursor-grabbing'
            : 'border-dotted border-black cursor-grab'
        }`}
      style={style}
    >
      <CouponCardui coupons={coupon} className='w-full max-w-[500px]' badge />
    </div>

  )
}

export default CouponCard