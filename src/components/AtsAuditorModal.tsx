import React from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, Award, TrendingUp, Zap, Target } from 'lucide-react';
import { AtsAuditResult } from '../utils/atsAuditor';

interface AtsAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditResult: AtsAuditResult;
}

export const AtsAuditorModal: React.FC<AtsAuditorModalProps> = ({
  isOpen,
  onClose,
  auditResult,
}) => {
  if (!isOpen) return null;

  const { score, grade, actionVerbsCount, metricsCount, checklist, strengths, improvements } = auditResult;

  const getScoreColor = (sc: number) => {
    if (sc >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (sc >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (sc >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Auditoría de Reclutador Técnico & Compatibilidad ATS
              </h3>
              <p className="text-xs text-slate-500">
                Diagnóstico de tu currículum frente a sistemas de escaneo y reclutadores senior.
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
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Score Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${getScoreColor(score)}`}>
              <span className="text-xs font-semibold uppercase tracking-wider">Puntuación ATS</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold font-display">{score}</span>
                <span className="text-sm font-semibold opacity-70">/100</span>
              </div>
              <span className="text-xs font-bold mt-1 px-2 py-0.5 rounded-full bg-white/80 shadow-2xs">
                Nivel {grade}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verbos de Acción</span>
              <div className="text-3xl font-extrabold font-display text-blue-700 mt-1">
                {actionVerbsCount}
              </div>
              <span className="text-xs text-slate-500 mt-1">Detectados en viñetas</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Métricas de Impacto</span>
              <div className="text-3xl font-extrabold font-display text-emerald-700 mt-1">
                {metricsCount}
              </div>
              <span className="text-xs text-slate-500 mt-1">Cifras cuantificadas</span>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Verificación de Factores Críticos de Contratación</span>
            </h4>
            <div className="space-y-2">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                    item.passed ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950' : 'bg-amber-50/50 border-amber-200/80 text-amber-950'
                  }`}
                >
                  {item.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <span className="font-semibold block">{item.label}</span>
                    <p className="text-[11px] opacity-80 leading-normal">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Recommendations */}
          {improvements.length > 0 && (
            <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/40 space-y-2">
              <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Recomendaciones del Reclutador Técnico para Maximizar Respuestas:</span>
              </h4>
              <ul className="space-y-1 text-xs text-blue-950 list-disc list-inside">
                {improvements.map((imp, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
