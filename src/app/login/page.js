"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter(); // Initialize the useRouter hook

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/userlogin");
        const data = await response.json();
        setUsers(data.result || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const checkUser = () => {
    if (!email || !password) {
      alert("Email and Password must be required!");
      return;
    }

    const userData = users.filter((item) => item.email === email && item.password === password);
    if (userData.length === 0) {
      alert("User Not Found!");
    } else {
      alert("You are Successfully Logged In!");
      router.push("/"); // Redirect to the root page
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form className="space-y-4">
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
        <button
          onClick={checkUser}
          type="button"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
        <div className="text-right mt-2">
          <Link href={"/signup"} className="underline text-blue-500 hover:text-blue-700">
            You have not account
          </Link>
        </div>
      </form>
    </div>
  );
}
