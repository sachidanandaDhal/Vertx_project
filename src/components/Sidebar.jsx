import { User, Home, BarChart, Link, Briefcase, Settings } from "lucide-react";

const Sidebar = ({ setActiveTab, activeTab }) => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} /> },
    { name: "Analytics", icon: <BarChart size={18} /> },
    { name: "Connect", icon: <Link size={18} /> },
    { name: "Dealroom", icon: <Briefcase size={18} /> },
    { name: "Profile", icon: <User size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="bg-black text-white w-56 min-h-screen p-4 flex flex-col">
      {/* User Profile */}
      <div className="flex items-center mb-6">
        <img
          src="/profile.jpg"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-gray-400"
        />
        <span className="text-sm font-semibold">Vertxlabs, Inc</span>

      </div>

      {/* Company Logo & Name */}
      <div className="flex space-x-2 mb-5">
      <img src="/logo.png" alt="Company Logo1" className="w-6 h-6" />
        <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
              activeTab === item.name ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </li>
        ))}
      </ul> 
      </div>
        {/* Footer */}
        <div className="mt-auto text-center text-gray-500 text-xs">
        <img src="/logo.png" alt="Company Logo1" className="w-6 h-6" />
        </div>
    </aside>
  );
};

export default Sidebar;
