import React, { useState } from 'react';
import { PIPELINE_STAGES } from '../constants';
import { Lead, PipelineStageId } from '../types';
import { MoreHorizontal } from 'lucide-react';
import { useData } from '../context/DataContext';
import LeadModal from './LeadModal';

const Pipeline: React.FC = () => {
  const { leads, updateLeadStage, searchQuery } = useData();
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Filter leads based on search query
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (stageId: PipelineStageId) => {
    if (!draggedLead) return;
    if (draggedLead.stageId !== stageId) {
        updateLeadStage(draggedLead.id, stageId);
    }
    setDraggedLead(null);
  };

  const getStageStats = (stageId: PipelineStageId) => {
    const stageLeads = filteredLeads.filter(l => l.stageId === stageId);
    const totalValue = stageLeads.reduce((sum, l) => sum + l.value, 0);
    return { count: stageLeads.length, value: totalValue };
  };

  return (
    <>
    <div className="h-[calc(100vh-5rem)] p-8 overflow-x-auto">
      <div className="flex gap-4 h-full min-w-max">
        {PIPELINE_STAGES.map((stage) => {
          const { count } = getStageStats(stage.id);

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id)}
              className="w-72 flex flex-col h-full"
            >
              <div className="flex flex-col gap-1 mb-3 px-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-[13px] font-bold text-slate-800">{stage.label}</h3>
                  <span className="text-[11px] text-slate-600 font-semibold bg-white border border-slate-300 px-1.5 py-0.5 rounded">{count}</span>
                </div>
                <div className="h-[2px] w-full mt-2 bg-slate-200" />
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto pb-4 custom-scrollbar">
                {filteredLeads.filter(lead => lead.stageId === stage.id).map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    onClick={() => setEditingLead(lead)}
                    className="bg-white p-3 rounded-md border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        {lead.company}
                      </span>
                      <button className="text-slate-400 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    
                    <h4 className="text-[14px] font-semibold text-slate-900 mb-2 leading-tight">{lead.name}</h4>
                    
                    <div className="flex items-center justify-between mt-3 pb-2 border-b border-slate-50">
                      <div className="text-[12px] font-semibold text-slate-700">
                        ${lead.value.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{lead.lastActivity}</span>
                    </div>

                    <div className="flex gap-1 mt-2 flex-wrap">
                      {lead.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-[3px] border border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredLeads.filter(lead => lead.stageId === stage.id).length === 0 && (
                   <div className="h-24 rounded-md border border-dashed border-slate-300 flex items-center justify-center">
                      <span className="text-xs text-slate-400 font-medium">No leads</span>
                   </div>
                )}
              </div>
            </div>
          );
        })}
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

export default Pipeline;