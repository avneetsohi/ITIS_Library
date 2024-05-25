import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiConnector from '../services/apiconnector'
import { books, categories } from '../services/apis'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { BooksGrid } from '../components/common/BooksGrid'
import { setCategory } from '../slices/categorySlice'

export const Genre = () => {

  const {category}=useSelector((state)=>state.category)
  const [bookList,setBookList]=useState([])
  const [loading,setLoading]=useState(false)
  const {genreName}=useParams()
  const dispatch = useDispatch()
  

  
  const fetchBooks = async() => {
    try{
        setLoading(true)
        const response=await apiConnector("POST",books.GENRE_BOOKS_API,{categoryID:category._id})

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        setBookList(response?.data?.data)
        toast.success(`Fetched ${category.name} Genre Books Successfully`)
        setLoading(false)

    }catch(error){
        setLoading(false)
        console.log("Error occured while fetching Genre details page",error)
        toast.error("Failed to fetch selected Genre Books")
    }
  }

  const getCategory = async() => {
    try{
        const catgName=genreName.split("-")
        for (let i = 0; i < catgName.length; i++) {
            catgName[i] = catgName[i][0].toUpperCase() + catgName[i].substr(1);
        }
        const response=await apiConnector("PUT",categories.GET_CATEGORY,{name:catgName})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        dispatch(setCategory(response?.data?.data._id))

    }catch(error){
        console.log("Error occured while fetching Genre details page",error)
        toast.error("Failed to fetch selected Genre Books")
    }
  }

  useEffect(()=>{
    fetchBooks()
  },[category])


  useEffect(()=>{
    getCategory()
  },[genreName])



  

  return (
    <div>
        {
            loading?(<div className='custom-loader mx-auto mt-44'></div>):(
                <div className='mx-auto'>
                    {
                        !category?(
                            <p className='text-[26px] mt-44 text-center text-richblack-200 font-medium'>
                                Please select a Genre from the Category dropdown menu.
                            </p>
                        ):(
                            <div className=''>
                                <div className='bg-richblack-800 py-14'>
                                    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-5 justify-between'>
                                        <h1 className='capitalize text-[30px] text-richblack-5'>{genreName.replace("-"," ")}</h1>
                                        <p className='text-richblack-100 text-[18px]'>{category?.description}</p>
                                    </div>
                                </div>

                                <div className='py-10 mx-auto w-[80%]'>
                                        <div className=''>
                                            {
                                                books?.length===0?(
                                                    <p className=' text-[18px] text-richblack-200 font-medium'>No Books Available Right Now.</p>
                                                ):(
                                                    <BooksGrid booksList={bookList}/>
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
