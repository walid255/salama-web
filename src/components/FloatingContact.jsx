import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, Phone, Mail, X, ShieldAlert, ChevronUp } from 'lucide-react';

export default function FloatingContact() {
  const { siteContent, navigate } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = siteContent?.socialLinks?.whatsapp?.replace(/[^0-9]/g, '') || '255754000111';
  const supportPhone = siteContent?.contactInfo?.supportPhone || '+255 22 286 4500';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Salama Pharmaceuticals Tanzania, I would like to inquire about pharmaceutical supply & clinical molecules.'
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                Direct Clinical Hotline
              </p>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                Contact Salama Desk
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close hotline menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors text-xs font-semibold"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Instant sales & supply info</p>
              </div>
            </a>

            <a
              href={`tel:${supportPhone.replace(/[^\d+]/g, '')}`}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"
            >
              <div className="w-8 h-8 rounded-lg bg-salama-teal text-white flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold">Call Central Switchboard</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{supportPhone}</p>
              </div>
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/contacts');
              }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors text-xs font-semibold text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-salama-orange text-white flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold">Pharmacovigilance / ADR</p>
                <p className="text-[11px] text-orange-600 dark:text-orange-300">Report adverse drug reactions</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-salama-orange hover:bg-salama-orange-hover text-white font-bold text-xs shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-white/20 group"
        aria-label="Open clinical contact options"
        aria-expanded={isOpen}
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Inquire & Order</span>
      </button>
    </div>
  );
}
