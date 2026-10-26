import React, { useState } from 'react';
import { X, Globe, Download, Copy, Check, Terminal, ExternalLink, Code } from 'lucide-react';
import { CVData, DesignSettings } from '../types/cv';
import { generateStandaloneHtml, downloadVanillaHtmlFile } from '../utils/vanillaExporter';

interface GithubNetlifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
  settings: DesignSettings;
}

export const GithubNetlifyModal: React.FC<GithubNetlifyModalProps> = ({
  isOpen,
  onClose,
  data,
  settings,
}) => {
  const [activeTab, setActiveTab] = useState<'deploy-guide' | 'code-preview'>('deploy-guide');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlCode = generateStandaloneHtml(data, settings);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    downloadVanillaHtmlFile(data, settings);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Código Adaptable para GitHub Pages & Netlify (HTML, CSS, JS)
              </h3>
              <p className="text-xs text-slate-500">
                100% estático, ligero y sin dependencias de servidor. Listo para subir y compartir en la web.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('deploy-guide')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'deploy-guide'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Guía Rápida de Despliegue (30 segundos)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code-preview')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'code-preview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Ver / Copiar Código Fuente (index.html)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'deploy-guide' && (
            <div className="space-y-6">
              
              {/* 1-Click Action Highlight */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                    Descarga Directa del Archivo Estático
                  </span>
                  <p className="text-xs text-blue-800">
                    Obtén el archivo <code className="bg-white px-1.5 py-0.5 rounded font-mono text-blue-900">index.html</code> listo con todo el CSS y JavaScript incluido.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadHtml}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 whitespace-nowrap transition-colors shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar index.html</span>
                </button>
              </div>

              {/* Netlify Guide */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    N
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">Opción 1: Despliegue Inmediato en Netlify (Arrastrar y Soltar)</h4>
                </div>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-1 leading-relaxed">
                  <li>Haz click en el botón <strong>"Descargar index.html"</strong> de arriba.</li>
                  <li>Ve a <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5">app.netlify.com/drop <ExternalLink className="w-2.5 h-2.5" /></a>.</li>
                  <li>Arrastra el archivo (o una carpeta que lo contenga) a la zona de drop.</li>
                  <li>¡Listo! En 3 segundos tendrás una URL pública HTTPS gratuita (ej. <code>tu-cv.netlify.app</code>).</li>
                </ol>
              </div>

              {/* GitHub Pages Guide */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    GH
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">Opción 2: Publicar en GitHub Pages</h4>
                </div>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside pl-1 leading-relaxed">
                  <li>Crea un repositorio en GitHub (ejemplo: <code>mi-curriculum-web</code>).</li>
                  <li>Sube el archivo <code>index.html</code> en la raíz del repositorio.</li>
                  <li>En GitHub, entra a <strong>Settings &rarr; Pages</strong>.</li>
                  <li>En "Build and deployment", selecciona como origen la rama <strong>main</strong> y carpeta <strong>/ (root)</strong> y dale a <strong>Save</strong>.</li>
                  <li>En menos de un minuto tu CV estará publicado en <code>https://tu-usuario.github.io/mi-curriculum-web/</code>.</li>
                </ol>
              </div>

              {/* Pure Stack Info */}
              <div className="text-[11px] text-slate-500 bg-slate-100 p-3 rounded-lg flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-600 shrink-0" />
                <span>
                  <strong>Tecnologías 100% nativas del navegador:</strong> HTML5 Semántico, CSS Variables para temas instantáneos, Tipografías Google Fonts, y JavaScript nativo para la descarga en PDF.
                </span>
              </div>

            </div>
          )}

          {activeTab === 'code-preview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Código completo autocontenido (HTML + CSS + JS) para guardar como <code className="text-blue-600 font-mono">index.html</code>:
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar Todo el Código'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="text-[11px] font-mono p-4 bg-slate-950 text-slate-200 rounded-xl overflow-x-auto max-h-[380px] leading-relaxed border border-slate-800">
                  {htmlCode}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">Totalmente compatible con cualquier hosting web estático.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
