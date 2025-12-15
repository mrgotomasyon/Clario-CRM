import React, { useState } from 'react';
import { User, Bell, Palette, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const SettingsSection: React.FC<{ title: string; icon: any; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-md border border-slate-200 shadow-sm mb-6">
    <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-2">
      <Icon size={14} className="text-slate-500" />
      <h3 className="text-[13px] font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const Settings: React.FC = () => {
  const { userProfile, updateUserProfile } = useData();
  const [formData, setFormData] = useState(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateUserProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <SettingsSection title="Profile Information" icon={User}>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Full Name</label>
            <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 rounded-[4px] bg-white border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Email Address</label>
            <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 rounded-[4px] bg-white border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm" 
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Notifications" icon={Bell}>
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[13px] text-slate-900 font-medium">Email Notifications</span>
                    <span className="text-[11px] text-slate-500">Receive daily summaries and alerts</span>
                </div>
                {/* Minimal toggle */}
                <div className="relative inline-block w-8 mr-2 align-middle select-none">
                    <input 
                        type="checkbox" 
                        checked={formData.notifications.email}
                        onChange={e => setFormData({...formData, notifications: {...formData.notifications, email: e.target.checked}})}
                        className="absolute block w-4 h-4 rounded-full bg-white border border-slate-300 appearance-none cursor-pointer checked:right-0 checked:border-slate-900 checked:bg-slate-900 transition-all duration-200 top-0.5"
                    />
                    <label className="block overflow-hidden h-5 rounded-full bg-slate-100 border border-slate-200 cursor-pointer"></label>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[13px] text-slate-900 font-medium">Desktop Push</span>
                    <span className="text-[11px] text-slate-500">Real-time alerts for new leads</span>
                </div>
                <div className="relative inline-block w-8 mr-2 align-middle select-none">
                    <input 
                        type="checkbox" 
                        checked={formData.notifications.push}
                        onChange={e => setFormData({...formData, notifications: {...formData.notifications, push: e.target.checked}})}
                        className="absolute block w-4 h-4 rounded-full bg-white border border-slate-300 appearance-none cursor-pointer checked:right-0 checked:border-slate-900 checked:bg-slate-900 transition-all duration-200 top-0.5"
                    />
                    <label className="block overflow-hidden h-5 rounded-full bg-slate-100 border border-slate-200 cursor-pointer"></label>
                </div>
            </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Appearance" icon={Palette}>
         <div className="flex gap-4">
            <button 
                onClick={() => setFormData({...formData, theme: 'light'})}
                className={`flex-1 p-4 rounded-md border flex flex-col items-center gap-2 transition-all ${
                    formData.theme === 'light' ? 'border-2 border-slate-900 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
                <div className="w-full h-10 bg-slate-50 rounded-[2px] mb-1 border border-slate-100"></div>
                <span className="text-[11px] font-semibold text-slate-900">Light</span>
            </button>
            <button 
                onClick={() => setFormData({...formData, theme: 'dark'})}
                className={`flex-1 p-4 rounded-md border flex flex-col items-center gap-2 transition-all opacity-60 cursor-not-allowed ${
                    formData.theme === 'dark' ? 'border-2 border-slate-900 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
                <div className="w-full h-10 bg-slate-800 rounded-[2px] mb-1 border border-slate-700"></div>
                <span className="text-[11px] font-medium text-slate-500">Dark (Coming Soon)</span>
            </button>
         </div>
      </SettingsSection>
      
      <div className="flex justify-end gap-3 mt-6 items-center">
        {isSaved && (
            <span className="text-emerald-600 text-[13px] font-medium flex items-center gap-1 animate-in fade-in">
                <CheckCircle size={14} /> Saved
            </span>
        )}
        <button 
            onClick={() => setFormData(userProfile)}
            className="px-4 py-2 text-[13px] text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
            Cancel
        </button>
        <button 
            onClick={handleSave}
            className="px-5 py-2 bg-black text-white rounded-[4px] text-[13px] font-medium hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
            Save Changes
        </button>
      </div>

    </div>
  );
};

export default Settings;