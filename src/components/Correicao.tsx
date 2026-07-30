import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileArchive, Settings, Play, CheckCircle2, Loader2, Database, AlertCircle } from 'lucide-react';

export default function Correicao() {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Upload, 2: Config, 3: Processing
  const [progress, setProgress] = useState(0);

  const startProcessing = () => {
    setStep(3);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 1;
      });
    }, 400);
  };

  return (
    <motion.div 
      className="h-[calc(100vh-120px)] w-full flex flex-col gap-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Correição Massiva</h1>
          <p className="text-text-secondary mt-2 text-base">Auditoria em lote de processos com identificação autônoma de inércia e inconsistências.</p>
        </div>
      </div>

      <div className="flex-1 bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm overflow-hidden flex flex-col">
        
        {/* Progress Steps Header */}
        <div className="h-16 border-b border-border-subtle bg-bg-app/50 flex items-center px-8 gap-8">
          <StepIndicator active={step >= 1} done={step > 1} number={1} label="Fonte de Dados" />
          <div className="h-px w-12 bg-border-subtle"></div>
          <StepIndicator active={step >= 2} done={step > 2} number={2} label="Parâmetros" />
          <div className="h-px w-12 bg-border-subtle"></div>
          <StepIndicator active={step >= 3} done={progress === 100} number={3} label="Processamento IA" />
        </div>

        <div className="flex-1 p-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: UPLOAD */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-xl"
              >
                <div 
                  onClick={() => setStep(2)}
                  className="border-2 border-dashed border-border-subtle hover:border-primary-500 bg-bg-app/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
                >
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Clique para enviar ou arraste seus arquivos</h3>
                  <p className="text-base text-text-secondary max-w-md">Suporta arquivos .ZIP contendo PDFs de processos, ou conexão direta com banco de dados PostgreSYS.</p>
                  
                  <div className="mt-8 flex gap-4 w-full">
                    <div className="flex-1 bg-white border border-border-subtle p-4 rounded-xl flex items-center gap-3">
                      <FileArchive size={20} className="text-text-muted" />
                      <div className="text-left">
                        <div className="text-xs font-semibold">Lote ZIP</div>
                        <div className="text-[10px] text-text-muted">Até 500MB</div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white border border-border-subtle p-4 rounded-xl flex items-center gap-3">
                      <Database size={20} className="text-text-muted" />
                      <div className="text-left">
                        <div className="text-xs font-semibold">TDP / E-Proc</div>
                        <div className="text-[10px] text-text-muted">Conexão API</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CONFIGURATION */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-xl space-y-6"
              >
                <div className="bg-white border border-border-subtle rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="text-primary-600" />
                    <h3 className="text-lg font-semibold text-text-primary">Configurar Parâmetros da IA</h3>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-2 block">Tipos de Alerta a Mapear</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Inércia > 30 dias', 'Prescrição Iminente', 'Falta de Manifestação', 'Conflito de Competência'].map(opt => (
                          <label key={opt} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded border-border-subtle text-primary-600 focus:ring-primary-500" />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-primary mb-2 block">Nível de Rigidez (Temperatura)</label>
                      <input type="range" className="w-full accent-primary-600" />
                      <div className="flex justify-between text-xs text-text-muted mt-1">
                        <span>Leniência (Criativo)</span>
                        <span>Rigidez Técnica (Estrito)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button onClick={() => setStep(1)} className="px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-app rounded-lg transition-colors">Voltar</button>
                  <button onClick={startProcessing} className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg shadow-premium hover:bg-primary-500 transition-colors flex items-center gap-2">
                    <Play size={16} /> Iniciar Varredura
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PROCESSING */}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl text-center"
              >
                <div className="mb-8 relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-bg-app" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * progress) / 100} className="text-primary-600 transition-all duration-300 ease-out" />
                  </svg>
                  <div className="absolute text-2xl font-bold text-text-primary">{progress}%</div>
                </div>

                <h3 className="text-2xl font-semibold text-text-primary mb-2">
                  {progress < 100 ? 'Processando Lote (450 arquivos)...' : 'Auditoria Concluída!'}
                </h3>
                <p className="text-text-secondary mb-8 h-6 text-lg">
                  {progress < 30 && 'Extraindo metadados de PDFs...'}
                  {progress >= 30 && progress < 60 && 'Cruzando dados com Base Normativa (RAG)...'}
                  {progress >= 60 && progress < 90 && 'Avaliando inércia temporal e risco de prescrição...'}
                  {progress >= 90 && progress < 100 && 'Gerando relatório final...'}
                  {progress === 100 && 'Foram encontradas 12 omissões e 3 riscos críticos.'}
                </p>

                {progress === 100 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-4">
                    <button className="px-6 py-2.5 bg-white border border-border-subtle text-text-primary text-sm font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                      Baixar Relatório (CSV)
                    </button>
                    <button onClick={() => setStep(1)} className="px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg shadow-premium hover:bg-primary-500 transition-colors">
                      Nova Varredura
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function StepIndicator({ active, done, number, label }: any) {
  return (
    <div className={`flex items-center gap-3 ${active ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
        ${done ? 'bg-success text-white' : active ? 'bg-primary-600 text-white shadow-md' : 'bg-bg-app border border-border-subtle text-text-muted'}
      `}>
        {done ? <CheckCircle2 size={16} /> : number}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-text-primary' : 'text-text-muted'}`}>{label}</span>
    </div>
  );
}
