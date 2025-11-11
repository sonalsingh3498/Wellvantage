import logo2 from "../assets/logo2.png";
import backIcon from "../assets/left-arrow.png";
import { useNavigate } from "react-router-dom";

// FORM COMPONENT (put this above or in a separate file)
function GymRegistrationForm() {
 const navigate = useNavigate();
  return (
    <div className="max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-center mb-5">Details</h2>
      <p className="font-semibold mb-2">Let's build your gym's digital HQ!</p>
      <p className="text-xs mb-5">Enter your name, address & contact so we can tailor everything for your business.</p>
      <form>
        <label className="block font-medium mb-2">Gym Name*</label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">Gym Owner's First Name*
          <span className="block text-xs font-normal">(will have access to all features of the app)</span>
        </label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">Last Name*</label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">Address Line 1*</label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">Address Line 2*</label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">City*</label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">State*</label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">Country*</label>
        <input type="text" className="w-full mb-4 border rounded-md p-2" />
        <label className="block font-medium mb-2">Phone Number</label>
        <div className="flex items-center mb-4">
          <select className="border rounded-md p-2 mr-2">
            <option value="+91">+91</option>
          </select>
          <input type="text" className="flex-1 border rounded-md p-2 mr-2" />
          <button type="button" className="bg-green-500 text-white px-4 py-2 rounded">Verify</button>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(6)].map((_, idx) => (
            <input key={idx} type="text" maxLength={1} className="w-10 h-10 text-center border rounded-lg" />
          ))}
        </div>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="agree" className="mr-2" />
          <label htmlFor="agree" className="text-xs">
            I agree to the <a href="/privacy-policy" className="text-green-600 underline">Privacy Policy</a>.
          </label>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg" onClick={navigate("/lead-management")}>
          Next
        </button>
      </form>
    </div>
  );
}

// OUTER COMPONENT
const Btwob = () => {
  // const { setUser } = useAuth(); // Only if using Auth

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white overflow-hidden relative">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 md:top-8 md:left-8 text-gray-700 hover:opacity-80 transition"
        aria-label="Go back"
        // onClick={...}
      >
        <img
          src={backIcon}
          alt="Back"
          className="w-6 h-6 md:w-8 md:h-8 object-contain"
        />
      </button>
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 h-64 md:h-full bg-[#34A853] flex flex-col items-center justify-center p-8">
        <img
          src={logo2}
          alt="Wellvantage Logo"
          className="w-40 md:w-[260px] h-auto object-contain"
        />
      </div>
      {/* RIGHT PANEL */}

<div className="w-full md:w-1/2 flex flex-col items-start justify-start p-2 md:p-2 overflow-y-auto">
  <GymRegistrationForm />
</div>
    </div>
  );
};

export default Btwob;
