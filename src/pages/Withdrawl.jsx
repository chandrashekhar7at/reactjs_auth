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


const Withdrawl = () => {
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
            const data = await fetch(`https://auth.baseergaming.com/auth/newwinning/${currentUser._id}`,{
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
        <div className='flex mt-10 mx-4 p-5 rounded-xl shadow-lg shadow-gray-400'>
            <FaUser className='mx-4 text-5xl px-2 py-2 rounded-full bg-yellow-300 text-center'/>
            <ul className='font-bold'>
                <li>{currentUser.fullname?currentUser.fullname:''}</li>
                <li>{currentUser.phone?currentUser.phone:''}</li>
            </ul>
        </div>
        <div className='text-xl font-bold mx-6 flex gap-2 items-center mt-10'>
            <PiWallet/> <span>Select Plan</span>
        </div>
      
        <div className='text-xl font-bold mx-6 flex gap-2 items-center mt-10'>
            <FaCoins/> <span>Withdrawl Balance</span>
        </div>
        <div className='flex flex-col mt-10 mx-4 p-5 rounded-xl shadow-lg shadow-gray-400'>
            <div className='mx-2 flex'>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>300</p>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>399</p>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>499</p>
            </div>
            <div className='mx-2 my-2 flex'>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>599</p>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>699</p>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>799</p>
            </div>
            <div className='mx-1 flex'>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>899</p>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>999</p>
                <p className='shadow-lg shadow-black mx-1 border-2 py-2 px-8 flex items-center'><MdCurrencyRupee/>1100</p>
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

export default Withdrawl