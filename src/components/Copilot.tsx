import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, ThumbsUp, ThumbsDown, BookOpen, Send, Sparkles, X, CheckCircle } from 'lucide-react';

export default function Copilot() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <motion.div 
      className="h-[calc(100vh-120px)] w-full mx-auto flex flex-col md:flex-row gap-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Editor Pane */}
      <div className="flex-[6.5] bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm flex flex-col overflow-hidden">
        
        {/* Editor Toolbar */}
        <div className="h-14 border-b border-border-subtle bg-bg-surface flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 text-base font-medium">
            <span className="text-text-primary">Denúncia - Processo nº 001/2026</span>
            <span className="text-xs text-text-muted bg-bg-app px-2 py-1 rounded">Autos salvos</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-text-muted hover:text-text-primary px-3 py-1.5 text-base rounded-md transition-colors">Histórico</button>
            <button 
              onClick={() => showToast('Peça finalizada e salva no repositório digital.')}
              className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-1.5 text-base font-medium rounded-md shadow-premium transition-colors"
            >
              Finalizar Peça
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-12 font-serif text-lg leading-[1.9] text-text-primary">
          <p className="mb-6">EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA 1ª VARA CRIMINAL DA COMARCA DE PORTO ALEGRE/RS.</p>
          
          <p className="mb-6">O MINISTÉRIO PÚBLICO DO ESTADO DO RIO GRANDE DO SUL, por seu Promotor de Justiça signatário, vem oferecer DENÚNCIA contra...</p>
          
          <p className="mb-6">
            Na data de 15 de março de 2022, o denunciado foi flagrado portando uma <span className="bg-red-50 text-red-900 border-b-2 border-red-300 pb-[1px] cursor-pointer hover:bg-red-100 transition-colors">arma calibre 38</span> em via pública, conforme consta no boletim de ocorrência anexo.
          </p>
          
          <p className="mb-6">
            Diante dos fatos expostos, <span className="bg-yellow-50 text-yellow-900 border-b-2 border-yellow-300 pb-[1px] cursor-pointer hover:bg-yellow-100 transition-colors">eu entendo que</span> a autoria e a materialidade estão devidamente comprovadas pelos depoimentos colhidos na fase policial.
          </p>
          
          <p>
            Requer, portanto, o recebimento da presente denúncia e a citação do réu para apresentar resposta à acusação...
          </p>
        </div>
      </div>

      {/* AI Inspector Pane */}
      <div className="flex-[3.5] flex flex-col gap-4 overflow-hidden">
        
        {/* Assistant Header */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-radius-premium p-6 shadow-premium text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Sparkles size={64} />
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2 relative z-10">
            <Sparkles size={20} /> CLAIM
          </h2>
          <p className="text-primary-50 text-base mt-2 relative z-10 leading-relaxed">
            3 insights gerados em tempo real sobre a sua peça processual.
          </p>
        </div>

        {/* Alerts Scrollable Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          
          <AlertCard 
            type="critical"
            title="Alucinação Fática Detectada"
            content="A peça menciona o porte de uma 'arma calibre 38', mas o laudo pericial (fls. 45 dos autos) atesta explicitamente tratar-se de um simulacro de arma de fogo."
            source="Laudo Pericial nº 12/26 (fls. 45)"
            onAction={(action: string) => showToast(action === 'up' ? 'Feedback positivo enviado à IA.' : 'Sugestão ignorada.')}
          />

          <AlertCard 
            type="critical"
            title="Risco de Prescrição Iminente"
            content="O fato narrado ocorreu há mais de 4 anos (15/03/2022). O prazo prescricional para a pena máxima em abstrato deste delito expira em 10 dias."
            source="Art. 109, inciso IV, do Código Penal"
            onAction={(action: string) => showToast(action === 'up' ? 'Feedback positivo enviado à IA.' : 'Sugestão ignorada.')}
          />

          <AlertCard 
            type="warning"
            title="Ajuste de Estilo / Juridiquês"
            content="Foi detectado o uso de 1ª pessoa do singular ('eu entendo que'). Em peças institucionais, é recomendada a forma impessoal ('o Ministério Público entende que')."
            source="Manual de Redação do MPRS"
            onAction={(action: string) => showToast(action === 'up' ? 'Feedback positivo enviado à IA.' : 'Sugestão ignorada.')}
          />

        </div>

        {/* Ask AI Input */}
        <div className="bg-bg-surface border border-border-subtle rounded-radius-premium p-2 flex items-center shadow-sm shrink-0 mt-2 hover:border-border-hover transition-colors focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
          <input 
            type="text" 
            placeholder="Pergunte à base normativa ou sobre os autos..." 
            className="flex-1 bg-transparent px-3 py-2 text-base outline-none text-text-primary placeholder:text-text-muted"
          />
          <button className="w-10 h-10 flex items-center justify-center bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors">
            <Send size={18} />
          </button>
        </div>

      </div>

      {/* Global Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 font-medium text-sm"
          >
            <CheckCircle size={18} className="text-success" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AlertCard({ type, title, content, source, onAction }: any) {
  const isCritical = type === 'critical';
  const headerClass = isCritical ? 'text-alert-critical' : 'text-yellow-600';
  const bgClass = isCritical ? 'bg-red-50/30' : 'bg-yellow-50/30';
  
  return (
    <div className={`bg-bg-surface border border-border-subtle hover:border-border-hover rounded-radius-premium p-5 shadow-sm transition-all group relative ${bgClass}`}>
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-radius-premium ${isCritical ? 'bg-alert-critical' : 'bg-alert-warning'}`}></div>
      
      <div className="flex justify-between items-start mb-3 pl-2">
        <div className={`flex items-center gap-2 ${headerClass}`}>
          {isCritical ? <AlertTriangle size={20} strokeWidth={2.5} /> : <Info size={20} strokeWidth={2.5} />}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <button className="text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <X size={18} />
        </button>
      </div>
      
      <p className="text-text-secondary text-base leading-relaxed pl-2 mb-4">
        {content}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle/60 pl-2">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-primary-600 cursor-pointer transition-colors bg-bg-app px-2 py-1.5 rounded border border-border-subtle">
          <BookOpen size={16} />
          <span>FONTE: {source}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onAction && onAction('up')}
            className="w-8 h-8 flex items-center justify-center rounded bg-bg-app text-text-muted hover:text-success hover:bg-success/10 transition-colors"
          >
            <ThumbsUp size={16} />
          </button>
          <button 
            onClick={() => onAction && onAction('down')}
            className="w-8 h-8 flex items-center justify-center rounded bg-bg-app text-text-muted hover:text-alert-critical hover:bg-alert-critical/10 transition-colors"
          >
            <ThumbsDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
