import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Download, Check, Sparkles, Bot, User, RefreshCw } from 'lucide-react';

export default function Relatoria() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Sou a Inteligência Artificial do Aequitas. Qual documento correicional você gostaria de redigir hoje? Posso ajudar com minutas de provimento, relatórios de correição ou ofícios.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsGenerating(true);

    // Simulate AI response and document generation
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Entendido. Com base nos apontamentos de Inércia Crítica da 1ª Vara Criminal nos últimos 30 dias, redigi uma Minuta de Provimento e adicionei ao painel ao lado. Deseja que eu refine algum ponto?' 
      }]);
      setDocumentContent('PROVIMENTO CORREICIONAL Nº 042/2026\n\nA CORREGEDORIA-GERAL DO MINISTÉRIO PÚBLICO DO ESTADO DO RIO GRANDE DO SUL, no uso de suas atribuições legais e regimentais...\n\nCONSIDERANDO os relatórios gerados pela plataforma Aequitas, que apontam inércia superior a 60 dias em 18 feitos criminais da 1ª Promotoria de Justiça Criminal;\n\nCONSIDERANDO a necessidade de garantir a razoável duração do processo e a eficiência da atuação institucional;\n\nRESOLVE:\n\nArt. 1º. Determinar à 1ª Promotoria de Justiça Criminal que apresente, no prazo de 15 (quinze) dias, plano de ação para saneamento do passivo de inércias processuais.\n\nArt. 2º. Este Provimento entra em vigor na data de sua publicação.');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="h-[calc(100vh-120px)] w-full mx-auto flex flex-col md:flex-row gap-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      
      {/* Chat / Command Pane */}
      <div className="flex-[4] bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm flex flex-col overflow-hidden relative">
        <div className="p-5 border-b border-border-subtle bg-bg-surface flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-primary-600 font-semibold">
            <Sparkles size={18} />
            <h2>Assistente de Relatoria</h2>
          </div>
          <button 
            className="text-xs font-medium text-text-muted hover:text-text-primary px-2 py-1 rounded-md border border-transparent hover:border-border-subtle transition-all"
            onClick={() => { setMessages([messages[0]]); setDocumentContent(null); }}
          >
            Nova Sessão
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3.5 rounded-2xl max-w-[85%] text-base leading-relaxed ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-sm shadow-sm' : 'bg-bg-app border border-border-subtle text-text-primary rounded-tl-sm'}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isGenerating && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-5 rounded-2xl bg-bg-app border border-border-subtle rounded-tl-sm flex items-center gap-3 text-text-muted text-base">
                <RefreshCw size={18} className="animate-spin text-primary-600" />
                <span className="font-medium">IA Lendo Autos e elaborando minuta...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-bg-surface border-t border-border-subtle shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ex: Gere uma minuta de ofício cobrando a Promotoria sobre os 18 casos de inércia..." 
              className="w-full bg-bg-app border border-border-subtle focus:border-primary-500 rounded-xl px-4 py-3 pr-12 text-base outline-none transition-colors shadow-sm focus:shadow-md"
              disabled={isGenerating}
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isGenerating}
              className="absolute right-2 w-8 h-8 flex items-center justify-center bg-primary-600 text-white rounded-lg hover:bg-primary-500 disabled:opacity-50 transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Document Preview Pane */}
      <div className="flex-[6] bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm flex flex-col overflow-hidden">
        <div className="h-16 border-b border-border-subtle bg-bg-surface flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary text-base">Visualização do Documento</h3>
              <p className="text-base text-text-muted">{documentContent ? 'Gerado por Aequitas-LLM' : 'Aguardando instruções...'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-app rounded-md transition-colors" disabled={!documentContent}>
              <Download size={16} /> Exportar PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-success text-white rounded-md shadow-premium hover:opacity-90 transition-opacity disabled:opacity-50" disabled={!documentContent}>
              <Check size={16} /> Aprovar Minuta
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#F9FAFB] p-8 overflow-y-auto flex justify-center">
          {documentContent ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white w-full max-w-[800px] min-h-full p-12 shadow-md border border-gray-200 text-gray-800 font-serif whitespace-pre-wrap leading-relaxed text-lg"
            >
              {documentContent}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-text-muted opacity-50">
              <FileText size={48} className="mb-4" />
              <p>O documento gerado aparecerá aqui.</p>
            </div>
          )}
        </div>
      </div>

    </motion.div>
  );
}
