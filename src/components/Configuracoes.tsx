import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Lock, Cpu, Save, ShieldCheck, FileText, UploadCloud, Trash2 } from 'lucide-react';

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState('ia');

  return (
    <motion.div 
      className="h-[calc(100vh-120px)] w-full flex flex-col gap-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Configurações</h1>
          <p className="text-text-secondary mt-2 text-base">Parâmetros globais de funcionamento do Aequitas.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-500 transition-colors shadow-premium flex items-center gap-2">
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Settings Sidebar */}
        <div className="w-64 shrink-0 bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm p-4 flex flex-col gap-2">
          <TabButton active={activeTab === 'ia'} onClick={() => setActiveTab('ia')} icon={<Cpu size={18} />} label="Inteligência Artificial" />
          <TabButton active={activeTab === 'privacidade'} onClick={() => setActiveTab('privacidade')} icon={<Lock size={18} />} label="Privacidade & Segurança" />
          <TabButton active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} icon={<FileText size={18} />} label="Templates Institucionais" />
          <TabButton active={activeTab === 'infra'} onClick={() => setActiveTab('infra')} icon={<Server size={18} />} label="Infraestrutura" />
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm overflow-y-auto p-8">
          
          {activeTab === 'ia' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-1">Modelos de Linguagem</h2>
                <p className="text-base text-text-secondary mb-6">Selecione e ajuste os parâmetros dos modelos hospedados localmente.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary">Modelo Principal (Raciocínio Jurídico)</label>
                  <select className="w-full bg-bg-app border border-border-subtle rounded-lg px-4 py-3 text-base text-text-primary outline-none focus:border-primary-500">
                    <option>Aequitas-LLM (Base Llama 3 70B - Fine Tuned)</option>
                    <option>GPT-4o (Requer saída para internet)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary">Temperatura (Criatividade vs Precisão)</label>
                  <input type="range" min="0" max="100" defaultValue="15" className="w-full accent-primary-600" />
                  <div className="flex justify-between text-sm text-text-muted mt-1">
                    <span>Estrito (0.0)</span>
                    <span>Recomendado (0.15)</span>
                    <span>Criativo (1.0)</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border-subtle">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Geração Aumentada por Recuperação (RAG)</h3>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-border-subtle text-primary-600 focus:ring-primary-500" />
                    <div>
                      <span className="block text-base font-medium text-text-primary group-hover:text-primary-600 transition-colors">Forçar Citação Obrigatória</span>
                      <span className="block text-sm text-text-secondary mt-1">Se ativado, a IA se recusará a gerar respostas jurídicas sem citar explicitamente um documento da Base Normativa.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacidade' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-1">Privacidade & Segurança</h2>
                <p className="text-base text-text-secondary mb-6">Controle o tráfego de dados e anonimização (LGPD).</p>
              </div>
              
              <div className="p-5 bg-success/10 border border-success/20 rounded-xl flex gap-4 mb-6">
                <ShieldCheck className="text-success shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-success text-base">Air-Gapped Mode Ativo</h4>
                  <p className="text-sm text-green-800/80 mt-1">Todos os dados estão sendo processados localmente na infraestrutura Tecnisys. Zero saída de dados para APIs públicas.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="mt-1 rounded border-border-subtle text-primary-600 focus:ring-primary-500" />
                  <div>
                    <span className="block text-base font-medium text-text-primary">Anonimização de Partes (LGPD)</span>
                    <span className="block text-sm text-text-secondary mt-1">Substitui automaticamente nomes de partes e vítimas por iniciais antes de enviar o texto para inferência da IA.</span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="mt-1 rounded border-border-subtle text-primary-600 focus:ring-primary-500" />
                  <div>
                    <span className="block text-base font-medium text-text-primary">Gravação de Logs Imutáveis</span>
                    <span className="block text-sm text-text-secondary mt-1">Mantém histórico de prompts e respostas para auditoria da Corregedoria por 5 anos.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-1">Templates Institucionais</h2>
                <p className="text-base text-text-secondary mb-6">Faça o upload de modelos de documentos (Word, PDF) para balizar o formato de saída da IA.</p>
              </div>

              <div className="border-2 border-dashed border-border-subtle hover:border-primary-500 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center bg-bg-app/50 cursor-pointer group">
                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud size={32} />
                </div>
                <h3 className="font-semibold text-text-primary text-lg">Clique ou arraste os templates aqui</h3>
                <p className="text-sm text-text-muted mt-2">Suporta .DOCX, .PDF e .TXT (Máx. 10MB)</p>
              </div>

              <div className="space-y-3 mt-8">
                <h3 className="font-semibold text-text-primary text-lg border-b border-border-subtle pb-2">Templates Ativos na Base do LLM</h3>
                
                {[
                  { name: "Modelo_Minuta_Provimento.docx", type: "Provimento", date: "Hoje" },
                  { name: "Padrao_Relatorio_Correicao_Massiva.docx", type: "Relatório", date: "Há 3 dias" },
                  { name: "Modelo_Oficio_Corregedoria.pdf", type: "Ofício", date: "Há 1 semana" }
                ].map((tpl, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-bg-app border border-border-subtle rounded-lg hover:border-primary-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-base">{tpl.name}</p>
                        <p className="text-sm text-text-secondary mt-0.5">Tipo: {tpl.type} • Atualizado {tpl.date}</p>
                      </div>
                    </div>
                    <button className="text-text-muted hover:text-alert-critical p-2 transition-colors" title="Remover Template">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'banco' || activeTab === 'infra') && (
            <div className="flex flex-col items-center justify-center h-full text-text-muted opacity-50">
              <Server size={48} className="mb-4" />
              <p className="text-lg">Configurações técnicas avançadas.</p>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
        active ? 'bg-primary-50 text-primary-600 border border-primary-200' : 'text-text-secondary hover:bg-bg-app border border-transparent'
      }`}
    >
      {icon} {label}
    </button>
  );
}
