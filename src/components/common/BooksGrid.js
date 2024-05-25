import React from 'react'
import { BookCard } from './BookCard'

export const BooksGrid = ({booksList}) => {
  return (
    <div className='flex flex-wrap gap-x-8 gap-y-14 items-center justify-center'>
        {
            booksList?.map((book)=>(
                <BookCard key={book._id} book={book}/>
            ))

        }
    </div>
  )
}
