const mongoose = require('mongoose');

// Define the schema for Property Details
const PropertyDetailsSchema = new mongoose.Schema({
  accountType: {
    type: String,
    
    required: true,
  },
  name: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    // trim: true,
    // unique: true,
    // match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  mobile: {
    type: String,
    required: true,
    // trim: true,
    // match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
  },
  company: {
    type: String,
    // trim: true,
  },
  location: {
    type: String,
    required: true,
    // trim: true,
  },
  propertyType: {
    type: String,
    // enum: ['Flat', 'House', 'Plot', 'Shop', 'Office Space'],
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
    // trim: true,
  },
  //filename: { type: String, required: true },
  
  price: {
    type: Number,
    required: true,
    // min: [0, 'Price must be a positive value'],
  },
  description: {
    type: String,
    required: true,
    // trim: true,
  },
  img:{
    type:Buffer,
   // required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
export  const PropertyDetails = mongoose.models.PropertyDetail || mongoose.model('PropertyDetail', PropertyDetailsSchema);

