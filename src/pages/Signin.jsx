import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {formfillingStart,formfillingError,formfillingSuccess,phoneError,passwordError} from "../redux/user/userSlice.js"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(formfillingError(''))
    },[])

    const {currentUser,loading,error,phoneerror,passworderror} = useSelector(state=>state.spinuser)
    const dispatch = useDispatch()

    const handleinputChange = (e)=>{
        const uphone = e.target.id === 'phone' ? e.target.value:""
        if(e.target.id === 'phone'){
            if(uphone === ''){
                dispatch(phoneError('phone no. is required'))
            }else{
                if(!(/^\d{10}$/.test(uphone))){
                    dispatch(phoneError('only numbers are allowed'))
                  }else{
                    setPhone(uphone)
                    dispatch(phoneError(''))
                  }
            }
        }
    }

    const handleSubmitForm = async(e)=>{
        e.preventDefault()
        if(phoneerror === '' && passworderror===''){
            try {
                dispatch(formfillingStart())
                const data = await fetch('https://auth.jiospin.info/auth/signin',{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json'
                    },
                    credentials:'include',
                    body:JSON.stringify({
                        phone,password
                    })
                })
                const resdata = await data.json()
                if(resdata.success === true){
                    dispatch(formfillingSuccess(resdata.restdata))
                    setPhone('')
                    setPassword('')
                    navigate('/dashboard')
                    return;
                }
                dispatch(formfillingError(resdata.message))
            } catch (error) {
                dispatch(formfillingError(error.message))
            }
        }
    }
  return (
    <div className='bg-gray-800 flex flex-col items-center justify-center'>
        <p className='text-red-500 font-semibold text-2xl mt-20'>{error?error:''}</p>
        <form className="min-w-80 min-h-screen" onSubmit={handleSubmitForm} noValidate>
            {/* phone */}
            <div className="flex flex-col mb-5">
                <label htmlFor="phone-input" className="block mb-2 text-sm font-medium text-white">Phone number:</label>
                <div className='flex items-center'>
                    <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-300 bg-gray-600 border border-gray-500 rounded-s-lg  focus:outline-none focus:ring-gray-500">
                    +91
                    </span>
                    <div className="w-full">
                        <input type="phone" id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value);handleinputChange(e)}} className="block p-2.5 w-full z-20 text-sm text-white bg-gray-600 rounded-e-lg border-s-0 border outline-none border-gray-500" placeholder="123-456-7890" required/>
                    </div>
                </div>
            </div>
            <p className='text-red-500'>{phoneerror?phoneerror:""}</p>
            {/* password */}
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value);handleinputChange(e)}} className="shadow-sm bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='password' required/>
            </div>
            <p className='text-red-500 font-sm'>{passworderror?passworderror:""}</p>

            {/* submit button */}
            <input type="submit" value="signin" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
            <Link to="/signup" className="mx-5 underline text-blue-500 text-sm">new user/ create account</Link>
        </form>
    </div>
  )
}

export default Signin