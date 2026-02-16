import React, { useState } from 'react';
import { Layout, FileText, ShoppingBag, Settings, LogOut, ChevronDown, Bell } from 'lucide-react';
import { AnalysisResult } from '../types';
import { BlueprintAnalyzer } from './BlueprintAnalyzer';
import { CostEstimator } from './CostEstimator';
import { Marketplace } from './Marketplace';
import { Logo } from './UI';

type Tab = 'takeoff' | 'estimate' | 'marketplace';

export const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('takeoff');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  return (
    <div className="flex h-screen bg-slate-50/50 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col py-6 z-20">
        <div className="px-6 mb-8">
            <Logo showTagline={true} />
        </div>
        
        <div className="px-3 mb-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Workspace</div>
            <nav className="flex flex-col gap-0.5">
            <NavButton 
                active={activeTab === 'takeoff'} 
                onClick={() => setActiveTab('takeoff')} 
                icon={<Layout size={18} />} 
                label="Blueprint Takeoff"
            />
            <NavButton 
                active={activeTab === 'estimate'} 
                onClick={() => setActiveTab('estimate')} 
                icon={<FileText size={18} />} 
                label="Cost Estimation"
            />
            <NavButton 
                active={activeTab === 'marketplace'} 
                onClick={() => setActiveTab('marketplace')} 
                icon={<ShoppingBag size={18} />} 
                label="Bid Marketplace"
            />
            </nav>
        </div>

        <div className="mt-auto px-3">
            <div className="border-t border-slate-100 my-4" />
            <nav className="flex flex-col gap-0.5">
                <NavButton active={false} onClick={() => {}} icon={<Settings size={18} />} label="Settings" />
                <NavButton active={false} onClick={onLogout} icon={<LogOut size={18} />} label="Log out" />
            </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center px-8 justify-between z-10 sticky top-0">
          <div className="flex items-center gap-4">
             <h1 className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
                Downtown Office Renovation
             </h1>
             <span className="text-slate-300">/</span>
             <span className="text-sm font-medium text-slate-500 capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
             <button className="text-slate-400 hover:text-slate-600 relative">
                <Bell size={18} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-medium text-slate-900">John Engineer</div>
                    <div className="text-[10px] text-slate-500">Senior Estimator</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-medium text-sm">
                    JE
                </div>
             </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 p-6 overflow-hidden">
          {activeTab === 'takeoff' && (
            <BlueprintAnalyzer 
              onAnalysisComplete={(res) => {
                setAnalysisResult(res);
              }} 
              existingResult={analysisResult}
            />
          )}
          {activeTab === 'estimate' && (
            <CostEstimator analysisData={analysisResult} />
          )}
          {activeTab === 'marketplace' && (
            <Marketplace />
          )}
        </div>
      </main>
    </div>
  );
};

const NavButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
      ${active 
        ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
    `}
  >
    <span className={active ? 'text-slate-900' : 'text-slate-400'}>{icon}</span>
    {label}
  </button>
);