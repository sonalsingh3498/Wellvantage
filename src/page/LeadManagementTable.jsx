import React, { useState, useEffect, useMemo } from "react";
import dashboard from "../assets/dashboard.png";
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
import logo from "../assets/logo2.png";
import Arrow from "../assets/Arrow right-circle.png";
import whatsapp from "../assets/logos_whatsapp-icon.png";
import box from "../assets/Box (1).png";
import add from "../assets/gridicons_add.png";

import { useAuth } from "../context/AuthContext";


// Dummy data
const leads = Array.from({ length: 10 }).map((_, i) => ({
  name: "Jeo Yadav",
  interest: ["Hot", "Cold", "Warm"][i % 3],
  assigned: "Ratna Pathak",
  lastInteraction: "26 July 2025",
  followUp: "Need Follow Up",
}));
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
const interestStyles = {
  Hot: "bg-red-100 text-red-600",
  Cold: "bg-blue-100 text-blue-600",
  Warm: "bg-yellow-100 text-yellow-700",
};

export const Sidebar = () => {
  const { user, loading } = useAuth();

  return (
    <aside className="bg-gray-200 min-h-screen w-64 flex flex-col p-4">
      <div className="flex items-center mb-10">
        <img
          src={logo}
          alt="WellVantage Logo"
          className="w-20 h-20 md:w-32 md:h-32 mb-4 mx-auto object-contain"
        />
      </div>
      <nav className="space-y-1 pb-15">
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
    <div className="mt-auto flex items-center bg-[#28A7454F] border border-[#28A74545] rounded-2xl p-3">
  {/* Mobile view: ONLY display name */}
  <span className="text-gray-800 text-sm block md:hidden">{user.displayName}</span>

  {/* Desktop/tablet view: Show avatar + name */}
  <img
    src={user.photoURL || "default-avatar.png"}
    alt={user.displayName || "User"}
    className="hidden md:block w-8 h-8 md:w-9 md:h-9 rounded-full mr-2 object-cover"
  />
  <span className="ml-2 text-gray-800 text-sm hidden md:block">{user.displayName}</span>
</div>


      <a
        href="#"
        onClick={e => { e.preventDefault(); }}
        className="flex items-center justify-center text-gray-600 text-[15px] font-medium  transition py-1 rounded cursor-pointer"
      >
        <img src={logout} alt="Logout" className="p-2 h-8" />
        <span>Logout</span>
      </a>
      {/* <button className="text-red-600 mt-4 px-3 py-2 rounded hover:bg-gray-200">Logout</button> */}
    </aside>
  )
}

const LeadTable = ({ data }) => (
  <table className="w-full text-left border-collapse border rounded-sm border-gray-100 mt-4">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-3 font-medium ">Name</th>
        <th className="p-3 font-medium">Interest Level</th>
        <th className="p-3 font-medium">Assigned to</th>
        <th className="p-3 font-medium">Last Interaction</th>
        <th className="p-3 font-medium">Follow Up</th>
        <th className="p-3 font-medium">Action</th>
      </tr>
    </thead>
    <tbody>
      {data.map((lead, i) => (
        <tr key={i} className="border-b hover:bg-gray-50">
          <td className="p-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <a href="#" className="text-blue-600 font-medium hover:underline">{lead.name}</a>
          </td>
          <td className="p-3">
            <span className={`px-2 py-1 rounded ${interestStyles[lead.interest]} font-semibold text-xs`}>
              {lead.interest}
            </span>
          </td>
          <td className="p-3">{lead.assigned}</td>
          <td className="p-3">{lead.lastInteraction}</td>
          <td className="p-3">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold text-xs">{lead.followUp}</span>
          </td>
          <td className="p-3 flex gap-3 text-xl">
            <img src={whatsapp} className="h-6 w-6"/>
            <img src={Arrow} className="h-6 w-6"/>
            <img src={box} className="h-6 w-6"/>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const FiltersBar = ({ filters, setFilters, uniqueAssignedTo, uniqueInterest }) => (
  <div className="flex flex-wrap items-center gap-2 mt-4">
    <input
      className="border px-4 py-2 rounded w-64"
      type="search"
      placeholder="Search"
      value={filters.search}
      onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
    />
    <select className="border px-3 py-2 rounded text-gray-700"
      value={filters.interest}
      onChange={e => setFilters(f => ({ ...f, interest: e.target.value }))}>
      <option value="">Interest Level</option>
      {uniqueInterest.map(level => (
        <option key={level} value={level}>{level}</option>
      ))}
    </select>
    <select className="border px-3 py-2 rounded text-gray-700"
      value={filters.assigned}
      onChange={e => setFilters(f => ({ ...f, assigned: e.target.value }))}>
      <option value="">Assigned to</option>
      {uniqueAssignedTo.map(person => (
        <option key={person} value={person}>{person}</option>
      ))}
    </select>
    {/* Sorting buttons (add sorting logic as needed) */}
    <button className="border px-3 py-2 rounded text-gray-700 flex items-center gap-1">
      Created At <span>&uarr;</span>
    </button>
    <button className="border px-3 py-2 rounded text-gray-700 flex items-center gap-1">
      Name Alphabetical <span>&uarr;</span>
    </button>
    <span className="ml-auto text-gray-700">Last interaction : 1 June 2025</span>
  </div>
);

const TabBar = ({ activeTab, setActiveTab }) => (
  <div className="border-b mb-2">
    <nav className="flex space-x-8">
      <button
        className={`px-2 py-2 font-semibold ${activeTab === "active" ? "border-b-2 border-green-500 text-green-500" : "text-gray-500"}`}
        onClick={() => setActiveTab("active")}
      >Active</button>
      <button
        className={`px-2 py-2 font-semibold ${activeTab === "archived" ? "border-b-2 border-green-500 text-green-500" : "text-gray-500"}`}
        onClick={() => setActiveTab("archived")}
      >Archived</button>
    </nav>
  </div>
);

const LeadListPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [leadsData, setLeadsData] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    interest: "",
    assigned: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://mp74b284836ea819d668.free.beeceptor.com/data")
      .then((response) => response.json())
      .then((data) => setLeadsData(data))
      .catch(() => {
        setLeadsData(Array.from({ length: 50 }).map((_, i) => ({
          name: "Jeo Yadav",
          interest: ["Hot", "Cold", "Warm"][i % 3],
          assigned: "Ratna Pathak",
          lastInteraction: "26 July 2025",
          followUp: "Need Follow Up"
        })));
      });
  }, []);

  const uniqueInterest = useMemo(() => [...new Set(leadsData.map(l => l.interest))], [leadsData]);
  const uniqueAssignedTo = useMemo(() => [...new Set(leadsData.map(l => l.assigned))], [leadsData]);

  // Filtered leads before pagination
  const filteredLeads = useMemo(() => {
    return leadsData.filter(lead =>
      (filters.search === "" || lead.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.interest === "" || lead.interest === filters.interest) &&
      (filters.assigned === "" || lead.assigned === filters.assigned)
    );
  }, [leadsData, filters]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  // Get current page items
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination handler
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  // Helper to generate pagination page numbers with ellipsis
  const getPageNumbers = (currentPage, totalPages) => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex bg-white-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 ">
        <div className="flex items-center justify-between mb-3 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold" >Lead Management</h1>
          <button className=" r">
            <img src={add} alt="Add" className="w-10 h-10"/> 
          </button>
        </div>
        <div className="px-8">
           <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <FiltersBar
          filters={filters}
          setFilters={setFilters}
          uniqueInterest={uniqueInterest}
          uniqueAssignedTo={uniqueAssignedTo}
        />
        <LeadTable data={currentLeads} />
          </div>
       
        <div className="flex items-center justify-end mt-4 text-gray-700 text-sm gap-6">
  <div className="flex items-center gap-1">
     <span>
    Showing {(currentPage - 1) * itemsPerPage + 1}
    {" "}to{" "}
    {Math.min(currentPage * itemsPerPage, filteredLeads.length)}
    {" "}of {filteredLeads.length} entries{" "}
  </span>
    <button
      className="bg-gray-200 px-2 rounded"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      {"<"}
    </button>
    {getPageNumbers(currentPage, totalPages).map((num, idx) =>
      num === "..." ? (
        <span key={idx} className="px-2">...</span>
      ) : (
        <button
          key={num}
          className={`px-3 rounded ${currentPage === num ? "bg-green-500 text-white" : "bg-green-100"}`}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </button>
      )
    )}
    <button
      className="bg-gray-200 px-2 rounded"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      {">"}
    </button>
  </div>
 
</div>

      </main>
    </div>
  );
};


export default LeadListPage;
