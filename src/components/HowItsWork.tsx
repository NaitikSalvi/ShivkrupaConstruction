import { HOW_IT_WORKS } from '@/constants'
import { CircleCheckBig } from 'lucide-react'
import React from 'react'

const HowItsWork = () => {
  return (
    <div className='container mx-auto my-10 border-b pd-10' id='How'>
        <h2 className='text-center text-3xl tracking-tighter sm:text-4xl lg:text-5xl'>
            {HOW_IT_WORKS.title}
        </h2>
        <p className='p-10 mx-auto my-10 max-w-4xl text-center text-neutral-800'>{HOW_IT_WORKS.content}</p>
        <div className="works relative h-[640px] rounded-xl">
            <div className='absolute left-0 top-0 h-full overflow-y-hidden p-10 md:p-20'>
                {HOW_IT_WORKS.steps.map((step,index)=>(
                    <div   key={index}>
                        <div className="flex items-center">
                        <CircleCheckBig className='mr-4 text-green-400'/>
                        <h6 className='font-medium uppercase text-neutral-200'>
                            {step.title}
                        </h6>
                        </div>
                        <p className='my-2 p-2 max-w-80 text-neutral-300'>{step.text}</p>
                    </div>
                    
                ))}
            </div>
        </div>
    </div>
  )
}

export default HowItsWork