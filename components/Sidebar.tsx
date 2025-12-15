import React from 'react';
import { LayoutDashboard, Kanban, CheckSquare, Users, CreditCard, Settings, LogOut, Command } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, onLogout }) => {
  const menuItems = [
    { id: Tab.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { id: Tab.PIPELINE, icon: Kanban, label: 'Pipeline' },
    { id: Tab.TASKS, icon: CheckSquare, label: 'Tasks' },
    { id: Tab.LISTS, icon: Users, label: 'Lists' },
    { id: Tab.BILLING, icon: CreditCard, label: 'Billing' },
    { id: Tab.SETTINGS, icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#fafafa] border-r border-slate-200 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-black text-white flex items-center justify-center shadow-lg shadow-black/20">
            <Command size={16} strokeWidth={2} />
        </div>
        <h1 className="text-sm font-bold tracking-tight text-slate-900">Clario</h1>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium transition-all duration-200 rounded-md group ${
                isActive
                  ? 'bg-slate-200/60 text-black'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <item.icon
                size={16}
                strokeWidth={1.5}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-black' : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-red-600 transition-colors rounded-md hover:bg-red-50/50"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;