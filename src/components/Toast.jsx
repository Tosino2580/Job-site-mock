import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-2xl backdrop-blur-md animate-slide-up text-xs">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <div>
        <p className="font-bold text-slate-900">{toast.title}</p>
        <p className="text-[11px] text-slate-600 mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-slate-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
