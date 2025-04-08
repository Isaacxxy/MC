import React from 'react'
import { CouponCardProp } from '@/types/type'
import { useDraggable } from '@dnd-kit/core';
import { useUser } from '@/context/UserContext';

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
      className={`rounded-lg border p-4 shadow-sm w-[500px] 
    ${isDisabled
          ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
          : isDragging
            ? 'border-dotted border-black cursor-grabbing'
            : 'border-dotted border-black cursor-grab hover:shadow-md'
        }`}
      style={style}
    >
      <h3 className="font-medium">{coupon.title}</h3>
      <p className={`mt-2 text-sm ${isDisabled ? 'text-gray-500' : ''}`}>
        {coupon.pointsRequired} points required
        {isDisabled && (
          <span className="block text-red-500">Not enough points</span>
        )}
      </p>
    </div>

  )
}

export default CouponCard