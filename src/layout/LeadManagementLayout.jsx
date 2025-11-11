import React, { useEffect, useState } from "react";
import logo from "../assets/logo2.png";
import { FaWhatsapp, FaPhoneAlt, FaCube } from "react-icons/fa";
import dashboard from "../assets/Dashboard.png";
import employeemanagement from "../assets/employee-management.png";
import leadmanagement from "../assets/lead-management.png";
import membermanagement from "../assets/membermanagement.png";
import revenueManagement from "../assets/revenue-management.png";
import tick from "../assets/tick.png";
import Vector from "../assets/Vector.png";
import usertie from "../assets/usertie.png";
import bulb from "../assets/bulb.png";
import attendance from "../assets/attendance.png";
import logout from "../assets/logout.png";
import { useAuth } from "../context/AuthContext";

// Sidebar menu config
const sidebarLinks = [
  { name: "Dashboard", icon: dashboard },
  { name: "Lead Management", icon: leadmanagement, active: true },
  { name: "WellVantage Leads", icon: tick },
  { name: "Member Management", icon: membermanagement },
  { name: "Membership Management", icon: usertie },
  { name: "Attendance Tracking", icon: attendance },
  { name: "Employee Management", icon: employeemanagement },
  { name: "Revenue Management", icon: revenueManagement },
  { name: "Expense Management & Profit", icon: bulb },
  { name: "Workout Management", icon: Vector }
];

const interestColor = {
  Hot: "bg-[#FFE5E5] text-[#EB5757]",
  Warm: "bg-[#FFF6E0] text-[#EBA700]",
  Cold: "bg-[#E5F1FF] text-[#3C81F6]"
};

export default function LeadManagementTable() {
  const [activeTab, setActiveTab] = useState("Active");
  const [leadsData, setLeadsData] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    fetch("https://mp74b284836ea819d668.free.beeceptor.com/data")
      .then((response) => response.json())
      .then((data) => setLeadsData(data))
      .catch((error) => console.error("Error fetching leads data:", error));
  }, []);

  return (
    <div className="flex h-screen font-poppins">
      {/* SIDEBAR */}
    <aside className="
  bg-[#EAFBF1] 
  flex flex-col justify-between
  pt-6 pb-6 px-2
  w-full
  sm:w-60 md:w-72
  min-h-screen
  transition-all
">
  <div>
    <img 
      src={logo}
      alt="WellVantage Logo"
      className="w-20 h-20 md:w-32 md:h-32 mb-4 mx-auto object-contain"
    />
    <nav className="space-y-1">
      {sidebarLinks.map((link, idx) => (
        <a
          key={idx}
          href="#"
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition
            ${link.active ? "bg-green-500 text-white font-semibold" : "text-gray-800 hover:bg-green-100"}
          `}
        >
          <img src={link.icon} alt={link.name} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
          <span className="hidden sm:inline">{link.name}</span>
        </a>
      ))}
    </nav>
     <div className="flex flex-col items-center px-2 py-2 w-full">
  {/* User Profile Row */}
  <div className="flex items-center w-full mb-2">
    <img
      src={user.photoURL || "default-avatar.png"}
      alt={user.displayName || "User"}
      className="w-8 h-8 md:w-9 md:h-9 rounded-full mr-2 object-cover"
    />
    <span className="font-semibold text-gray-800 truncate">{user.displayName || user.email}</span>
  </div>
  {/* Logout Button aligned center inside same green box */}
  <a
    href="#"
    onClick={e => { e.preventDefault(); }}
    className="flex items-center justify-center text-gray-600 text-[15px] font-medium hover:text-red-500 transition py-1 rounded cursor-pointer"
  >
    <img src={logout} alt="Logout" className="p-2 h-8" />
    <span>Logout</span>
  </a>
</div>
  </div>


</aside>


      {/* MAIN PANEL */}
      <main className="flex-1 bg-[#F8F8F8] px-8 pt-10 pb-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-bold text-2xl text-gray-900">Lead Management</h1>
          <button className="bg-green-200 rounded-full p-2 text-xl text-green-700 font-bold shadow-md">
            +
          </button>
        </div>
        {/* Tabs */}
        <div className="flex space-x-8 border-b-2 border-gray-200 mb-7">
          {["Active", "Archived"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 font-semibold text-lg ${
                activeTab === tab
                  ? "text-green-600 border-b-4 border-green-500"
                  : "text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <input
            className="border rounded-lg px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-green-300"
            placeholder="Search"
          />
          <div className="flex flex-wrap gap-2 ml-2">
            <select className="border rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-300">
              <option>Interest Level</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-300">
              <option>Assigned to</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-300">
              <option>Created At</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-300">
              <option>Name Alphabetical</option>
            </select>
          </div>
          <span className="ml-auto text-sm font-medium text-gray-700">
            Last interaction : 1 June 2025
          </span>
          <button className="text-2xl px-2 text-gray-400 font-bold">×</button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg border-[1.5px] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F2F2F2]">
              <tr className="font-extrabold text-gray-700 text-base">
                <th className="p-4">Name</th>
                <th className="p-4">Interest Level</th>
                <th className="p-4">Assigned to</th>
                <th className="p-4">Last Interaction</th>
                <th className="p-4">Follow Up</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {leadsData && leadsData.map((lead, idx) => (
                <tr key={idx} className="border-t text-gray-800 text-sm hover:bg-[#F9F9F9]">
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="rounded-full bg-gray-200 p-2 mr-2">
                        <svg width="20" height="20" fill="currentColor" className="text-gray-400"><circle cx="10" cy="10" r="9" /></svg>
                      </span>
                      <a href="#" className="text-blue-500 underline">{lead.name}</a>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-xl font-bold text-xs border-slate-100 border ${interestColor[lead.interest]}`}>
                      {lead.interest}
                    </span>
                  </td>
                  <td className="p-4">{lead.assigned}</td>
                  <td className="p-4">{lead.lastInteraction}</td>
                  <td className="p-4">
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#FFF9E3] border border-[#FFE399] text-[#EBA700] text-sm font-bold">
                      Need Follow Up
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2 text-green-600 text-lg items-center">
                      <FaWhatsapp />
                      <FaPhoneAlt />
                      <FaCube />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 mb-2 px-2 text-gray-500 text-sm">
          <span>
            Showing 1 to 10 of 68 entries
          </span>
          <div className="flex space-x-2 items-center">
            {[1, 2, "...", 10].map((p, i) => (
              typeof p === "number" ?
                <button
                  key={i}
                  className={`px-3 py-1 rounded-full ${
                    p === 2 ? "bg-green-500 text-white font-bold" : "hover:bg-gray-200"
                  }`}
                >
                  {p}
                </button>
                : <span key={i} className="text-gray-400">{p}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
