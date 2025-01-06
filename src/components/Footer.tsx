import { FOOTER } from '@/constants'
import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image";

import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white py-20'>
        <div className="container mx-auto">
            <div className="flex flex-wrap border-b  border-neutral-700">
                <div className='w-full sm:w-1/2 lg:w-6/12 p-4'>
                <div className='flex flex-shrink-0 items-center '>
                        <Image 
                         className="ml-2 mr-3  rounded-full object-cover" 
                         src="/logo.jpg" 
                         width={50}
                         height={30}
                         alt="Logo"
                         />
                         <span className='text-sm tracking-tight text-white'>Shivkrupa Construction</span>
                        
                    </div>
                <p className='lg:max-w-sm py-8 text-sm'>{FOOTER.description}</p>
                <div className="flex flex-wrap gap-4 my-10 ">
                    <Link href="#" className='text-sm hover:text-neutral-500'><FacebookIcon/></Link>
                    <Link href="#" className='text-sm hover:text-neutral-500'> <InstagramIcon/></Link>
                    <Link href="#" className='text-sm hover:text-neutral-500'><GithubIcon/></Link>
                    <Link href="#" className='text-sm hover:text-neutral-500'><TwitterIcon/></Link>
                   
                    
                
                </div>
                </div>
                {FOOTER.categories.map((category,index)=>(
                    <div key={index} className='w-full p-6 sm:w-1/2 lg:w-2/12'>
                        <h3 className="font-semibold uppercase pb-4">
                            {category.name}

                        </h3>
                        <ul>
                            {category.links.map((link,index)=>(
                                <li key={index} className='my-4'>
                                    <Link href={link.url} className='text-sm hover:text-neutral-500'>{link.title} </Link>
                                </li>
                            ))}
                        </ul>

                    </div>

                ))}
            </div>
            <p className="p-4 text-center text-sm text-neutral-500">
                {FOOTER.copyright}
            </p>
        </div>
    </div>
  )
}

export default Footer