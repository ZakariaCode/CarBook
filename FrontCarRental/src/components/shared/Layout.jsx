import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
    const [issideBarToggle,setIsSideBarToggle]=useState(false);
    const [theme,setTheme]=useState(localStorage.getItem('theme'));
  const darkQuery= window.matchMedia("(prefers-color-scheme:dark)");
 
  function onWindowsMatch(){
    if(localStorage.theme ==='dark' || (!("theme" in localStorage ) && darkQuery.matches)){
      document.documentElement.classList.add('dark');
    }else {
      document.documentElement.classList.remove('dark');
    }
  }
  onWindowsMatch();
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  }, [theme]);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [])
  return (
    <div className='flex flex-row bg-[#fff4ea]  dark:bg-[#282019] h-screen w-screen  '>
      <div className={`transition-all ${issideBarToggle ? "ml-0 " : "lg:ml-8 lg:my-9"}`}>
        <Sidebar issideBarToggle={issideBarToggle} setIsSideBarToggle={setIsSideBarToggle} theme={theme} setTheme={setTheme}/>
      </div>
      <div className='flex flex-col flex-1 '>
        {issideBarToggle && (
          <div 
            onClick={() => setIsSideBarToggle(false)} 
            className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden "
          ></div>
        )}
        <div className="fixed top-0 left-0 right-4 z-20 bg-[#fff4ea]  dark:bg-[#282019] py-5 lg:ml-64">
                  <Header
                    isSideBarToggle={issideBarToggle}
                    setIsSideBarToggle={setIsSideBarToggle}
                    theme={theme}
                    setTheme={setTheme}
                  />
        </div>
        <div className='flex-1 p-4 pt-16 overflow-y-auto ' issideBarToggle={issideBarToggle} setIsSideBarToggle={setIsSideBarToggle} theme={theme}>{<Outlet/>}</div>
      </div>
    </div>
  )
}
