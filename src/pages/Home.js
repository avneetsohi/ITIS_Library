import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from '../components/core/HomePage/HighlightText';
import { CTAButton } from '../components/core/HomePage/Button';
import Banner from "../assets/Images/Home_video.mp4"


export const Home = () => {
    
  return (
    <div>
        {/* Section 1 */}
        
        <div className=' mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

            <Link to='/signup'>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 text-xl font-bold text-richblack-200 
                transition-all duration-200 hover:scale-95 w-fit shadow-[0px_2px_0px_0px_rgba(255,255,255,0.18)] inset-0'>
                    <div className='flex items-center gap-2 group-hover:bg-richblack-900  rounded-full px-10 py-[5px]
                    transistion-all duration-200 '>
                        <p>Become a part of Study Notion</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighlightText text={" Books"}/>
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.”
            </div>

            <div className='flex gap-7 mt-8'>
                <CTAButton active={true} linkTo="/signup">Learn More</CTAButton>
                <CTAButton active={false} linkTo="/login">Book a Demo</CTAButton>
            </div>

            <div className='mx-3 my-[66px] shadow-[20px_20px_0px_0px_#F5F5F5]'>
                <video muted autoPlay loop className=' shadow-[-2px_-5px_15px_2px] shadow-blue-100 h-[450px]'>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>
        </div>
    </div>
  )
}
