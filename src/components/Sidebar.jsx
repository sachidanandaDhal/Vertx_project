import { User, Home, BarChart, Link, Briefcase, Settings } from "lucide-react";

const Sidebar = ({ setActiveTab, activeTab }) => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={16} /> },
    { name: "Analytics", icon: <BarChart size={16} /> },
    { name: "Connect", icon: <Link size={16} /> },
    { name: "Dealroom", icon: <Briefcase size={16} /> },
    { name: "Profile", icon: <User size={16} /> },
    { name: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <aside className="bg-black text-white w-46 min-h-screen p-4 flex flex-col">
      {/* User Profile */}
      <div className="flex items-center mb-6">
        <img
          src="/profile.jpg"
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-gray-400"
        />
        <span className="text-xs font-semibold">Vertxlabs, Inc</span>
      </div>

      {/* Company Logo & Name */}
      <div className="flex space-x-2 mb-5">
        <img src="/logo.png" alt="Company Logo" className="w-6 h-6" />
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center text-[10px] space-x-2 p-2 rounded cursor-pointer ${
                activeTab === item.name ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              <span className="text-[10px]">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center text-gray-500 text-[10px]">
        <img src="/logo.png" alt="Company Logo" className="w-6 h-6 mx-auto" />
      </div>
    </aside>
  );
};

export default Sidebar;
