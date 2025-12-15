import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Pipeline from './components/Pipeline';
import Tasks from './components/Tasks';
import LeadsList from './components/LeadsList';
import Billing from './components/Billing';
import Settings from './components/Settings';
import LeadModal from './components/LeadModal';
import LandingPage from './components/LandingPage';
import { Tab } from './types';
import { DataProvider } from './context/DataContext';

const AppContent: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.DASHBOARD);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.DASHBOARD:
        return <Dashboard />;
      case Tab.PIPELINE:
        return <Pipeline />;
      case Tab.TASKS:
        return <Tasks />;
      case Tab.LISTS:
        return <LeadsList />;
      case Tab.BILLING:
        return <Billing />;
      case Tab.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans selection:bg-slate-200">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} onLogout={onLogout} />
      
      <main className="flex-1 ml-64 flex flex-col h-full relative overflow-hidden">
        {/* Minimal grid pattern - slightly darkened for visibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
        
        <Header 
            title={currentTab} 
            onNewLead={() => setIsLeadModalOpen(true)}
        />
        
        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative z-10">
          {renderContent()}
        </div>

        <LeadModal 
            isOpen={isLeadModalOpen} 
            onClose={() => setIsLeadModalOpen(false)} 
        />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  // Simple state to toggle between landing page and app
  // In a real app, this would be handled by a router
  const [view, setView] = useState<'landing' | 'app'>('landing');

  return (
    <DataProvider>
      {view === 'landing' ? (
        <LandingPage onEnterApp={() => setView('app')} />
      ) : (
        <AppContent onLogout={() => setView('landing')} />
      )}
    </DataProvider>
  );
};

export default App;