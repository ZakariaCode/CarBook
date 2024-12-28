import React,{useRef,useEffect} from 'react'
import imageDark from '../../assets/logo.svg';
import imageLight from '../../assets/logo.png';
import {DASHBOARD_SIDEBAR_LINKS} from '../../lib/constants/navigation'
import {Link, useLocation} from 'react-router-dom'
import classNames from 'classnames';



const linkClasses='flex items-center gap-2 font-light px-3 py-5 rounded-lg text-base active:bg-amber-500'
export default function Sidebar({issideBarToggle,setIsSideBarToggle,theme,setTheme}) {
    const sidebarRef = useRef(null)// pour déterminer si un click se produit à l'intérieur ou à l'extérieur de cet élément.

    useEffect(() => {
      if (issideBarToggle) {
        document.body.style.overflow = 'hidden';
        const handleClickOutside = (event) => {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
              setIsSideBarToggle()
          }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }
    }, [issideBarToggle, setIsSideBarToggle])
    return (
  <div
        ref={sidebarRef}
              className={classNames(
                'absolute top-0 left-0 h-full dark:bg-[#121212] bg-white p-5 dark:text-white text-black transition-transform   z-50 lg:static lg:block w-60 lg:w-52',
                issideBarToggle ? 'transform translate-x-0' : 'transform -translate-x-full  lg:rounded-2xl lg:border lg:border-orange-300',
                'lg:translate-x-0' 
              )}
            > 
          <div className='flex items-center pt-3'>
            {theme==='dark'?
            (
              <div className='h-20 bg-center bg-cover rounded-full w-28 bg-inherit' style={{ backgroundImage: `url(${imageDark})` }}></div>
            ):(
              <div className='w-24 mr-3 bg-center bg-cover rounded-full h-14 bg-inherit' style={{ backgroundImage: `url(${imageLight})` }}></div>
            )
            }
            <span className='text-lg text-black dark:text-neutral-100'>Car</span> 
          </div>
          <div className='py-16'>
            {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
                <SidebarLink key={item.key} item={item}></SidebarLink>
            ))}
          </div>
  </div>
  )
}
function SidebarLink({item}){
    const {pathname}=useLocation()
    return (
        <Link to={item.path} className={classNames(pathname===item.path ? 'bg-amber-500 text-white font-mono':'text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-mono',linkClasses)}>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
        </Link>
    )
}
