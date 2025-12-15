import React from 'react';
import { Command, ArrowRight, Check, Zap, BarChart3, Users, ChevronDown, Upload, Sliders, PlayCircle } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-black selection:text-white overflow-x-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-x-12 {
          transform: rotateX(12deg) rotateY(-4deg) rotateZ(1deg);
        }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-[#fafafa]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-[4px] flex items-center justify-center text-white">
              <Command size={12} strokeWidth={3} />
            </div>
            <span className="text-sm font-bold tracking-tight">Clario</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-slate-500">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-black transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[13px] font-medium text-slate-500 hover:text-black transition-colors">Log in</button>
            <button 
                onClick={onEnterApp}
                className="bg-black text-white text-[13px] font-semibold px-4 py-1.5 rounded-full hover:bg-slate-800 transition-all shadow-md active:scale-95 flex items-center gap-1"
            >
              Get Started <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-6 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wide uppercase text-slate-500">v2.0 Now Available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            The CRM your team will <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">actually enjoy using.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Stop fighting with clunky software. Clario is designed for speed, clarity, and focus. Manage relationships without the noise.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            <button 
                onClick={onEnterApp}
                className="h-12 px-8 rounded-full bg-black text-white text-[15px] font-semibold hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2"
            >
              Start for free <ArrowRight size={16} />
            </button>
            <button className="h-12 px-8 rounded-full bg-white border border-slate-200 text-slate-900 text-[15px] font-medium hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-2">
              <PlayCircle size={16} /> Watch Demo
            </button>
          </div>
        </div>

        {/* 3D Dashboard Preview */}
        <div className="mt-20 md:mt-32 max-w-6xl mx-auto perspective-1000 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <div className="relative group rotate-x-12 hover:rotate-0 transition-transform duration-1000 ease-out">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#fafafa] rounded-xl border border-slate-200 shadow-2xl overflow-hidden aspect-[16/9]">
              {/* Fake UI Header */}
              <div className="h-10 bg-white border-b border-slate-100 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
                <div className="ml-4 h-5 w-64 bg-slate-50 rounded-md border border-slate-100" />
              </div>
              {/* Fake UI Body */}
              <div className="p-6 grid grid-cols-4 gap-6 h-full bg-slate-50/50">
                 <div className="col-span-1 space-y-3">
                    <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-slate-100 rounded" />
                    <div className="space-y-2 mt-6">
                        <div className="h-10 w-full bg-white rounded border border-slate-100 shadow-sm" />
                        <div className="h-10 w-full bg-white rounded border border-slate-100 shadow-sm" />
                        <div className="h-10 w-full bg-white rounded border border-slate-100 shadow-sm" />
                    </div>
                 </div>
                 <div className="col-span-3 space-y-6">
                    <div className="flex gap-4">
                        <div className="h-24 flex-1 bg-white rounded border border-slate-100 shadow-sm" />
                        <div className="h-24 flex-1 bg-white rounded border border-slate-100 shadow-sm" />
                        <div className="h-24 flex-1 bg-white rounded border border-slate-100 shadow-sm" />
                    </div>
                    <div className="h-64 w-full bg-white rounded border border-slate-100 shadow-sm" />
                 </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -right-12 top-20 bg-white p-4 rounded-lg shadow-xl border border-slate-100 animate-float hidden md:block">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Check size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-900">Deal Closed</div>
                        <div className="text-[10px] text-slate-500">Acme Corp • $12,000</div>
                    </div>
                </div>
            </div>
            <div className="absolute -left-8 bottom-12 bg-white p-4 rounded-lg shadow-xl border border-slate-100 animate-float hidden md:block" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Users size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-900">New Lead</div>
                        <div className="text-[10px] text-slate-500">Sarah Connor added</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Everything you need, nothing you don't.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Built for modern sales teams who value speed over complexity.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Interactions under 100ms. No loading spinners." },
            { icon: Sliders, title: "Customizable Pipelines", desc: "Drag and drop stages to match your exact workflow." },
            { icon: BarChart3, title: "Instant Analytics", desc: "Real-time insights without configuring complex reports." },
            { icon: Users, title: "Team Collaboration", desc: "Share notes, tasks, and activity logs instantly." },
            { icon: Command, title: "Keyboard First", desc: "Navigate the entire app without lifting your hands." },
            { icon: Upload, title: "Easy Import", desc: "Migrate from Excel or other CRMs in seconds." }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 text-slate-900 group-hover:bg-black group-hover:text-white transition-colors">
                <feature.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline / How it Works */}
      <section id="how-it-works" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-16 text-center">From Lead to Deal in Minutes</h2>
           
           <div className="relative">
             {/* Vertical Line */}
             <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-slate-200" />

             {[
               { step: "01", title: "Import Data", desc: "Upload your CSV or sync with your existing tools.", icon: Upload },
               { step: "02", title: "Map Pipeline", desc: "Customize stages to fit your sales process.", icon: Sliders },
               { step: "03", title: "Track Activity", desc: "Log calls, emails, and tasks with zero friction.", icon: Check },
               { step: "04", title: "Close Deals", desc: "Move leads to 'Won' and celebrate with the team.", icon: Zap }
             ].map((item, i) => (
               <div key={i} className="relative pl-24 pb-16 last:pb-0 group">
                 {/* Dot */}
                 <div className="absolute left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-black group-hover:scale-125 transition-all z-10" />
                 
                 <div className="flex items-start gap-4">
                    <div className="hidden md:flex flex-col items-center gap-1 opacity-30 font-mono text-xs">
                        {item.step}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-500">{item.desc}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#fafafa]">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Loved by founders and sales leaders</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { quote: "Finally, a CRM that doesn't feel like a spreadsheet from 1999. It's actually beautiful.", author: "Sarah J.", role: "CEO, StartUp" },
                    { quote: "The speed is incredible. We save hours every week just on data entry.", author: "Mark T.", role: "VP Sales, TechFlow" },
                    { quote: "Minimalist perfection. Exactly what we needed to focus on closing.", author: "Elena R.", role: "Founder, DesignCo" }
                ].map((t, i) => (
                    <div key={i} className="p-8 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
                            <div>
                                <div className="text-sm font-bold text-slate-900">{t.author}</div>
                                <div className="text-xs text-slate-500">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-slate-500">Start for free, upgrade as you grow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Starter</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-sm font-normal text-slate-500">/mo</span></div>
                <ul className="space-y-3 mb-8">
                    {['Up to 50 leads', 'Basic Kanban', '1 User'].map(f => (
                        <li key={f} className="flex gap-2 text-sm text-slate-600"><Check size={16} className="text-slate-900"/> {f}</li>
                    ))}
                </ul>
                <button onClick={onEnterApp} className="w-full py-3 rounded-lg border border-slate-200 font-medium hover:border-slate-900 transition-colors">Get Started</button>
            </div>

            {/* Pro */}
            <div className="relative p-8 rounded-2xl bg-black text-white shadow-2xl scale-105 z-10">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                <h3 className="font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-6">$29<span className="text-sm font-normal text-slate-400">/mo</span></div>
                <ul className="space-y-3 mb-8">
                    {['Unlimited Leads', 'Advanced Analytics', 'Email Integration', 'Priority Support'].map(f => (
                        <li key={f} className="flex gap-2 text-sm text-slate-300"><Check size={16} className="text-white"/> {f}</li>
                    ))}
                </ul>
                <button onClick={onEnterApp} className="w-full py-3 rounded-lg bg-white text-black font-bold hover:bg-slate-100 transition-colors">Start Free Trial</button>
            </div>

             {/* Business */}
             <div className="p-8 rounded-2xl bg-white border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Business</h3>
                <div className="text-4xl font-bold mb-6">$99<span className="text-sm font-normal text-slate-500">/mo</span></div>
                <ul className="space-y-3 mb-8">
                    {['Unlimited Users', 'Custom Fields', 'API Access', 'Dedicated Manager'].map(f => (
                        <li key={f} className="flex gap-2 text-sm text-slate-600"><Check size={16} className="text-slate-900"/> {f}</li>
                    ))}
                </ul>
                <button onClick={onEnterApp} className="w-full py-3 rounded-lg border border-slate-200 font-medium hover:border-slate-900 transition-colors">Contact Sales</button>
            </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {[
                    { q: "Can I import my data from Excel?", a: "Yes! We support CSV imports that map directly to your pipeline fields." },
                    { q: "Is there a mobile app?", a: "Clario is fully responsive and works perfectly on mobile browsers. Native apps coming soon." },
                    { q: "How secure is my data?", a: "We use enterprise-grade encryption and daily backups to ensure your data is safe." }
                ].map((item, i) => (
                    <details key={i} className="group bg-white rounded-lg border border-slate-200 open:shadow-sm transition-all">
                        <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-slate-900">
                            {item.q}
                            <ChevronDown className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-black rounded-[2px]" />
                <span className="font-bold text-sm">Clario CRM</span>
            </div>
            <div className="text-slate-500 text-sm">
                © 2024 Clario Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
                <a href="#" className="hover:text-black">Privacy</a>
                <a href="#" className="hover:text-black">Terms</a>
                <a href="#" className="hover:text-black">Twitter</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;