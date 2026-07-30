import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, FileText, ChevronRight, Bookmark } from 'lucide-react';

const documents = [
  { id: 1, title: 'Manual de Redação do Ministério Público do RS', category: 'Manuais Institucionais', date: 'Atualizado há 2 meses' },
  { id: 2, title: 'Provimento nº 12/2023 - Corregedoria-Geral', category: 'Provimentos', date: 'Atualizado há 1 ano' },
  { id: 3, title: 'Resolução nº 181/2017 - CNMP', category: 'Legislação Externa', date: 'Atualizado há 3 anos' },
  { id: 4, title: 'Orientações para Saneamento de Inércia Crítica', category: 'Diretrizes', date: 'Atualizado há 1 semana' },
];

export default function BaseNormativa() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div 
      className="h-[calc(100vh-120px)] w-full flex flex-col gap-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Base Normativa (RAG)</h1>
          <p className="text-text-secondary mt-2 text-base">Todo o acervo de leis e provimentos indexados para o Aequitas-LLM.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input 
          type="text" 
          placeholder="Busque por provimentos, leis, diretrizes ou orientações..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-bg-surface border border-border-subtle focus:border-primary-500 rounded-radius-premium pl-12 pr-4 py-4 text-base outline-none transition-colors shadow-sm"
        />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-0">
        
        {/* Sidebar Filters */}
        <div className="col-span-1 space-y-2">
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 px-2">Categorias</div>
          {['Todos os Documentos', 'Provimentos', 'Resoluções', 'Manuais Institucionais', 'Diretrizes'].map((cat, i) => (
            <button key={i} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-bg-app text-primary-600' : 'text-text-secondary hover:bg-bg-app'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Document List */}
        <div className="col-span-3 space-y-4 overflow-y-auto pr-2 pb-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-bg-surface border border-border-subtle hover:border-primary-300 rounded-radius-premium p-5 shadow-sm transition-all cursor-pointer group flex items-start gap-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl group-hover:bg-primary-100 transition-colors">
                <Book size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-text-primary text-base group-hover:text-primary-700 transition-colors">{doc.title}</h3>
                  <Bookmark size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 mt-2 text-base text-text-muted">
                  <span className="flex items-center gap-1.5"><FileText size={16} /> {doc.category}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
              </div>
              <div className="mt-4 text-text-muted group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
