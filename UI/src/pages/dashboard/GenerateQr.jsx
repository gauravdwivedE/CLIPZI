import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiLink } from "react-icons/hi2";
import { BiError } from "react-icons/bi";
import Loader from "../../components/Loader";
import axios from "../../api/axios";
import useImagePopup from "../../hooks/useImagePopup";
import CustomeToast from "../../components/CustomeToast";
import { useSelector } from "react-redux";

const GenerateQrCode = () => {
  const { theme } = useSelector((state) => state.theme);
  const { showPopup } = useImagePopup();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/qrs", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        showPopup(response.data?.generatedQr?.qrcode);
        CustomeToast(response.data.message);
        reset();
      }
    } catch (error) {
      CustomeToast(error.response?.data?.error || error.message)
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 h-full relative">
      <h1
        className={`text-3xl font-semibold mb-8 transition-all duration-1000 ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}
      >
        Generate QR
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:px-15 flex flex-col items-center mt-12 space-y-6"
      >
        {/* URL Input */}
        <div
          className={`transition-all duration-1000 w-[21rem] max-w-[30rem] md:w-[30rem] p-1 h-[59px] md:h-[69px] gap-4 border-[2.5px] outline-none flex items-center justify-between rounded-full ${
            theme === "light"
              ? "bg-gray-200 border-gray-400"
              : "bg-[#181E29] border-[#536487]"
          }`}
        >
          <div className="flex gap-5 p-[10px] pl-5 items-center h-full flex-1">
            <span
              className={`transition-all duration-1000 ${
                theme === "light" ? "text-gray-700" : "text-[#C9CED6]"
              }`}
            >
              <HiLink className="text-xl" />
            </span>
            <input
              {...register("url", {
                required: "Please enter a valid link",
                pattern: {
                  value:
                    /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/,
                  message: "Link is not valid",
                },
              })}
              type="text"
              placeholder="Enter the Link here"
              className={`transition-all duration-1000 font-light h-full py-2 outline-none w-full bg-transparent placeholder-gray-400 text-[12px] md:text-sm ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 md:px-8 h-full bg-[#144EE3] cursor-pointer text-white rounded-full text-sm shadow-[12px_5px_24px_#144EE380]"
          >
            {loading ? <Loader /> : "Generate QR"}
          </button>
        </div>

        {/* Validation Errors */}
        {errors.url && (
          <p className="text-white text-[12px] px-4 py-2 flex gap-2 items-center bg-red-400/60 rounded transition-all duration-1000">
            <BiError />
            {errors.url.message}
          </p>
        )}
      </form>

      <p
        className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 font-light text-[12px] transition-all duration-1000 ${
          theme === "light" ? "text-gray-500" : "text-[#C9CED6]"
        }`}
      >
        Generated QR codes store in history. Go to Your QR Codes to view them
      </p>
    </div>
  );
};

export default GenerateQrCode;
