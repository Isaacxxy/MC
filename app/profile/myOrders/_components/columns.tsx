"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, Pencil, CheckCircle2Icon, LoaderIcon, Siren, XCircle, ArrowUpDown, TrendingUpIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book, CartItem } from "@/types/type"
import { Badge } from "@/components/ui/badge"
import BookEditForm from "../../myProducts/_components/book-edit-form"
import { Rating } from "@mui/material"
import { useUser } from "@/context/UserContext"

export const columns = ({
  handleDelete,
  handleUpdate
}: {
  handleDelete: (id: string) => void
  handleUpdate: (book: Book) => void
}): ColumnDef<Book>[] => {
  const user = useUser();
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <TableCellViewer item={row.original} />
      },
      enableHiding: false,
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.getValue("category")}
        </Badge>
      )
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
        return <div className="font-medium">{formatted}</div>
      }
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "isValid",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`flex gap-1 w-28 ${row.getValue("isValid") == "approved" ?
            "bg-green-50" : row.getValue("isValid") == "rejected" ? "bg-red-50" : row.getValue("isValid") == "pending" ? "bg-yellow-50" : "bg-orange-50"}`}
        >
          {row.getValue("isValid") == "approved" ?
            <CheckCircle2Icon size={16} className="text-green-500" />
            : row.getValue("isValid") == "rejected" ? <XCircle size={16} className="text-red-500" /> : row.getValue("isValid") == "pending" ? (
              <LoaderIcon size={16} className="text-yellow-500" />
            ) : <Siren size={16} className="text-orange-700" />}
          {row.getValue("isValid") == "approved" ? "approved" : row.getValue("isValid") == "rejected" ? "rejected" : row.getValue("isValid") == "pending" ? "pending" : "out of stock"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const book = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(book.title)}
              >
                Copy Book title
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <BookEditForm
                book={book}
                onSave={handleUpdate}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuItem
                onClick={() => handleDelete(book.idBook)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];
};

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

function TableCellViewer({ item }: { item: Book }) {
  const isMobile = useIsMobile()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.title}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>Book Details</SheetTitle>
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
        <div className="grid grid-cols-2 gap-4 overflow-y-auto pb-4 px-[1px] text-sm">
          <div className="flex flex-col gap-3 col-span-2">
            <Label htmlFor="imageUrl">Image</Label>
            <div className="flex flex-col text-xs justify-center items-center gap-1">
              <img src={item.imageUrl} alt={item.title} className={`w-[100px] h-auto`} />
              {item.imageWidth && item.imageHeight && (
                <span>{item.imageWidth} x {item.imageHeight}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Title</Label>
            <Input readOnly id="title" value={item.title} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="category">Category</Label>
            <Input readOnly id="category" value={item.category} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="price">Price</Label>
            <Input readOnly id="price" value={item.price} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="stock">Stock</Label>
            <Input readOnly id="stock" value={item.stock} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="author">Author</Label>
            <Input readOnly id="author" value={item.author} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="publisher">Publisher</Label>
            <Input readOnly id="publisher" value={item.publisher} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input readOnly id="publishDate" value={item.publishDate} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="pages">Pages</Label>
            <Input readOnly id="pages" value={item.pages} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="language">Language</Label>
            <Input readOnly id="language" value={item.language} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="isValid">Status</Label>
            <Input readOnly id="isValid" value={item.isValid} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="reviewer">Rating</Label>
            <Rating
              name="half-rating-read"
              value={item.rating}
              precision={0.5}
              readOnly
              size="large"
            />
          </div>
        </div>
        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Done
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}