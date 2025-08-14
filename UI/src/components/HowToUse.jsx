import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Nav from './Nav';
import { PiArrowBendDownLeftFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function HowToUse() {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate()
  const steps = [
    {
      title: "1. Generate Without Login",
      desc: "You can instantly create a one-time short link (with optional QR code) without registering or logging in. Just paste your long link, check 'One-time' if needed, and click shorten.",
    },
    {
      title: "2. Register or Login",
      desc: "Sign in traditionally or use Google Login. You can also register a new account if you want to track and manage your links later.",
    },
    {
      title: "3. Dashboard Overview",
      desc: "Your dashboard displays active, inactive, expirable, protected, scheduled, and one-time links — along with QR codes generated.",
    
    },
    {
      title: "4. Create a Short Link",
      desc: "From the dashboard sidebar → 'Create Short Link'",
    },
    {
      title: "5. Short Link Behavior",
      desc: "Visiting a short link will redirect to the long link. If password-protected, you'll be prompted to enter it. Expired or inactive links show a warning.",
    },
    {
      title: "6. Generate QR Codes",
      desc: "Go to 'QR Generator', paste a link, and instantly create a downloadable QR code that you can share.",
    },
    {
      title: "7. Manage Links",
      desc: "Use 'Your Short Link' to view, enable/disable, Reset passwords, Track click counts and status, and delete links"

    },
     {
      title: "8. Manage QR Codes",
      desc: "Use 'Your QR Codes' to view, Get All QR, download QR and  delete QR codes.",
    },
  ];

  return (
    
    <section className="relative w-full py-20 overflow-hidden">
     <span className="text-gray-500 text-2xl cursor-pointer"
     onClick={() => navigate(-1)}
     > <PiArrowBendDownLeftFill/></span>
      {/* Animated background blob */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-20 blur-3xl rounded-full -z-10"
      />

      <div className="max-w-6xl mx-auto px-6 space-y-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2
            className={`text-4xl font-extrabold tracking-tight ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            How to Use the Platform
          </h2>
          <p
            className={`mt-4 max-w-2xl mx-auto text-lg ${
              theme === "light" ? "text-gray-600" : "text-[#C9CED6]"
            }`}
          >
            A quick guide to shortening, securing, and managing your links and QR codes.
          </p>
        </motion.div>

        {/* Steps */}
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center gap-12 md:gap-20 md:flex-row ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Step number */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-lg text-2xl font-bold"
            >
              {idx + 1}
            </motion.div>

            {/* Text */}
            <div className="max-w-xl">
              <h3
                className={`text-2xl font-bold ${
                  theme === "light" ? "text-gray-900" : "text-white"
                } mb-3`}
              >
                {step.title}
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    
  );
}
