import { motion } from 'framer-motion';
import { Shield, Filter, Download, Search, CheckCircle, AlertTriangle, Eye, ShieldAlert } from 'lucide-react';

const auditLogs = [
  { id: 'TRX-9982', date: '30 Jul, 14:32', user: 'Promotor João S.', action: 'Aprovação de Minuta', context: 'Relatoria Assistida', status: 'success' },
  { id: 'TRX-9981', date: '30 Jul, 14:15', user: 'Sistema Aequitas', action: 'Correição Massiva (Lote #42)', context: '450 Processos Analisados', status: 'success' },
  { id: 'TRX-9980', date: '30 Jul, 11:05', user: 'Sistema Aequitas', action: 'Alerta de Prescrição Iminente', context: 'Processo 001/2026', status: 'warning' },
  { id: 'TRX-9979', date: '29 Jul, 18:40', user: 'Promotora Maria O.', action: 'Edição Manual Pós-IA', context: 'Copiloto', status: 'success' },
  { id: 'TRX-9978', date: '29 Jul, 15:22', user: 'Sistema Aequitas', action: 'Alucinação Fática Detectada', context: 'Autocorreção (RLHF)', status: 'danger' },
  { id: 'TRX-9977', date: '29 Jul, 10:10', user: 'Corregedor Silva', action: 'Ajuste de Temperatura IA', context: 'Configurações de Sistema', status: 'success' },
];

export default function Auditoria() {
  return (
    <motion.div 
      className="h-[calc(100vh-120px)] w-full flex flex-col gap-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Trilha de Auditoria</h1>
          <p className="text-text-secondary mt-2 text-base">Registro imutável de ações humanas e interferências da IA para garantia de conformidade.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-bg-surface border border-border-hover rounded-lg text-base font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Filter size={18} /> Filtros
          </button>
          <button className="px-5 py-2.5 bg-primary-600 text-white rounded-lg text-base font-medium hover:bg-primary-500 transition-colors shadow-premium flex items-center gap-2">
            <Download size={18} /> Exportar Logs
          </button>
        </div>
      </div>

      <div className="flex-1 bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between bg-bg-app/30 shrink-0">
          <div className="flex items-center gap-3">
            <Shield className="text-primary-600" size={20} />
            <h3 className="font-semibold text-text-primary text-lg">Registros do Sistema</h3>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por ID, usuário ou contexto..." 
              className="w-full bg-bg-surface border border-border-subtle focus:border-primary-500 rounded-lg pl-10 pr-4 py-2.5 text-base outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-text-muted uppercase tracking-wide bg-bg-surface sticky top-0 border-b border-border-subtle shadow-sm z-10">
              <tr>
                <th className="px-6 py-5 font-semibold">ID</th>
                <th className="px-6 py-5 font-semibold">Data / Hora</th>
                <th className="px-6 py-5 font-semibold">Ator (Usuário/IA)</th>
                <th className="px-6 py-5 font-semibold">Ação Registrada</th>
                <th className="px-6 py-5 font-semibold">Contexto</th>
                <th className="px-6 py-5 font-semibold text-center">Auditar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-bg-app/50 transition-colors group text-base">
                  <td className="px-6 py-5 font-mono text-sm text-text-muted">{log.id}</td>
                  <td className="px-6 py-5 text-text-secondary">{log.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 font-medium text-text-primary">
                      {log.user === 'Sistema Aequitas' ? <ShieldAlert size={18} className="text-primary-600" /> : <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                      {log.user}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      {log.status === 'success' && <CheckCircle size={18} className="text-success" />}
                      {log.status === 'warning' && <AlertTriangle size={18} className="text-alert-warning" />}
                      {log.status === 'danger' && <ShieldAlert size={18} className="text-alert-critical" />}
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-text-muted">{log.context}</td>
                  <td className="px-6 py-5 text-center">
                    <button className="p-2 rounded-lg text-text-muted hover:text-primary-600 hover:bg-primary-50 transition-colors">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
