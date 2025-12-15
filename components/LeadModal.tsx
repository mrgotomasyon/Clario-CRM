import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { PipelineStageId, Lead } from '../types';
import { useData } from '../context/DataContext';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadToEdit?: Lead | null;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, leadToEdit }) => {
  const { addLead, updateLead, deleteLead } = useData();
  
  const initialFormState = {
    name: '',
    company: '',
    value: '',
    stageId: PipelineStageId.NEW,
    tags: '',
    email: '',
    phone: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Populate form when editing
  useEffect(() => {
    if (leadToEdit) {
      setFormData({
        name: leadToEdit.name,
        company: leadToEdit.company,
        value: leadToEdit.value.toString(),
        stageId: leadToEdit.stageId,
        tags: leadToEdit.tags.join(', '),
        email: leadToEdit.email || '',
        phone: leadToEdit.phone || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [leadToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company) return;

    const leadData = {
      name: formData.name,
      company: formData.company,
      value: Number(formData.value) || 0,
      stageId: formData.stageId,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      email: formData.email,
      phone: formData.phone
    };

    if (leadToEdit) {
        updateLead(leadToEdit.id, leadData);
    } else {
        addLead(leadData);
    }
    
    onClose();
  };

  const handleDelete = () => {
    if (leadToEdit && window.confirm('Are you sure you want to delete this lead?')) {
        deleteLead(leadToEdit.id);
        onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl shadow-slate-900/20 border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-[14px] font-bold text-slate-900">{leadToEdit ? 'Edit Lead' : 'Add New Lead'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-600">Contact Name <span className="text-red-500">*</span></label>
            <input 
              autoFocus={!leadToEdit}
              type="text" 
              required
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-600">Company <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-600">Email</label>
                <input 
                    type="email" 
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="jane@acme.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                />
            </div>
             <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-slate-600">Phone</label>
                <input 
                    type="tel" 
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="+1 555..."
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-slate-600">Value ($)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
                placeholder="0"
                value={formData.value}
                onChange={e => setFormData({...formData, value: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-slate-600">Stage</label>
              <select 
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all"
                value={formData.stageId}
                onChange={e => setFormData({...formData, stageId: e.target.value as PipelineStageId})}
              >
                {Object.values(PipelineStageId).map(stage => (
                    <option key={stage} value={stage} className="capitalize">{stage}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-600">Tags (comma separated)</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
              placeholder="SaaS, Enterprise, Urgent..."
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          <div className="pt-4 flex justify-between items-center">
            {leadToEdit ? (
                 <button 
                 type="button" 
                 onClick={handleDelete}
                 className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
             >
                 <Trash2 size={14} /> Delete
             </button>
            ) : <div />}
           
            <div className="flex gap-3">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="px-6 py-2 bg-slate-900 text-white text-[13px] font-semibold rounded-[4px] hover:bg-slate-800 transition-all shadow-md active:translate-y-0.5"
                >
                    {leadToEdit ? 'Save Changes' : 'Create Lead'}
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;