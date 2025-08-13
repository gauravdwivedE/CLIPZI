const mongoose = require("mongoose");
const { z } = require("zod");

const urlSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    originalUrl: {
      type: String,
      required: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    expireAfterTime: {
      type: Date,
      default: null,
    },
    oneTime: {
      type: Boolean,
      default: false,
    },
    startAfterTime: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    qrImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

function validateUrl(data) {
  const urlRegex =
    /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/;

  const schema = z.object({
    createdBy: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
      .optional(), // optional if not needed during anonymous URL shortening

    originalUrl: z
      .string({
        required_error: "Original URL is required",
      })
      .regex(urlRegex, "Invalid original URL"),


  password: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(3, "Password must be at least 3 characters").optional()
  ),

  startAfterTime:
  
    z.date()
    .optional()
  ,

  expireAfterTime: 
    
    z.date().optional()
  ,
});


  const { error } = schema.safeParse(data);
  return error ? error.issues : null;
}

const urlModel = mongoose.model("Url", urlSchema);

module.exports = { validateUrl, urlModel };
