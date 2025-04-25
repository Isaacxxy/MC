"use client"
import * as React from "react"

import {
  TriangleAlert,
  TrendingUpIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Book } from "@/types/type"
import { Rating } from "@mui/material"
import { toast } from "sonner"

export const schema = z.object({
  idBook: z.string(),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  isValid: z.enum(["approved", "pending", "rejected", "out of stock"]),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating cannot exceed 5"),
  author: z.string().min(1, "Author is required"),
  publisher: z.string().min(1, "Publisher is required"),
  publishDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "Publish Date must be a valid date"
  ),
  pages: z.number().min(1, "Pages must be at least 1"),
  language: z.string().min(1, "Language is required"),
})

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export default function BookDetailsSheet({
  item,
  children,
  open,
  onOpenChange,
  onBookUpdate // Add this prop
}: {
  item: z.infer<typeof schema>,
  children: React.ReactNode,
  open?: boolean,
  onOpenChange?: (open: boolean) => void,
  onBookUpdate?: (updatedBook: Book) => void // Add this
}) {
  const isMobile = useIsMobile()
  const [formData, setFormData] = React.useState(item)
  const [rating, setRating] = React.useState(item.rating)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: id === 'price' || id === 'stock' || id === 'pages'
        ? parseFloat(value) || 0
        : value
    }))
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate form data
      schema.parse(formData)
      setErrors({})

      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            // Here you would typically make an API call to update the book
            console.log("Submitting:", formData)
            setTimeout(() => {
              resolve(null)
              onOpenChange?.(false) // Close the sheet after successful submit
            }, 1000)
          } catch (error) {
            reject(error)
          }
        }),
        {
          loading: "Updating book details...",
          success: "Book updated successfully! Status set to pending approval.",
          error: "Failed to update book"
        }
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
        toast.error("Please fix the errors in the form")
      } else {
        console.error("Error updating book:", error)
      }
    }
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
          <SheetHeader className="gap-1">
            <SheetTitle>{item.title}</SheetTitle>
            <SheetDescription className="flex flex-col gap-4">
              <div className="">
                Showing total sales data for the last 6 months. This
                includes both desktop and mobile users, providing insights into
                trends and performance.
              </div>
              {(!isMobile && item.isValid !== "rejected" && item.isValid !== "pending") && (
                <div>
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 0,
                        right: 10,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Area
                        dataKey="mobile"
                        type="natural"
                        fill="var(--color-mobile)"
                        fillOpacity={0.6}
                        stroke="var(--color-mobile)"
                        stackId="a"
                      />
                      <Area
                        dataKey="desktop"
                        type="natural"
                        fill="var(--color-desktop)"
                        fillOpacity={0.4}
                        stroke="var(--color-desktop)"
                        stackId="a"
                      />
                    </AreaChart>
                  </ChartContainer>
                  <Separator />
                  <div className="grid gap-2 mt-2">
                    <div className="flex gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUpIcon className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                      Compared to the last month, the sales have increased by 5.2%,
                      indicating a positive trend in user engagement and purchases.
                    </div>
                  </div>
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto pb-4 text-sm">
            <div className="text-muted-foreground font-medium leading-none">
              Here you can see and edit the book details.
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <TriangleAlert className="w-5 h-5" />
              <span>Once saved, the book's status will revert to pending approval.</span>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={item.title} onChange={handleInputChange} />
              {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Science Fiction",
                      "Historical Fiction",
                      "Biography",
                      "Fantasy",
                      "Romance",
                      "Mystery",
                      "Thriller",
                      "Self-Help",
                      "Children's Literature",
                      "Young Adult",
                      "Non-Fiction",
                    ].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" defaultValue={item.price} onChange={handleInputChange} />
                {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" defaultValue={item.stock} onChange={handleInputChange} />
                {errors.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="author">Author</Label>
                <Input id="author" defaultValue={item.author} onChange={handleInputChange} />
                {errors.author && <p className="text-red-500 text-xs">{errors.author}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="publisher">Publisher</Label>
                <Input id="publisher" defaultValue={item.publisher} onChange={handleInputChange} />
                {errors.publisher && <p className="text-red-500 text-xs">{errors.publisher}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input id="publishDate" defaultValue={item.publishDate} onChange={handleInputChange} />
                {errors.publishDate && <p className="text-red-500 text-xs">{errors.publishDate}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="pages">Pages</Label>
                <Input id="pages" defaultValue={item.pages} onChange={handleInputChange} />
                {errors.pages && <p className="text-red-500 text-xs">{errors.pages}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="language">Language</Label>
                <Input id="language" defaultValue={item.language} onChange={handleInputChange} />
                {errors.language && <p className="text-red-500 text-xs">{errors.language}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Rating</Label>
              <Rating
                name="half-rating-read"
                defaultValue={item.rating}
                precision={0.5}
                onChange={(_, newValue) => {
                  if (newValue !== null) {
                    setRating(newValue)
                    setFormData(prev => ({ ...prev, rating: newValue }))
                  }
                }}
              />
              {errors.reviewer && <p className="text-red-500 text-xs">{errors.reviewer}</p>}
            </div>
          </div>
          <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
            <Button type="submit" className="w-full">
              Submit
            </Button>
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Done
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}