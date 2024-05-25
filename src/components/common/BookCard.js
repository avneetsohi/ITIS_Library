import React from 'react'
import RatingStars from './RatingStars'
import { useSelector } from 'react-redux'

export const BookCard = ({book}) => {

    const {token}=useSelector((state)=>state.auth)
    const bookDesc = book?.bookDescription?.length>40?`${book.bookDescription.substring(0,40)}...`:`${book.bookDescripton}`
    
  return (
    <>
        {
            token == null ? (
                <div key={book._id} 
                className='flex flex-col '>                            
                    <div className='mb-2'>
                        <img src={book.thumbnail} alt='Book Cover'
                            className='w-[390px] h-[280px] object-contain '
                        />
                    </div>
                    <p className='text-[18px] text-richblue-5 font-medium'>{book.bookTitle}</p>
                    <p className='text-[18px] text-richblue-5 font-medium'>{bookDesc}</p>
                    <p className='text-[18px] text-richblue-5 font-medium'>{book.author}</p>

                    {
                        book.category?.map((genre,index)=>(
                            <span className='text-richblack-5 text-sm font-medium italic'>{genre.name} </span>
                        ))
                    }
                    <div className='flex gap-2 items-center'>
                        <p className='text-yellow-50 text-sm font-medium'>{book.ratings ?? 0}</p>
                        <RatingStars Review_Count={book.ratings} Star_Size={18}/>
                    </div>
                </div>
            ):(
                <a href={book.accessLink} key={book._id} target='__blank'
                className='flex flex-col  cursor-pointer'>                            
                    <div className='mb-2'>
                        <img src={book.thumbnail} alt='Book Cover'
                            className='w-[390px] h-[280px] object-contain' 
                        />
                    </div>
                    <p className='text-[18px] text-richblue-5 font-medium text-left'>{book.bookTitle}</p>
                    <p className='text-[18px] text-richblue-5 font-medium text-left'>{bookDesc}</p>
                    <p className='text-[18px] text-richblue-5 font-medium text-left'>{book.author}</p>
                    <p className='text-richblack-5 text-sm font-medium '>{book.year}</p>
                    <div className='flex flex-row'> 
                    {
                        book.category?.map((genre,index)=>(
                            index===book.category.length-1?(<span className='text-richblack-5 text-sm font-medium italic'>{`${genre.name}` }</span>)
                                                           :(<span className='text-richblack-5 text-sm font-medium italic'>{`${genre.name}, ` }</span>)
                        ))
                    }
                    </div>
                    
                    
                    <div className='flex gap-2 items-center'>
                        <p className='text-yellow-50 text-sm font-medium'>{book.ratings ?? 0}</p>
                        <RatingStars Review_Count={book.ratings} Star_Size={18}/>
                    </div>
                </a>
            )
            
        }
    </>
  )
}
