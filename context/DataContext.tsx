import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, Task, UserProfile, PlanType, PipelineStageId } from '../types';
import { INITIAL_LEADS, INITIAL_TASKS } from '../constants';

interface DataContextType {
  leads: Lead[];
  tasks: Task[];
  userProfile: UserProfile;
  currentPlan: PlanType;
  searchQuery: string; // Global search state
  setSearchQuery: (query: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'lastActivity'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void; // Added update capability
  updateLeadStage: (leadId: string, stageId: PipelineStageId) => void;
  deleteLead: (leadId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updatePlan: (plan: PlanType) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('clario_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('clario_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('clario_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Morgan',
      email: 'alex@clario.com',
      notifications: { email: true, push: false },
      theme: 'light'
    };
  });

  const [currentPlan, setCurrentPlan] = useState<PlanType>(() => {
    const saved = localStorage.getItem('clario_plan');
    return saved ? JSON.parse(saved) : 'Business';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Persist changes
  useEffect(() => localStorage.setItem('clario_leads', JSON.stringify(leads)), [leads]);
  useEffect(() => localStorage.setItem('clario_tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('clario_profile', JSON.stringify(userProfile)), [userProfile]);
  useEffect(() => localStorage.setItem('clario_plan', JSON.stringify(currentPlan)), [currentPlan]);

  // Actions
  const addLead = (leadData: Omit<Lead, 'id' | 'lastActivity'>) => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      lastActivity: 'Just now'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const updateLeadStage = (leadId: string, stageId: PipelineStageId) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stageId } : l));
  };

  const deleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
  };

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
  };

  const updatePlan = (plan: PlanType) => {
    setCurrentPlan(plan);
  };

  return (
    <DataContext.Provider value={{
      leads, tasks, userProfile, currentPlan, searchQuery, setSearchQuery,
      addLead, updateLead, updateLeadStage, deleteLead,
      addTask, toggleTask, deleteTask,
      updateUserProfile, updatePlan
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};