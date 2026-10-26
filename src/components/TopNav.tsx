import React from 'react';
import { Download, Printer, Wand2, CheckCircle2, Sliders, Eye, Edit3 } from 'lucide-react';
import { ThemePalette } from '../types/cv';

interface TopNavProps {
  activeTab: 'preview' | 'editor';
  setActiveTab: (tab: 'preview' | 'editor') => void;
  onOpenUnstructuredModal: () => void;
  onOpenAtsModal: () => void;
  onOpenThemeModal: () => void;
  onOpenGithubNetlifyModal: () => void;
  onDownloadPdf: () => void;
  onPrintNative: () => void;
  isGeneratingPdf: boolean;
  atsScore: number;
  currentTheme: ThemePalette;
  onChangeTheme: (theme: ThemePalette) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenUnstructuredModal,
  onOpenAtsModal,
  onOpenThemeModal,
  onOpenGithubNetlifyModal,
  onDownloadPdf,
  onPrintNative,
  isGeneratingPdf,
  atsScore,
}) => {
  return (
    <header className="app-topbar sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8 no-print">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a href="#" className="font-display font-bold text-lg md:text-xl text-slate-900 tracking-tight whitespace-nowrap">
          CV Studio <span className="text-blue-600 font-semibold">Pro</span>
        </a>
      </div>

      {/* Zone 2: Navigation Links & Modes */}
      <nav className="flex items-center gap-1.5 md:gap-3 text-xs md:text-sm font-medium text-slate-600">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista CV</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenUnstructuredModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-md transition-colors whitespace-nowrap"
          title="Pegar y procesar datos desestructurados"
        >
          <Wand2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Pegar Datos</span>
        </button>

        <button
          type="button"
          onClick={onOpenAtsModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-md transition-colors whitespace-nowrap"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden md:inline">Auditoría ATS</span>
          <span className="px-1.5 py-0.2 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded">
            {atsScore}/100
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenThemeModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Estilo</span>
        </button>

        <button
          type="button"
          onClick={onOpenGithubNetlifyModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-700 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors whitespace-nowrap"
          title="Exportar código adaptable para GitHub Pages o Netlify"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          <span>GitHub / Netlify</span>
        </button>
      </nav>

      {/* Zone 3: Primary Action (PDF Download & Print) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onPrintNative}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 rounded-lg transition-colors whitespace-nowrap"
          title="Impresión de alta resolución con diálogo del sistema"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Imprimir A4</span>
        </button>

        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex items-center gap-2 px-3.5 md:px-4 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-lg shadow-sm transition-all whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>{isGeneratingPdf ? 'Generando PDF...' : 'Descargar PDF'}</span>
        </button>
      </div>
    </header>
  );
};
