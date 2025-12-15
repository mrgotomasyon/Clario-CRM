import { Lead, PipelineStageId, Task, Metric, ChartData } from './types';

export const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'Alice Freeman', company: 'TechNova', value: 12000, stageId: PipelineStageId.NEW, lastActivity: '2h ago', tags: ['Enterprise', 'SaaS'] },
  { id: '2', name: 'Bob Smith', company: 'GreenLeaf', value: 5500, stageId: PipelineStageId.CONTACTED, lastActivity: '1d ago', tags: ['SMB'] },
  { id: '3', name: 'Charlie Davis', company: 'OpticInc', value: 24000, stageId: PipelineStageId.QUALIFIED, lastActivity: '4h ago', tags: ['High Priority'] },
  { id: '4', name: 'Diana Prince', company: 'Themyscira', value: 8500, stageId: PipelineStageId.PROPOSAL, lastActivity: '3d ago', tags: ['Referral'] },
  { id: '5', name: 'Evan Wright', company: 'Wright Logic', value: 3100, stageId: PipelineStageId.NEW, lastActivity: '1w ago', tags: ['Cold'] },
  { id: '6', name: 'Fiona Gallagher', company: 'Northside', value: 15000, stageId: PipelineStageId.NEGOTIATION, lastActivity: '12m ago', tags: ['Urgent'] },
  { id: '7', name: 'George Miller', company: 'Fury Road LLC', value: 45000, stageId: PipelineStageId.WON, lastActivity: '2d ago', tags: ['Enterprise'] },
];

export const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Follow up with Alice', dueDate: new Date().toISOString().split('T')[0], completed: false, leadId: '1', leadName: 'Alice Freeman' },
  { id: 't2', title: 'Prepare proposal for Diana', dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], completed: false, leadId: '4', leadName: 'Diana Prince' },
  { id: 't3', title: 'Quarterly Review', dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], completed: false },
  { id: 't4', title: 'Update billing info', dueDate: '2023-10-01', completed: true },
];

export const METRICS: Metric[] = [
  { label: 'Total Pipeline', value: '$113,100', change: '+12%', isPositive: true },
  { label: 'New Leads', value: '24', change: '+5%', isPositive: true },
  { label: 'Conversion Rate', value: '18.2%', change: '-1.2%', isPositive: false },
  { label: 'Tasks Due', value: '3', change: 'On Track', isPositive: true },
];

export const PIPELINE_STAGES = [
  { id: PipelineStageId.NEW, label: 'New Lead' },
  { id: PipelineStageId.CONTACTED, label: 'Contacted' },
  { id: PipelineStageId.QUALIFIED, label: 'Qualified' },
  { id: PipelineStageId.PROPOSAL, label: 'Proposal' },
  { id: PipelineStageId.NEGOTIATION, label: 'Negotiation' },
  { id: PipelineStageId.WON, label: 'Closed Won' },
];

export const FUNNEL_DATA: ChartData[] = [
  { name: 'New', value: 40 },
  { name: 'Contacted', value: 30 },
  { name: 'Qualified', value: 20 },
  { name: 'Proposal', value: 10 },
  { name: 'Won', value: 5 },
];

export const ACTIVITY_DATA = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 19 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 22 },
  { name: 'Fri', value: 28 },
  { name: 'Sat', value: 5 },
  { name: 'Sun', value: 2 },
];
