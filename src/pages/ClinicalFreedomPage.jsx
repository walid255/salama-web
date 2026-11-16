import React from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  Stethoscope,
  ShieldCheck,
  Heart,
  CheckCircle2,
  FileCheck2,
  Users,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function ClinicalFreedomPage() {
  const { navigate } = useApp();

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Doctor Choice & Tanzania STG Alignment"
        description="Salama Pharmaceuticals champions clinical autonomy in Tanzania: ending market-controlled prescribing and ensuring every doctor has the therapeutic range to put patients first."
        canonicalUrl="/about/clinical-freedom"
      />

      {/* Header Banner */}
      <section className="bg-salama-teal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salama-orange/20 text-salama-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Autonomy Manifesto</span>
          </div>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            The Era of Market-Controlled Prescribing is Over
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
            We stand for a new standard in Tanzanian healthcare: Doctors choose. Patients come first.
            We back that clinical choice with depth, therapeutic range, and respect.
          </p>
        </div>
      </section>

      {/* Main Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              Tanzania STG Commitment
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              To Empower & Return to Doctors Their Freedom to Choose
            </h2>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                For decades across East Africa, pricing volatility, sudden supply shortages, and restrictive procurement
                dictated what medicines were written on prescription pads. Clinicians were often forced to compromise on
                second-best alternatives.
              </p>
              <p>
                <strong>At Salama, that ends now.</strong> We align our entire commercial and regulatory pipeline
                directly to the Tanzania Standard Treatment Guidelines (STG) and Essential Medicines List (NEMLIT).
              </p>
              <p>
                Within each therapeutic category—whether treating severe sepsis with Ceftriaxone/Sulbactam, hypertension with
                Losartan/HCTZ, or glaucoma with Latanoprost—we deliver breadth of choice, multiple registered molecules,
                and uninterrupted availability.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  <strong>Committed Coverage:</strong> Covering essential therapies outlined in Tanzania’s STG.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  <strong>Breadth of Choice:</strong> Multiple registered molecules per class so clinicians tailor treatment to individual patients.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  <strong>Doctor’s Right to Decide:</strong> Preserving the physician's diagnostic authority above administrative procurement constraints.
                </span>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
              <img
                src="/assets/slides/slide-07.webp"
                alt="Doctor examining child patient in Tanzanian clinic - freedom to choose"
                width="1755"
                height="1241"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/slides/slide-07.jpg';
                }}
              />
              <div className="p-6 bg-slate-900 text-white">
                <p className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                  Clinical Principle
                </p>
                <p className="text-sm font-semibold mt-1">
                  “Your decision. Your patient. Your treatment.”
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CME and Clinical Engagement */}
      <section className="bg-slate-50 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                Support Beyond the Prescription
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Continuous Medical Education (CME) & Antimicrobial Stewardship
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Salama sponsors accredited clinical symposiums for hospital consultants, residents, and pharmacists across
                Tanzania. Our medical affairs department regularly distributes pharmacological monographs, resistance pattern
                surveys, and carbapenem-sparing stewardship protocols to safeguard national therapeutic effectiveness.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/catalog')}
                  className="px-6 py-3 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  Explore STG-Aligned Catalog
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
              <img
                src="/assets/slides/slide-09.webp"
                alt="Doctor and young patient smiling - Patients come first"
                width="1755"
                height="1241"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/slides/slide-09.jpg';
                }}
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
