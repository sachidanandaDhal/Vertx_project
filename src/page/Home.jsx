import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Analytics from "../components/Analytics";
import Connect from "../components/Connect";
import Dealroom from "../components/Dealroom";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Analytics");

  // Function to render content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Analytics":
        return <Analytics />;
      case "Connect":
        return <Connect />;
      case "Dealroom":
        return <Dealroom />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      
      {/* Main Content */}
      <div className="flex-1 bg-black text-white h-[100vh] overflow-hidden">
        <Navbar activeTab={activeTab} />
        <div className="">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Home;
