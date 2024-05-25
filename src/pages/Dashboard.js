import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import apiConnector from '../services/apiconnector'
import { books } from '../services/apis'
import toast from 'react-hot-toast'
import { BooksGrid } from '../components/common/BooksGrid'
import { FILTER_TYPE } from '../utils/constants'

export const Dashboard = () => {
  
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [booksList,setBooksList]=useState([])
  const [loading,setLoading]=useState(false)
  const [searchValue,setSearchValue]=useState('')
  const [filter,setFilter]=useState('All')
 
  const fetchAllBooks = async(searchVal='',fil='All') => {
    try{
      setLoading(true)
      const response = await apiConnector("POST",books.ALL_BOOKS_API,{fil,searchVal})
      if(!response.data.success){
        throw new Error(response.data.message)
      }
      setBooksList(response?.data?.data)
      toast.success("Fetched All Books")
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      console.log(error)
      toast.error("Failed to fetch books")
    }
  }
  
  const submitHandler = async(event) => {
    event.preventDefault()
    fetchAllBooks(searchValue,filter)
    setSearchValue("")
  }
  
  const changeHandler = (event) => {
    setSearchValue(event.target.value)
  }

  useEffect(()=>{
    fetchAllBooks()
  },[])

  return (
    <div className="w-full h-full flex flex-col justify-center">
        {
          loading?(<div className='custom-loader mx-auto mt-44'></div>):(
            <div>
                  <div className='bg-richblack-800 py-14 flex-col gap-y-4 items-center  w-full'>
                  <div className='flex flex-row items-center w-[60%] mx-auto'>
                      <form onSubmit={submitHandler} className='mx-auto mt-9 w-full'>
                        <div className='flex flex-row items-center justify-center gap-x-2 w-full'>
                            <input className='outline-none p-3 rounded-[8px] bg-richblack-500 text-richblack-200 text-base font-medium w-[80%]' type='text' placeholder={`Enter ${filter}...`} id='filter' name='filter'
                            value={searchValue} onChange={changeHandler} required/>  
                            <button className={`mt-9 text-center  text-base font-medium p-3 rounded-md bg-yellow-50 text-black w-[20%]
                            hover:scale-95 transition-all duration-200 cursor-pointer`}>Search</button>
                        </div>
                      </form>
                    </div>
                    <div className='flex gap-[5px] p-1 rounded-[500px] mx-auto w-fit bg-richblack-700'>
                      <div className={`py-[6px] px-[18px] rounded-full cursor-pointer ${filter===FILTER_TYPE.ALL?"bg-richblack-900 text-richblack-5":"text-richblack-200"}`} onClick={()=>{setFilter(FILTER_TYPE.ALL)}}>All</div>
                      <div className={`py-[6px] px-[18px] rounded-full cursor-pointer ${filter===FILTER_TYPE.TITLE?"bg-richblack-900 text-richblack-5":"text-richblack-200"}`} onClick={()=>{setFilter(FILTER_TYPE.TITLE)}}>Title</div>
                      <div className={`py-[6px] px-[18px] rounded-full cursor-pointer ${filter===FILTER_TYPE.AUTHOR?"bg-richblack-900 text-richblack-5":"text-richblack-200"}`} onClick={()=>{setFilter(FILTER_TYPE.AUTHOR)}}>Author</div>
                      <div className={`py-[6px] px-[18px] rounded-full cursor-pointer ${filter===FILTER_TYPE.YEAR?"bg-richblack-900 text-richblack-5":"text-richblack-200"}`} onClick={()=>{setFilter(FILTER_TYPE.YEAR)}}>Year</div>
                    </div>     
              </div>

              <div className='py-10 mx-auto w-[80%]'>
                <div className=''>
                    {
                        booksList?.length===0?(
                            <p className=' text-[18px] text-richblack-200 font-medium'>No Books Available Right Now.</p>
                        ):(
                            <BooksGrid booksList={booksList}/>
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
