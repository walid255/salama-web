import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClasses = 'bg-salama-teal text-white border-salama-teal/40';
        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClasses = 'bg-rose-700 text-white border-rose-800';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClasses = 'bg-slate-900 text-white dark:bg-slate-800 border-slate-700';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${colorClasses}`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0 text-salama-orange" aria-hidden="true" />
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4 text-white/80" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
