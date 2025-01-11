// Navbar.jsx
import { MessageCircle, Bell, ChevronDown } from "lucide-react";
import doctor from "../../assets/doctor.png";

const Navbar = () => {
  return (
    <header className="bg-[#E7EFF9] py-2 sm:py-4 px-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center shadow-md border-b gap-3 sm:gap-0">
      <div className="relative w-full sm:w-auto">
        <input
          type="search"
          placeholder="Search"
          className="pl-4 pr-4 py-2 rounded-lg border-2 border-gray-300 w-full sm:w-72 md:w-96"
        />
        <svg
          className="w-6 h-6 absolute right-3 top-2 text-gray-400"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-end">
        <button className="text-gray-600 hover:text-gray-800">
          <MessageCircle size={24} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Bell size={24} />
        </button>
        <div className="flex items-center gap-2 sm:gap-3 border-2 border-gray-300 p-1 px-2 rounded-lg">
          <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden">
            <img
              src={doctor}
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-sm sm:text-base">Dr. Ramesh</span>
          <ChevronDown size={20} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
