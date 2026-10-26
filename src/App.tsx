import React, { useState, useMemo, useRef } from 'react';
import { CVData, DesignSettings } from './types/cv';
import { techLeadProfile } from './data/sampleProfiles';
import { auditCV } from './utils/atsAuditor';
import { exportCvToPdf, printCvNative } from './utils/pdfExporter';
import { TopNav } from './components/TopNav';
import { CVDocument } from './components/CVDocument';
import { CVEditor } from './components/CVEditor';
import { UnstructuredModal } from './components/UnstructuredModal';
import { AtsAuditorModal } from './components/AtsAuditorModal';
import { ThemeModal } from './components/ThemeModal';
import { GithubNetlifyModal } from './components/GithubNetlifyModal';
import { downloadVanillaHtmlFile } from './utils/vanillaExporter';
import {
  Download,
  Printer,
  Wand2,
  CheckCircle2,
  Sliders,
  Split,
  Eye,
  Edit3,
  FileDown,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [cvData, setCvData] = useState<CVData>(techLeadProfile);
  const [settings, setSettings] = useState<DesignSettings>({
    theme: 'slate',
    layout: 'two-column',
    sidebarStyle: 'dark',
    fontSize: 'normal',
    highlightActionVerbs: true,
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'editor'>('preview');
  const [isSplitMode, setIsSplitMode] = useState(true);
  const [isUnstructuredModalOpen, setIsUnstructuredModalOpen] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isGithubNetlifyModalOpen, setIsGithubNetlifyModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const documentRef = useRef<HTMLDivElement>(null);

  const atsAudit = useMemo(() => auditCV(cvData), [cvData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    showToast('Preparando y renderizando documento A4...');

    const element = document.getElementById('cv-printable-area');
    if (!element) {
      showToast('Error: No se localizó el contenedor imprimible.');
      setIsGeneratingPdf(false);
      return;
    }

    try {
      const res = await exportCvToPdf(element, {
        filename: `${cvData.profile.name || 'Curriculum_Vitae'}`,
        quality: 0.98,
        scale: 2,
      });

      if (res.success) {
        showToast('¡PDF generado con éxito y descargado!');
      } else {
        showToast(res.error || 'Generación completada.');
      }
    } catch (err) {
      console.error(err);
      printCvNative();
      showToast('Abriendo cuadro de impresión del navegador...');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    printCvNative();
  };

  const handleApplyUnstructuredData = (newData: CVData) => {
    setCvData(newData);
    showToast('¡Datos desestructurados procesados y pulidos con éxito!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Bar following Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUnstructuredModal={() => setIsUnstructuredModalOpen(true)}
        onOpenAtsModal={() => setIsAtsModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenGithubNetlifyModal={() => setIsGithubNetlifyModalOpen(true)}
        onDownloadPdf={handleDownloadPdf}
        onPrintNative={handlePrint}
        isGeneratingPdf={isGeneratingPdf}
        atsScore={atsAudit.score}
        currentTheme={settings.theme}
        onChangeTheme={(thm) => setSettings({ ...settings, theme: thm })}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col p-3 md:p-6 max-w-[1720px] w-full mx-auto">
        
        {/* Sub-header Toolbar (no-print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-print bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Modo de Trabajo:</span>
            
            {/* Split Screen vs Single View (Desktop) */}
            <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setIsSplitMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  isSplitMode ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Split className="w-3.5 h-3.5" />
                <span>Pantalla Dividida (Editor + CV)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSplitMode(false)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  !isSplitMode ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Vista Completa</span>
              </button>
            </div>

            {/* Mobile Tab switcher */}
            <div className="flex lg:hidden items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 text-xs font-semibold rounded-md ${
                  activeTab === 'editor' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-semibold rounded-md ${
                  activeTab === 'preview' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Previsualizar
              </button>
            </div>
          </div>

          {/* Quick Actions & Formatting Pill */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setIsGithubNetlifyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg transition-colors border border-emerald-200"
              title="Descargar o copiar código para GitHub Pages o Netlify"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>Código GitHub & Netlify</span>
            </button>

            <button
              type="button"
              onClick={() => setIsUnstructuredModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Pegar Datos</span>
            </button>

            <button
              type="button"
              onClick={() => setIsThemeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Estilo ({settings.layout === 'two-column' ? '2 Cols' : '1 Col'})</span>
            </button>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================
              LEFT: LIVE EDITOR (Conditional in Split Mode or Mobile Tab)
             ======================================================== */}
          {((isSplitMode && !['preview'].includes(activeTab)) || (!isSplitMode && activeTab === 'editor') || (isSplitMode)) && (
            <div
              className={`editor-pane ${
                isSplitMode ? 'lg:col-span-5 h-[calc(100vh-140px)] sticky top-20' : 'col-span-12'
              } ${activeTab === 'preview' && !isSplitMode ? 'hidden' : 'block'}`}
            >
              <CVEditor data={cvData} onChange={setCvData} />
            </div>
          )}

          {/* ========================================================
              RIGHT: LIVE A4 DOCUMENT PREVIEW
             ======================================================== */}
          {((isSplitMode) || (!isSplitMode && activeTab === 'preview')) && (
            <div
              className={`cv-preview-container flex flex-col items-center justify-start ${
                isSplitMode ? 'lg:col-span-7' : 'col-span-12'
              } ${activeTab === 'editor' && !isSplitMode ? 'hidden' : 'block'}`}
              ref={documentRef}
            >
              {/* Floating or Top A4 Header Indicator (No-Print) */}
              <div className="w-full max-w-[210mm] flex items-center justify-between mb-2 text-xs text-slate-500 no-print px-1">
                <span className="font-medium">Hoja A4 · Exacta para exportación a PDF</span>
                <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-slate-600">
                  {settings.theme.toUpperCase()} · {settings.layout === 'two-column' ? '2 Columnas' : '1 Columna'}
                </span>
              </div>

              {/* The Actual CV Document */}
              <CVDocument data={cvData} settings={settings} />

              {/* Spacing bottom */}
              <div className="h-16 no-print" />
            </div>
          )}

        </div>
      </div>

      {/* Floating Action Button for Instant PDF Download (Always accessible on mobile & desktop) */}
      <aside className="fixed bottom-6 right-6 z-40 no-print flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          title="Exportar directamente a archivo PDF"
        >
          <FileDown className="w-4 h-4" />
          <span>{isGeneratingPdf ? 'Generando PDF...' : 'Descargar PDF'}</span>
        </button>
      </aside>

      {/* Modals */}
      <UnstructuredModal
        isOpen={isUnstructuredModalOpen}
        onClose={() => setIsUnstructuredModalOpen(false)}
        currentData={cvData}
        onApplyData={handleApplyUnstructuredData}
      />

      <AtsAuditorModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        auditResult={atsAudit}
      />

      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        settings={settings}
        onChangeSettings={setSettings}
      />

      <GithubNetlifyModal
        isOpen={isGithubNetlifyModalOpen}
        onClose={() => setIsGithubNetlifyModalOpen(false)}
        data={cvData}
        settings={settings}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl transition-all border border-slate-700 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
