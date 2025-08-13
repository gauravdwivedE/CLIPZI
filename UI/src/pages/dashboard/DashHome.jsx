import React, { useEffect, useState } from "react";
import { FaLink, FaClock,  FaLock, FaCalendarAlt, FaFireAlt, FaQrcode, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import SkelLoader from '../../components/SkelLoader';

const DashHome = () => {
  const { theme } = useSelector((state) => state.theme);
  const [urlSummay, setUrlSummary] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLinkSummary = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/urls/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setUrlSummary(response.data.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getLinkSummary();
  }, []);

  const stats = [
    {
      title: "Total Links",
      count: urlSummay.totalCount,
      icon: <FaLink className="text-2xl text-blue-500" />,
      color: "bg-[#181E29]",
    },
    {
      title: "Expirable Links",
      count: urlSummay.expireAfterTimeCount,
      icon: <FaClock className="text-2xl text-yellow-400" />,
      color: "bg-[#1F2937]",
    },
    {
      title: "Protected Links",
      count: urlSummay.passwordCount,
      icon: <FaLock className="text-2xl text-red-400" />,
      color: "bg-[#181E29]",
    },
    {
      title: "Scheduled Links",
      count: urlSummay.startAfterTimeCount,
      icon: <FaCalendarAlt className="text-2xl text-green-400" />,
      color: "bg-[#1F2937]",
    },
    {
      title: "One-time Links",
      count: urlSummay.oneTimeTrueCount,
      icon: <FaFireAlt className="text-2xl text-pink-500" />,
      color: "bg-[#181E29]",
    },
    {
      title: "QR Codes Generated",
      count: 214,
      icon: <FaQrcode className="text-2xl text-purple-400" />,
      color: "bg-[#1F2937]",
    },
  ];

  const statusStats = [
    {
      title: "Active Links",
      count: urlSummay.activeTrueCount,
      icon: <FaCheckCircle className="text-2xl text-green-400" />,
      color: "bg-[#142C1F]",
    },
    {
      title: "Inactive Links",
      count: urlSummay.activeFalseCount,
      icon: <FaTimesCircle className="text-2xl text-red-400" />,
      color: "bg-[#2C1A1A]",
    },
  ];

  return (
    <div className="text-white">
      <div className="p-6 md:p-10">
        <h1
          className={`text-3xl font-semibold mb-8 ${
            theme === "light" ? "text-black" : "text-white"
          } transition-all duration-1000`}
        >
          Dashboard Overview
        </h1>

        {/* Active/Inactive Links Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {statusStats.map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 shadow-md flex items-center justify-between ${stat.color} transition hover:scale-[1.02] duration-300`}
            >
              <div>
                <h2 className="text-xl font-semibold">{loading ? <SkelLoader/> :stat.count}</h2>
                <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
              </div>
              <div className="p-3 rounded-full bg-white/10">{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 shadow-md flex items-center justify-between ${stat.color} transition hover:scale-[1.02] duration-300`}
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {loading ? <SkelLoader /> : stat.count}
                </h2>
                <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
              </div>
              <div className="p-3 rounded-full bg-white/10">{stat.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashHome;
