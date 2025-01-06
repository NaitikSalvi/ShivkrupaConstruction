import { FEATURED_PROPERTIES } from '@/constants'
import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import { Star } from 'lucide-react'

const FeaturedProperty = () => {
  return (
    <div className='container mx-auto border-b py-6 pb-10' id="Featured">
        <h2 className="text-center text-3xl tracking-tighter sm:text-4xl lg:text-5xl">
            Fetured Property
        </h2>
        <div className="flex flex-wrap ">
            {FEATURED_PROPERTIES.map((property,index)=>(
                <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 '>
                    <Link href="#" className='m-2 inline-block '>
                    <div className="p-8 ">
                        <Image className="mb-8 rounded-xl object-cover transition-all duration-300 hover:scale-105 hover:border-2 hover:border-green-500 hover:shadow-lg" src={property.image}
                         width={300}
                         height={300}
                         alt={property.name}

                         />
                         <div className="text-center ">
                            <h6 className="mb-5 mt-2 font-medium">
                                {property.name}
                            </h6>
                            <span className="mb-5 mt-2">${property.price}</span>
                            <div className='mt-2 flex items-center justify-center'>
                                <Star fill="glod" strokeWidth={0} className='mr-2 '></Star>
                                <span className="text-sm">
                                    {property.rating} ({property.reviews} reviews)
                                </span>
                            </div>
                         </div>
                            </div></Link>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default FeaturedProperty