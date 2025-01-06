
import Link from 'next/link';
import React from 'react'
async function getUser() {
    let data=await fetch("http://localhost:3000/api/userlogin")
    data=await data.json();
    return data.result 
}
export default async function page   ()  {
    const users=await getUser();
    
       
  return (
    <div>
    {
        users.map((item,index)=>(
                
      

               <div key={index}><li> Email:{item.email}   </li>
               <li> Password:{item.password}   </li></div>
              

          
        ))
    }
     </div>
  )
}

