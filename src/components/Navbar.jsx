import { LogOut } from "lucide-react";

const Navbar = ({ activeTab }) => {
  return (
    <nav className="bg-black text-white px-6 py-2 flex justify-between items-center border-b border-gray-800">

      {/* Center: Active Page Name */}
      <div className="text-gray-300 text-sm">{activeTab}</div>

      {/* Right: Activity & Logout */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-300 text-sm font-medium">Activity</span>
        <button className=" px-3 py-1 rounded text-white text-sm flex items-center space-x-2">
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
