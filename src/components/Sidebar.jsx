
import {
  User,
  Home,
  BarChart,
  Link,
  Briefcase,
  Settings,
} from "lucide-react";
import { Plus } from "lucide-react";
import profile from '../assets/profile.jpeg';
import logo from '../assets/logo.png';

const Sidebar = ({ setActiveTab, activeTab }) => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Analytics", icon: <BarChart size={20} /> },
    { name: "Connect", icon: <Link size={20} /> },
    { name: "Dealroom", icon: <Briefcase size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col bg-black text-white w-40 min-h-screen p-3 pt-3">
        {/* Profile Info */}
        <div className="flex items-center mb-6 space-x-2 border-b  border-gray-800 relative">
          <img
            src={logo}
            alt="Company Logo"
            className="w-8 h-8 rounded-full border-2 border-gray-400 bg-white" 
          />
          <span className="text-xs pl-3 font-semibold">Vertxlabs, Inc</span>
        </div>

        {/* Menu */}
        <div className="flex mb-4 space-x-2">

        <img src={profile} alt="User" className="w-8 h-8 rounded-full border-2 border-gray-400" />
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center text-xs space-x-2 p-2 rounded cursor-pointer ${
                activeTab === item.name ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
        </div>

        {/* Footer Logo */}
        <div className="mt-auto  text-gray-500 text-[10px]">
        <button onClick={() => console.log("Add clicked")}>
  <Plus className="w-6 h-6 mx-auto text-white" />
</button>

        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 flex justify-around py-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center text-[10px] ${
              activeTab === item.name ? "text-blue-400" : "text-gray-300"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
