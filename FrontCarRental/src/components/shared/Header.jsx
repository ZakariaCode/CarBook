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
import {getAdmin,updateAdmin,updateImage} from '../../services/AdminService'

//import image from '../../assets/basil.jpg'

export default function Header({issideBarToggle,setIsSideBarToggle,theme, setTheme}) {
  const [admin, setAdmin]=useState({
      image:""
      });
  useEffect(()=>{
    getAdmin().then((response)=>{
      setAdmin(response.data);
    }).catch(error=>{
      console.error(error);
    })
  },[])
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  return (
    <div className='flex items-center justify-between h-16 px-4 bg-transparent'>
      <div className='flex flex-row items-center'>
        <button className="p-4 lg:hidden" onClick={()=>setIsSideBarToggle(!issideBarToggle)}>
          <IoMdMenu className="text-black cursor-pointer dark:text-white" fontSize={25} />
        </button>
        
      </div>
      <div className="flex items-center">
      <label For="theme-switch" className="flex items-center cursor-pointer m-7">
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
            <FaMoon className='mt-1 ml-1 text-sm text-center text-white ' />
            ):
            (
              <LuSunMedium className='mt-1 ml-1 text-sm text-center text-black '  />
            )}
          </div>
        </div>
    </label>
      <Menu as="div" className="relative inline-block text-left ">
          <Menu.Button className="justify-center w-full py-2 text-sm font-medium text-black rounded-md bg-inherit dark:text-white " onClick={() => setIsOpen(!isOpen)}>
          <div className='flex items-center gap-2'>
            <div className="w-10 h-10 transition-transform bg-center bg-cover rounded-full hover:scale-110 " style={{  backgroundImage: admin.image ? `url(${admin.image})` : "none", 
            color: image ? "transparent" : "white", }}></div>
            {!admin.image  && (
              <div className="w-10 h-10 bg-center bg-cover rounded-full tansition-transform bg-sky-500 hover:scale-110 ">
                <FaUserCircle size={25} className="mt-2 ml-2 font-light text-white dark:text-black" />
              </div>
            )}
              <div className='items-center hidden gap-2 lg:flex'>
                <p className="text-base black dark:text-white">{admin.nom}</p>
                {isOpen ? (
                <TiArrowSortedUp fontSize={20} />
              ) : (
                <TiArrowSortedDown fontSize={20} />
              )}
              </div>
          </div>
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-56 p-3 mt-2 origin-top-right bg-white rounded-lg ring-1 dark:bg-black focus:outline-none" onBlur={() => setIsOpen(false)}>
            <div className='divide-y divide-slate-500 '>
              <Menu.Item>
                
                <div className='relative '>
                  <CgProfile fontSize={22} className='absolute text-gray-600 -translate-y-1/2 dark:text-gray-200 top-1/2 left-2'></CgProfile>
                  <button onClick={()=>navigate('/admin/profil')} className='block w-full px-3 pl-10 mb-4 text-left text-gray-600 dark:text-gray-200'>profile</button>
                </div>
              </Menu.Item>
              <Menu.Item>
              <div className='relative'>
                  <RiLogoutCircleLine fontSize={22}  className='absolute text-red-500 -translate-y-1/2 top-2/3 left-2 '></RiLogoutCircleLine>
                  <button onClick={()=>navigate('/login')} className='block w-full px-3 pl-10 mt-3 text-left text-red-500'>logout</button>
              </div>
              </Menu.Item>
              </div>
          </Menu.Items>
      </Menu>
      </div>
    </div>
  )
}
