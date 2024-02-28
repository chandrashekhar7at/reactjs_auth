import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { BsCoin } from 'react-icons/bs';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playButtonStart,formfillingError, formfillingSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const {currentUser,playbtnstart} = useSelector(state=>state.spinuser)
    const navigate = useNavigate()
    const [rotateStatus, setRotateStatus] = useState(false);
    const [animationStopped, setAnimationStopped] = useState(false);
    const [spinresult,setSpinResult] = useState(0)
    const [newdepositebal,setNewDepositeBalance] = useState(0)
    const {error} = useSelector(state=>state.spinuser)
    const dispatch = useDispatch()
    const [popUp,setPopup] = useState(false)
    const closePop = useRef()


    useEffect(() => {
        const element = document.getElementById('demo');

        const handleAnimationEnd = () => {
            setAnimationStopped(true);
            setRotateStatus(false);
            setPopup(true)
            dispatch(playButtonStart(false))
            // do task on animation end
        };
        element.addEventListener('animationend', handleAnimationEnd);
        return () => {
            element.removeEventListener('animationend', handleAnimationEnd);
        };
    }, []);


    const handleClickOutside = (event) => {
        if (closePop.current && !closePop.current.contains(event.target)) {
            setAnimationStopped(false);
            setPopup(false)
        }
      };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCLick = async() => {
        dispatch(playButtonStart(true))
        setPopup(false)
        setAnimationStopped(false)
        setRotateStatus(true);
        const positivepoints = [10,30,50,70,500,1000]
        const negativepoints = [20,25,30,100]
        const phones = ['android','iphone']

        const winningbalnace = currentUser.winning
        const depositebalnace = currentUser.deposite
        if(depositebalnace>=20){
            const randomno = Math.floor(Math.random() * 4);
            let result = positivepoints[randomno]
            if(result+winningbalnace>=280){
                const randomnos = Math.floor(Math.random() * 3);
                result = -negativepoints[randomnos]
            }
            setSpinResult(result)
            try {
                const data = await fetch(`/auth/newwinning/${currentUser._id}`,{
                    method:'POST',
                    credentials:'include',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({winning:winningbalnace+result,deposite:depositebalnace-20})
                }) 
                const redata = await data.json()
                if(redata.success === true){
                    dispatch(formfillingSuccess(redata.rest))
                }   
            } catch (error) {
                dispatch(formfillingError('invalid spin'))
            }
        }else{
            setSpinResult(0)
        }

    };
  return (
    <div className='bg-gradient h-screen'>
        <div className='flex flex-col items-center translate-y-40'>
            {popUp?(<div ref={closePop} className="mt-7 px-10 w-66 h-56 z-10 bg-yellow-300 rounded-2xl shadow-2xl shadow-green-400 flex flex-col items-center">
                <p className="text-blue-900 font-extrabold text-center text-2xl mt-10">
                You have <br /> Successfully won
                </p>
                <span className="p-3 text-yellow-500 text-3xl flex justify-center items-center mt-10 font-bold bg-green-800">
                {spinresult?spinresult:''} <BsCoin className="text-yellow-500 mx-2" />
                </span>
            </div>):''}
            <img src="wheel.jpg" alt="wheel" id="demo" className={`fixed w-72 h-72 rounded-full ${rotateStatus ? 'css-animation-manual' : ''}`}/>
            <button type='button' disabled={rotateStatus || popUp || currentUser.deposite === 0} onClick={handleCLick} className={`${rotateStatus || popUp || currentUser.deposite === 0?"bg-gray-500":'bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-400  shadow-lg shadow-green-500/50'} font-medium px-7 py-2 rounded-lg text-yellow-50 ${animationStopped?'mt-40':'mt-96'}`}>play</button>
            <p>{error?.error}</p>
        </div>
    </div>
  )
}

export default Dashboard