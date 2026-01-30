import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },

    // helpful metadata for insights
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    status: { type: String, enum: ["new", "read"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("ContactMessage", contactMessageSchema);
