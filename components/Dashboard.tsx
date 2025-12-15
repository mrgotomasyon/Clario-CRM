import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { ACTIVITY_DATA, FUNNEL_DATA } from '../constants';
import { useData } from '../context/DataContext';
import { PipelineStageId } from '../types';

const MetricCard: React.FC<{ label: string; value: string; change: string; isPositive: boolean }> = ({ label, value, change, isPositive }) => (
  <div className="bg-white p-5 rounded-md border border-slate-200/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)] transition-all group">
    <div className="flex justify-between items-start mb-3">
      <span className="text-slate-500 text-[13px] font-medium">{label}</span>
      <button className="text-slate-300 hover:text-slate-900 transition-colors">
        <MoreHorizontal size={14} strokeWidth={1.5} />
      </button>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-slate-900 tracking-tight">{value}</span>
      <span className={`text-[11px] font-medium flex items-center gap-0.5 ${
        isPositive ? 'text-emerald-600' : 'text-slate-500'
      }`}>
        {isPositive ? <ArrowUpRight size={10} strokeWidth={2} /> : <ArrowDownRight size={10} strokeWidth={2} />}
        {change}
      </span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { leads, tasks } = useData();

  // Calculate Real Metrics
  const totalPipelineValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const newLeadsCount = leads.filter(l => l.stageId === PipelineStageId.NEW).length;
  const wonLeadsCount = leads.filter(l => l.stageId === PipelineStageId.WON).length;
  const conversionRate = leads.length > 0 ? ((wonLeadsCount / leads.length) * 100).toFixed(1) : '0';
  const tasksDue = tasks.filter(t => !t.completed).length;

  return (
    <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
            label="Total Pipeline" 
            value={`$${totalPipelineValue.toLocaleString()}`} 
            change="+12%" 
            isPositive={true} 
        />
        <MetricCard 
            label="New Leads" 
            value={newLeadsCount.toString()} 
            change="+5%" 
            isPositive={true} 
        />
        <MetricCard 
            label="Conversion Rate" 
            value={`${conversionRate}%`} 
            change="-1.2%" 
            isPositive={false} 
        />
        <MetricCard 
            label="Tasks Due" 
            value={tasksDue.toString()} 
            change="On Track" 
            isPositive={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-md border border-slate-200/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-medium text-slate-900">Activity Trends</h3>
             <select className="bg-transparent text-[11px] font-medium text-slate-500 border border-slate-200 rounded-md px-2 py-1 outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
             </select>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.05}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '4px', border: 'none', color: 'white', fontSize: '12px' }}
                  itemStyle={{color: 'white'}}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={1.5} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Chart */}
        <div className="bg-white rounded-md border border-slate-200/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] p-6">
          <h3 className="text-sm font-medium text-slate-900 mb-6">Pipeline Volume</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={FUNNEL_DATA} barSize={20}>
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 500}} />
                 <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ backgroundColor: '#1e293b', borderRadius: '4px', border: 'none', color: '#fff', fontSize: '12px' }} itemStyle={{color: '#fff'}} />
                 <Bar dataKey="value" radius={[0, 2, 2, 0]}>
                    {FUNNEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1e293b' : '#cbd5e1'} />
                    ))}
                 </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;