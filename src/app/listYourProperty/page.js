"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ListYourProperty = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState({
    accountType: "",
    name: "",
    email: "",
    mobile: "",
    location: "",
    propertyType: "",
    propertyName: "",
    price: "",
    description: "",
    file:null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const validateStep = () => {
    let stepErrors = {};

    if (step === 1) {
      if (!formData.accountType) stepErrors.accountType = "Please select a member type.";
      if (!formData.name.trim()) stepErrors.name = "Name is required.";
      if (!formData.email.trim()) {
        stepErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = "Please enter a valid email.";
      }
      if (!formData.mobile.trim()) {
        stepErrors.mobile = "Mobile number is required.";
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        stepErrors.mobile = "Mobile number must be 10 digits.";
      }
    }

    if (step === 2) {
      if (!formData.propertyType) stepErrors.propertyType = "Please select a property type.";
      if (!formData.propertyName.trim()) stepErrors.propertyName = "Property name is required.";
      if (!formData.price.trim()) {
        stepErrors.price = "Price is required.";
      } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
        stepErrors.price = "Please enter a valid price.";
      }
      if (!formData.location.trim()) stepErrors.location = "Location is required.";
      if (!formData.description.trim()) stepErrors.description = "Description is required.";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length == 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form Submitted: ", formData);
      let result = await fetch("http://localhost:3000/api/addProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      result = await result.json();
      alert("Property Listed Successfully!");
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        {step === 1
          ? "Create Your Account"
          : step === 2
          ? "Enter Property Details"
          : "Confirm Your Details"}
      </h1>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              step >= 1 ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            1
          </div>
          <div
            className={`h-1 w-16 ${step > 1 ? "bg-blue-600" : "bg-gray-300"}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              step >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            2
          </div>
          <div
            className={`h-1 w-16 ${step > 2 ? "bg-blue-600" : "bg-gray-300"}`}
          ></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              step >= 3 ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            3
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        {step === 1 && (
          <>
            <div>
              <label
                htmlFor="accountType"
                className="block text-gray-700 font-medium"
              >
                Are you an Agent/Builder/Owner
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              >
                <option value="">Select Member Type</option>
                <option value="Agent">Agent</option>
                <option value="Builder">Builder</option>
                <option value="Owner">Owner</option>
              </select>
              {errors.accountType && (
                <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email ID"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label
                htmlFor="propertyType"
                className="block text-gray-700 font-medium"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select Property Type</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
                <option value="Shop">Shop</option>
                <option value="Office Space">Office Space</option>
              </select>
              {errors.propertyType && (
                <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="propertyName"
                className="block text-gray-700 font-medium"
              >
                Property Name
              </label>
              <input
                type="text"
                id="propertyName"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Enter Property Name"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.propertyName && (
                <p className="text-red-500 text-sm mt-1">{errors.propertyName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 font-medium"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Property Location"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter Price"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Property Description"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium"
              >
                Upload Photo
              </label>
              <input
                type="file"
                id="file"
                name="file"
                value={formData.file}
                onChange={handleChange}
                //placeholder="Enter Price"
                className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
           
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

          </>
        )}

        {step === 3 && (
          <div className="text-gray-700">
            <h2 className="font-medium mb-4">Please confirm your details:</h2>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Mobile:</strong> {formData.mobile}
            </p>
            <p>
              <strong>Property Type:</strong> {formData.propertyType}
            </p>
            <p>
              <strong>Property Name:</strong> {formData.propertyName}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Price:</strong> {formData.price}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ListYourProperty;
