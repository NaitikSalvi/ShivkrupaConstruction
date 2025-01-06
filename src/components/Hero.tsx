import { HERO } from '@/constants'
import React from 'react'
import SearchFrom from './SearchFrom'


const Hero = () => {
  return (
    <div className='hero flex min-h-screen justify-center items-center'>
        <div className='flex max-w-4xl flex-col item-center gap-6 pb-10'>
        <div className='space-y-4 '>
            <h1 className="m-4 text-center text-4xl text-white md:text-5xl lg:text-6xl">
                {HERO.title}
            </h1>
            <p className='p-4 text-center text-slate-300'>
                {HERO.description}
            </p>
        </div>
        <SearchFrom/>
        </div>
    </div>
  )
}

export default Hero