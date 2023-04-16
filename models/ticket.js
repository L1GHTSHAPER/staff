import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: "open",
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

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

  attachmentURL: {
    type: String,
  },

  /*category: {
    type: String,
    required: true,
  }, */

},
{
  timestamps: true,
},
);

export default mongoose.model("Ticket", TicketSchema);
