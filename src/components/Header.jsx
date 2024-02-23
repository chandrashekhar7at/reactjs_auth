import React from "react";
import { Link } from "react-router-dom";
import { IoGameController, IoReorderThreeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const {pathname} = useLocation()
  const {currentUser,loading,playbtnstart} = useSelector(state=>state.spinuser) 
  const navigate = useNavigate()

  return (
    <header className="">
      <nav className="bg-gradient-to-r from-black to-blue-900 text-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <IoGameController
              className="h-8 text-3xl text-cyan-600"
              alt="spingame"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SpinGame
            </span>
          </Link>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {pathname === '/' || pathname === '/payment' || pathname === '/signup' || pathname === '/signin' ?'':(<div className="flex items-center justify-center gap-2 border-2 rounded-lg bg-orange-300">
                <span className="text-2xl text-black font-bold">{playbtnstart?'':(currentUser?currentUser.winning:0)}</span><BsCoin className="text-yellow-950 text-2xl font-extrabold"/>
              </div>)}
              <button
                type="button"
                onClick={()=>{navigate('/payment')}}
                className="p-2 flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <FaUser className="w-8 h-8 rounded-full"/>
              </button>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
