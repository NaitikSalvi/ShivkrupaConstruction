/* The provided code is a TypeScript React component for a responsive navigation bar (Navbar) for a
website. Here is a breakdown of what the code does: */
/* The code provided is a TypeScript React component for a responsive navigation bar (Navbar) for a
website. Here is a breakdown of what the code does: */
"use client"
import {Menu ,X} from "lucide-react"
import { useState } from "react";
import React from 'react'
import Image from "next/image";
import { NAV_LINKS } from '@/constants';
import Link from 'next/link';
import { Button } from './ui/button';
const Navbar = () => {
    const [mobileDrawerOpen ,SetMobileDrawerOpen ]=useState(false)
    const togglerNavbar=()=>{
        SetMobileDrawerOpen(!mobileDrawerOpen);
    };
  return (
<nav className='fixed top-1 z-50 w-screen mx-auto lg:pl-24 sm:pr-3 '>
    <div className='container flex  items-center justify-between rounded-xl bg-black py-3 '>
    <div className='flex flex-shrink-0 items-center justify-between'>
        <Image 
         className="ml-2 mr-3  rounded-full object-cover" 
         src="/logo.jpg" 
         width={60}
         height={30}
         alt="Logo"
         />
         <span className='text-sm tracking-tight text-white'>Shivkrupa Construction</span>
        
    </div>
    <div className="hidden lg:flex">
        <ul className="flex item-center gap-4 mr-3">
            {NAV_LINKS.map((item,index)=>(
                <li key={index}>
                    <Link className="text-sm text-white hover:text-neutral-500" href={item.url}>
                    {item.title}
                    
                    </Link>
                </li>
            ))}
            
        </ul>
    </div>
   <div className='hidden text-sm text-white lg:flex'>
   <Link href={"/login"}> <Button variant="outline" className="mr-1 bg-black rounded-xl"> Sign in</Button></Link> 
   
    <Link href={"/signup"}> <Button  className='bg-slate-800 mr-2 rounded-xl'>Sign up</Button></Link>   </div>
   <div className="flex-col justify-end text-white md:flex lg:hidden">
        <button onClick={togglerNavbar}>
            {mobileDrawerOpen ? <X />:<Menu/>}
        </button>
    </div>
    </div>
   {mobileDrawerOpen &&(
    <div className="rounded-xl bg-black  lg:hidden px-4">
        <ul className="flex flex-col items-center">
            {NAV_LINKS.map((item,index)=>(
                <li key={index} className="py-2">
                    <Link className="text-sm text-white hover:text-neutral-500" href={item.url}>
                    {item.title}
                    
                    </Link>
                </li>
            ))}
        </ul>
        <div className='text-sm text-white pb-4 flex justify-center items-center lg:hidden'>
   <Link href={"/login"}> <Button variant="outline" className="mr-1 bg-black hover:bg-white hover:text-black rounded-xl"> Sign in</Button></Link> 
   <Link href={"/signup"}> <Button  className='bg-slate-800 mr-2 rounded-xl'>Sign up</Button></Link>
   </div>
    </div>
   )}
</nav>        
)
}

export default Navbar