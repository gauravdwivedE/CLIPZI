import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RedirectToOriginalURL = () => {

  const {theme} = useSelector((state) => state.theme)
  const [dots, setDots] = useState("");
  const [password, setPassword] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();

  const getUrlDetails = async (providedPassword = "") => {
    try {
        setIsProtected(false)
      const { shortCode } = params;
      const response = await axios.post(`/urls/${shortCode}`, {
        password: providedPassword, // send password if required
      });

      if (response.status === 200) {
        window.location.href = response.data.originalUrl;
      }
    } catch (error) {
      if (error.response?.status === 404) {
        window.location.href = "/";
      } else if (error.response?.status === 401) {
        setIsProtected(true);
      } else if(error.response?.status === 403){
        setIsProtected(true);
        setError("Invalid password")
      }
      else {
        setError(error.response.data.error);
      }      
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 6 ? "" : prev + "."));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getUrlDetails();
  }, []);

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if(password.length < 3 ){
        return setError("Password must be 3 charater long")
    }
    getUrlDetails(password);
  };

  return (
    <div className={`h-screen flex justify-center items-center flex-col gap-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
      {!isProtected ? (
        !error ? 
        <h1
          className="glow-text text-4xl md:text-5xl font-light w-92 text-center"
          data-text={`Redirecting${dots}`}
        >
          {`Redirecting${dots}`}
        </h1>:
        <h2 className="text-xl md:text-3xl mr-10">{error}</h2>
        
      ) : (
     <form
  onSubmit={handleSubmitPassword}
  className="flex flex-col items-center gap-2 mt-6 w-80"
>
  <div className="mb-6 w-full">
    <label className=" text-sm mb-2 block">Link is protected</label>
    <input
      type="password"
      placeholder="Enter password to continue"
      value={password}
      onChange={(e) => {setPassword(e.target.value); setError("")}}
      className={`w-full px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-gray-300':'bg-[#181E29]'} border border-[#2A2F3A] outline-none`}
    />
    {error && (
      <p className="text-red-500 text-xs mt-1">{error}</p>
    )}
  </div>

  <button
    type="submit"
    className="bg-[#144EE3] text-white px-4 py-2 rounded-md hover:bg-[#0e3bcc] transition-all w-full"
  >
    Submit
  </button>
</form>

      )}
    </div>
  );
};

export default RedirectToOriginalURL;
