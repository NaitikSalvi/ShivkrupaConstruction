import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FAQ } from '@/constants'
  
const Faq = () => {
  return (
    <div className=' container mx-auto p-6 my-20 ' id="Faq">
        <h2 className='mb-20 text-center text-3xl tracking-tighter sm:text-4xl lg:text-5xl'> FAQ</h2>
        <Accordion type="single" collapsible>
            {FAQ.map((faq,index)=>(
                <AccordionItem key={index} value={faq.value}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>

            ))}
  
  
</Accordion>

    </div>
  )
}

export default Faq