"use client";
import React, { useState } from "react";
import { FEATURED_PROPERTIES } from "@/constants";
import Image from "next/image";
import { Star } from "lucide-react";

const Page = ({ params }) => {
  const id = params.propertyDetails; // Extract the id from params

  // Filter properties based on the `id` from params
  const filteredProperties = FEATURED_PROPERTIES.filter(
    (property) => property.id === id
  );

  // State for user details form
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    message: "",
  });


  // State to toggle phone number visibility
  const [showPhone, setShowPhone] = useState(false);

  // State to toggle map visibility
  const [showMap, setShowMap] = useState(false);

  // Handle user details input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle form submission
  const handleEnquirySubmit =async (e) => {
    e.preventDefault();
    alert(`Thank you, ${userDetails.name}! Your enquiry has been submitted.`);
    
    let result = await fetch("http://localhost:3000/api/userenquiry", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
  });
  result = await result.json();

  try {
    // Send user details to the backend API for sending the email
    let result = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
    });

    const resultData = await result.json();

    if (resultData.success) {
        alert(`Your enquiry email succesfully sent !`);
        setUserDetails({ name: "", email: "", message: "" }); // Reset the form fields
    } else {
        alert("There was an issue submitting your enquiry. Please try again.");
    }
} catch (error) {
    console.error("Error submitting enquiry:", error);
    alert("An error occurred. Please try again.");
}


  setUserDetails({ name: "", email: "", message: "" }); // Reset form

  };

  

  return (
    <div className="container mx-auto py-6 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: User Details Form */}
      <div className="col-span-1 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Enquiry Now</h2>
        <form className="space-y-4" onSubmit={handleEnquirySubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={userDetails.message}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Write your message"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit Enquiry
          </button>
        </form>

        {/* Show Location Button */}
        <div className="mt-4">
          <button
            onClick={() => setShowMap(!showMap)}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            {showMap ? "Hide Location" : "Show Location"}
          </button>
          {showMap && (
            <div className="mt-4">
              {/* Replace this iframe with your map integration */}
              <iframe
                className="w-full rounded"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091835!2d144.95373531531697!3d-37.81627927975154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727bf9f5b1a2c0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1607470820762!5m2!1sen!2sau"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Property Details */}
      <div className="col-span-2">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md space-y-6"
            >
              {/* Property Image */}
              <Image
                className="rounded-xl object-cover w-full"
                src={property.image}
                width={600}
                height={400}
                alt={property.name}
              />

              {/* Property Details */}
              <div>
                <h1 className="text-2xl font-bold">{property.name}</h1>
                <p className="text-green-600 text-lg font-semibold mt-2">
                  ${property.price}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <Star fill="gold" strokeWidth={0} className="text-yellow-500" />
                  <span className="text-sm">
                    {property.rating} ({property.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Property Overview */}
              <div>
                <h2 className="text-xl font-bold mb-2">Overview</h2>
                <p className="text-gray-600">
                  {property.overview || "No overview available for this property."}
                </p>
              </div>

              {/* Enquiry Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  {showPhone ? "Hide Phone Number" : "Get Phone Number"}
                </button>
                {showPhone && (
                  <p className="text-center text-lg font-semibold text-gray-700">
                    Phone: {property.phone || "Not Available"}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
