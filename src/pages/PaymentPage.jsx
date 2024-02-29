import React, { useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { PiWallet } from "react-icons/pi";
import { Link, Navigate } from 'react-router-dom';
import { FaCoins } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setAmount,formfillingError, formfillingSuccess } from '../redux/user/userSlice';
import { useLocation } from 'react-router-dom';


const PaymentPage = () => {
    const {pathname} = useLocation()
   const {currentUser,error,amount} = useSelector(state=>state.spinuser)
   const navigate = useNavigate()
   const dispatch = useDispatch()


    useEffect(()=>{
        const funAmount = async()=>{
            if(amount === 100){
                try {
                    const data = await fetch(`https://auth.baseergaming.com/auth/newwinning/${currentUser._id}`,{
                        method:'POST',
                        headers:{
                            'Content-type':'application/json'
                        },
                        credentials:'include',
                        body:JSON.stringify({
                            deposite:currentUser.deposite+(amount===100?amount:0)
                        })
                    })
                    const fetcheddata = await data.json()
                    if(fetcheddata.success === true){
                        dispatch(formfillingSuccess(fetcheddata.rest))
                        dispatch(setAmount(0))
                    }
                    console.log(fetcheddata)
                } catch (error) {
                    console.log(error)
                }
            }
        } 
        funAmount()
    })

   const handleAddCash = async(e)=>{
    e.preventDefault()
     navigate('/addcash')
   }
   const handleLogout = async(e)=>{
        e.preventDefault()
        try {
            const logoutdata = await fetch('https://auth.baseergaming.com/auth/logout',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                }
            }) 
            const logfetchdata = await logoutdata.json()
            if(logfetchdata.success === true){
                dispatch(formfillingSuccess(''))
                navigate('/')
            }
        } catch (error) {
            dispatch(formfillingError('invalid action'))
            dispatch(formfillingSuccess(''))
        }
   }
  return (
    <>
        <Link to='/dashboard' className='ml-7 mt-48 text-blue-500 underline text-xl'>go to dashboard</Link>
        <div className='flex mt-10 mx-4 p-5 rounded-xl shadow-lg shadow-gray-400'>
            <FaUser className='mx-4 text-5xl px-2 py-2 rounded-full bg-yellow-300 text-center'/>
            <ul className='font-bold'>
                <li>{currentUser?currentUser.fullname:''}</li>
                <li>{currentUser?currentUser.phone:''}</li>
            </ul>
        </div>
        <div className='text-xl font-bold mx-6 flex gap-2 items-center mt-10'>
            <PiWallet/> <span>Wallet Balance</span>
        </div>
        <div className='flex mt-10 mx-4 p-5 rounded-xl shadow-lg shadow-gray-400'>
                {/* Wallet Balance */}
                <ul className='w-full'>
                    <li className='p-3 flex flex-col'>
                        <span className=''>Total Balance</span>
                        <span className='font-extrabold flex items-center'><MdCurrencyRupee/>{currentUser?currentUser.winning+currentUser.deposite:''}</span>
                    </li><hr/>
                    <li className='p-3 flex justify-between items-center'>
                        <span className='flex flex-col'>
                            <span>Deposits</span>
                            <span className='font-bold flex items-center'><MdCurrencyRupee/>{currentUser?currentUser.deposite:''}</span>
                        </span>
                        <span>
                        {/* to="https://cosmofeed.com/vp/65b4dcfc33eaa0001e3ee19c" */}
                            <button type='button' onClick={handleAddCash} className='hover:bg-yellow-200 bg-yellow-400 rounded-lg p-3 font-bold text-sm'>Add Cash</button>
                        </span>
                    </li><hr/>
                    <li className='p-3 flex justify-between items-center'>
                        <span className='flex flex-col'>
                            <span>Winnings</span>
                            <span className='font-bold flex items-center'><MdCurrencyRupee/>{currentUser?currentUser.winning:''}</span>
                        </span>
                        <span>
                            <Link to="/withdrawl" className='hover:bg-green-950 hover:text-white text-sm font-bold border-2 border-blue-700 p-3 rounded-2xl'>withdraw</Link>
                        </span>
                    </li>
                </ul>
        </div>
        <div className='text-xl font-bold mx-6 flex gap-2 items-center mt-10'>
            <FaCoins/> <span>Reward Balance</span>
        </div>
        <div className='flex mt-10 mx-4 p-5 rounded-xl shadow-lg shadow-gray-400'>
                {/* Reward Balance */}
                <ul className='w-full'>
                    <li className='p-3 flex flex-col'>
                        <span className=''>Total Balance</span>
                        <span className='font-extrabold flex items-center'><MdCurrencyRupee/>0</span>
                    </li><hr/>
                    <li className='p-3 flex justify-between items-center'>
                        <span className='flex flex-col'>
                            <span>Cashback</span>
                            <span className='font-bold flex items-center'><MdCurrencyRupee/>0</span>
                        </span>
                    </li><hr/>
                    <li className='p-3 flex justify-between items-center'>
                        <span className='flex flex-col'>
                            <span>Bonus</span>
                            <span className='font-bold flex items-center'><MdCurrencyRupee/>0</span>
                        </span>
                    </li>
                </ul>
        </div>
        <div className='text-2xl mb-20 flex flex-col justify-center items-center mt-10 mx-4 p-5 rounded-xl shadow-lg shadow-gray-400'>
                {/* Logout */}
                <p>{error?error:''}</p>
                <button type='button' onClick={handleLogout} className='flex gap-2 items-center px-6 py-2 hover:bg-purple-900 hover:text-white hover:border-white border-2 border-purple-950 rounded-xl'><IoLogOut/> Logout</button>
        </div>

    </>
  )
}

export default PaymentPage