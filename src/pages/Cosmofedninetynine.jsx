import React, { useEffect, useState } from 'react'
import { setAmount } from '../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Cosmofedninetynine = () => {
    const [amountSpin,setAmountSpin] = useState(100)
    const navigate = useNavigate()
    // const {amount} = useSelector(state=>state.spinuser)
    const dispatch = useDispatch()
    console.log('first')
    useEffect(()=>{
        console.log('second')
        dispatch(setAmount(amountSpin))
        navigate('/payment')
    })
}

export default Cosmofedninetynine