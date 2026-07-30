import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Copilot from './components/Copilot';
import Relatoria from './components/Relatoria';
import Correicao from './components/Correicao';
import BaseNormativa from './components/BaseNormativa';
import Auditoria from './components/Auditoria';
import Configuracoes from './components/Configuracoes';

export type Screen = 'painel' | 'copiloto' | 'relatoria' | 'correicao' | 'base_normativa' | 'auditoria' | 'configuracoes';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('painel');

  return (
    <div className="flex h-screen w-full bg-bg-app text-text-primary overflow-hidden font-sans">
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header activeScreen={activeScreen} />
        
        <main className="flex-1 overflow-auto bg-bg-app p-6 lg:p-10 relative">
          {activeScreen === 'painel' && <Dashboard />}
          {activeScreen === 'copiloto' && <Copilot />}
          {activeScreen === 'relatoria' && <Relatoria />}
          {activeScreen === 'correicao' && <Correicao />}
          {activeScreen === 'base_normativa' && <BaseNormativa />}
          {activeScreen === 'auditoria' && <Auditoria />}
          {activeScreen === 'configuracoes' && <Configuracoes />}
        </main>
      </div>
    </div>
  );
}
