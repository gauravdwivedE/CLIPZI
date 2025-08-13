import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/theme/themeSlice'

const VerticalThemeSwitcher = () => {

  const dispath = useDispatch()
  const {theme}  = useSelector((state) => state.theme)

  const toggleTheme = (newTheme) => {
    dispath(setTheme(newTheme))
  };

  return (
    <div className={` absolute top-130 sm:top-95 -right-22 sm:-right-17 flex items-center gap-2 ${theme === 'light' ? 'bg-gray-200': 'bg-[#181E29]' }  border-[1px] border-[#353C4A] rotate-90 justify-between   rounded-full shadow-lg borderc p-1 h-11 w-58 `}>
      <button
        onClick={() => toggleTheme("light")}
        className={`flex  items-center text-[11px] gap-2 w-[40%] px-3 h-full rounded-full ${
          theme === "light"
            ? "bg-[#fff] text-black font-semibold shadow-md"
            : "text-[#C9CED6]"
        } transition-all duration-300`}
      >
        <FiSun size={16} />
        <span className="">Light</span>
      </button>

      <button
        onClick={() => toggleTheme("dark")}
        className={`flex  items-center text-[11px] gap-2 px-3  w-[60%] h-full rounded-full ${
          theme === "dark"
            ? "bg-[#144EE3] text-white font-semibold shadow-md"
            : "text-[#3d434dc9]"
        } transition-all duration-300 `}
      >
        <FiMoon size={16} />
        <span >Dark Theme</span>
      </button>
    </div>
  );
};

export default VerticalThemeSwitcher;
