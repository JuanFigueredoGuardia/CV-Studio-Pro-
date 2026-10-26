import React, { useState } from 'react';
import { X, Wand2, FileText, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { CVData } from '../types/cv';
import { parseUnstructuredText } from '../utils/unstructuredParser';
import { techLeadProfile, designerProfile, emptyProfile } from '../data/sampleProfiles';

interface UnstructuredModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: CVData;
  onApplyData: (newData: CVData) => void;
}

const SAMPLE_RAW_DATA = `Juan Carlos Figueredo
Senior Full Stack & Cloud Solutions Lead
juanfigueredoguardia@gmail.com | +34 612 345 678 | Madrid, España
https://linkedin.com/in/juan-figueredo | https://github.com/juanfigueredo

SOBRE MI:
Ingeniero de Software Senior con más de 8 años de experiencia creando sistemas distribuidos y microservicios de alto tráfico en la nube. Especialista en React, TypeScript y arquitecturas serverless.

EXPERIENCIA LABORAL:
Tech Lead - Novatech Systems (2023 - Presente)
- fui responsable de liderar un equipo de 12 desarrolladores en la modernización del sistema de pagos
- optimicé la arquitectura en Kubernetes logrando reducir caídas del sistema en un 60%
- me encargaba de migrar el frontend a React y TypeScript mejorando la velocidad de carga en un 44% para 1.8M de usuarios
- mentoreó a 6 desarrolladores e implementó cobertura de tests automatizados al 85%

Senior Developer - Fintech Global (2020 - 2023)
- creé microservicios con Kafka y Redis procesando 150k transacciones diarias con latencia menor a 80ms
- trabajé en el rediseño del portal financiero aumentando el NPS en 28 puntos

EDUCACION:
Grado en Ingeniería del Software - Universidad Politécnica de Madrid (2013 - 2017)
Máster en Cloud Computing y Arquitectura de Software - URJC Madrid (2018 - 2019)

CERTIFICACIONES:
- AWS Certified Solutions Architect Professional | Amazon Web Services | 2024
- Certified Kubernetes Administrator (CKA) | CNCF | 2023
- Professional Scrum Master PSM I | Scrum.org | 2022

HABILIDADES:
React, TypeScript, Next.js, Node.js, Express, Go, PostgreSQL, Redis, Docker, Kubernetes, AWS, Kafka, Microservicios, Arquitectura Limpia, CI/CD, DDD

IDIOMAS:
Español: Nativo
Inglés: Profesional Avanzado (C1)
`;

export const UnstructuredModal: React.FC<UnstructuredModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onApplyData,
}) => {
  const [rawText, setRawText] = useState('');
  const [previewParsed, setPreviewParsed] = useState<CVData | null>(null);

  if (!isOpen) return null;

  const handleProcess = () => {
    if (!rawText.trim()) return;
    const parsed = parseUnstructuredText(rawText, currentData);
    onApplyData(parsed);
    onClose();
  };

  const handleLoadSample = () => {
    setRawText(SAMPLE_RAW_DATA);
    const parsed = parseUnstructuredText(SAMPLE_RAW_DATA, currentData);
    setPreviewParsed(parsed);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Procesador Inteligente de Datos Desestructurados
              </h3>
              <p className="text-xs text-slate-500">
                Pega notas desorganizadas, correos o fragmentos de tu CV y el sistema los estructurará automáticamente.
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Quick presets buttons */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">Cargar perfiles o texto de prueba:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs font-medium px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cargar Texto Desorganizado de Prueba</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onApplyData(techLeadProfile);
                  onClose();
                }}
                className="text-xs font-medium px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
              >
                Perfil Tech Lead Completo
              </button>
              <button
                type="button"
                onClick={() => {
                  onApplyData(designerProfile);
                  onClose();
                }}
                className="text-xs font-medium px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
              >
                Perfil Product Designer
              </button>
              <button
                type="button"
                onClick={() => {
                  onApplyData(emptyProfile);
                  onClose();
                }}
                className="text-xs font-medium px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
              >
                Empezar desde cero
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Pega aquí el contenido bruto (texto de LinkedIn, CV en texto plano o apuntes):
            </label>
            <textarea
              rows={11}
              value={rawText}
              onChange={e => {
                setRawText(e.target.value);
                if (e.target.value.trim().length > 30) {
                  setPreviewParsed(parseUnstructuredText(e.target.value, currentData));
                }
              }}
              placeholder="Ejemplo:&#10;Juan Pérez&#10;Software Engineer&#10;juan@ejemplo.com | +34 600...&#10;&#10;EXPERIENCIA:&#10;Tech Corp (2022 - Presente)&#10;- Me encargaba de optimizar bases de datos...&#10;- Lideré la migración..."
              className="w-full text-xs font-mono p-3.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 leading-relaxed"
            />
          </div>

          {/* Detected Summary Chips */}
          {previewParsed && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-700">
              <span className="font-bold flex items-center gap-1.5 text-blue-700">
                <CheckCircle2 className="w-4 h-4" /> Elementos detectados en el texto:
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600">
                <span><strong>Nombre:</strong> {previewParsed.profile.name || 'Detectado'}</span>
                <span><strong>Cargo:</strong> {previewParsed.profile.targetRole || 'Detectado'}</span>
                <span><strong>Empleos:</strong> {previewParsed.experience.length}</span>
                <span><strong>Educación:</strong> {previewParsed.education.length}</span>
                <span><strong>Certificaciones:</strong> {previewParsed.certifications.length}</span>
                <span><strong>Habilidades:</strong> {previewParsed.skillCategories.flatMap(c => c.skills).length}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleProcess}
            disabled={!rawText.trim()}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Procesar y Aplicar al CV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
