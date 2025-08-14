
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FeatureSection({ setIsWantToGenerate ,scrollTarget }) {
  const {theme} = useSelector((state) => state.theme)
  const navigate = useNavigate();

    const handleScroll = () => {
    scrollTarget.current?.scrollIntoView({ behavior: "smooth" });
  };
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M13.5 4.5l6 6-6 6M10.5 19.5l-6-6 6-6" />
        </svg>
      ),
      title: "URL Shortening",
      desc: "Paste any long link and instantly generate a compact alias (e.g. https://sho.rt/abc123).",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      ),
      title: "Fast Redirection",
      desc: "Short links resolve to the original URL with minimal latency.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 6v6l4 2" />
        </svg>
      ),
      title: "Link Expiration",
      desc: "Set expiry by date/time before a link auto-expires.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 15v3m0 0h3m-3 0H9m12-6A9 9 0 113 12a9 9 0 0118 0z" />
        </svg>
      ),
      title: "Password Protection",
      desc: "Gate access to a short URL with a required password.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 3v18h18" />
        </svg>
      ),
      title: "Click Tracking",
      desc: "Count total clicks  across devices.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      ),
      title: "Dashboards",
      desc: "A clean UI to manage links, generate QR, and export data.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4 4h16v16H4z" />
        </svg>
      ),
      title: "QR Codes",
      desc: "Generate downloadable QR codes for any short link as well",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7v10M16 7v10" />
        </svg>
      ),
      title: "Link Scheduling",
      desc: "Control availability with startAfter time and expireAfter time windows.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="h-12 w-12">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 4v16m8-8H4" />
        </svg>
      ),
      title: "One-time Links",
      desc: "Create links that expire immediately after a single click.",
    },
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Animated background blob */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-3xl rounded-full -z-10"
      />

      <div className="max-w-6xl mx-auto px-6 space-y-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block mb-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
            Premium URL Platform
          </span>
          <h2 className={`text-4xl font-extrabold tracking-tight  ${theme === 'light' ? 'text-gray-900': 'text-white'} sm:text-5x `}>
            Shorten, Secure & Analyze — Beautifully
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-lg ${theme === 'light' ? 'text-gray-600': 'text-[#C9CED6]'}`}>
            Designed with performance, security, and insight in mind — presented with elegance.
          </p>
        </motion.div>

        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center gap-12 md:gap-20 md:flex-row ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Icon container */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-lg"
            >
              {f.icon}
            </motion.div>

            {/* Text content */}
            <div className="max-w-xl">
              <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-3`}>
                {f.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pt-8 md:space-x-5 md:space-y-0 space-y-4"
        >
          <button 
          onClick={()=>{handleScroll(), setIsWantToGenerate(true)} }
          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg text-white font-semibold shadow-md transition hover:opacity-90">
            Start Shortening Now
          </button>
           <button 
          onClick={()=>{ navigate('/docs/how-to-use')} }
          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg text-white font-semibold shadow-md transition hover:opacity-90">
           How to use ?
          </button>
        </motion.div>
      </div>
    </section>
  );
}
