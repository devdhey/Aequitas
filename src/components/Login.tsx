import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, KeyRound } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [isLoading, setIsLoading] = useState(false);
  
  // Fictitious state for prototype
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setStep('mfa');
    }, 800);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  const handleMfaChange = (index: number, value: string) => {
    // Only allow numbers and max length of 1
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);
    
    const newCode = [...mfaCode];
    newCode[index] = value;
    setMfaCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`mfa-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-app relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] p-8 sm:p-10 bg-bg-surface border border-border-subtle rounded-[24px] shadow-premium relative z-10 mx-4"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/20 mb-5">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Aequitas Pro</h1>
          <p className="text-base text-text-secondary mt-1.5 font-medium">Plataforma de Correição Inteligente</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'credentials' ? (
            <motion.form 
              key="credentials"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleCredentialsSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary ml-1">E-mail Institucional</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="corregedor@mprs.mp.br"
                    className="w-full pl-11 pr-4 py-3 bg-bg-app border border-border-subtle rounded-xl text-base outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-text-muted/60"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-text-primary">Senha</label>
                  <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors">Esqueceu?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-bg-app border border-border-subtle rounded-xl text-base outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-600 text-white rounded-xl font-semibold text-base hover:bg-primary-700 transition-all disabled:opacity-70 disabled:hover:bg-primary-600 mt-2 shadow-sm"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
                  <>
                    Continuar <ArrowRight size={18} />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="mfa"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleMfaSubmit}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-5 border border-primary-100">
                <KeyRound size={28} />
              </div>
              <h2 className="text-xl font-bold text-text-primary">Verificação em 2 Etapas</h2>
              <p className="text-base text-text-secondary text-center mt-2 mb-8 leading-relaxed">
                Digite o código de 6 dígitos gerado pelo seu aplicativo autenticador corporativo.
              </p>

              <div className="flex gap-2 sm:gap-3 mb-8 w-full justify-center">
                {mfaCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`mfa-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleMfaChange(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && idx > 0) {
                        const prevInput = document.getElementById(`mfa-${idx - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    className="w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold text-text-primary bg-bg-app border border-border-subtle rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all shadow-sm"
                  />
                ))}
              </div>

              <button 
                type="submit"
                disabled={isLoading || mfaCode.some(d => !d)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-600 text-white rounded-xl font-semibold text-base hover:bg-primary-700 transition-all disabled:opacity-70 disabled:hover:bg-primary-600 shadow-sm"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Autenticar MPRS'}
              </button>
              
              <button 
                type="button"
                onClick={() => setStep('credentials')}
                className="mt-6 text-sm text-text-muted hover:text-text-primary font-medium transition-colors"
              >
                Voltar para o Login
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        
        <div className="mt-10 pt-6 border-t border-border-subtle flex justify-center items-center gap-2.5 text-sm text-text-muted font-medium">
          <Lock size={15} />
          <span>Acesso Restrito MPRS. Conexão Segura.</span>
        </div>
      </motion.div>
    </div>
  );
}
