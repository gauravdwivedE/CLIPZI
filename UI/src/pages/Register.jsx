import React from "react";
import { useForm } from "react-hook-form";
import CustomeToast from "../components/CustomeToast";
import Nav from "../components/Nav";
import axios from "../api/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const { theme } = useSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/users/register", data, {});
      const { status, data: result } = response;

      if (status === 201) {
        CustomeToast("Registration successful");
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen pb-10">
      <Nav />
      <div className="flex flex-col items-center mt-10 px-4">
        <h1
          className="glow-text text-3xl md:text-5xl font-semibold text-center"
          data-text="Register to Clipzi"
        >
          Register to Clipzi
        </h1>
        <p
          className={`${
            theme === "light" ? "text-gray-800" : "text-[#C9CED6]"
          } font-light mt-3 text-center max-w-md`}
        >
          Manage all your short links, QR codes, and analytics from one place.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`tansition-all duration-1000 mt-10 w-full max-w-lg glass-card p-8 rounded-2xl shadow-[0_0_20px_#144EE3] ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          {/* Name */}
          <div className="mb-6">
            <label className="text-sm mb-2 block">Name</label>
            <input
              type="text"
              placeholder="Gaurav Dwivedi"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-2 rounded-lg ${
                theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-[#181E29] text-white"
              } border border-[#2A2F3A] outline-none tansition-all duration-1000`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="text-sm mb-2 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full px-4 py-2 rounded-lg ${
                theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-[#181E29] text-white"
              } border border-[#2A2F3A] outline-none tansition-all duration-1000`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm mb-2 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
              })}
              className={`w-full px-4 py-2 rounded-lg ${
                theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-[#181E29] text-white"
              } border border-[#2A2F3A] focus:outline-none tansition-all duration-1000`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full py-[10px] bg-[#144EE3] rounded-full hover:bg-[#0f3bc7] transition duration-200 text-white"
          >
            Register Now
          </button>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  theme === "light" ? "border-[#c6c7ca9d]" : "border-[#2A2F3A]"
                }`}
              ></div>
            </div>
            <div className="relative z-10 px-3 text-sm">or</div>
          </div>

          {/* Link to login */}
          <div
            className={`text-center text-sm mt-6 ${
              theme === "light" ? "text-gray-600" : "text-[#8C94A3]"
            }`}
          >
            Have an account?{" "}
            <NavLink
              to="/login"
              className="text-[#EB568E] cursor-pointer hover:underline"
            >
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
