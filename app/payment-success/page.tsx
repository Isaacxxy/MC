'use client'
import React from "react";
import { useUser } from "@/context/UserContext";
export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const { user } = useUser();
  console.log("User in PaymentSuccess:", user);
  console.log("Wallet in PaymentSuccess:", user.wallet);
  return (
    <main className="h-screen overflow-hidden">
      <div className="">
        hello
      </div>
    </main>
  );
}