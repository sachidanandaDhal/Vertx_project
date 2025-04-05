import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import logo from '../assets/logo.png';
import profile from '../assets/profile.jpeg';


const Navbar = ({ activeTab }) => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <nav className="bg-black text-white px-4 py-2 flex items-center justify-between border-b border-gray-800 relative">
      
      {/* Desktop: Page Title */}
      <div className="hidden sm:block text-gray-300 text-sm">{activeTab}</div>

      {/* Mobile: Profile (left) + Name (center) + Menu Icon (right) */}
      <div className="sm:hidden flex items-center justify-between w-full">
        {/* Left: Profile Image */}
        <img
          src={profile} alt="User"
          className="w-8 h-8 rounded-full border-2 border-gray-400"
        />

        {/* Center: Company Name */}
        <img src={logo} alt="Company Logo" className="w-8 h-8 rounded-full border-2 bg-white border-gray-400"  />

        {/* Right: Menu Icon */}
        <div className="relative">
          <button onClick={() => setShowLogout(!showLogout)} className="text-white">
            <Menu size={20} />
          </button>

          {showLogout && (
            <div className="absolute right-0 mt-2 bg-gray-900 rounded shadow z-50 w-28">
              <button
                onClick={() => {
                  setShowLogout(false);
                  // handle logout
                }}
                className="w-full px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Right Section */}
      <div className="hidden sm:flex items-center ml-auto space-x-4">
        <span className="text-gray-300 text-sm font-medium">Activity</span>
        <button className="px-3 py-1 rounded text-white text-sm flex items-center space-x-2">
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
