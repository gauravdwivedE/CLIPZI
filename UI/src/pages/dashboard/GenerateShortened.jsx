import React, { useState } from 'react';
import Nav from '../../components/Nav';
import { HiLink } from 'react-icons/hi2';
import Loader from '../../components/Loader';
import { useForm } from 'react-hook-form';
import { BiError } from 'react-icons/bi';
import axios from '../../api/axios';
import CustomeToast from '../../components/CustomeToast';
import { useSelector } from 'react-redux';

const GenerateShortened = () => {
  const { theme } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const startAfterTime = watch('startAfterTime');
  const now = new Date();

  const formatDateTime = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const nowISOString = formatDateTime(now);

  let expireMin = nowISOString;
  if (startAfterTime) {
    const startDate = new Date(startAfterTime);
    startDate.setMinutes(startDate.getMinutes() + 1);
    expireMin = formatDateTime(startDate);
  }

  async function onSubmit(data) {
    try {
      const response = await axios.post("/urls/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status === 201) {
        CustomeToast(response.data.message);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
  onSubmit={handleSubmit(onSubmit)}
  className="w-full md:px-15 flex flex-col items-center mt-12 space-y-6"
>
  {/* URL Input */}
  
      
  <div
  className={`w-[21rem] max-w-[30rem] md:w-[30rem] p-1 h-[59px] md:h-[69px] ${
    theme === 'light' ? 'bg-gray-200 border-gray-400' : 'bg-[#181E29] border-[#536487]'
  } border-[2.5px] gap-4  outline-none flex items-center justify-between rounded-full transition-all duration-1000`}
>
  <div className="flex gap-5 p-[10px] pl-5 items-center h-full flex-1">
    <span
      className={`${
        theme === 'light' ? 'text-gray-500' : 'text-[#C9CED6]'
      } transition-all duration-1000`}
    >
      <HiLink className="text-xl" />
    </span>
    <input
      {...register('originalUrl', {
        required: 'Please enter a Link',
        pattern: {
          value: /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/, // basic URL pattern
          message: 'Link is not valid',
        },
      })}
      type="text"
      placeholder="Enter the Link here"
      className={`font-light ${
        theme === 'light'
          ? 'placeholder:text-gray-500 text-black'
          : 'placeholder-[#C9CED6] text-white'
      } h-full py-2 outline-none w-full transition-all duration-1000 text-[12px] md:text-sm`}
    />
  </div>
  {!loading ? (
    <button className="px-6 md:px-8 h-full bg-[#144EE3] cursor-pointer text-white rounded-full text-[12px] md:text-sm shadow-[12px_5px_24px_#144EE380]">
      Shorten Now
    </button>
  ) : (
    <button
      type="button"
      className="px-2 md:px-8 h-full bg-[#144EE3] cursor-not-allowed text-white rounded-full text-sm shadow-[12px_5px_24px_#144EE380]"
      disabled
    >
      <Loader />
    </button>
  )}
</div>


  {(errors?.originalUrl || errors?.password) && (
    <p className="text-white text-[12px] px-4 py-2 flex gap-2 items-center bg-red-400/60 rounded">
      <BiError /> {errors.originalUrl?.message || errors.password?.message}
    </p>
  )}

  {/* One-Time Toggle */}
  <div className="w-fit flex gap-3 items-center mt-2">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        {...register('oneTime')}
        type="checkbox"
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:bg-[#144EE3] transition-all duration-300"></div>
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-full"></div>
    </label>
    <span
      className={`transition-all duration-1000 text-[13px] font-light ${
        theme === 'light' ? 'text-gray-700' : 'text-[#C9CED6]'
      }`}
    >
      One-time only
    </span>
  </div>

  {/* Date-Time & Password */}
  <div className="w-[90%] md:w-[80%] flex flex-col md:flex-row gap-6 md:gap-10 justify-between">
    {/* Start Time */}
    <div
      className={`transition-all duration-1000 w-full md:w-1/3 text-sm ${
        theme === 'light' ? 'text-gray-700' : 'text-[#C9CED6]'
      }`}
    >
      <label className="block mb-1">Start After</label>
      <input
        type="datetime-local"
        {...register('startAfterTime')}
        min={nowISOString}
        onKeyDown={(e) => e.preventDefault()}
        className={`transition-all duration-1000 w-[16rem] sm:w-full px-3 py-2 rounded-lg border text-sm ${
          theme === 'light'
            ? 'bg-gray-200 border-gray-400 text-gray-800'
            : 'bg-[#181E29] border-[#353C4A] text-white'
        }`}
      />
      <p className="text-[11px] text-gray-500 mt-1">Default: Immediate</p>
    </div>

    {/* Expire Time */}
    <div
      className={`transition-all duration-1000 w-full md:w-1/3 text-sm ${
        theme === 'light' ? 'text-gray-700' : 'text-[#C9CED6]'
      }`}
    >
      <label className="block mb-1">Expire After</label>
      <input
        type="datetime-local"
        {...register('expireAfterTime')}
        min={expireMin}
        onKeyDown={(e) => e.preventDefault()}
        className={`transition-all duration-1000 w-[16rem] sm:w-full px-3 py-2 rounded-lg border text-sm ${
          theme === 'light'
            ? 'bg-gray-200 border-gray-400 text-gray-800'
            : 'bg-[#181E29] border-[#353C4A] text-white'
        }`}
      />
      <p className="text-[11px] text-gray-500 mt-1">Default: Never</p>
    </div>

    {/* Password */}
    <div
      className={`transition-all duration-1000 w-full md:w-1/3 text-sm ${
        theme === 'light' ? 'text-gray-700' : 'text-[#C9CED6]'
      }`}
    >
      <label className="block mb-1">Password (optional)</label>
      <input
        type="password"
        {...register('password', {
          required: false,
          minLength: { value: 3, message: 'Password must be 4 characters long' },
        })}
        placeholder="••••••"
        className={`transition-all duration-1000 w-[16rem] sm:w-full px-3 py-2 rounded-lg border text-sm ${
          theme === 'light'
            ? 'bg-gray-200 border-gray-400 text-gray-800'
            : 'bg-[#181E29] border-[#353C4A] text-white'
        }`}
      />
    </div>
  </div>
</form>

    </>
  );
};

export default GenerateShortened;
