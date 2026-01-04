
import React from 'react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = Object.values(Tab);

  const getIcon = (tab: Tab) => {
    switch (tab) {
      case Tab.Dashboard: return '📊';
      case Tab.PartsInventory: return '⚙️';
      case Tab.CarShowroom: return '🚗';
      case Tab.Maintenance: return '🛠️';
      case Tab.SalesHistory: return '💰';
      case Tab.Customers: return '👤';
      default: return '📁';
    }
  };

  return (
    <div className="w-64 bg-[#001E50] text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-blue-900 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#001E50] font-bold text-xl">W</div>
        <h1 className="font-bold text-lg tracking-tight">VolksManager</h1>
      </div>
      <nav className="flex-1 mt-6 px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-3 mb-2 rounded-lg transition-colors flex items-center gap-3 ${
              activeTab === tab 
                ? 'bg-blue-600 font-semibold' 
                : 'hover:bg-blue-800 text-blue-100'
            }`}
          >
            <span className="text-xl">{getIcon(tab)}</span>
            {tab}
          </button>
        ))}
      </nav>
      <div className="p-4 bg-blue-900/50 text-xs text-blue-200">
        &copy; 2024 VW Parts Management v1.2
      </div>
    </div>
  );
};

export default Sidebar;
