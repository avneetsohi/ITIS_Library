import React from 'react'
import RatingStars from './RatingStars'

export const BookCard = ({book}) => {
    
  return (
    <>
        {
            <div key={book._id} 
            className='flex flex-col justify-start cursor-pointer'>                            
                <div>
                    <img src={book.thumbnail}
                        className='w-[390px] h-[280px] object-contain aspect-video'
                    />
                </div>
                <p className='text-[18px] text-richblue-5 font-medium'>{book.bookTitle}</p>
                <p className='text-[18px] text-richblue-5 font-medium'>{book.bookDescription}</p>
                {
                    book.author?.map((author,index)=>(
                        <p className='text-richblack-5 text-sm font-medium italic'>{author}</p>
                    ))
                }
                <div className='flex gap-2 items-center'>
                    <p className='text-yellow-50 text-sm font-medium'>{book.ratings ?? 0}</p>
                    <RatingStars Review_Count={book.ratings} Star_Size={18}/>
                </div>
            </div>
        }
    </>
  )
}
