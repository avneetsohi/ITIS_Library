import React from 'react'
import { BookCard } from './BookCard'

export const BooksGrid = ({booksList}) => {
  return (
    <div>
        {
            booksList?.map((book)=>(
                <BookCard key={book._id} book={book}/>
            ))

        }
    </div>
  )
}
