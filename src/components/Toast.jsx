import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
    error: <XCircle className="w-4 h-4 text-red-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-cyan-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-[#091512]/95 text-emerald-200',
    warning: 'border-amber-500/30 bg-[#161208]/95 text-amber-200',
    error: 'border-red-500/30 bg-[#19090c]/95 text-red-200',
    info: 'border-cyan-500/30 bg-[#091319]/95 text-cyan-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start space-x-3 ${borders[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-xs font-bold text-white mb-0.5">{toast.title}</h4>
          )}
          <p className="text-xs leading-relaxed opacity-90">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
