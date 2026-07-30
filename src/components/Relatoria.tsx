import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Download, Check, Sparkles, Bot, User, RefreshCw, Mic, Settings2, FileType2 } from 'lucide-react';

export default function Relatoria() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Motor de Relatoria pronto. Selecionei automaticamente os achados analíticos da 1ª Vara Criminal (18 processos paralisados). Por favor, forneça suas observações qualitativas em texto, tópicos ou áudio para que eu cruze com os dados e redija a minuta no seu estilo.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Modelo_Minuta_Provimento.docx');

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
        content: `Cruzando estatísticas da 1ª Vara com suas diretrizes. Apliquei o template institucional "${selectedTemplate}" preservando formatação e timbre. A redação foi ajustada para o seu estilo formal característico. A minuta está pronta para sua revisão e assinatura final.` 
      }]);
      setDocumentContent('ESTADO DO RIO GRANDE DO SUL\nMINISTÉRIO PÚBLICO\nCORREGEDORIA-GERAL\n\nPROVIMENTO CORREICIONAL Nº 042/2026\n\nA CORREGEDORIA-GERAL DO MINISTÉRIO PÚBLICO DO ESTADO DO RIO GRANDE DO SUL, no uso de suas atribuições legais e regimentais...\n\nCONSIDERANDO os dados estatísticos extraídos da plataforma Aequitas, que revelam de forma inconteste a inércia processual superior a 60 (sessenta) dias em 18 (dezoito) feitos criminais vinculados à 1ª Promotoria de Justiça Criminal;\n\nCONSIDERANDO que a presente letargia é inaceitável frente aos princípios constitucionais da eficiência e da razoável duração do processo, impactando severamente a prestação jurisdicional;\n\nRESOLVE:\n\nArt. 1º. Determinar ao(à) Promotor(a) de Justiça titular da 1ª Promotoria de Justiça Criminal que apresente, no prazo improrrogável de 15 (quinze) dias, plano de ação estruturado para o saneamento imediato do passivo de inércias processuais.\n\nArt. 2º. O descumprimento injustificado do prazo estabelecido ensejará a instauração imediata de Processo Administrativo Disciplinar (PAD).\n\nArt. 3º. Este Provimento entra em vigor na data de sua publicação.');
      setIsGenerating(false);
    }, 3000);
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
            <h2>Motor de Relatoria Assistida</h2>
          </div>
          <button 
            className="text-xs font-medium text-text-muted hover:text-text-primary px-2 py-1 rounded-md border border-transparent hover:border-border-subtle transition-all"
            onClick={() => { setMessages([messages[0]]); setDocumentContent(null); }}
          >
            Nova Sessão
          </button>
        </div>

        {/* Template Parametrization */}
        <div className="p-5 bg-bg-app border-b border-border-subtle shrink-0 space-y-4">
          <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
            <span className="flex items-center gap-2"><Settings2 size={18} /> Parametrização do Motor</span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2.5 py-1 rounded-md font-semibold border border-primary-200 shadow-sm">Human-in-the-loop</span>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase tracking-wider">Template Base da Corregedoria</label>
            <div className="relative">
              <FileType2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <select 
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full bg-bg-surface border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-base text-text-primary outline-none focus:border-primary-500 appearance-none cursor-pointer shadow-sm hover:border-border-hover transition-colors font-medium"
              >
                <option value="Modelo_Minuta_Provimento.docx">Modelo_Minuta_Provimento.docx</option>
                <option value="Padrao_Relatorio_Correicao.docx">Padrao_Relatorio_Correicao.docx</option>
                <option value="Oficio_Corregedoria_Padrao.docx">Oficio_Corregedoria_Padrao.docx</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-bg-surface">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600 border border-primary-100'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[85%] text-base leading-relaxed ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-sm shadow-sm' : 'bg-bg-app border border-border-subtle text-text-primary rounded-tl-sm shadow-sm'}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isGenerating && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100">
                <Bot size={20} />
              </div>
              <div className="p-5 rounded-2xl bg-bg-app border border-border-subtle rounded-tl-sm flex flex-col gap-3 text-text-muted text-base shadow-sm min-w-[280px]">
                <div className="flex items-center gap-3">
                  <RefreshCw size={18} className="animate-spin text-primary-600" />
                  <span className="font-semibold text-text-primary text-base">Cruzando dados e redigindo...</span>
                </div>
                <ul className="text-sm space-y-1.5 ml-7 list-disc text-text-secondary">
                  <li>Aplicando template: {selectedTemplate}</li>
                  <li>Injetando indicadores da Correição</li>
                  <li>Adaptando tom redacional formal</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 bg-bg-surface border-t border-border-subtle shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ex: Use tom firme. Estabeleça 15 dias sob pena de PAD..." 
              className="w-full bg-bg-app border border-border-subtle focus:border-primary-500 rounded-xl pl-4 pr-28 py-3.5 text-base outline-none transition-colors shadow-sm focus:shadow-md placeholder:text-text-muted"
              disabled={isGenerating}
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button 
                type="button"
                className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                title="Gravar observações qualitativas por áudio"
              >
                <Mic size={22} />
              </button>
              <button 
                type="submit"
                disabled={!inputValue.trim() || isGenerating}
                className="w-10 h-10 flex items-center justify-center bg-primary-600 text-white rounded-lg hover:bg-primary-500 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Document Preview Pane */}
      <div className="flex-[6] bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm flex flex-col overflow-hidden">
        <div className="h-24 border-b border-border-subtle bg-bg-surface flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
              <FileText size={28} />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-xl">Revisão do Corregedor</h3>
              <p className="text-base text-text-muted mt-0.5">{documentContent ? `Baseado no template: ${selectedTemplate}` : 'Aguardando seus inputs para compilar a minuta...'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-app rounded-lg transition-colors border border-border-subtle shadow-sm" disabled={!documentContent}>
              <Download size={18} /> Baixar .DOCX
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-success text-white rounded-lg shadow-premium hover:opacity-90 transition-opacity disabled:opacity-50" disabled={!documentContent}>
              <Check size={20} /> Assinar e Concluir
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#F9FAFB] p-8 overflow-y-auto flex justify-center">
          {documentContent ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white w-full max-w-[800px] min-h-full p-16 shadow-md border border-gray-200 text-gray-800 font-serif whitespace-pre-wrap leading-relaxed text-lg"
            >
              {documentContent}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-text-muted opacity-50">
              <FileText size={56} className="mb-4" />
              <p className="text-xl">A minuta final preservando o timbre aparecerá aqui.</p>
            </div>
          )}
        </div>
      </div>

    </motion.div>
  );
}
