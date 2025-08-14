import React, { useState } from "react";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import DashboardRouting from "../../routes/DashboardRouting";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { theme } = useSelector((state) => state.theme);
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div
      className={`h-[94vh] ${
        theme === "light" ? "text-gray-800" : "text-white "
      } flex flex-col`}
    >
      <Nav setSidebarOpen = {setSidebarOpen}/>

      <div className="flex flex-1 overflow-hidden relative mt-5 h-full">
        <Sidebar  sidebarOpen = {sidebarOpen}/>

        {/* Main Content */}
        <div className="flex-1  p-0 md:p-6 overflow-y-auto">
          {/* <GenerateShortened/> */}
          {/* <GenerateQr/> */}
          {/* <DashHome/> */}
          <DashboardRouting />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
