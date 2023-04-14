import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  status: {
    type: String,
    required: true,
    default: "open",
  },

  /*category: {
    type: String,
    required: true,
  }, */

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  screenshot: {
    type: String,
    required: false,
  },
  
});
