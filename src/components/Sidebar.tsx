import { 
  LayoutDashboard, 
  MessageSquare, 
  Scale, 
  BookOpen, 
  FileText, 
  History,
  Settings,
  Sparkles
} from 'lucide-react';
import type { Screen } from '../App';
import { motion } from 'framer-motion';

export default function Sidebar({ activeScreen, setActiveScreen }: { activeScreen: Screen, setActiveScreen: (s: Screen) => void }) {
  return (
    <aside className="w-64 bg-bg-surface border-r border-border-subtle flex flex-col hidden md:flex shrink-0 z-20">
      <div className="h-16 flex items-center px-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
            <Scale size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary-600">Aequitas</span>
        </div>
      </div>
      
      <div className="px-6 py-4">
        <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Principal</div>
        <nav className="space-y-1">
          <NavItem active={activeScreen === 'painel'} onClick={() => setActiveScreen('painel')} icon={<LayoutDashboard size={18} />} label="Painel Inicial" />
          <NavItem active={activeScreen === 'copiloto'} onClick={() => setActiveScreen('copiloto')} icon={<MessageSquare size={18} />} label="Copiloto (Membro)" badge="IA" />
        </nav>

        <div className="text-sm font-bold text-text-muted uppercase tracking-widest mt-8 mb-3">Módulos</div>
        <nav className="space-y-1">
          <NavItem active={activeScreen === 'correicao'} onClick={() => setActiveScreen('correicao')} icon={<Scale size={18} />} label="Correição Massiva" />
          <NavItem active={activeScreen === 'base_normativa'} onClick={() => setActiveScreen('base_normativa')} icon={<BookOpen size={18} />} label="Base Normativa" />
          <NavItem active={activeScreen === 'relatoria'} onClick={() => setActiveScreen('relatoria')} icon={<FileText size={18} />} label="Relatoria Assistida" />
        </nav>
        
        <div className="text-sm font-bold text-text-muted uppercase tracking-widest mt-8 mb-3">Sistema</div>
        <nav className="space-y-1">
          <NavItem active={activeScreen === 'auditoria'} onClick={() => setActiveScreen('auditoria')} icon={<History size={18} />} label="Auditoria" />
          <NavItem active={activeScreen === 'configuracoes'} onClick={() => setActiveScreen('configuracoes')} icon={<Settings size={18} />} label="Configurações" />
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="bg-primary-50 rounded-radius-premium p-4 relative overflow-hidden group cursor-pointer border border-border-subtle hover:border-primary-600/20 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-primary-600 font-semibold text-base">
            <Sparkles size={18} />
            <span>Aequitas Pro</span>
          </div>
          <p className="text-base text-text-secondary leading-relaxed relative z-10">
            A IA analisou 342 peças hoje e poupou aprox. 12 horas de trabalho.
          </p>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick, badge }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, badge?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-radius-inner transition-all text-base font-medium relative group ${
        active ? 'text-primary-600' : 'text-text-secondary hover:bg-bg-app hover:text-text-primary'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="sidebar-active" 
          className="absolute inset-0 bg-primary-50 rounded-radius-inner"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className="flex items-center space-x-3 relative z-10">
        <div className={`${active ? 'text-primary-600' : 'text-text-muted group-hover:text-text-primary'}`}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="relative z-10 text-[10px] bg-primary-100 text-primary-600 font-bold px-1.5 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </button>
  );
}
