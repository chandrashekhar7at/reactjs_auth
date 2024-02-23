import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {
    const {currentUser} = useSelector(state=>state.spinuser) 
    const {pathname} = useLocation()

    console.log(pathname)
    return currentUser === '' && (pathname === '/dashboard'|| pathname === '/addcash' || pathname === '/payment' || pathname === 'cosmofeed' || pathname === '/withdrawl') ?(<Navigate to="/" replace/>):(currentUser && (pathname ==='/signup' || pathname ==='/signin')?<Navigate to="/dashboard" replace />:<Outlet/>)
}

export default PrivateRoute