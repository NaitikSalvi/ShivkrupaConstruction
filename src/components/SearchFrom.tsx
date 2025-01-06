"use client"
import {useForm} from "react-hook-form"
import {Form, FormControl,FormField,FormItem,FormLabel} from "./ui/form"
import { Input } from "./ui/input"
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import React from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const SearchFrom = () => {
    const form = useForm()
  
  return (
    <div className="grid w-full items-end gap-4 rounded-xl bg-black sm:grid-cols-2 lg:grid-cols-4 p-6">
        <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Property</FormLabel>
              <Select >
                 <SelectTrigger  className="bg-white text-black"  >
                   <SelectValue placeholder="Type"   />
                 </SelectTrigger>
                 <SelectContent className="bg-white text-black">
                 <SelectItem value="buy">Buy</SelectItem>
                 <SelectItem value="sell">Sell</SelectItem>
                 <SelectItem value="rent">Rent</SelectItem>
                 </SelectContent>
              </Select>
            
            </FormItem>
          )}
    
        
 
     
     
     />  
    <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Address</FormLabel>
              <FormControl className="bg-white text-black">
                <Input placeholder="Search by Address"></Input>
              </FormControl>
            </FormItem>
          )}
    
        
 
     
     
     />  
     <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem >
              <FormLabel className="text-white">Buy/Sell Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-slate-800 text-white">Search</Button>
    </Form>

    </div>
  )
}

export default SearchFrom