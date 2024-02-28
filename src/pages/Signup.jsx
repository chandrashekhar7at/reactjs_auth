import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {formfillingStart,formfillingError,formfillingSuccess,fullnameError,phoneError,emailError,passwordError,repeatpasswordError} from "../redux/user/userSlice.js"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [fullname,setFullname] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repeatpassword,setRepeatPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(formfillingError(''))
    },[])

    const {currentUser,loading,error,fullnameerror,phoneerror,emailerror,passworderror,repeatPassworderror} = useSelector(state=>state.spinuser)
    const dispatch = useDispatch()

    const handleinputChange = (e)=>{
        const ufullname = e.target.id === 'fullname' ?e.target.value:""
        const uphone = e.target.id === 'phone' ? e.target.value:""
        const uemail = e.target.id === 'email' ? e.target.value:""
        const upassword = e.target.id === 'password' ? e.target.value:""
        const urepeatpassword = e.target.id === 'repeat-password' ? e.target.value.trim():""

        if(e.target.id === 'fullname'){
            if(ufullname === ''){
                dispatch(fullnameError('Username is required'))
            }else{
                if(!(/^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/.test(ufullname))){
                    dispatch(fullnameError('only letters are allowed'))
                  }else{
                    setFullname(ufullname.trim().replace(/\s+/g, ' '))
                    dispatch(fullnameError(''))
                  }
            }
        }
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
        if(e.target.id === 'email'){
            if(uemail === ''){
                dispatch(emailError('Email is required'))
              }else{
                if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(uemail))){
                  // emailError
                  dispatch(emailError('invalid email'))
                }else{
                  setEmail(uemail)
                  dispatch(emailError(''))
                }
              }
        }
        if(e.target.id === 'password'){
            // userpassworderror
            if(upassword === ''){
                dispatch(passwordError('password is empty'))
            }else{
                if(upassword.length<5){
                // passwordError
                dispatch(passwordError('password length must be at least 5 character'))
                }else{
                setPassword(upassword)
                dispatch(passwordError(''))
                }
            }
        }
        if(e.target.id === 'repeat-password'){
            if(urepeatpassword === ''){
                dispatch(repeatpasswordError('password is empty'))
            }else{
                if (urepeatpassword !== password || urepeatpassword.length<5) {
                    dispatch(repeatpasswordError('Passwords do not match'));
                } else {
                    setRepeatPassword(urepeatpassword);
                    dispatch(repeatpasswordError(''));
                }
                
            }

        }
    }

    const handleSubmitForm = async(e)=>{
        e.preventDefault()
        if(fullnameerror==='' && phoneerror === '' && emailerror === '' && passworderror==='' && repeatPassworderror===''){
            try {
                dispatch(formfillingStart())
                const data = await fetch('http://auth.baseer/auth/signup',{
                    method:'GET',
                    credentials:'true',
                    // headers:{
                    //     'Content-type':'application/json'
                    // },
                    // body:JSON.stringify({
                    //     fullname,phone,email,password
                    // })
                })
                const resdata = await data.json()
                if(resdata.success === true){
                    dispatch(formfillingSuccess(resdata.restdata))
                    setFullname('')
                    setPhone('')
                    setEmail('')
                    setPassword('')
                    setRepeatPassword('')
                    navigate('/dashboard')
                    return;
                }
                dispatch(formfillingError(resdata.message))
            } catch (error) {
                dispatch(formfillingError(error.message))
            }
        }
    }
    
    const handleFirstSubmit = async(e)=>{
        e.preventDefault()
        try {
            console.log('first')
            const d = await fetch('http://auth.baseergaming.com/auth/signup',{
                method:'GET',
                credentials:'include'
            })
            console.log('second')
          
            const d1 = await d.json();
            console.log('third')
            console.log("response  ------ ",d1)
            console.log('four')
        } catch (error) {
          console.log("errpr  ------ ",error)   
        }
    }
  return (
  <>
  <form onSubmit={handleFirstSubmit}>
    <button type='submit'>click</button>
  </form>
    <div className='bg-gray-800 flex flex-col items-center justify-center'>
        <p className='text-red-500 font-semibold text-2xl mt-20'>{error?error:''}</p>
        <form className="min-w-80 min-h-screen" onSubmit={handleSubmitForm} noValidate>
            {/* fullname */}
            <div className="mb-5">
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-white">Your Name</label>
                <input type="text" id="fullname" value={fullname} onChange={(e)=>{setFullname(e.target.value);handleinputChange(e)}} className="shadow-sm bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="FullName" required/>
            </div>
            <p className='text-red-500'>{fullnameerror?fullnameerror:''}</p>
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
            {/* email */}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value);handleinputChange(e)}} className="shadow-sm bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@spingame.com" required/>
            </div>
            <p className='text-red-500'>{emailerror?emailerror:""}</p>
            {/* password */}
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value);handleinputChange(e)}} className="shadow-sm bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='password' required/>
            </div>
            <p className='text-red-500 font-sm'>{passworderror?passworderror:""}</p>
            {/* repeat-password */}
            <div className="mb-5">
                <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium  text-white">Repeat password</label>
                <input type="password" id="repeat-password" value={repeatpassword} onChange={(e)=>{setRepeatPassword(e.target.value);handleinputChange(e)}} className="shadow-sm bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='repeat-password' required/>
            </div>
            <p className='text-red-500'>{repeatPassworderror?repeatPassworderror:""}</p>
            {/* checkbox */}
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                <input id="terms" type="checkbox" defaultChecked={true} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-white">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></label>
            </div>
            {/* submit button */}
            <input type="submit" value="signup" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
            <Link to="/signin" className="mx-5 underline text-blue-600 text-sm">Already have account</Link>
        </form>
        
    </div>
</>
  )
}

export default Signup