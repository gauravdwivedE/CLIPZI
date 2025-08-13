const mongoose = require("mongoose");
const { z } = require("zod");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    profileImage: {
      type: String,
    },
  },{ timestamps: true }
);

function validateUser(data) {
  const schema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(), // remove this if password is required

  });

  const {error} = schema.safeParse(data)
  
  return error ? error.issues : null
}

const userModel = mongoose.model("User", userSchema);

module.exports = {userModel, validateUser};
