import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

export default function ConfirmationModal() {
  const { confirmModal, closeConfirm } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && confirmModal.isOpen) {
        closeConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmModal.isOpen, closeConfirm]);

  if (!confirmModal.isOpen) return null;

  let Icon = Info;
  let iconBg = 'bg-salama-teal/10 text-salama-teal dark:bg-salama-teal/30 dark:text-salama-orange';
  let confirmBtnClass = 'bg-salama-teal hover:bg-salama-teal-hover text-white';

  if (confirmModal.type === 'danger') {
    Icon = AlertTriangle;
    iconBg = 'bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400';
    confirmBtnClass = 'bg-rose-600 hover:bg-rose-700 text-white';
  } else if (confirmModal.type === 'success') {
    Icon = CheckCircle2;
    iconBg = 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400';
    confirmBtnClass = 'bg-emerald-600 hover:bg-emerald-700 text-white';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        <button
          onClick={closeConfirm}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl flex-shrink-0 ${iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 pr-4">
            <h3 id="modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              {confirmModal.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {confirmModal.message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={closeConfirm}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {confirmModal.cancelText}
          </button>
          <button
            type="button"
            onClick={confirmModal.onConfirm}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${confirmBtnClass}`}
          >
            {confirmModal.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
