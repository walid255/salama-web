import React from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  ThermometerSnowflake,
  FlaskConical,
  Award,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function QualityAssurancePage() {
  const { navigate } = useApp();

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Quality Assurance & TMDA Compliance"
        description="Learn about Salama Pharmaceuticals' rigorous quality standards: 100% TMDA-evaluated molecules, WHO-GMP certified manufacturing, and Good Distribution Practice (GDP)."
        canonicalUrl="/about/quality"
      />

      {/* Header Banner */}
      <section className="bg-salama-teal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salama-orange/20 text-salama-orange text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Regulatory & Quality Excellence</span>
          </div>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            Uncompromising Quality: 100+ TMDA Registered Molecules
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
            Every pharmaceutical consignment delivered to Tanzanian healthcare facilities meets stringent WHO-GMP
            manufacturing guidelines and rigorous TMDA post-market surveillance benchmarks.
          </p>
        </div>
      </section>

      {/* 4 Pillars of Quality */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-salama-teal/10 text-salama-teal dark:text-salama-orange flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">TMDA Registration</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every single product in our catalog holds a verifiable registration number issued by the Tanzania Medicines
              and Medical Devices Authority.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-salama-orange flex items-center justify-center">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">WHO-GMP Facilities</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our partner neoMedic and global manufacturing plants operate under strict current Good Manufacturing Practice
              (cGMP) audited by international inspectors.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Cold-Chain GDP</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Validated Good Distribution Practice (GDP) protocols, thermal data-loggers in transport, and redundant
              backup generators across all 5 zonal warehouses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Pharmacovigilance</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A 24/7 dedicated medical safety team logging and investigating any potential adverse event, product quality
              inquiry, or batch recall immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Batch Release Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 p-8 sm:p-12 border border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              Verification Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Every Batch Released with Full Certificate of Analysis (CoA)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Hospital procurement officers and chief pharmacists can request lot-specific analytical certificates
              detailing dissolution profiles, assay purity, sterility testing, and stability metrics for any delivery.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/contacts')}
                className="px-6 py-3 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                Request Batch Certificate & Dossier
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
