import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, Search, Database, TrendingUp, RefreshCcw, ExternalLink, Target, Eye } from 'lucide-react';

const riskTrend = [
  { name: 'Jan', score: 88 },
  { name: 'Feb', score: 82 },
  { name: 'Mar', score: 85 },
  { name: 'Apr', score: 78 },
  { name: 'May', score: 74.5 },
];

const findingDistribution = [
  { name: 'PII', value: 1420 },
  { name: 'PHI', value: 320 },
  { name: 'PCI', value: 85 },
  { name: 'Confidential', value: 12400 },
];

const COLORS = ['#e11d48', '#f59e0b', '#3b82f6', '#6366f1'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Privacy Risk Board</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl font-medium">Global data classification visibility and sensitive discovery analytics.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Trigger Global Scan
          </button>
          <button className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-rose-900/40 flex items-center gap-2">
             <Search size={18} /> Discover Findings
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Global Risk Score" value="74.5" change="-12.2" icon={<ShieldAlert className="text-rose-400" />} />
        <StatCard title="Sensitive Assets" value="3,200" change="+42" icon={<Database className="text-sky-400" />} />
        <StatCard title="Total Findings" value="14.2K" change="Critical" icon={<Eye className="text-amber-400" />} />
        <StatCard title="Discovery Rate" value="99.8%" change="Optimal" icon={<TrendingUp className="text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Trend */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-rose-600 rounded-full"></span>
              Enterprise Risk Trend (%)
            </h2>
            <div className="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] bg-rose-900/20 px-4 py-2 rounded-full border border-rose-800/50">Decreasing Risk Profile</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrend}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#e11d48" strokeWidth={4} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Finding Distribution */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              Sensitivity Distribution
            </h2>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold italic">
               <Target size={20} />
               Critical Data Map
            </div>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={findingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {findingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Discovery Findings Hub */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3 text-rose-400 uppercase tracking-widest">
           <Database size={28} />
           Sensitive Domain findings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <FindingCard name="Structured SQL" count="1,240" risk="High" color="text-rose-400" />
           <FindingCard name="Object Storage" count="8,400" risk="Critical" color="text-rose-600" />
           <FindingCard name="M365 / Emails" count="4,585" risk="Medium" color="text-sky-400" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-rose-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-1000 rotate-12">
       {React.cloneElement(icon, { size: 160 })}
    </div>
    <div className="relative z-10">
      <div className="p-4 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('-') || change === 'Optimal' ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const FindingCard = ({ name, count, risk, color }: any) => (
  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl hover:bg-slate-800/50 transition cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-slate-100">{name}</h3>
      <span className={`text-2xl font-black ${color}`}>{risk}</span>
    </div>
    <div className="flex justify-between items-center mt-8">
       <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">{count} Findings</span>
       <ExternalLink size={14} className="text-slate-700 group-hover:text-white transition" />
    </div>
  </div>
);

export default Dashboard;
