"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const router=useRouter();

    const addUserData = async () => {
        if (!name || !email || !password || !age) {
            alert("Please fill in all fields");
        
        }
        else{
            let result = await fetch("http://localhost:3000/api/usersignup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, age }),
            });
            result = await result.json();
            alert("Your account is successfully created! ")
            router.push("/")
        }
       

    };

    return (

        <div className="max-w-md mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
            <form className="space-y-4">
                <input
                    placeholder="Enter Name"
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    placeholder="Enter Email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    placeholder="Enter Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    placeholder="Enter Age"
                    value={age}
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
             
                <button
                    onClick={addUserData}
                    type="button"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Sign Up 

                </button>
                <div className="text-right mt-2 "> <Link href={"/login"} className="underline text-blue-500 hover:text-blue-700">You have already account</Link></div>
               
            </form>
        </div>
    );
}
