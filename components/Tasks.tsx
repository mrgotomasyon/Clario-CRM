import React, { useState } from 'react';
import { Calendar, Check, Link2, Plus, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { useData } from '../context/DataContext';

const Tasks: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, leads } = useData();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState('');

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const lead = leads.find(l => l.id === selectedLeadId);

    addTask({
        title: newTaskTitle,
        dueDate: new Date().toISOString(),
        leadId: lead?.id,
        leadName: lead?.name
    });
    setNewTaskTitle('');
    setSelectedLeadId('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTask();
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Input Area */}
      <div className="bg-white rounded-md shadow-sm border border-slate-300 p-2 flex gap-3 items-center group focus-within:ring-1 focus-within:ring-slate-400 focus-within:border-slate-400 transition-all">
        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
          <Plus size={16} />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
            <input 
            type="text" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium h-full"
            />
            
            <select 
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="text-[12px] bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-slate-600 focus:outline-none focus:border-slate-400 max-w-[150px]"
            >
                <option value="">Link to Lead...</option>
                {leads.map(lead => (
                    <option key={lead.id} value={lead.id}>{lead.name}</option>
                ))}
            </select>
        </div>

        <button 
            onClick={handleAddTask}
            className="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Pending Tasks */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Upcoming</h3>
        {pendingTasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
        ))}
        {pendingTasks.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm italic">No pending tasks.</div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-3 pt-6">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Completed</h3>
           {completedTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

const TaskItem: React.FC<{ task: Task; onToggle: () => void; onDelete: () => void }> = ({ task, onToggle, onDelete }) => (
  <div className={`group flex items-center gap-4 bg-white p-3 rounded-md border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 ${task.completed ? 'opacity-60 bg-slate-50' : ''}`}>
    
    <button 
      onClick={onToggle}
      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${
        task.completed 
          ? 'bg-slate-800 border-slate-800 text-white' 
          : 'border-slate-300 text-transparent hover:border-slate-800'
      }`}
    >
      <Check size={10} strokeWidth={3} />
    </button>

    <div className="flex-1">
      <div className={`text-[14px] font-medium text-slate-900 transition-all ${task.completed ? 'line-through text-slate-500' : ''}`}>
        {task.title}
      </div>
      {task.leadName && (
        <div className="flex items-center gap-1 text-[11px] text-blue-600 font-medium mt-0.5">
          <Link2 size={10} />
          {task.leadName}
        </div>
      )}
    </div>

    <div className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded border ${
        isOverdue(task.dueDate) && !task.completed ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-100 text-slate-600 border-slate-200'
    }`}>
      <Calendar size={10} />
      {formatDate(task.dueDate)}
    </div>

    <button onClick={onDelete} className="text-slate-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
        <Trash2 size={15} />
    </button>
  </div>
);

const isOverdue = (date: string) => {
  return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return 'Today';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default Tasks;