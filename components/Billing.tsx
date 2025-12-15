import React from 'react';
import { Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PlanType } from '../types';

const PlanCard: React.FC<{ 
    name: PlanType; 
    price: string; 
    features: string[]; 
    isCurrent: boolean; 
    isRecommended?: boolean;
    onSelect: () => void;
}> = ({ name, price, features, isCurrent, isRecommended, onSelect }) => (
  <div className={`relative p-6 rounded-md border flex flex-col transition-all duration-300 ${
    isRecommended && !isCurrent
      ? 'bg-white border-slate-300 shadow-lg z-10' 
      : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
  } ${isCurrent ? 'ring-2 ring-slate-900 border-transparent bg-slate-50' : ''}`}>
    
    {isRecommended && !isCurrent && (
      <div className="absolute top-0 right-0 m-4">
         <span className="text-[10px] uppercase font-bold tracking-wider bg-black text-white px-2 py-1 rounded-[2px]">
            Best Value
         </span>
      </div>
    )}
    
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">{name}</h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-slate-900 tracking-tight">{price}</span>
        <span className="text-sm text-slate-500 font-medium">/mo</span>
      </div>
    </div>

    <ul className="space-y-3 mb-8 flex-1">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-[13px] font-medium text-slate-600">
          <div className="mt-0.5 text-slate-900">
            <Check size={12} strokeWidth={3} />
          </div>
          {feature}
        </li>
      ))}
    </ul>

    <button 
        onClick={onSelect}
        disabled={isCurrent}
        className={`w-full py-2.5 rounded text-[13px] font-medium transition-all ${
        isCurrent 
            ? 'bg-slate-200 text-slate-500 cursor-default border border-transparent' 
            : isRecommended
            ? 'bg-black text-white hover:bg-slate-800'
            : 'bg-white border border-slate-200 text-slate-900 hover:border-slate-900'
        }`}
    >
      {isCurrent ? 'Current Plan' : 'Upgrade Plan'}
    </button>
  </div>
);

const Billing: React.FC = () => {
  const { currentPlan, updatePlan } = useData();

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2 tracking-tight">Simple Pricing</h2>
            <p className="text-slate-500 text-sm">Transparent rates for teams of all sizes.</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <PlanCard 
          name="Starter" 
          price="$0" 
          features={['Up to 50 leads', 'Basic Kanban', '1 User', 'Email Support']} 
          isCurrent={currentPlan === 'Starter'}
          onSelect={() => updatePlan('Starter')}
        />
        <PlanCard 
          name="Pro" 
          price="$29" 
          features={['Unlimited leads', 'Advanced Analytics', 'Up to 5 Users', 'Priority Support', 'Email Integration']} 
          isRecommended
          isCurrent={currentPlan === 'Pro'}
          onSelect={() => updatePlan('Pro')}
        />
        <PlanCard 
          name="Business" 
          price="$99" 
          features={['Unlimited Everything', 'Custom Fields', 'Unlimited Users', 'Dedicated Success Manager', 'API Access']} 
          isCurrent={currentPlan === 'Business'}
          onSelect={() => updatePlan('Business')}
        />
      </div>

      <div className="mt-12 bg-white rounded-md border border-slate-200 p-6 flex justify-between items-center shadow-sm">
        <div>
            <h3 className="text-sm font-semibold text-slate-900">Payment Method</h3>
            <p className="text-[13px] text-slate-500 mt-0.5">Visa ending in 4242 • Expires 12/24</p>
        </div>
        <button className="text-[13px] text-slate-900 font-medium px-4 py-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
            Update Card
        </button>
      </div>
    </div>
  );
};

export default Billing;