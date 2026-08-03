import { useState, useEffect } from 'react';
import { Search, Bell, X, FileText, AlertTriangle, CheckCircle, User, LogOut, Settings, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ activeScreen, onLogout }: { activeScreen: string, onLogout: () => void }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getTitle = () => {
    switch(activeScreen) {
      case 'painel': return 'Painel Inicial';
      case 'copiloto': return 'Copiloto (Membro)';
      case 'relatoria': return 'Relatoria Assistida';
      case 'correicao': return 'Correição Massiva';
      case 'base_normativa': return 'Base Normativa';
      case 'auditoria': return 'Auditoria de Sistema';
      case 'configuracoes': return 'Configurações Globais';
      case 'sbom': return 'Lista de Materiais de Software';
      default: return 'Painel Inicial';
    }
  };

  return (
    <>
      <header className="h-16 border-b border-border-subtle bg-bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 shrink-0 z-30 sticky top-0">
        
        {/* Breadcrumb / Title */}
        <div className="flex items-center gap-3 text-base font-medium">
          <span className="text-text-muted">Aequitas</span>
          <span className="text-border-hover">/</span>
          <span className="text-text-primary">{getTitle()}</span>
        </div>

        {/* Global Search (Command Palette style) */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-md px-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 bg-bg-app border border-border-subtle hover:border-border-hover rounded-lg text-base text-text-muted transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Search size={16} className="group-hover:text-primary-600 transition-colors" />
              <span>Buscar processos, base RAG...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="bg-bg-surface border border-border-subtle rounded px-1.5 py-0.5 text-sm font-mono">⌘</kbd>
              <kbd className="bg-bg-surface border border-border-subtle rounded px-1.5 py-0.5 text-sm font-mono">K</kbd>
            </div>
          </button>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-5 relative">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
              className={`relative transition-colors ${isNotifOpen ? 'text-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-alert-critical rounded-full border-2 border-bg-surface"></span>
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-10 w-96 bg-white border border-border-subtle rounded-xl shadow-premium overflow-hidden z-50"
                >
                  <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between bg-bg-surface">
                    <span className="font-semibold text-text-primary text-base">Notificações</span>
                    <button onClick={() => setIsNotifOpen(false)} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
                  </div>
                  <div className="divide-y divide-border-subtle max-h-96 overflow-y-auto">
                    <div className="p-5 hover:bg-bg-app transition-colors cursor-pointer flex gap-4">
                      <AlertTriangle className="text-alert-warning shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-lg text-text-primary font-medium">Alerta de Prescrição</p>
                        <p className="text-base text-text-secondary mt-1">Processo 004/2025 da 2ª Vara encontra-se a 15 dias da prescrição.</p>
                        <span className="text-sm text-text-muted font-medium mt-3 block">AGORA</span>
                      </div>
                    </div>
                    <div className="p-5 hover:bg-bg-app transition-colors cursor-pointer flex gap-4">
                      <CheckCircle className="text-success shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-lg text-text-primary font-medium">Correição Concluída</p>
                        <p className="text-base text-text-secondary mt-1">O lote de 450 processos finalizou a varredura. 12 omissões detectadas.</p>
                        <span className="text-sm text-text-muted font-medium mt-3 block">HÁ 2 HORAS</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-border-subtle bg-bg-surface text-center">
                    <button className="text-base font-semibold text-primary-600 hover:text-primary-700">Ver Todas</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-base border border-primary-200">
                CS
              </div>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-80 bg-white border border-border-subtle rounded-xl shadow-premium overflow-hidden z-50"
                >
                  <div className="p-5 border-b border-border-subtle bg-bg-surface">
                    <p className="font-bold text-text-primary text-lg">Corregedor Silva</p>
                    <p className="text-base text-text-secondary mt-0.5">Corregedoria-Geral | MPRS</p>
                  </div>
                  <div className="p-3 space-y-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-base text-text-secondary hover:text-text-primary hover:bg-bg-app rounded-lg transition-colors">
                      <User size={18} /> Meu Perfil
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-base text-text-secondary hover:text-text-primary hover:bg-bg-app rounded-lg transition-colors">
                      <Settings size={18} /> Preferências
                    </button>
                  </div>
                  <div className="p-3 border-t border-border-subtle">
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-base text-alert-critical hover:bg-alert-critical/10 rounded-lg transition-colors"
                    >
                      <LogOut size={18} /> Sair do Sistema
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-2xl bg-white border border-border-subtle rounded-xl shadow-premium overflow-hidden flex flex-col"
            >
              <div className="flex items-center px-4 py-4 border-b border-border-subtle">
                <Search className="text-text-muted mr-3" size={20} />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Pesquise por processos, jurisprudências ou termos na Base RAG..." 
                  className="flex-1 bg-transparent text-lg outline-none text-text-primary placeholder:text-text-muted"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-text-muted hover:bg-bg-app p-1 rounded-md transition-colors"><X size={18} /></button>
              </div>

              {searchQuery.length > 2 ? (
                <div className="max-h-96 overflow-y-auto p-2">
                  <div className="px-3 py-2 text-sm font-semibold text-text-muted uppercase tracking-wider">Processos (2)</div>
                  <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-app rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary-600" size={18} />
                      <div className="text-left">
                        <p className="text-base font-medium text-text-primary group-hover:text-primary-600">Autos nº 001/2026 - Ação Penal</p>
                        <p className="text-sm text-text-secondary mt-0.5">Relatado há 2 dias • Risco Baixo</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-app rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary-600" size={18} />
                      <div className="text-left">
                        <p className="text-base font-medium text-text-primary group-hover:text-primary-600">Autos nº 004/2025 - Inquérito Civil</p>
                        <p className="text-sm text-alert-warning mt-0.5">Alerta de Prescrição Iminente</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-text-muted text-base flex flex-col items-center">
                  <Search size={32} className="opacity-20 mb-3" />
                  Digite pelo menos 3 caracteres para iniciar a busca avançada na Base Normativa e Autos.
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
