import { TESTIMONIALS } from '@/constants'
import React from 'react'
import Image from "next/image"


const Reviews = () => {
  return (
    <div className='container mx-auto border-b py-6 pb-10' id="Reviews">
     <h2 className="text-center text-3xl tracking-tighter sm:text-4xl lg:text-5xl">
            What out Client said

        </h2>
        <div className="flex flex-wrap ">
        {TESTIMONIALS.map((testimonial,index)=>
        <div key={index} className='w-full p-2  md:w-1/2 lg:w-1/4'>
            <div className="rounded-xl border p-4">
            <div className='flex items-center'>
                <Image className="mr-4 rounded-full border-4 border-neutral-400 hover:border-2 hover:border-green-500 hover:shadow-lg"
                src={testimonial.image}
                width={80}
                height={80}
                alt={testimonial.name}                
                />
                <div>
              <h4 className='w-full '>{testimonial.name}</h4>
              <span className='text-sm text-neutral-600'>
                {testimonial.instagram}
              </span>
              </div>

            </div>
                 <p className="p-4">{testimonial.feedback}</p>
                 <p className="text-sm text-neutral-400">{testimonial.city_country}</p>
                 </div>
        </div>
        )}
        </div>

    </div>
  )
}

export default Reviews