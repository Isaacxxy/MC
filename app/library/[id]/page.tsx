'use client'
import React, { useState } from 'react'
import { books } from '@/data'
import { Rating } from '@mui/material';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ShoppingBag, Heart } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';


const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("books >>", books)
  const book = books.find((b) => String(b.idBook) == String(id));
  console.log("book >>", book)

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };
  if (!book) return notFound();
  return (
    <div className="mx-auto p-4 w-[80%]">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={book.imageUrl}
          alt={`${book.title} cover`}
          width={200}
          height={300}
          className="rounded-lg shadow-lg"
        />

        <div className="flex flex-col gap-4 w-full">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-gray-700">by {book.author}</p>
          </div>

          <Rating name="read-only" value={book.rating} readOnly />

          <div className="text-xl font-semibold">${book.price.toFixed(2)}</div>

          <div className="flex flex-wrap gap-4">
            <Button className="flex gap-2">
              <ShoppingBag size={20} /> Add to cart
            </Button>
            <Button variant="outline" className="flex gap-2">
              <Heart size={20} /> Add to wishlist
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Accordion type="multiple" className="w-full">
          {book.description && (
            <AccordionItem value="description">
              <AccordionTrigger className="text-xl">
                Description
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {book.description}
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="details">
            <AccordionTrigger className="text-xl">
              More details
            </AccordionTrigger>
            <AccordionContent className='text-base'>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                {book.publisher && (
                  <>
                    <span className="font-semibold">Publisher:</span>
                    <span>{book.publisher}</span>
                  </>
                )}
                <>
                  <span className="font-semibold">Publish Date:</span>
                  <span>
                    {typeof book.publishDate === 'string'
                      ? new Date(book.publishDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                      : 'Unknown publish day'}
                  </span>
                </>
                <>
                  <span className="font-semibold">Pages:</span>
                  <span>{book.pages ? book.pages : 'Unknown pages'}</span>
                </>
                {book.language && (
                  <>
                    <span className="font-semibold">Language:</span>
                    <span>{book.language}</span>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add a Comment</h2>

        <textarea
          className="w-full p-3 border rounded-md"
          rows={4}
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <Button className="mt-3" onClick={handleAddComment}>
          Submit Comment
        </Button>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Comments</h3>
          {comments.length > 0 ? (
            <ul className="space-y-2">
              {comments.map((comment, index) => (
                <li key={index} className="bg-white p-3 rounded-md shadow">
                  {comment}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-100">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page