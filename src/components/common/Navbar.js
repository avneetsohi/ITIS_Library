import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, NavLink } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { ProfileDropDown } from '../core/Auth/ProfileDropDown';
import apiConnector from '../../services/apiconnector';
import {categories} from '../../services/apis';
import {AiOutlineCaretDown } from "react-icons/ai";
import { setCategory } from '../../slices/categorySlice';

export const Navbar = () => {

    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)

    const [sublinks,setSublinks]=useState([]);
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();

    const [open,setOpen]=useState(false)

    async function fetchSubLinks(){
        try{
            setLoading(true);
            const result=await apiConnector('GET',categories.SHOWCATEGORIES_API);
            console.log("Fetched links",result)
            setSublinks(result?.data?.data);
            setLoading(false)
        }catch(error){
            setLoading(false);
            console.log("Could not fetch the category lists");
            console.log(error)

        }
    }

    useEffect(()=>{
        fetchSubLinks();
    },[])

  return (
    <div className=' w-full h-[60px]  bg-richblack-800 border border-richblack-700' >
        <div className='w-11/12 max-w-maxContent flex mx-auto px-3 justify-between items-center gap-12 h-full'>
            <Link to='/' >
                <img src={Logo} alt='Logo' loading='lazy' width={162} height={42}/>
            </Link>
            <div className='flex gap-10 items-center text-white text-lg h-full'>
                {
                    NavbarLinks.map((element,index)=>(
                        (element.title!=='Category')?(
                                <NavLink key={index} to={element?.path} >{element.title}</NavLink>
                            ):(
                                <div key={index} className='h-full flex items-center gap-[5px] cursor-pointer relative group ' >
                                    <p>{element.title}</p>
                                    <FaChevronDown />
                                    {
                                        loading?(<div className='absolute -left-32 bottom-[-45px] bg-richblack-5 w-[280px] text-center text-lg invisible  group-hover:visible z-10 py-2 px-3 rounded-md text-richblack-400'>Loading...</div>):(
                                            <div className='absolute -left-32 bottom-[-165px] bg-richblack-5 w-[280px] text-richblack-900 flex flex-col text-lg invisible rounded-md py-4 px-3 group-hover:visible z-10'>
                                                {
                                                    sublinks.map((sublink,index)=>(
                                                        <Link key={index} to={`/genre/${sublink.name.toLowerCase().replace(" ","-")}`} className='py-2 px-3 hover:bg-richblack-100 rounded-md'
                                                        onClick={()=>{
                                                            dispatch(setCategory(sublink))
                                                        }}>
                                                            {sublink.name}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                    

                                    <div className='absolute invisible bg-richblack-5 -left-1 translate-x-[89px] bottom-[-12px] rotate-45 w-5 h-5 group-hover:visible rounded-sm'></div>
                                </div>
                            )
                    ))
                }
            </div>
            <div className={`flex items-center ${token===null?"gap-5":"gap-5"} text-lg text-richblack-100`}>
                {
                    token===null && <Link to={"/login"} className=' px-[2px] lg:px-3 py-2 rounded-[8px]  border border-richblack-700'>Log in</Link>
                }
                
                {
                    token===null && <Link to={"/signup"} className=' px-[2px] lg:px-3 py-2 rounded-[8px]  border border-richblack-700'>Sign up</Link>
                }

                {
                    token!==null && 
                    <div className='relative flex  items-center gap-[5px] cursor-pointer' onClick={()=>{setOpen(!open);console.log("Button clicking");}}>
                        <img src={user?.image} alt={`profile-${user?.firstName}`} className='rounded-full' height={25} width={25}/>
                        <AiOutlineCaretDown fontSize={18}/>
                        {open && <ProfileDropDown user={user} open={open} setOpen={setOpen}/>}
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
