import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Linkgenerator from "../components/Linkgenerator";
import CustomeToast from "../components/CustomeToast";
import ShortnerTable from "../components/ShortnerTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {theme}  = useSelector((state) => state.theme)
  const {user} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [isWantToGenerate, setIsWantToGenerate] = useState(false)
  const [shortened, setShortened] = useState(null)
  const [isQrzgenerated, setIsQrGenerated] = useState(false)
  
  useEffect(() => {
    setShortened( JSON.parse(localStorage.getItem('myShortened')) ) 
  }, [isQrzgenerated])
  
  useEffect(() => {
    if(user){
      navigate("/dashboard")
    }
  },[user])
  
  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center mt-20">
        <h1
          className="glow-text text-[40px] md:text-5xl text-center font-light"
          data-text="Shorten Your Loooong Links :)"
        >
          {"Shorten Your Loooong Links :)  "}
        </h1>
        <div className={`${theme === 'light' ? 'text-gray-800' : 'text-[#C9CED6] ' } font-light mt-3 text-center transition-all duration-1000`}>
          <p className="text-[12px] md:text-sm">
            Clipzi is an efficient and easy-to-use URL shortening service that
            streamlines your
          </p>
          <p className="text-[12px] md:text-sm"> online experience.</p>
        </div>
        <div className="my-10 mt-20 space-y-5 sm:space-y-0 text-center sm:space-x-4">
          <button
           onClick={()=> setIsWantToGenerate(true)}
           className={`w-52  py-3 ${theme === 'light' ? 'text-gray-800 bg-gray-200': 'bg-[#181E29] text-white'}  cursor-pointer  rounded-full text-sm  border-[1px] border-[#353C4A] transition-all duration-1000`}>
            Generate instant link
          </button>
          <button
          onClick={() => CustomeToast('Register Now or Login to access all features', true)}
           className={`w-52  py-3 ${theme === 'light' ? 'text-gray-800 bg-gray-200': 'bg-[#181E29] text-white'}  cursor-pointer  rounded-full text-sm  border-[1px] border-[#353C4A] transition-all duration-1000`}>

          Generate scheduled link{" "}
          </button>
          <button
          onClick={() => CustomeToast('Register Now or Login to access all features', true)}
           className={`w-52 py-3 ${theme === 'light' ? 'text-gray-800 bg-gray-200': 'bg-[#181E29] text-white'}  cursor-pointer  rounded-full text-sm  border-[1px] border-[#353C4A] transition-all duration-1000`}>
            Generate Protected link{" "}
          </button>
          <button
          onClick={() => CustomeToast('Register Now or Login to access all features', true)}
           className={`w-52  py-3 ${theme === 'light' ? 'text-gray-800 bg-gray-200': 'bg-[#181E29] text-white'}  cursor-pointer  rounded-full text-sm  border-[1px] border-[#353C4A] transition-all duration-1000`}>
            Generate QR{" "}
          </button>
        </div>

        {isWantToGenerate && <Linkgenerator setShortened = {setShortened}/>}
        
        <ShortnerTable data = {shortened} setIsQrGenerated = {setIsQrGenerated}/>
        
      </div>

    </div>
  );
};

export default Home;
