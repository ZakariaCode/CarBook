import React, { useState,useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Menu } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti'
import { IoMdMenu } from 'react-icons/io'
import {FaUserCircle} from 'react-icons/fa'
import { FaMoon } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";

//import image from '../../assets/basil.jpg'

export default function Header({issideBarToggle,setIsSideBarToggle,theme, setTheme}) {
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  return (
    <div className='bg-transparent h-16 px-4  flex justify-between items-center'>
      <div className='flex flex-row items-center'>
        <button className="lg:hidden p-4" onClick={()=>setIsSideBarToggle(!issideBarToggle)}>
          <IoMdMenu className="dark:text-white text-black cursor-pointer" fontSize={25} />
        </button>
        <div className='relative '>
          <FaSearch className='text-gray-500 absolute top-1/2 -translate-y-1/2 left-3'></FaSearch>
          <input type='text' placeholder='Search..' className='text-sm rounded-full focus:outline-none h-10 w-[30vw] lg:w-[20vw] px-3 pl-10  border border-gray-500'></input>
        </div>
      </div>
      <div className="flex items-center">
      <label For="theme-switch" className="flex items-center cursor-pointer">
      <div className="relative -right-4">
        <input id="theme-switch" type="checkbox" className="sr-only" checked={theme} onChange={toggleTheme}/>
        <div
          className={`block w-14 h-8 rounded-full ${
            theme==='light' ? 'bg-gray-300' : 'bg-gray-500'
          }`}
        >
        </div>
        <div
          className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${
            theme==='dark' ? 'translate-x-6 bg-black' : 'bg-white'
          }`}
        >
          {theme==='dark' ? (
          <FaMoon className='text-white text-sm text-center ml-1 mt-1 ' />
          ):
          (
            <LuSunMedium className='text-black text-sm text-center ml-1 mt-1 '  />
          )}
        </div>
      </div>
    </label>
      <Menu as="div" className="relative inline-block text-left ">
          <Menu.Button className="w-full justify-center rounded-md bg-inherit  py-2 text-sm font-medium dark:text-white text-black " onClick={() => setIsOpen(!isOpen)}>
          <div className='flex items-center gap-2'>
            <div className="h-10 w-10  rounded-full  bg-cover bg-center transition-transform hover:scale-110 " style={{  backgroundImage: image ? `url(${image})` : "none", 
            color: image ? "transparent" : "white", }}></div>
            {!image && (
              <div className="h-10 w-10  rounded-full bg-sky-500 bg-cover bg-center transition-transform hover:scale-110 ">
                <FaUserCircle size={25} className="text-white dark:text-black font-light mt-2 ml-2" />
              </div>
            )}
              <div className='lg:flex items-center gap-2 hidden'>
                <p className="text-sm dark:text-white text-black">Username</p>
                {isOpen ? (
                <TiArrowSortedUp fontSize={20} />
              ) : (
                <TiArrowSortedDown fontSize={20} />
              )}
              </div>
            </div>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg p-3  ring-1 bg-white dark:bg-black  focus:outline-none" onBlur={() => setIsOpen(false)}>
            <div className='divide-y divide-slate-500  '>
              <Menu.Item>
                
                <div className='relative '>
                  <CgProfile fontSize={22} className='dark:text-gray-200 text-gray-600 absolute top-1/2 -translate-y-1/2 left-2'></CgProfile>
                  <button onClick={()=>navigate('/profil')} className='dark:text-gray-200 text-gray-600  text-left mb-4 px-3 pl-10 w-full block'>profile</button>
                </div>
              </Menu.Item>
              <Menu.Item>
              <div className='relative'>
                  <RiLogoutCircleLine fontSize={22}  className='text-red-500 absolute top-2/3 -translate-y-1/2 left-2 '></RiLogoutCircleLine>
                  <button onClick={()=>navigate('/login')} className='text-red-500 text-left mt-3 px-3 pl-10 w-full block'>logout</button>
              </div>
              </Menu.Item>
              </div>
          </Menu.Items>
      </Menu>
      </div>
    </div>
  )
}
