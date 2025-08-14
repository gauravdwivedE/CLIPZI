import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomeToast from "../components/CustomeToast";
import Nav from "../components/Nav";
import axios from "../api/axios";
import { useGoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const Login = () => {
  const { theme } = useSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState();

  function getLogin(user, token) {
    CustomeToast("Login successfull");
    localStorage.setItem("token", token);
    dispatch(setUser(user));
    navigate("/dashboard");
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/users/login", data, {});
      const { status, data: result } = response;

      if (status === 200) {
        getLogin(result.user, result.token);
      }
    } catch (error) {      
      CustomeToast(error.response?.data?.error || error.message)
    } finally {
      setLoading(false);
    }
  };

  const result = async (data) => {
    setGoogleLoading(true);
    try {
      if (!data.access_token) {
        return CustomeToast("Error while singing");
      }
      const response = await axios.post("users/login/oauth", {
        accessToken: data.access_token,
      });
      const { status, data: result } = response;
      if (status === 200) {
        getLogin(result.user, result.token);
      }
      
    } catch (error) {      
      CustomeToast(error.response?.data?.error || error.message)
      
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: result,
    onError: result,
  });

  return (
    <div className={`min-h-screen   pb-10`}>
      <Nav />
      <div className="flex flex-col items-center mt-10 px-4">
        <h1
          className="glow-text text-3xl md:text-5xl font-semibold text-center"
          data-text="Login to Clipzi"
        >
          Login to Clipzi
        </h1>
        <p
          className={` ${
            theme == "light" ? "text-gray-800" : "text-[#C9CED6]"
          }  font-light mt-3  text-center max-w-md`}
        >
          Manage all your short links, QR codes, and analytics from one place.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`mt-10 w-full max-w-lg glass-card p-8 rounded-2xl shadow-[0_0_20px_#144EE3] ${
            theme == "light" ? "text-black" : "text-white"
          } tansition-all duration-1000`}
        >
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
              className={`tansition-all duration-1000 w-full px-4 py-2 rounded-lg ${
                theme == "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-[#181E29] text-white"
              } border border-[#2A2F3A]  focus:outline-none  `}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className=" text-sm mb-2 block">Password</label>
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
              className={`tansition-all duration-1000 w-full px-4 py-2 rounded-lg ${
                theme == "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-[#181E29] text-white"
              } border border-[#2A2F3A]  focus:outline-none `}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type={`${loading ? "button" : "submit"}`}
            className="w-full py-[10px] bg-[#144EE3] flex justify-center items-center rounded-full hover:bg-[#0f3bc7] transition text-white duration-200"
          >
            {!loading ? "Login" : <Loader />}
          </button>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  theme === "light" ? "border-[#c6c7ca9d]" : "border-[#2A2F3A]"
                } `}
              ></div>
            </div>
            <div className="relative z-10 px-3  text-sm">or</div>
          </div>

          {/* Google Login */}

          <button
            type="button"
            onClick={() => !googleLoading && handleGoogleSignIn()}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-[#2A2F3A]  hover:bg-[#2A2F3A]/30 transition duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />

            {googleLoading ? <Loader /> : "Continue with Google"}
          </button>

          <div className="text-center text-sm text-[#8C94A3] mt-6">
            Don’t have an account?{" "}
            <NavLink
              to="/register"
              className="text-[#EB568E] cursor-pointer hover:underline"
            >
              Register Now
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
