import React from 'react'
import Image from "next/image"
import { SERVICES_TEXT } from '@/constants'


const Services = () => {
  return (
    <div className='container mx-auto border-b py-6 pb-10' id="Services">
        <h2 className="text-center text-3xl tracking-tighter sm:text-4xl lg:text-5xl ">Services</h2>
        <div className="flex flex-wrap">
            <div className='w-full lg:w-1/2'>
            <div className="p-10">
                <Image className="rounded-xl object-cover " src="/service.jpeg" 
                width={600}
                height={600}
                alt='service'
             
                
                />

                </div></div>
                <div className="w-full p-10 lg:w-1/2">
                <h2 className='mt-10 text-5xl lg:text-7xl'>We are 
                    <span className='leading-snug lg:block'>avilable in</span>
                    <span className='font-bold'>40+ Countries!</span> </h2>
                    <p className='max-w-xl py-6 text-lg tracking-tighter lg:pr-20'>{SERVICES_TEXT}</p>
                </div>

        </div>
    </div>
  )
}

export default Services