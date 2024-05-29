import React from 'react'
import RatingStars from './RatingStars'
import { useDispatch, useSelector } from 'react-redux'
import { setBook, setPreviewStatus } from '../../slices/bookSlice'
import toast from 'react-hot-toast'



export const BookCard = ({book}) => {

    const {token}=useSelector((state)=>state.auth)
    const bookDesc = book?.bookDescription?.length>40?`${book.bookDescription.substring(0,40)}...`:`${book.bookDescripton}`
    const dispatch = useDispatch()
    

    const handleBookDownload=(fileName)=>{
        const url = `http://localhost:3000/Books/${fileName}`
        const aTag=document.createElement("a")
        aTag.href=url
        aTag.setAttribute("download",fileName)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
    }

    const handleAccess=(book)=>{
        dispatch(setBook(book))
        dispatch(setPreviewStatus(true))
        toast.success("Scroll down to get the Access!!!")
    }
  
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
                    <div className='flex justify-center gap-x-5 mt-3 items-center'>
                        <button className='flex items-center gap-2 font-inter text-center text-lg leading-[24px] px-[34px] py-[10px] rounded-md font-bold bg-richblack-800 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                        hover:scale-95 transition-all duration-200 text-white'
                        onClick={()=>handleAccess(book)}>
                            Access
                        </button>
                        <button className='flex items-center gap-2 font-inter text-center text-lg leading-[24px] px-[34px] py-[10px] rounded-md font-bold bg-yellow-50 text-black shadow-[1px_1px_0px_0px_rgba(255,255,255,0.51)]
                        hover:scale-95 transition-all duration-200'
                        onClick={()=>handleBookDownload(book.filePath)}>
                            Download
                        </button>
                    </div>
                </div>
            )
            
        }
    </>
  )
}
