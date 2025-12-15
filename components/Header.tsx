import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';

interface HeaderProps {
  title: string;
  onNewLead?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onNewLead }) => {
  const { userProfile, searchQuery, setSearchQuery } = useData();
  const initials = userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="flex flex-col">
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h2>
        <span className="text-[11px] text-slate-500 font-medium">Overview</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors" size={14} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 w-64 bg-slate-50 border border-slate-200 rounded-md text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-all placeholder:text-slate-500 shadow-sm"
          />
        </div>

        <div className="h-4 w-[1px] bg-slate-200 mx-2" />

        <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
          <Bell size={18} strokeWidth={2} />
          {userProfile.notifications.push && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
          )}
        </button>

        <button 
            onClick={onNewLead}
            className="flex items-center gap-2 bg-slate-900 text-white pl-3 pr-4 py-1.5 rounded-md text-[13px] font-semibold hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>New Lead</span>
        </button>
        
        <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-all">
            <span className="text-xs font-bold">{initials}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;