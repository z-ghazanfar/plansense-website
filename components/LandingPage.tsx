import React from 'react';
import { ArrowRight, Layers, DollarSign, Users, CheckCircle2, Zap, BarChart3, Shield, Play, Star, ChevronRight, Building, HardHat, Briefcase, BookOpen, FileQuestion, HelpCircle } from 'lucide-react';
import { Button, Logo } from './UI';

export const LandingPage: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
           <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <Logo showTagline={false} />
           </div>
           
           <div className="hidden md:flex items-center gap-8">
             <button onClick={() => scrollToSection('platform')} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Platform</button>
             <button onClick={() => scrollToSection('solutions')} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Solutions</button>
             <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Pricing</button>
             <button onClick={() => scrollToSection('resources')} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Resources</button>
           </div>
           
           <div className="flex gap-4 items-center">
             <button onClick={onEnterApp} className="text-sm font-semibold text-slate-700 hover:text-slate-900">Log in</button>
             <Button onClick={onEnterApp} className="shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 transition-all">
                Get Started
             </Button>
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                   New: Gemini 2.5 Integration Live
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-slate-900 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                   The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pre-Construction.</span>
                </h1>
                
                <p className="text-xl text-slate-500 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                   Stop manually counting rooms. Plansense uses multimodal AI to analyze blueprints, estimate costs, and procure bids in seconds, not days.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                   <Button onClick={onEnterApp} className="h-14 px-8 text-base shadow-xl shadow-slate-900/10 hover:scale-105 transition-transform">
                      Start Free Analysis <ArrowRight size={18} />
                   </Button>
                   <Button onClick={onEnterApp} variant="secondary" className="h-14 px-8 text-base hover:bg-slate-50 border-slate-200">
                      <Play size={18} className="mr-2 fill-slate-900" /> Watch Demo
                   </Button>
                </div>

                <div className="mt-10 flex items-center gap-4 text-sm text-slate-400 font-medium animate-in fade-in duration-1000 delay-500">
                    <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 font-bold overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+20}`} alt="User" />
                            </div>
                        ))}
                    </div>
                    <p>Used by 10,000+ estimators worldwide</p>
                </div>
            </div>

            {/* Abstract Hero Visual */}
            <div className="relative lg:h-[700px] flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -z-10" />
                
                {/* Mock UI Card */}
                <div className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-700">
                    <div className="absolute top-0 w-full h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                        </div>
                        <div className="ml-4 w-64 h-6 bg-white rounded-md border border-slate-200 shadow-sm flex items-center px-3 text-[10px] text-slate-400">
                            plansense.app/project/tower-one
                        </div>
                    </div>
                    <div className="pt-12 p-6 flex gap-6 h-full bg-slate-50/50">
                        <div className="w-1/4 space-y-3">
                            <div className="h-24 bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                                <div className="w-8 h-8 rounded bg-blue-50 mb-2"></div>
                                <div className="h-2 w-16 bg-slate-100 rounded mb-1"></div>
                                <div className="h-2 w-10 bg-slate-100 rounded"></div>
                            </div>
                            <div className="h-24 bg-white rounded-xl border border-slate-200 shadow-sm opacity-60"></div>
                            <div className="h-24 bg-white rounded-xl border border-slate-200 shadow-sm opacity-40"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative overflow-hidden">
                             {/* Blueprint Lines */}
                             <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                             <div className="border-2 border-slate-900 w-2/3 h-2/3 absolute top-10 left-10 rounded-sm"></div>
                             <div className="border-2 border-slate-900 w-1/3 h-1/3 absolute top-10 right-10 rounded-sm"></div>
                             <div className="bg-blue-500/20 border border-blue-500 absolute top-10 left-10 w-2/3 h-2/3 flex items-center justify-center text-blue-700 font-bold text-xs">Living Area</div>
                             
                             {/* Floating Tooltip */}
                             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl">
                                450 sqft Detected
                             </div>
                        </div>
                    </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Cost Savings</div>
                        <div className="text-sm font-bold text-slate-900">$12,450.00</div>
                    </div>
                </div>
            </div>
         </div>
      </header>

      {/* Metrics Section */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "Blueprints Processed", value: "2.5M+" },
                    { label: "Estimated Value", value: "$500M+" },
                    { label: "Accuracy Rate", value: "99.8%" },
                    { label: "Time Saved", value: "85%" }
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 tracking-tight">{stat.value}</div>
                        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Platform Section (Features) */}
      <div id="platform">
        {/* Feature 1: Takeoffs */}
        <section className="py-24 overflow-hidden">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1 relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50 -z-10" />
                      <img 
                          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000" 
                          alt="Architect analyzing blueprint" 
                          className="rounded-2xl shadow-2xl border border-slate-100 grayscale hover:grayscale-0 transition-all duration-500"
                      />
                  </div>
                  <div className="order-1 lg:order-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                          <Layers size={24} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                          Computer Vision that sees like an Architect.
                      </h2>
                      <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                          Upload any PDF or image. Our AI instantly identifies rooms, walls, doors, and windows, generating a structured digital twin of your floor plan in seconds.
                      </p>
                      <ul className="space-y-4">
                          {[
                              "Automatic room labeling and categorization",
                              "Precise square footage calculation",
                              "Detects circulation zones (hallways, stairs)",
                              "Exports to CAD, PDF, and Excel"
                          ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-slate-700">
                                  <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
           </div>
        </section>

        {/* Feature 2: Estimation */}
        <section className="py-24 bg-slate-50">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                          <DollarSign size={24} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                          Dynamic Estimates linked to Real-Market Rates.
                      </h2>
                      <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                          Forget static spreadsheets. Plansense maps your takeoff data directly to a live database of material and labor costs specific to your zip code.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FeatureBox icon={<BarChart3 size={20} />} title="Live Pricing" desc="Updates daily based on local supplier data." />
                          <FeatureBox icon={<Zap size={20} />} title="Smart Assemblies" desc="Group materials (drywall + paint + labor) in one click." />
                      </div>
                  </div>
                  <div className="relative">
                       {/* Abstract Representation of a Table/Spreadsheet */}
                       <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                          <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4">
                              <div className="flex gap-2">
                                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                              </div>
                          </div>
                          <div className="p-6 space-y-4">
                               {[1, 2, 3, 4].map((i) => (
                                   <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-default">
                                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">0{i}</div>
                                      <div className="flex-1">
                                          <div className="h-2 w-32 bg-slate-200 rounded mb-1.5"></div>
                                          <div className="h-2 w-20 bg-slate-100 rounded"></div>
                                      </div>
                                      <div className="text-right">
                                          <div className="h-2 w-16 bg-slate-800 rounded mb-1.5 ml-auto"></div>
                                      </div>
                                   </div>
                               ))}
                               <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                  <span className="font-bold text-slate-900">Total Estimate</span>
                                  <span className="text-xl font-bold text-emerald-600">$142,500.00</span>
                               </div>
                          </div>
                       </div>
                  </div>
              </div>
           </div>
        </section>

        {/* Feature 3: Marketplace */}
        <section className="py-24">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl text-purple-600 mb-6">
                      <Users size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      The fastest way to procure bids.
                  </h2>
                  <p className="text-lg text-slate-500">
                      Publish your vetted scope to the Plansense Marketplace. Connect with top-rated General Contractors who are ready to build.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  <MarketplaceCard 
                      role="Architects" 
                      title="Instant Feasibility" 
                      desc="Get rough order of magnitude pricing for clients before finishing the design." 
                  />
                  <MarketplaceCard 
                      role="Owners" 
                      title="Apples-to-Apples Bids" 
                      desc="Receive standardized proposals that are easy to compare and award." 
                  />
                  <MarketplaceCard 
                      role="Contractors" 
                      title="Quality Leads" 
                      desc="Access projects with completed takeoffs and verified budgets. No more tire kickers." 
                  />
              </div>
           </div>
        </section>
      </div>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-2 block">Solutions</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for every stakeholder</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Whether you are designing, building, or paying for the project, Plansense aligns the team on cost and scope.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6">
                        <HardHat className="text-blue-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">General Contractors</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Stop printing paper plans. Use AI to count every fixture and calculate every square foot in seconds. Win more bids by turning them around faster than the competition.
                    </p>
                    <a href="#" className="text-blue-400 text-sm font-semibold flex items-center hover:text-blue-300">
                        Explore GC Features <ArrowRight size={14} className="ml-1" />
                    </a>
                </div>

                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6">
                        <Briefcase className="text-blue-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Subcontractors</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Verify quantities instantly. Don't rely on the GC's numbers. Protect your margins with your own rapid takeoffs and catch scope gaps before signing.
                    </p>
                    <a href="#" className="text-blue-400 text-sm font-semibold flex items-center hover:text-blue-300">
                        For Trades <ArrowRight size={14} className="ml-1" />
                    </a>
                </div>

                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-6">
                        <Building className="text-blue-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Real Estate Developers</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Instant feasibility. Know if a project pencils out before you even hire an architect. Get rough order of magnitude costs in minutes, not weeks.
                    </p>
                    <a href="#" className="text-blue-400 text-sm font-semibold flex items-center hover:text-blue-300">
                        For Developers <ArrowRight size={14} className="ml-1" />
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
                <p className="text-slate-500 text-lg">Start for free, scale as you grow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Starter */}
                <div className="p-8 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col">
                    <div className="mb-4">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">Starter</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-slate-900">$0</span>
                        <span className="text-slate-500">/month</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-8">Perfect for independent contractors trying out AI takeoffs.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> 3 Projects per month</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Basic Takeoffs (PDF only)</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Community Support</li>
                    </ul>
                    <Button variant="outline" onClick={onEnterApp} className="w-full">Get Started Free</Button>
                </div>

                {/* Pro */}
                <div className="p-8 rounded-2xl border-2 border-blue-600 bg-white shadow-xl relative flex flex-col transform scale-105 z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                    <div className="mb-4 mt-2">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">Pro</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-slate-900">$99</span>
                        <span className="text-slate-500">/month</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-8">For professional estimators requiring accuracy and speed.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Unlimited Projects</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Advanced AI Takeoffs (PDF, PNG, DWG)</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Cost Estimation Database</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Export to Excel & Procore</li>
                    </ul>
                    <Button variant="primary" onClick={onEnterApp} className="w-full bg-blue-600 hover:bg-blue-700">Start Pro Trial</Button>
                </div>

                {/* Enterprise */}
                <div className="p-8 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col">
                    <div className="mb-4">
                        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">Enterprise</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-slate-900">Custom</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-8">For large teams and custom integrations.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> API Access</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> SSO & Advanced Security</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Dedicated Success Manager</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-blue-500" /> Custom Cost Catalogs</li>
                    </ul>
                    <Button variant="outline" onClick={onEnterApp} className="w-full">Contact Sales</Button>
                </div>
            </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Resources to help you build better</h2>
                    <p className="text-slate-500">Guides, tutorials, and industry insights.</p>
                  </div>
                  <Button variant="outline" className="hidden md:flex">View all resources</Button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                  <div className="col-span-2 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group">
                      <div>
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-4">Case Study</span>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">How Acme Corp reduced estimation time by 75%</h3>
                          <p className="text-slate-500">Learn how a mid-sized GC leveraged AI to bid on twice as many projects without hiring more staff.</p>
                      </div>
                      <div className="mt-8 flex items-center text-sm font-bold text-blue-600">Read Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" /></div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                          <BookOpen size={20} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Documentation</h4>
                      <p className="text-xs text-slate-500 mb-4">Technical guides for API integration and data export.</p>
                      <span className="text-xs font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 group-hover:decoration-blue-500 transition-all">View Docs</span>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                          <HelpCircle size={20} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Help Center</h4>
                      <p className="text-xs text-slate-500 mb-4">Step-by-step tutorials on using the takeoff tool.</p>
                      <span className="text-xs font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 group-hover:decoration-blue-500 transition-all">Visit Help Center</span>
                  </div>
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-16 text-slate-900">Trusted by modern construction teams</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <Testimonial 
                    quote="Plansense cut our pre-con time by 70%. The visual takeoff tool is intuitive and the AI accuracy is scary good."
                    author="Sarah Jenkins"
                    role="Principal Architect, Studio One"
                />
                <Testimonial 
                    quote="Finally, a tool that bridges the gap between design and cost. My clients love the transparency of the estimates."
                    author="Michael Chen"
                    role="Developer, Urban Core"
                />
                <Testimonial 
                    quote="We win more work because we can turn around accurate bids in hours instead of weeks."
                    author="David Rossi"
                    role="Estimator, BuildRight Construction"
                />
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
         <div className="max-w-4xl mx-auto bg-blue-600 rounded-3xl p-12 md:p-20 shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to build smarter?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                    Join thousands of construction professionals using Plansense to streamline their workflow.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={onEnterApp} className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                        Start Your Free Trial
                    </button>
                    <button onClick={onEnterApp} className="px-8 py-4 bg-blue-700 text-white rounded-xl font-bold border border-blue-500 hover:bg-blue-800 transition-colors">
                        Talk to Sales
                    </button>
                </div>
                <p className="mt-6 text-sm text-blue-200 opacity-80">No credit card required • 14-day free trial</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <Logo showTagline={true} className="mb-4" />
                    <p className="text-sm text-slate-500 mb-4">
                        The AI-powered operating system for the built world.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Placeholders */}
                        <div className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"></div>
                        <div className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"></div>
                        <div className="w-8 h-8 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"></div>
                    </div>
                </div>
                
                <FooterColumn title="Product" links={['Features', 'Integrations', 'Pricing', 'Changelog']} />
                <FooterColumn title="Company" links={['About Us', 'Careers', 'Blog', 'Contact']} />
                <FooterColumn title="Legal" links={['Privacy Policy', 'Terms of Service', 'Security', 'Status']} />
            </div>
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                <div>&copy; {new Date().getFullYear()} Plansense Inc. All rights reserved.</div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-slate-600">Privacy</a>
                    <a href="#" className="hover:text-slate-600">Terms</a>
                    <a href="#" className="hover:text-slate-600">Sitemap</a>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

const FeatureBox: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
    <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
        <div className="text-emerald-600 mb-2">{icon}</div>
        <div className="font-bold text-slate-900 text-sm mb-1">{title}</div>
        <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
    </div>
);

const MarketplaceCard: React.FC<{ role: string; title: string; desc: string }> = ({ role, title, desc }) => (
    <div className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">{role}</div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
        <div className="flex items-center text-blue-600 font-semibold text-sm group">
            Learn more <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
    </div>
);

const Step: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="relative p-6 border border-slate-700 rounded-2xl bg-slate-800/50">
        <div className="text-4xl font-black text-slate-700 absolute -top-5 left-6 bg-slate-900 px-2">{number}</div>
        <h3 className="text-xl font-bold mb-3 mt-4 text-white">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

const Testimonial: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
    <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex gap-1 text-amber-400 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
        </div>
        <p className="text-slate-700 italic mb-6 leading-relaxed">"{quote}"</p>
        <div>
            <div className="font-bold text-slate-900 text-sm">{author}</div>
            <div className="text-xs text-slate-500">{role}</div>
        </div>
    </div>
);

const FooterColumn: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
    <div>
        <h4 className="font-bold text-slate-900 mb-4">{title}</h4>
        <ul className="space-y-2">
            {links.map(link => (
                <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{link}</a>
                </li>
            ))}
        </ul>
    </div>
);