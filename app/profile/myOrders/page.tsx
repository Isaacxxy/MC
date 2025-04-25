'use client'
import { DataTable } from "../_components/data-table"
import { myProducts } from '@/data'
import { Book } from '@/types/type'
import { useState } from 'react'
import { columns } from "./_components/columns"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DemoPage() {
  const [data, setData] = useState<Book[]>(myProducts)

  const handleDelete = (id: string) => {
    setData(data.filter(book => book.idBook !== id))
    toast.success(
      'Book deleted successfully!',
      {
        duration: 2000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }
    )
  }

  const handleUpdate = (updatedBook: Book) => {
    setData(data.map(book =>
      book.idBook === updatedBook.idBook ? updatedBook : book
    ))
  }
  const router = useRouter()

  return (
    <div className="container mx-auto py-10">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-4">My Orders</h1>
          <p className="text-gray-600 mb-4">Manage your orders here.</p>
        </div>
        <div>
          <Button variant="outline" onClick={() => router.push('/library')} className="flex items-center">
            <ShoppingBag />
            <span className="ml-2">New Order</span>
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns({ handleDelete, handleUpdate })}
        data={data}
      />
    </div>
  )
}