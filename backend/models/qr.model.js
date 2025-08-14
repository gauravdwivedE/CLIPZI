const mongoose = require("mongoose");
const { z } = require('zod')

const urlSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
    

    qrcode: {
        type: String
    },
    isActive: {
      type: Boolean,
      default : true
    }
  },
  { timestamps: true }
);

function validateQr(data) {
  const urlRegex = /^(https?:\/\/)[^\s]+$/

  const schema = z.object({
    createdBy: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
      
    url: z
      .string({
        required_error: "Original URL is required",
      })
      .regex(urlRegex, "Invalid original URL"),

  });

  const { error } = schema.safeParse(data);

  return error ? error.issues : null;
}

const qrModel = mongoose.model("Qr", urlSchema);

module.exports = { validateQr, qrModel };
