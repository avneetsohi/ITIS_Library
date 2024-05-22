import { useState } from "react";
import { ACCOUNT_TYPE } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setSignupData } from "../slices/authSlice";
import apiConnector from "../services/apiconnector";
import { auth } from "../services/apis";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import SignupImage from '../assets/Images/signup.webp'
import FrameImage from '../assets/Images/frame.png'

export const Signup = () => {

    const [accountType,setAccountType]=useState(ACCOUNT_TYPE.CUSTOMER)
    const {loading} = useSelector((state)=>state.auth)
    const [formData,setFormData]=useState({
        firstName:"",lastName:"",email:"",
        password:"",confirmPassword:""
    });
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function changeHandler(event){
       setFormData((prev)=>({
            ...prev,
            [event.target.name]:event.target.value
        }))

    }

    const {firstName,lastName,email,password,confirmPassword}=formData;

    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= minLength;
      
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
      }

    async function submitHandler(event){
        event.preventDefault();

        if(password!==confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        if (!validatePassword(password)){
            toast.error("Password do not fulfill the requirements.")
            return;
        }

        const finalSignupData={
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
            
        }
        dispatch(setSignupData(finalSignupData));
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",auth.SEND_OTP_API,{email});
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            navigate("/verify-email");
            toast.success("OTP sent successfully");
        }catch(error){
            console.log("OTP API ERROR",error);
            toast.error("Sign up Failed")
            dispatch(setSignupData(null));
            navigate("/signup")
        }
        dispatch(setLoading(false));

        setFormData={
            firstName:"",lastName:"",email:"",
            password:"",confirmPassword:""
        }
        setAccountType(ACCOUNT_TYPE.CUSTOMER);
    }



    return (
        <div className='w-11/12 max-w-maxContent mx-auto mt-20 overflow-y-hidden'>
            {
                loading?(
                    <div className='mx-auto mt-44 w-[37%} text-center text-richblack-100 text-3xl'>
                        <div className='custom-loader mx-auto'></div>
                    </div>
                ):(
                    <div className='w-full flex justify-between text-white text-[16px]'>

                        <div className='flex flex-col font-inter w-[45%] font-bold p-6'>

                            <div className=' text-[30px] leading-[38px] font-semibold text-richblack-5'>Join the millions with StudyNotion for free</div>
                            <div className='flex flex-col leading-[20px] font-light mt-3'>
                                <p className=' text-[18px] leading-[26px] font-normal text-richblack-100'>Build career for today, tomorrow, and beyond.</p>
                                <p className='font-edu-sa text-[16px] leading-[26px] font-bold text-blue-100 italic tracking-tight'>A place to future-proof your career</p>
                            </div>
                            
                            
                            <form onSubmit={submitHandler} className='flex flex-col mt-4'>
                                <div className='flex flex-col'>
                                    <div className='flex mt-9 gap-5'>
                                        <div className='flex flex-col w-full gap-[6px]'>
                                            <label htmlFor='firstname' className='text-[14px] font-normal leading-[22px] text-richblack-5'>First Name<sup className='text-pink-200'> *</sup></label>
                                            <input className=' outline-none p-3 rounded-[8px] bg-richblack-800 text-richblack-200 text-base font-medium w-full'  type='text' placeholder='Enter your first name' id='firstname' name='firstName'
                                            value={formData.firstName} onChange={changeHandler} required/>
                                        </div>
                                        <div className='flex flex-col w-full gap-[6px]'>
                                            <label htmlFor='lastname' className='text-[14px] font-normal leading-[22px] text-richblack-5'>Last Name<sup className='text-pink-200'> *</sup></label>
                                            <input className='outline-none p-3 rounded-[8px] bg-richblack-800 text-richblack-200 text-base font-medium w-full' type='text' placeholder='Enter your last name' id='lastname' name='lastName'
                                            value={formData.lastName} onChange={changeHandler} required/>
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-5 gap-[6px]'>
                                        <label htmlFor='email' className='text-[14px] font-normal leading-[22px] text-richblack-5'>Email Address <sup className='text-pink-200'>*</sup></label>
                                        <input className='outline-none p-3 rounded-[8px] bg-richblack-800 text-richblack-200 text-base font-medium' type='email' placeholder='Enter email address' id='email' name='email'
                                        value={formData.email} onChange={changeHandler} required/>
                                    </div>

                                    <div className='flex  mt-5 gap-5'>
                                        <div className='flex flex-col relative w-full gap-[6px]'>
                                            <label htmlFor='password' className='text-[14px] font-normal leading-[22px] text-richblack-5'>Create Password <sup className='text-pink-200 ml-[2px]'>*</sup></label>
                                            <input className='outline-none p-3 rounded-[8px] bg-richblack-800 text-richblack-200 text-base font-medium w-full' type={`${showPassword?"text":"password"}`} placeholder='Enter Password' id='password' name='password' 
                                            value={formData.password} onChange={changeHandler} required/>
                                            <span className='absolute right-[10px] bottom-4 text-base cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}}>
                                                {
                                                    showPassword?(<IoEyeOffOutline/>):(<IoEyeOutline/>)
                                                }
                                            </span>
                                        </div>
                                        <div className='flex flex-col relative w-full gap-[6px]'>
                                            <label htmlFor='confirmPassword' className='text-[14px] font-normal leading-[22px] text-richblack-5'>Confirm Password <sup className='text-pink-200'>*</sup></label>
                                            <input className='outline-none p-3 rounded-[8px] bg-richblack-800 
                                            text-richblack-200 text-base font-medium w-full' type={`${showConfirmPassword?"text":"password"}`} 
                                            placeholder='Enter Confirm Password' id='confirmPassword' name='confirmPassword' onChange={changeHandler} value={formData.confirmPassword} required/>
                                            <span className='absolute right-[10px] bottom-4 cursor-pointer' onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}>
                                                {
                                                    showConfirmPassword?(<IoEyeOffOutline/>):(<IoEyeOutline/>)
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className='mt-6 flex gap-3'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='flex gap-[6px] items-center font-inter text-[16px] leading-5 font-normal text-caribbeangreen-300'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM10.4069 6.79062C10.5674 6.56591 10.5153 6.25364 10.2906 6.09313C10.0659 5.93263 9.75364 5.98467 9.59313 6.20938L7.4362 9.22909L6.35355 8.14645C6.15829 7.95118 5.84171 7.95118 5.64645 8.14645C5.45118 8.34171 5.45118 8.65829 5.64645 8.85355L7.14645 10.3536C7.25037 10.4575 7.39476 10.5104 7.54124 10.4983C7.68772 10.4862 7.82144 10.4102 7.90687 10.2906L10.4069 6.79062Z" fill="#05A77B"/>
                                                </svg>
                                                <p>one lowercase character</p>
                                            </span>
                                            <span className='flex gap-[6px] items-center font-inter text-[16px] leading-5 font-normal text-caribbeangreen-300'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM10.4069 6.79062C10.5674 6.56591 10.5153 6.25364 10.2906 6.09313C10.0659 5.93263 9.75364 5.98467 9.59313 6.20938L7.4362 9.22909L6.35355 8.14645C6.15829 7.95118 5.84171 7.95118 5.64645 8.14645C5.45118 8.34171 5.45118 8.65829 5.64645 8.85355L7.14645 10.3536C7.25037 10.4575 7.39476 10.5104 7.54124 10.4983C7.68772 10.4862 7.82144 10.4102 7.90687 10.2906L10.4069 6.79062Z" fill="#05A77B"/>
                                                </svg>
                                                <p>one uppercase character</p>
                                            </span>
                                            <span className='flex gap-[6px] items-center font-inter text-[16px] leading-5 font-normal text-caribbeangreen-300'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM10.4069 6.79062C10.5674 6.56591 10.5153 6.25364 10.2906 6.09313C10.0659 5.93263 9.75364 5.98467 9.59313 6.20938L7.4362 9.22909L6.35355 8.14645C6.15829 7.95118 5.84171 7.95118 5.64645 8.14645C5.45118 8.34171 5.45118 8.65829 5.64645 8.85355L7.14645 10.3536C7.25037 10.4575 7.39476 10.5104 7.54124 10.4983C7.68772 10.4862 7.82144 10.4102 7.90687 10.2906L10.4069 6.79062Z" fill="#05A77B"/>
                                                </svg>
                                                <p>one number</p>
                                            </span>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <span className='flex gap-[6px] items-center font-inter text-[16px] leading-5 font-normal text-caribbeangreen-300'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM10.4069 6.79062C10.5674 6.56591 10.5153 6.25364 10.2906 6.09313C10.0659 5.93263 9.75364 5.98467 9.59313 6.20938L7.4362 9.22909L6.35355 8.14645C6.15829 7.95118 5.84171 7.95118 5.64645 8.14645C5.45118 8.34171 5.45118 8.65829 5.64645 8.85355L7.14645 10.3536C7.25037 10.4575 7.39476 10.5104 7.54124 10.4983C7.68772 10.4862 7.82144 10.4102 7.90687 10.2906L10.4069 6.79062Z" fill="#05A77B"/>
                                                </svg>
                                                <p>one special character</p>
                                            </span>
                                            <span className='flex gap-[6px] items-center font-inter text-[16px] leading-5 font-normal text-caribbeangreen-300'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM10.4069 6.79062C10.5674 6.56591 10.5153 6.25364 10.2906 6.09313C10.0659 5.93263 9.75364 5.98467 9.59313 6.20938L7.4362 9.22909L6.35355 8.14645C6.15829 7.95118 5.84171 7.95118 5.64645 8.14645C5.45118 8.34171 5.45118 8.65829 5.64645 8.85355L7.14645 10.3536C7.25037 10.4575 7.39476 10.5104 7.54124 10.4983C7.68772 10.4862 7.82144 10.4102 7.90687 10.2906L10.4069 6.79062Z" fill="#05A77B"/>
                                                </svg>
                                                <p>8 characters minimum</p>
                                            </span>
                                        </div>
                                    </div>


                                </div>

                                
                                <button className={`w-full text-center text-base font-medium p-3 rounded-md bg-yellow-50 text-black
                                hover:scale-95 transition-all duration-200 cursor-pointer mt-9 `}>Create Account</button>
                                
                            </form>
                        </div>

                

                        <div className='p-8'>
                        
                            <img src={FrameImage}  alt='Frame Image' width={558} height={490} loading='lazy'  className=' translate-x-8 translate-y-8'/>
                            <img src={SignupImage} alt='Image' width={558} height={504} loading='lazy' className='translate-y-[-100%]'/>
                            
                        </div>
                    </div>
                )
            }
        </div>
    )
    
}