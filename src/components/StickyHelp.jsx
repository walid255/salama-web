import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronRight, X, FileCheck, Truck, Stethoscope } from 'lucide-react';

export default function StickyHelp() {
  const { navigate } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-2.5 rounded-l-2xl bg-salama-teal hover:bg-salama-teal-hover text-white shadow-xl hover:-translate-x-1 transition-all border-y border-l border-white/20 group"
          title="Clinical & Supply Help Center"
          aria-label="Open clinical help center"
        >
          <HelpCircle className="w-5 h-5 text-salama-orange group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold [writing-mode:vertical-rl] tracking-wider uppercase rotate-180 py-1">
            Clinical Help
          </span>
        </button>
      ) : (
        <div className="w-80 rounded-l-3xl bg-white dark:bg-slate-900 border-y border-l border-slate-200 dark:border-slate-800 shadow-2xl p-5 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-salama-orange" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Healthcare Help Desk
              </h4>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close help drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            <button
              onClick={() => {
                setIsExpanded(false);
                navigate('/catalog');
              }}
              className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-salama-teal-light dark:hover:bg-slate-800 transition-colors group"
            >
              <FileCheck className="w-4 h-4 text-salama-teal dark:text-salama-orange flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-salama-teal dark:group-hover:text-salama-orange">
                  TMDA Approval Verification
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Inspect registration numbers & packaging specs
                </p>
              </div>
            </button>

            <button
              onClick={() => {
                setIsExpanded(false);
                navigate('/about/zones');
              }}
              className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-salama-teal-light dark:hover:bg-slate-800 transition-colors group"
            >
              <Truck className="w-4 h-4 text-salama-orange flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-salama-orange">
                  MSD Zonal Schedules
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Direct dispatch status for Arusha, Dodoma & Lake
                </p>
              </div>
            </button>

            <button
              onClick={() => {
                setIsExpanded(false);
                navigate('/about/clinical-freedom');
              }}
              className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-salama-teal-light dark:hover:bg-slate-800 transition-colors group"
            >
              <Stethoscope className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600">
                  Doctor Prescribing Support
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tanzania STG essential therapeutic coverage
                </p>
              </div>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsExpanded(false);
                navigate('/faq');
              }}
              className="text-xs font-semibold text-salama-teal dark:text-salama-orange hover:underline flex items-center gap-1"
            >
              <span>View all FAQs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-400 font-medium">Tanzania Standard Time (EAT)</span>
          </div>
        </div>
      )}
    </div>
  );
}
