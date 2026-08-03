import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package2, ShieldCheck, Tag, Download, Terminal, CheckCircle2, Layers, Boxes, AlertTriangle } from 'lucide-react';

const dependenciasProducao = [
  { nome: 'react',           versao: '19.2.8',  licenca: 'MIT', finalidade: 'Framework principal da interface' },
  { nome: 'react-dom',       versao: '19.2.8',  licenca: 'MIT', finalidade: 'Renderização do React no DOM do navegador' },
  { nome: 'recharts',        versao: '3.10.1',  licenca: 'MIT', finalidade: 'Gráficos dos painéis de correição massiva e escore global' },
  { nome: 'framer-motion',   versao: '12.43.0', licenca: 'MIT', finalidade: 'Animações de transição e microinterações do protótipo' },
  { nome: 'lucide-react',    versao: '1.28.0',  licenca: 'ISC', finalidade: 'Ícones da interface' },
  { nome: 'clsx',            versao: '2.1.1',   licenca: 'MIT', finalidade: 'Composição condicional de classes CSS nos componentes' },
  { nome: 'tailwind-merge',  versao: '3.6.0',   licenca: 'MIT', finalidade: 'Resolução de conflitos entre classes Tailwind' },
];

const dependenciasDesenv = [
  { nome: 'vite',                  versao: '8.2.0',   licenca: 'MIT',        finalidade: 'Servidor de desenvolvimento e bundler' },
  { nome: 'typescript',            versao: '6.0.2',   licenca: 'Apache-2.0', finalidade: 'Compilador e verificação estática de tipos' },
  { nome: 'tailwindcss',           versao: '4.3.3',   licenca: 'MIT',        finalidade: 'Framework de estilização utilitária' },
  { nome: '@tailwindcss/postcss',  versao: '4.3.3',   licenca: 'MIT',        finalidade: 'Integração do Tailwind com o PostCSS' },
  { nome: '@vitejs/plugin-react',  versao: '6.0.4',   licenca: 'MIT',        finalidade: 'Suporte a JSX e Fast Refresh no Vite' },
  { nome: 'postcss',               versao: '8.5.25',  licenca: 'MIT',        finalidade: 'Processador de CSS em tempo de build' },
  { nome: 'autoprefixer',          versao: '10.5.4',  licenca: 'MIT',        finalidade: 'Adição automática de prefixos CSS para compatibilidade' },
  { nome: 'oxlint',                versao: '1.75.0',  licenca: 'MIT',        finalidade: 'Linter estático do código-fonte' },
  { nome: '@types/node',           versao: '24.13.3', licenca: 'MIT',        finalidade: 'Tipos TypeScript para APIs nativas do Node' },
  { nome: '@types/react',          versao: '19.2.17', licenca: 'MIT',        finalidade: 'Tipos TypeScript para o React' },
  { nome: '@types/react-dom',      versao: '19.2.3',  licenca: 'MIT',        finalidade: 'Tipos TypeScript para o React DOM' },
];

const distribuicaoLicencas = [
  { licenca: 'MIT',        total: 15, reciprocidade: false, descricao: 'Permissiva. Compatível com uso comercial e titularidade pela Tecnisys.' },
  { licenca: 'Apache-2.0', total: 1,  reciprocidade: false, descricao: 'Permissiva com cláusula de patentes. Compatível com o arranjo contratual do CPSI.' },
  { licenca: 'ISC',        total: 1,  reciprocidade: false, descricao: 'Equivalente funcional à MIT. Sem restrições relevantes.' },
];

const badgeLicenca: Record<string, string> = {
  'MIT':        'bg-primary-100 text-primary-600',
  'Apache-2.0': 'bg-amber-50 text-amber-700',
  'ISC':        'bg-emerald-50 text-emerald-700',
};

const ABAS = ['Dependências', 'Licenças', 'Regenerar'] as const;
type Aba = typeof ABAS[number];

export default function SBOM() {
  const [aba, setAba] = useState<Aba>('Dependências');

  return (
    <motion.div
      className="w-full flex flex-col gap-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">
            Lista de Materiais de Software
          </h1>
          <p className="text-text-secondary mt-2 text-base">
            Inventário CycloneDX 1.6 · aequitas-prototype v0.0.0 · Tecnisys · CPSI n.º 001/2026
          </p>
        </div>
        <div className="flex gap-3 shrink-0 items-center">
          <span className="px-3 py-1.5 text-sm font-semibold bg-bg-surface border border-border-subtle rounded-lg text-text-secondary">
            03/08/2026
          </span>
          <button className="px-5 py-2.5 bg-primary-600 text-white rounded-lg text-base font-medium hover:bg-primary-500 transition-colors shadow-sm flex items-center gap-2">
            <Download size={18} />
            Baixar sbom.json
          </button>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: <Package2 size={20} />, label: 'Pacotes em Produção', valor: '38', sub: '7 diretos · 31 transitivos', cor: 'text-primary-600 bg-primary-50' },
          { icon: <Boxes size={20} />,    label: 'Pacotes de Dev', valor: '74', sub: '11 diretos · 63 transitivos', cor: 'text-text-muted bg-bg-app' },
          { icon: <Tag size={20} />,      label: 'Licenças Distintas', valor: '3', sub: 'MIT · Apache-2.0 · ISC', cor: 'text-amber-600 bg-amber-50' },
          { icon: <ShieldCheck size={20} />, label: 'Vulnerabilidades', valor: '0', sub: 'npm audit: sem ocorrências', cor: 'text-success bg-success/10' },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-bg-surface border border-border-subtle rounded-radius-premium p-5 flex flex-col gap-3 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-radius-inner flex items-center justify-center ${card.cor}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-text-primary">{card.valor}</p>
              <p className="text-sm font-medium text-text-secondary mt-0.5">{card.label}</p>
              <p className="text-xs text-text-muted mt-1">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Container principal com abas */}
      <div className="bg-bg-surface border border-border-subtle rounded-radius-premium shadow-sm overflow-hidden">
        {/* Barra de abas */}
        <div className="px-6 pt-5 pb-0 border-b border-border-subtle bg-bg-app/30">
          <div className="flex gap-1">
            {ABAS.map((a) => (
              <button
                key={a}
                onClick={() => setAba(a)}
                className={`px-5 py-2.5 text-base font-medium rounded-t-lg border-b-2 transition-all ${
                  aba === a
                    ? 'text-primary-600 border-primary-600 bg-bg-surface'
                    : 'text-text-muted border-transparent hover:text-text-secondary hover:border-border-hover'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo da aba */}
        <div>
          {aba === 'Dependências' && (
            <div>
              <TabelaDeps titulo="Dependências de Produção" deps={dependenciasProducao} />
              <div className="border-t border-border-subtle" />
              <TabelaDeps titulo="Dependências de Desenvolvimento" deps={dependenciasDesenv} />
            </div>
          )}

          {aba === 'Licenças' && (
            <div className="p-6 space-y-5">
              <table className="w-full text-left">
                <thead className="text-sm text-text-muted uppercase tracking-wide border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Licença</th>
                    <th className="px-6 py-4 font-semibold">Pacotes</th>
                    <th className="px-6 py-4 font-semibold">Reciprocidade Forte</th>
                    <th className="px-6 py-4 font-semibold">Avaliação para o CPSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {distribuicaoLicencas.map((l) => (
                    <tr key={l.licenca} className="hover:bg-bg-app/50 transition-colors text-base">
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-md text-sm font-bold ${badgeLicenca[l.licenca]}`}>
                          {l.licenca}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-semibold text-text-primary tabular-nums">{l.total}</td>
                      <td className="px-6 py-5">
                        {l.reciprocidade
                          ? <span className="flex items-center gap-2 text-alert-critical font-medium"><AlertTriangle size={16} /> Sim</span>
                          : <span className="flex items-center gap-2 text-success font-medium"><CheckCircle2 size={16} /> Não</span>
                        }
                      </td>
                      <td className="px-6 py-5 text-text-secondary">{l.descricao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-success/5 border border-success/20 rounded-radius-inner p-5 flex items-start gap-4">
                <CheckCircle2 size={20} className="text-success mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-text-primary">Inventário de licenças limpo</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Nenhum componente com reciprocidade forte (GPL, AGPL, LGPL, MPL, SSPL) foi encontrado.
                    A titularidade da propriedade intelectual pela Tecnisys e a licença de uso perpétuo
                    ao MPRS estão desimpedidas para todos os 112 pacotes inventariados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {aba === 'Regenerar' && (
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Layers size={18} className="text-primary-600" />
                <p className="font-semibold text-text-primary">Como regenerar o inventário</p>
              </div>
              <p className="text-base text-text-secondary">
                Execute a partir da raiz do projeto{' '}
                <code className="bg-bg-app border border-border-subtle px-2 py-0.5 rounded text-sm font-mono text-text-primary">
                  aequitas-prototype/
                </code>
                . Regenere a cada versão liberada (item 6.3.3 do termo de referência).
              </p>

              <div className="bg-[#0f172a] rounded-radius-inner p-6 space-y-1.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Terminal size={14} /> Terminal
                </p>
                {[
                  '# Inventário completo (produção + desenvolvimento)',
                  'npx @cyclonedx/cyclonedx-npm \\',
                  '  --output-format JSON \\',
                  '  --output-file sbom/sbom.json \\',
                  '  --spec-version 1.6 \\',
                  '  --validate',
                  '',
                  '# Somente produção (distribuído ao usuário final)',
                  'npx @cyclonedx/cyclonedx-npm \\',
                  '  --output-format JSON \\',
                  '  --output-file sbom/sbom-producao.json \\',
                  '  --spec-version 1.6 --validate --omit dev',
                  '',
                  '# Auditoria de vulnerabilidades',
                  'npm audit --json > sbom/audit.json',
                ].map((linha, i) => (
                  <p key={i} className={`font-mono text-sm leading-relaxed ${linha.startsWith('#') ? 'text-slate-400' : linha === '' ? 'h-3' : 'text-emerald-300'}`}>
                    {linha}
                  </p>
                ))}
              </div>

              <div className="flex items-start gap-3 text-sm text-text-secondary bg-amber-50 border border-amber-200 rounded-radius-inner p-4">
                <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <span>
                  Não altere versões de dependência durante esta tarefa. O SBOM retrata o estado real do projeto.
                  Mudança de versão requer nova build e novo inventário — são decisões separadas.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TabelaDeps({ titulo, deps }: { titulo: string; deps: Array<{ nome: string; versao: string; licenca: string; finalidade: string }> }) {
  return (
    <div>
      <div className="px-6 py-4 flex items-center gap-3 bg-bg-app/20">
        <Package2 size={16} className="text-primary-600" />
        <span className="font-semibold text-text-primary">{titulo}</span>
        <span className="ml-auto text-xs font-medium text-text-muted bg-bg-surface border border-border-subtle px-2.5 py-1 rounded-full">
          {deps.length} diretas
        </span>
      </div>
      <table className="w-full text-left">
        <thead className="text-sm text-text-muted uppercase tracking-wide border-y border-border-subtle bg-bg-surface">
          <tr>
            <th className="px-6 py-4 font-semibold">Pacote</th>
            <th className="px-6 py-4 font-semibold">Versão</th>
            <th className="px-6 py-4 font-semibold">Licença</th>
            <th className="px-6 py-4 font-semibold">Finalidade no Projeto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {deps.map((dep) => (
            <tr key={dep.nome} className="hover:bg-bg-app/50 transition-colors group text-base">
              <td className="px-6 py-4 font-mono text-sm font-bold text-text-primary">{dep.nome}</td>
              <td className="px-6 py-4 font-mono text-sm text-text-muted tabular-nums">{dep.versao}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeLicenca[dep.licenca] ?? 'bg-bg-app text-text-secondary'}`}>
                  {dep.licenca}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-text-secondary">{dep.finalidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
