import React, { useEffect, useState } from "react";
import { HiLink } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import axios from "../api/axios";
import CustomeToast from "./CustomeToast";
import { useSelector } from "react-redux";

function getLocalStoarageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

const Linkgenerator = ({ setShortened }) => {
    const {theme}  = useSelector((state) => state.theme)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [attemsLeft, setAttemsLeft] = useState(
    getLocalStoarageItem("myShortened")?.length || [].length
  );

  async function onSubmit(data) {
    setLoading(true);
    try {
      // Get existing data from localStorage
      const existing = getLocalStoarageItem("myShortened") || [];
      if (existing.length >= 5) {
        return CustomeToast(
          "Register Now or Login to enjoy unlimited usage",
          true
        );
      }

      const response = await axios.post("/urls/", data, {});
      if (response.status === 201) {
        CustomeToast(response.data.message);

        // Add the new shortened link to the array
        existing.push(response.data.shortened);

        // Save back to localStorage
        localStorage.setItem("myShortened", JSON.stringify(existing));
        setShortened(getLocalStoarageItem("myShortened"));
        setAttemsLeft(getLocalStoarageItem("myShortened")?.length || [].length);
        reset();
      }
    } catch (error) {
       CustomeToast(error.response?.data?.error || error.message)
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:px-15 flex transition-all flex-col items-center"
      >
        <div className={`width-[25rem] md:w-1/2 p-1 h-[59px] md:h-[69px] ${theme === 'light' ? 'bg-gray-200' : 'bg-[#181E29]'} border-[2.5px] gap-4 border-[#536487] outline-none flex items-center justify-between rounded-full transition-all duration-1000`}>
          <div className="flex gap-5 p-[10px] pl-5 items-center h-full flex-1">
            <span className={`${theme === 'light' ? 'text-gray-500' : 'text-[#C9CED6]'} transition-all duration-1000`}>
              <HiLink className="text-xl" />
            </span>
            <input
              {...register("originalUrl", {
                required: "Please enter a Link",
                pattern: {
                  value: /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/, // basic URL pattern
                  message: "Link is not valid",
                },
              })}
              type="text"
              placeholder="Enter the Link here"
              className={`font-light ${theme === 'light' ? 'placeholder:text-gray-500 text-black' : 'placeholder-[#C9CED6] text-white'} h-full py-2  outline-none w-full transition-all duration-1000 text-[12px] md:text-sm`}
            />
          </div>
          {!loading ? (
            <button className="px-6 md:px-8 h-full bg-[#144EE3] cursor-pointer text-white rounded-full text-[12px] md:text-sm shadow-[12px_5px_24px_#144EE380]">
              Shorten Now
            </button>
          ) : (
            <button
              type="type"
              className="px-2 md:px-8 h-full  bg-[#144EE3] disabled cursor-pointer text-white rounded-full text-sm shadow-[12px_5px_24px_#144EE380]"
            >
              <Loader />
            </button>
          )}
        </div>

        <div className="flex gap-4 items-center my-4">
          <div className="flex items-center space-x-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                {...register("oneTime")}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:bg-[#144EE3] transition-all duration-300 "></div>
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-full"></div>
            </label>
          </div>
          <span className={`${theme === 'light' ? 'text-gray-900': 'text-[#C9CED6]'} text-[10px] md:text-[13px] font-light transition-all duration-1000`}>
            One-time only
          </span>
        </div>
        {errors.originalUrl && (
          <p className="text-red-500 text-sm">{errors.originalUrl.message}</p>
        )}
      </form>
      <p className={`${theme === 'light' ? 'text-gray-900': 'text-[#C9CED6]'} text-[10px] md:text-[12px] mt-4 transition-all duration-1000`}>
        {attemsLeft >= 5
          ? `Limit is over. Register Now to enjoy unlimited usage`
          : attemsLeft > 0 && (
              <>
                You can create{" "}
                <span className="text-[#EB568E]">{"0" + (5 - attemsLeft)}</span>{" "}
                more links. Register Now to enjoy unlimited usage
              </>
            )}
      </p>
    </>
  );
};

export default Linkgenerator;
