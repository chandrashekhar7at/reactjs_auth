import React, { useEffect, useState } from 'react'
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


const AddCash = () => {
    const [withdrawl,setWithdrawl] = useState('')
    const {pathname} = useLocation()
    const [insufficient,setInSufficient] = useState('')
   const {currentUser,error,amount} = useSelector(state=>state.spinuser)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleWithdrawl = async(e)=>{
    e.preventDefault()
    setInSufficient('')
    const winningbalance = currentUser.winning
    if(winningbalance>=withdrawl || winningbalance<=withdrawl || withdrawl<300 || winningbalance===0){
        if(withdrawl<300){
            setInSufficient('dont have enough balance')
        }else if(currentUser.winning>=300 && withdrawl<300){
            setInSufficient('only withdraw 300 and more...')
        }else{
            setInSufficient('withdrawl failed')
        }
        return;
    }
    if(winningbalance>=300){
        try {
            const data = await fetch(`/auth/newwinning/${currentUser._id}`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify({
                    winning:currentUser.winning-withdrawl
                })
            })
            const fetcheddata = await data.json()
            if(fetcheddata.success === true){
                setWithdrawl('')
                dispatch(formfillingSuccess(fetcheddata.rest))
            }
            console.log(fetcheddata)
        } catch (error) {
            console.log(error)
        }
    }
   }
  return (
    <>
        <Link to='/dashboard' className='ml-7 mt-48 text-blue-500 underline text-xl'>go to dashboard</Link>

        <div className='text-xl font-bold mx-6 flex gap-2 items-center mt-10'>
            <PiWallet/> <span>Select Plan</span>
        </div>
      
        <div className='text-xl font-bold mx-6 flex gap-2 items-center mt-10'>
            <FaCoins/> <span>add spins</span>
        </div>
        <div className='flex flex-col mt-10 mx-4 p-5 rounded-xl shadow-lg shadow-gray-400'>
            <div className='mx-2 flex'>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>99</span><span> 5 spins</span></div>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>199</span><span> 12 spins</span></div>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>299</span><span> 19 spins</span></div>
            </div>
            <div className='mx-2 my-2 flex'>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>399</span><span> 25 spins</span></div>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>499</span><span> 35 spins</span></div>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>599</span><span> 45 spins</span></div>
            </div>
            <div className='mx-1 flex'>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>899</span><span> 75 spins</span></div>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>999</span><span> 85 spins</span></div>
                <div className='shadow-lg shadow-black mx-1 border-2 py-2 font-bold px-4 flex flex-col'><span className='flex items-center'><MdCurrencyRupee/>1100</span><span> 95 spins</span></div>
            </div>
            <p className='mt-10 mx-auto text-red-500 text-2xl'>{insufficient?insufficient:''}</p>
            <form onSubmit={handleWithdrawl} className='mt-10 flex flex-col'>
                <input type="number" id="withdrawl" value={withdrawl} onChange={(e)=>setWithdrawl(e.target.value)} placeholder='Enter Amount' className='bg-gray-100 text-black shadow-green-500 border-2 border-gray-300 p-3'/>
                <input type="submit" value="withdrawl" className='bg-green-800 p-3 text-white text-2xl font-bold mt-5 rounded-lg hover:opacity-90'/>
            </form>
        </div>

    </>
  )
}

export default AddCash