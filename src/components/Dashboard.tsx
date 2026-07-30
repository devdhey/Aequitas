import { motion, type Variants } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle, FileCheck, CheckCircle2, ArrowUpRight, Cpu } from 'lucide-react';

const dataProductivity = [
  { name: 'Seg', analises: 120, omissoes: 10 },
  { name: 'Ter', analises: 180, omissoes: 12 },
  { name: 'Qua', analises: 250, omissoes: 8 },
  { name: 'Qui', analises: 210, omissoes: 15 },
  { name: 'Sex', analises: 290, omissoes: 5 },
  { name: 'Sáb', analises: 80, omissoes: 2 },
  { name: 'Dom', analises: 342, omissoes: 18 },
];

const sparklineData1 = dataProductivity.map(d => ({ value: d.analises }));
const sparklineData2 = dataProductivity.map(d => ({ value: d.omissoes }));

const recentActivity = [
  { id: 1, promotoria: '1ª Promotoria Criminal', status: 'Concluído', tipo: 'Correição em Lote', score: '92/100', tempo: 'Há 5 min' },
  { id: 2, promotoria: '2ª Promotoria Cível', status: 'Revisão', tipo: 'Alucinação Fática Detectada', score: '74/100', tempo: 'Há 12 min' },
  { id: 3, promotoria: 'Promotoria de Família', status: 'Concluído', tipo: 'Extração de Fundamentos', score: '98/100', tempo: 'Há 45 min' },
  { id: 4, promotoria: 'Promotoria Infância', status: 'Erro', tipo: 'Inércia Processual Crítica', score: '60/100', tempo: 'Há 2 horas' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  return (
    <motion.div 
      className="w-full mx-auto space-y-8 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      
      {/* Header section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Visão Geral</h1>
          <p className="text-text-secondary mt-2 text-lg">Acompanhamento em tempo real da produtividade correcional e inferências da IA.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-bg-surface border border-border-hover rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Exportar Relatório
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-500 transition-colors shadow-premium flex items-center gap-2">
            <Cpu size={16} />
            <span>Nova Correição Massiva</span>
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard 
          title="Peças Analisadas" 
          value="342" 
          trend="+18%" 
          trendUp={true} 
          subtitle="vs. ontem (289)"
          icon={<FileCheck size={18} className="text-text-muted" />}
          sparklineData={sparklineData1}
          color="#10b981"
        />
        <KpiCard 
          title="Escore Global" 
          value="85" 
          trend="+2%" 
          trendUp={true} 
          subtitle="média móvel 7d"
          icon={<CheckCircle2 size={18} className="text-success" />}
        />
        <KpiCard 
          title="Inércias Identificadas" 
          value="18" 
          trend="+4" 
          trendUp={false} 
          subtitle="casos críticos > 60d"
          icon={<AlertTriangle size={18} className="text-alert-critical" />}
          sparklineData={sparklineData2}
          color="#ef4444"
        />
        <KpiCard 
          title="Insights Gerados" 
          value="1.204" 
          trend="+42%" 
          trendUp={true} 
          subtitle="sugestões de IA aceitas"
          icon={<SparklesIcon />}
          sparklineData={sparklineData1}
          color="#3b82f6"
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-bg-surface border border-border-subtle rounded-radius-premium p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-text-primary text-lg">Evolução de Produtividade</h3>
              <p className="text-base text-text-secondary mt-1">Volume de análises vs Omissões detectadas</p>
            </div>
            <select className="text-base bg-bg-app border border-border-subtle rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-primary-500">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataProductivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAnalises" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f2937" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1f2937" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="analises" stroke="#1f2937" strokeWidth={2} fillOpacity={1} fill="url(#colorAnalises)" activeDot={{ r: 6, fill: '#1f2937', stroke: '#fff', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="omissoes" stroke="#ef4444" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Mini Dashboard */}
        <div className="bg-bg-surface border border-border-subtle rounded-radius-premium p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold text-text-primary mb-1 text-lg">Qualidade da IA</h3>
          <p className="text-lg text-text-secondary mb-6">Métricas do modelo Aequitas-LLM</p>
          
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span className="text-text-secondary">Confiabilidade Média (Confidence)</span>
                <span className="font-semibold text-text-primary">94.2%</span>
              </div>
              <div className="h-2 w-full bg-bg-app rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '94.2%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-primary-600 rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span className="text-text-secondary">Alucinações Detectadas (HAM)</span>
                <span className="font-semibold text-alert-critical">1.8%</span>
              </div>
              <div className="h-2 w-full bg-bg-app rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '1.8%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-alert-critical rounded-full" />
              </div>
              <p className="text-base text-text-muted mt-1 text-right">Limiar TR: &lt;= 10%</p>
            </div>

            <div className="p-5 bg-ia-highlight/20 rounded-radius-inner border border-ia-highlight/40 mt-auto">
              <div className="flex items-start gap-3">
                <SparklesIcon />
                <div>
                  <h4 className="text-base font-semibold text-yellow-800">Destaque do Copiloto</h4>
                  <p className="text-base text-yellow-700/80 mt-1.5 leading-relaxed">
                    A IA evitou 3 prescrições iminentes na 1ª Vara Criminal nesta semana, embasada no Art. 109, CPP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Recent Activity Table */}
      <motion.div variants={itemVariants} className="bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between">
          <h3 className="font-semibold text-text-primary text-xl">Auditoria de Operações (Top 4)</h3>
          <button className="text-base font-medium text-text-muted hover:text-text-primary flex items-center gap-1">
            Ver todas <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm font-semibold text-text-muted uppercase tracking-wider bg-bg-app/50 border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Unidade Analisada</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Descoberta Principal</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Escore</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-3 font-semibold tracking-wider text-right">Ocorrência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {recentActivity.map((row) => (
                <tr key={row.id} className="hover:bg-bg-app/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-text-primary">{row.promotoria}</td>
                  <td className="px-6 py-4 text-text-secondary">{row.tipo}</td>
                  <td className="px-6 py-4 font-mono text-sm">{row.score}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider
                      ${row.status === 'Concluído' ? 'bg-success/10 text-success' : ''}
                      ${row.status === 'Revisão' ? 'bg-alert-warning/10 text-yellow-700' : ''}
                      ${row.status === 'Erro' ? 'bg-alert-critical/10 text-alert-critical' : ''}
                    `}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-text-muted text-sm whitespace-nowrap">{row.tempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </motion.div>
  );
}

function KpiCard({ title, value, trend, trendUp, subtitle, icon, sparklineData, color }: any) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-radius-premium p-5 shadow-sm hover:shadow-hover hover:border-border-hover transition-all group flex flex-col justify-between h-40 relative overflow-hidden">
        <div className="flex justify-between items-start z-10 relative">
        <h3 className="text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors">{title}</h3>
        <div className="p-2 bg-bg-app rounded-lg group-hover:bg-primary-50 transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 z-10 relative">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-text-primary tabular-nums">{value}</span>
          <div className={`flex items-center text-sm font-semibold px-2 py-0.5 rounded ${trendUp ? 'bg-success/10 text-success' : 'bg-alert-critical/10 text-alert-critical'}`}>
            {trendUp ? <TrendingUp size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1 rotate-180" />}
            {trend}
          </div>
        </div>
        <p className="text-base text-text-muted mt-2">{subtitle}</p>
      </div>

      {/* Sparkline Background */}
      {sparklineData && (
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
