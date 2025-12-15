import React, { useState } from 'react';
import { MoreHorizontal, Filter, Download, Trash } from 'lucide-react';
import { useData } from '../context/DataContext';
import LeadModal from './LeadModal';
import { Lead } from '../types';

const LeadsList: React.FC = () => {
  const { leads, deleteLead, searchQuery } = useData();
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
    <div className="p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <Filter size={14} />
                Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <Download size={14} />
                Export
            </button>
        </div>
        <div className="text-[13px] text-slate-500 font-medium">
            <span className="text-slate-900 font-bold">{filteredLeads.length}</span> results
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 w-10">
                <input type="checkbox" className="rounded-[3px] border-slate-300 text-slate-800 focus:ring-0 focus:ring-offset-0" />
              </th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Company</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Value</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Stage</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tags</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id} 
                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                onClick={() => setEditingLead(lead)}
              >
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                  <input type="checkbox" className="rounded-[3px] border-slate-300 text-slate-800 focus:ring-0 focus:ring-offset-0" />
                </td>
                <td className="px-4 py-3">
                  <div className="text-[13px] font-semibold text-slate-900">{lead.name}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{lead.lastActivity}</div>
                </td>
                <td className="px-4 py-3 text-[13px] text-slate-700">{lead.company}</td>
                <td className="px-4 py-3 text-[13px] font-semibold text-slate-900">${lead.value.toLocaleString()}</td>
                <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                        {lead.stageId}
                    </span>
                </td>
                <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                        {lead.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded-[3px] text-[10px] font-medium text-slate-600 border border-slate-200 bg-slate-50">
                                {tag}
                            </span>
                        ))}
                    </div>
                </td>
                <td className="px-4 py-3 text-right flex gap-2 justify-end" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                        className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Lead"
                    >
                        <Trash size={14} />
                    </button>
                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <MoreHorizontal size={14} />
                    </button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
                <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400 text-sm italic">No leads match your search.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <LeadModal 
      isOpen={!!editingLead}
      onClose={() => setEditingLead(null)}
      leadToEdit={editingLead}
    />
    </>
  );
};

export default LeadsList;