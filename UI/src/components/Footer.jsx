import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const { theme } = useSelector((state) => state.theme);
  const linkVariants = {
    hover: { x: 4, color: "#4f46e5" },
  };

  return (
    <footer
      className={`relative rounded-md ${theme === "light" ? "text-black" : "text-gray-300"
        }  pt-20 pb-10 mt-20 overflow-hidden w-full`}
    >
      {/* Top glow accent */}
      <motion.div
        initial={{ opacity: 0.2, scale: 0.9 }}
        animate={{ opacity: 0.4, scale: 1.1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-3">
        {/* Column 1 - About */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-gray-400 leading-relaxed">
            This project was developed with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/gaurav-dwivedi-2b26b326b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold hover:underline"
            >
              Gaurav Dwivedi
            </a>
            . Built to deliver speed, security, and elegance for URL shortening.
          </p>
        </motion.div>

        {/* Column 2 - Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", to: "/" },
              { name: "Login", to: "/login" },
              { name: "Register", to: "/register" },
              { name: "How-to-use", to: "/docs/how-to-use" },
            ].map((link) => (
              <motion.li
                key={link.name}
                variants={linkVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                <Link to={link.to}>{link.name}</Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3 - Connect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/gauravdwivedE/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500 transition"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/gaurav-dwivedi-2b26b326b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500 transition"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:gauravdwivedi479@gmail.com"
                className="hover:text-gray-500 transition"
              >
                Email
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500"
      >
        <p>
          © {new Date().getFullYear()} All rights reserved. Designed for a
          modern web experience.
        </p>
      </motion.div>
    </footer>
  );
}
