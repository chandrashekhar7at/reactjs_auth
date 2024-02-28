// Home.js
import React from 'react';
import './Home.css';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = () => {
  const {currentUser} = useSelector(state=>state.spinuser)
  return (
    <div className="bg-gradient h-screen text-white flex items-center flex-col">
      <div className="shadow-2xl shadow-pink-950 h-[250px] w-64 flex justify-center items-center rounded-full mt-40">
        <img
          src="https://baseergaming.com/public/spinwheel.jpg"
          alt="spinwheel"
          className="w-56 h-56 rounded-full animate-spin"
        />
      </div>
      <div className='mt-10'>
            <Link to="/signup" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10">{currentUser?'go to dashboard':'play'}</Link>

            {currentUser?'':<Link to="/signup" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">signup</Link>} 
      </div>
      <div className='mt-10 mx-10 text-gray-500'>
        <p className='text-2xl'>Spin the wheel everyday and win upto <span className='font-bold'>Rs5000</span></p>
      </div>
    </div>
  );
};

export default Home;
