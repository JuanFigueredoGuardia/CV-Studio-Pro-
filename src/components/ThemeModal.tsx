import React from 'react';
import { X, Palette, Columns2, Square, Sun, Moon } from 'lucide-react';
import { DesignSettings, ThemePalette, LayoutVariant, SidebarStyle } from '../types/cv';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DesignSettings;
  onChangeSettings: (settings: DesignSettings) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  settings,
  onChangeSettings,
}) => {
  if (!isOpen) return null;

  const palettes: { id: ThemePalette; name: string; primary: string; accent: string }[] = [
    { id: 'slate', name: 'Slate Tech Navy', primary: '#0f172a', accent: '#2563eb' },
    { id: 'emerald', name: 'Emerald Executive', primary: '#064e3b', accent: '#059669' },
    { id: 'indigo', name: 'Indigo Modern', primary: '#1e1b4b', accent: '#4f46e5' },
    { id: 'monochrome', name: 'Editorial Minimal', primary: '#18181b', accent: '#27272a' },
    { id: 'amber', name: 'Warm Amber Lead', primary: '#1c1917', accent: '#d97706' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Diseño y Branding Personal
              </h3>
              <p className="text-xs text-slate-500">
                Personaliza la paleta CSS, estructura de columnas y tipografía.
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Palettes */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Paleta de Colores (Variables CSS :root)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {palettes.map(pal => {
                const isSelected = settings.theme === pal.id;
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => onChangeSettings({ ...settings, theme: pal.id })}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center -space-x-1.5 shrink-0">
                      <div className="w-5 h-5 rounded-full border border-white" style={{ backgroundColor: pal.primary }} />
                      <div className="w-5 h-5 rounded-full border border-white" style={{ backgroundColor: pal.accent }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{pal.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout Structure */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Estructura del Currículum
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChangeSettings({ ...settings, layout: 'two-column' })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                  settings.layout === 'two-column'
                    ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Columns2 className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-semibold text-slate-800">2 Columnas (Moderno)</span>
                <span className="text-[10px] text-slate-500">Aside de habilidades + Main</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeSettings({ ...settings, layout: 'single-column' })}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${
                  settings.layout === 'single-column'
                    ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Square className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-semibold text-slate-800">1 Columna (Clásico)</span>
                <span className="text-[10px] text-slate-500">Formato corrido tradicional</span>
              </button>
            </div>
          </div>

          {/* Sidebar background tone (if 2 columns) */}
          {settings.layout === 'two-column' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Contraste de Barra Lateral (Aside)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChangeSettings({ ...settings, sidebarStyle: 'dark' })}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    settings.sidebarStyle === 'dark'
                      ? 'border-blue-600 ring-2 ring-blue-500/20 bg-slate-900 text-white'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Fondo Oscuro</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeSettings({ ...settings, sidebarStyle: 'light' })}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                    settings.sidebarStyle === 'light'
                      ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Fondo Claro / Limpio</span>
                </button>
              </div>
            </div>
          )}

          {/* Spacing & Font Density */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              Densidad de Contenido para A4
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChangeSettings({ ...settings, fontSize: 'compact' })}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  settings.fontSize === 'compact'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                Compacto (1-2 páginas)
              </button>
              <button
                type="button"
                onClick={() => onChangeSettings({ ...settings, fontSize: 'normal' })}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                  settings.fontSize === 'normal'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                Normal / Estándar
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
