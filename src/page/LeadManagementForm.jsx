import React, { useState, useEffect, useRef  } from "react";
// Update these import paths and asset files as needed:
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
import { useAuth } from "../context/AuthContext";
import date from "../assets/date.png";
import add from "../assets/gridicons_add.png";

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Dummy data as fallback
const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-binary/Other", value: "other", icon: "https://cdn-icons-png.flaticon.com/512/3870/3870255.png" },
];

const activityLevels = [
  "Sedentary", "Lightly active", "Moderately active", "Very active"
];
const wellnessGoals = [
  "Lose weight", "Gain weight", "Build muscle", "Modify My Diet",
  "Manage Stress", "Improve Step Count", "General wellness"
];
const fitnessFocusOptions = [
  "Gym workouts", "Yoga", "Meditation", "Nutrition", "Recovery"
];
const gymTimes = ["Morning", "Afternoon", "Evening", "Late evening"];
const workoutIntensities = ["Light", "Moderate", "High"];
const medicalConcerns = [
  "Diabetes", "Hypertension", "Asthma", "Other", "None"
];
const yesNoOptions = [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }];

const interestLevels = ["Hot", "Warm", "Cold"];
const followupStatusOptions = [
  { value: "new", label: "New Inquiry", color: "bg-blue-200 border-blue-300" },
  { value: "needs_follow_up", label: "Needs Follow-Up", color: "bg-yellow-200 border-yellow-300" },
  { value: "engaged", label: "Engaged", color: "bg-green-200 border-green-300" },
  { value: "converted", label: "Converted", color: "bg-purple-200 border-purple-300" },
  { value: "archived", label: "Archived", color: "bg-gray-300 border-gray-400" },
];
const adminList = ["Ram Mohan", "Ritu Sharma", "Arjun Patel"];
const pkgList = ["Package 1", "Package 2", "Package 3"];
const ptPkgList = ["PT Package A", "PT Package B", "PT Package C"];
const gymHeardOptions = ["Social Media", "Word of Mouth", "Walk-in", "WellVantage B2C App"];

const initialNotes = [
  {
    date: '30 July 2025',
    note: 'Called the customer again.'
  },
  {
    date: '12 July 2025',
    note: 'Customer walked in, offered 10% discount.'
  },
  {
    date: '12 July 2025',
    note: 'Lead created.'
  }
];


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
  { name: "Workout Management", icon: Vector },
];



// Sidebar Component
export const Sidebar = () => {
  const { user } = useAuth();
  return (
    <aside className="bg-gray-200 min-h-screen w-64 flex flex-col p-4">
      <div className="flex items-center mb-10">
        <img src={logo} alt="WellVantage Logo" className="w-20 h-20 md:w-32 md:h-32 mb-4 mx-auto object-contain" />
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
  <span className="text-gray-800 text-sm block md:hidden">{user.displayName}</span>

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
    </aside>
  );
};

const Tabs = ({ activeTab, setActiveTab }) => (
  <nav className="flex space-x-10 border-b mb-7 mt-4 text-lg font-semibold">
    {["Basic", "Preferences", "Status"].map(tab => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`py-2 px-2 ${activeTab === tab
            ? "text-green-600 border-b-4 border-green-600"
            : "text-gray-700"
          }`}
      >
        {tab}
      </button>
    ))}
  </nav>
);

const BasicDetailsForm = () => {
  const [gender, setGender] = useState("");
  return (
    <form className=" mx-auto">
      <h2 className="text-lg font-semibold mb-6" >Basic Details</h2>
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <label className="block mb-2 text-gray-600">First Name*</label>
          <input className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' }}/>
        </div>
        <div>
          <label className="block mb-2 text-gray-600">Last Name*</label>
          <input className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' }}/>
        </div>
        <div>
          <label className="block mb-2 text-gray-600">Phone</label>
          <div className="flex">
            <select className="border rounded-l px-3 py-2 bg-gray-100 text-gray-600 focus:outline-none" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
              <option>+91</option>
              <option>+1</option>
            </select>
            <input className="border-t border-b border-r rounded-r w-full px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}} />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-gray-600">Email</label>
          <input className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}/>
        </div>
        {/* Gender dropdown with icon */}
        <div>
          <label className="block mb-2 text-gray-600">Gender</label>
          <select
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
            value={gender} onChange={e => setGender(e.target.value)} style={{ borderColor: '#D9D9D9' ,color: '#737373'}}
          >
            <option value="">Select</option>
            {genderOptions.map(opt =>
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            )}
          </select>
          {gender === "other" && (
            <img alt="Non binary/other icon" src={genderOptions[2].icon} className="h-6 w-6 mt-1" />
          )}
        </div>
        <div>
          <label className="block mb-2 text-gray-600">Date of Birth</label>
          <input type="date" className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}/>
        </div>
        <div>
          <label className="block mb-2 text-gray-600">Height</label>
          <div className="flex">
            <input className="w-full border rounded-l px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}/>
            <select className="bg-green-100 border-l rounded-sm px-3 py-2 focus:outline-none ml-0.5" style={{ borderColor: '#D9D9D9' ,color: '#28A745'}} >
              <option>cm</option>
              <option>in</option>
              
            </select>

          </div>
        </div>
        <div>
          <label className="block mb-2 text-gray-600">Weight</label>
          <div className="flex">
            <input className="w-full border rounded-l px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}} />
            <select className="bg-green-100 border-l rounded-sm px-3 py-2 focus:outline-none ml-0.5" style={{ borderColor: '#D9D9D9' ,color: '#28A745'}}>
              <option>kg</option>
              <option>lb</option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="bg-green-700 text-white font-semibold px-20 py-2 rounded mt-3 text-lg hover:bg-green-600">
          Update
        </button>
      </div>
    </form>
  );
};

const PreferencesForm = () => (
  <form className=" mx-auto">
    <h2 className="text-lg font-semibold mb-6">Preference</h2>
    <div className="grid grid-cols-2 gap-8 mb-6">
      <div>
        <label className="block mb-2 text-gray-600">Activity Level</label>
        <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
          {activityLevels.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600">Wellness Goals</label>
        <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
          {wellnessGoals.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600">Primary Fitness Focus</label>
        <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
          {fitnessFocusOptions.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600">Preferred Gym Time</label>
        <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
          {gymTimes.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600">Preferred Workout Intensity</label>
        <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
          {workoutIntensities.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600">Medical Concerns</label>
        <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
          {medicalConcerns.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-600">Previous Gym Experience</label>
        <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
          {yesNoOptions.map(item => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="text-center">
      <button type="submit" className="bg-green-700 text-white font-semibold px-20 py-2 rounded mt-3 text-lg hover:bg-green-600">
        Update
      </button>
    </div>
  </form>
);


// --- Status Form (example placeholder)
const StatusForm = () => {
  const [customNotes, setCustomNotes] = useState([
    { date: "30 July 2025", note: "Called the customer again." },
    { date: "12 July 2025", note: "Customer walked in, offered 10% discount." },
    { date: "12 July 2025", note: "Lead created." },
  ]);
  const [startDate, setStartDate] = useState(new Date('2025-07-22'));

  const datePickerRef = useRef(null);
   const openDatePicker = () => {
    datePickerRef.current.setOpen(true);
  };

  const [notes, setNotes] = useState(initialNotes);

  const addNote = () => {
    setNotes([
      ...notes,
      { date: '', note: '' }
    ]);
  };

  return (
    <form className=" mx-auto">
      <h2 className="text-lg font-semibold mb-6">Status</h2>
      <div className="grid grid-cols-2 gap-8 mb-6">
       <div className="mb-4 relative w-full">
      <label className="block mb-2 text-gray-600">Inquiry Date</label>
      <div className="flex items-center w-full border rounded px-4 py-2 focus-within:ring focus-within:outline-none"style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
        <ReactDatePicker
          ref={datePickerRef}
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full border-none outline-none"
          
        />
        <button type="button" onClick={openDatePicker} className="ml-2">
          <img src={date} alt="Calendar icon" className="absolute right-3 top-1/1.5 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
        </button>
      </div>
    </div>
        <div>
          <label className="block mb-2 text-gray-600" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>Assigned To Admin/Receptionist</label>
          <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
            {adminList.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-gray-600" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>Interest Level</label>
          <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
            {interestLevels.map(item => (<option key={item} value={item}>{item}</option>))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-gray-600" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>Follow Up Status</label>
          <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
            {followupStatusOptions.map(item => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-gray-600" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>Preferred Package</label>
          <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
            <option value="">Package</option>
            {pkgList.map(item => (<option key={item} value={item}>{item}</option>))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-gray-600" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>Preferred PT Package (if any)</label>
          <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
            <option value="">Package</option>
            {ptPkgList.map(item => (<option key={item} value={item}>{item}</option>))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-gray-600">How They Heard About The Gym</label>
          <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
            {gymHeardOptions.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Custom notes */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-700 flex-col pr-40" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>Custom notes</span>
          <button type="button" onClick={addNote}
            className="  rounded-full px-2 text-lg inline-flex items-center">
            <img src={add} alt="Add" className="w-7 h-7"/>
          </button>
        </div>
       {customNotes.map((n, i) => (
  <div className="flex gap-3 items-center mb-2 pr-4" key={i}>
    
   <div className="w-40 border rounded px-3 py-2" style={{ borderColor: '#D9D9D9' ,color: '#737373'}}>
    <ReactDatePicker
      ref={datePickerRef}
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormat="yyyy-MM-dd"
      className="w-full outline-none bg-transparent"
      placeholderText="Select date"
    />
  </div>

    <img src={date} alt="Calendar icon" className="pr-4 pl-4"/>
    <input
      className="border px-3 py-2 rounded w-80"
      style={{ borderColor: '#D9D9D9', color: '#737373' }}
      value={n.note}
      onChange={(e) => {
        const updatedNotes = [...customNotes];
        updatedNotes[i].note = e.target.value;
        setCustomNotes(updatedNotes);
      }}
    />
  </div>
))}

       
      </div>
      <div className="text-center">
        <button type="submit"
          className="bg-green-700 text-white font-semibold px-20 py-2 rounded mt-3 text-lg hover:bg-green-600">
          Update
        </button>
      </div>
    </form>
  );
};


const LeadManagementPage = () => {
  const [activeTab, setActiveTab] = useState("Basic");
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      {/* Replace Sidebar with your own sidebar as needed */}

      <main className="flex-1 py-10 px-16">
        <h1 className="text-3xl font-bold mb-1">Lead Management</h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Basic" && <BasicDetailsForm />}
        {activeTab === "Preferences" && <PreferencesForm />}
        {activeTab === "Status" && <StatusForm />}
      </main>
    </div>
  );
};

export default LeadManagementPage;