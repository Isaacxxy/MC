'use client'
import { DataTable } from "../_components/data-table"
import { myProducts } from '@/data'
import { Book } from '@/types/type'
import { useState } from 'react'
import { columns } from "./_components/columns"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddBookPage from "@/app/addBooks/page"

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
          <h1 className="text-2xl font-bold mb-4">My Products</h1>
          <p className="text-gray-600 mb-4">Manage your products here.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="">
              <PlusCircle />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader className="flex flex-col items-start justify-start gap-2 p-0">
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <AddBookPage className="w-[100%] mt-0" />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns({ handleDelete, handleUpdate })}
        data={data}
      />
    </div>
  )
}