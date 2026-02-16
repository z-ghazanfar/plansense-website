import React, { useState } from 'react';
import { Search, MapPin, Clock, Briefcase, ArrowRight, Building2, CheckCircle } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';
import { Button, Card, Badge } from './UI';

export const Marketplace: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(MOCK_PROJECTS[0]);
  const [hasBid, setHasBid] = useState(false);

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    setHasBid(true);
    setTimeout(() => setHasBid(false), 3000); // Reset for demo
  };

  return (
    <div className="flex h-full gap-6">
      {/* List Feed */}
      <div className="w-1/3 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search active projects..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-300 outline-none text-sm font-medium shadow-sm"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pb-4 pr-1">
          {MOCK_PROJECTS.map(project => (
            <Card 
              key={project.id} 
              className={`p-4 cursor-pointer transition-all border group ${selectedProject?.id === project.id ? 'border-slate-900 ring-1 ring-slate-900 shadow-md' : 'border-slate-100 hover:border-slate-300'}`}
              onClick={() => { setSelectedProject(project); setHasBid(false); }}
            >
                <div className="flex justify-between items-start mb-3">
                  <Badge color={project.status === 'Open' ? 'green' : project.status === 'Bidding' ? 'blue' : 'slate'}>
                    {project.status}
                  </Badge>
                  <span className="text-[10px] font-medium text-slate-400">{project.postedAt}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1 leading-snug">{project.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={12} /> {project.bids} Bids</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-2">
                    <div className="text-sm font-mono font-semibold text-slate-700">
                        {project.budget}
                    </div>
                    <ArrowRight size={14} className={`text-slate-300 transition-transform ${selectedProject?.id === project.id ? 'text-slate-900 translate-x-1' : 'group-hover:translate-x-1'}`} />
                </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="flex-1">
        {selectedProject ? (
          <Card className="h-full flex flex-col border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                            <Building2 size={16} />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Commercial Renovation</span>
                   </div>
                   <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{selectedProject.title}</h1>
                   <div className="flex items-center gap-5 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {selectedProject.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-400" /> Posted {selectedProject.postedAt}</span>
                   </div>
                </div>
                <div className="text-right bg-slate-50 px-5 py-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Budget Range</div>
                  <div className="text-xl font-mono font-bold text-slate-900">{selectedProject.budget}</div>
                </div>
              </div>

              <div className="flex gap-2">
                 <Badge color="slate">General Contractor</Badge>
                 <Badge color="slate">Interior Fit-out</Badge>
                 <Badge color="slate">Q3 2024</Badge>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-white">
               <div className="grid grid-cols-3 gap-8 mb-10">
                   <div className="col-span-2">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Scope of Work</h3>
                        <div className="bg-slate-50 rounded-xl p-1 border border-slate-100">
                            <ul className="space-y-1">
                            {selectedProject.scope.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700 p-3 bg-white rounded-lg shadow-sm border border-slate-100/50">
                                <div className="mt-0.5 text-blue-500 shrink-0">
                                    <CheckCircle size={16} />
                                </div>
                                <span className="text-sm font-medium">{item}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                   </div>
                   <div className="col-span-1">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Project Stats</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                                <div className="text-xs text-slate-500 mb-1">Total Bids</div>
                                <div className="text-2xl font-semibold text-slate-900">{selectedProject.bids}</div>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                                <div className="text-xs text-slate-500 mb-1">Avg. Bid</div>
                                <div className="text-2xl font-semibold text-slate-900">$48k</div>
                            </div>
                        </div>
                   </div>
               </div>

               <section className="p-1 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Submit Proposal</h3>
                    <p className="text-sm text-slate-500 mb-6">Your proposal will be sent directly to the project owner for review.</p>
                    
                    {hasBid ? (
                        <div className="text-center py-6 bg-green-50 rounded-lg border border-green-100 animate-in fade-in zoom-in duration-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3 shadow-sm">
                            <CheckCircle size={24} />
                        </div>
                        <h4 className="text-lg font-bold text-green-900">Bid Submitted</h4>
                        <p className="text-green-700 text-sm">We'll notify you when the owner reviews your estimate.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleBid} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">Bid Amount ($)</label>
                            <input required type="number" className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 outline-none text-sm font-mono" placeholder="0.00" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 ml-1">Duration (Days)</label>
                            <input required type="number" className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 outline-none text-sm font-mono" placeholder="30" />
                        </div>
                        <Button className="w-48 h-[46px] shadow-lg shadow-slate-900/10">Submit Bid</Button>
                        </form>
                    )}
                  </div>
               </section>
            </div>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 bg-white border border-slate-200 rounded-xl">
             <div className="text-center">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="opacity-50" />
                 </div>
                 <p className="font-medium">Select a project to view details</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};