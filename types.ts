export enum PipelineStageId {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  WON = 'won'
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  stageId: PipelineStageId;
  lastActivity: string;
  tags: string[];
  email?: string; // Added email
  phone?: string; // Added phone
}

export interface Task {
  id: string;
  title: string;
  dueDate: string; // ISO Date string
  completed: boolean;
  leadId?: string; // Optional link to a lead
  leadName?: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string; // e.g., "+12%"
  isPositive: boolean;
}

export enum Tab {
  DASHBOARD = 'Dashboard',
  PIPELINE = 'Pipeline',
  TASKS = 'Tasks',
  LISTS = 'Lists',
  BILLING = 'Billing',
  SETTINGS = 'Settings'
}

export interface ChartData {
  name: string;
  value: number;
}

export interface UserProfile {
  name: string;
  email: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  theme: 'light' | 'dark';
}

export type PlanType = 'Starter' | 'Pro' | 'Business';