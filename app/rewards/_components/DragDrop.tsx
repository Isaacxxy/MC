'use client'
import React, { useState } from 'react'
import { Row as RowType } from '@/types/type'
import { Coupon as CouponType } from '@/types/type'
import { rows as rowsData } from '@/data/index'
import { coupons as couponsData } from '@/data/index'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Row from './Row'
import { useUser } from '@/context/UserContext'
import { cn } from '@/lib/utils'

const DragDrop = () => {
  const { user } = useUser();
  const [coupons, setCoupons] = useState<CouponType[]>(couponsData);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const couponId = active.id as string;
    const coupon = coupons.find(c => c.id === couponId);

    if (over.id === 'WALLET' && coupon && user.points < coupon.pointsRequired) {
      return;
    }

    setCoupons(coupons.map(coupon =>
      coupon.id === couponId ? { ...coupon, status: over.id as CouponType['status'] } : coupon
    ));
  }

  const handleApplyCoupons = () => {
    setCoupons(coupons.map(coupon =>
      coupon.status === 'WALLET' ? { ...coupon, status: 'AVAILABLE' } : coupon
    ));
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-20'>
          <h3 className='md:text-3xl text-2xl font-bold capitalize text-center'>
            Rewards and Coupons
          </h3>
          <p className='md:text-2xl text-xl font-bold capitalize'>
            Drag and Drop Coupons to Your Wallet
          </p>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          {rowsData.map((row: RowType) => (
            <Row
              key={row.id}
              row={row}
              coupons={coupons.filter(c => c.status === row.id)}
              onApplyCoupons={row.id === 'WALLET' ? handleApplyCoupons : undefined}
            />
          ))}
        </DndContext>
      </div>
    </div>
  )
}

export default DragDrop