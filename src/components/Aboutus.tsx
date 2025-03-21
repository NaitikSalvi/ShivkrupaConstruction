import { ABOUT_US_TEXT } from '@/constants'
import React from 'react'

const Aboutus = () => {
  return (
    <div className='container mx-auto border-b py-6 pb-10' id="About">
        <div className='mb-8 p-10'>
         <h2 className="text-center text-3xl tracking-tighter sm:text-4xl lg:text-5xl">
            About Us

        </h2>
       
<p className='py-6 text-lg text-center tracking-tighter lg:pr-20'>{ABOUT_US_TEXT}</p> 
</div>
<div className="flex flex-wrap text-center">
    <div className="w-full border-neutral-700 p-6 lg:w-1/2 lg:border-r">
    <p className='bg-gradient-to-r from-purple-400 vai-pink-500 to-purple-800 bg-clip-text text-5xl text-transparent lg:text-7xl'>10000+</p>
    <p className='my-8 font-medium'>Client from 2020</p></div>
    <div className="w-full p-6 lg:w-1/2">
    <p className='bg-gradient-to-r from-green-400  to-green-800 bg-clip-text text-5xl text-transparent lg:text-7xl'>
          3000+
        </p>
        <p className='my-8 font-medium'>Properties Sold!</p>
        </div>
    </div>   
   </div>
  )
}

export default Aboutus