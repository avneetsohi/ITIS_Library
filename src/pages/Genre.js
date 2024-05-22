import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiConnector from '../services/apiconnector'
import { books } from '../services/apis'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { BooksGrid } from '../components/common/BooksGrid'

export const Genre = () => {

  const {category}=useSelector((state)=>state.category)
  const [books,setBooks]=useState([])
  const [loading,setLoading]=useState(false)
  const {genreName}=useParams()
  
  const fetchBooks = async() => {
    try{
        setLoading(true)
        const response=await apiConnector("GET",books.GENRE_BOOKS_API,{categoryID:category._id})

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        setBooks(response?.data?.data)
        toast.success(`Fetched ${category.name} Genre Books Successfully`)
        setLoading(false)

    }catch(error){
        setLoading(false)
        console.log("Error occured while fetching category details page",error)
        toast.error("Failed to fetch selected category details")
    }
  }


  useEffect(()=>{
    fetchBooks()
  },[category])

  return (
    <div>
        {
            loading?(<div className='custom-loader mx-auto mt-44'></div>):(
                <div>
                    {
                        !category?(
                            <p className='text-[26px] mt-44 text-center text-richblack-200 font-medium'>
                                Please select a Genre from the Category dropdown menu.
                            </p>
                        ):(
                            <div>
                                <div className='bg-richblack-800 py-14'>
                                    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-5 justify-between'>
                                        <h1 className='capitalize text-[30px] text-richblack-5'>{genreName.replace("-"," ")}</h1>
                                        <p className='text-richblack-100 text-[18px]'>{category?.description}</p>
                                    </div>
                                </div>

                                <div className='py-10'>
                                        <div className='mt-4 mx-auto flex flex-col items-center '>
                                            {
                                                books?.length===0?(
                                                    <p className=' text-[18px] text-richblack-200 font-medium'>No Books Available Right Now.</p>
                                                ):(
                                                    <BooksGrid booksList={books}/>
                                                )
                                            }
                                       </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            )
        }
        
    </div>
  )
}
