import React from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  Building2,
  Award,
  History,
  ShieldCheck,
  Stethoscope,
  Users,
  Target,
  ArrowRight,
  FileText,
  MapPin,
  CheckCircle2,
  HeartPulse
} from 'lucide-react';

export default function AboutPage() {
  const { navigate } = useApp();

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="About Us & 40+ Years Legacy"
        description="Learn about Salama Pharmaceuticals: 40+ years of trusted service in Tanzania, dedicated to clinician autonomy, national supply equity, and TMDA-approved therapeutic excellence."
        canonicalUrl="/about"
      />

      {/* Header Banner */}
      <section className="bg-salama-teal text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-salama-orange/20 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salama-orange/20 text-salama-orange text-xs font-bold uppercase tracking-wider mb-4">
            <History className="w-3.5 h-3.5" />
            <span>Since 1984 in Tanzania</span>
          </div>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            With Deep Roots in Tanzania, We’re Shaping the Future of Pharma
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
            For four decades, Salama has been a steadfast healthcare partner across Tanzania. Built on trust,
            enduring relationships, and a mission to empower doctors and serve communities.
          </p>
        </div>
      </section>

      {/* Quick Profile Navigation Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/about/profile')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-salama-orange shadow-sm hover:shadow-md transition-all text-left group"
          >
            <FileText className="w-5 h-5 text-salama-orange mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">Company Profile Deck</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Interactive slides & PDF</p>
          </button>

          <button
            onClick={() => navigate('/about/zones')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-salama-orange shadow-sm hover:shadow-md transition-all text-left group"
          >
            <MapPin className="w-5 h-5 text-salama-teal dark:text-salama-orange mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">5 Zonal Hubs</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">MSD prime supply network</p>
          </button>

          <button
            onClick={() => navigate('/about/clinical-freedom')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-salama-orange shadow-sm hover:shadow-md transition-all text-left group"
          >
            <Stethoscope className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">Doctor Choice</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Ending market restrictions</p>
          </button>

          <button
            onClick={() => navigate('/about/quality')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-salama-orange shadow-sm hover:shadow-md transition-all text-left group"
          >
            <ShieldCheck className="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">TMDA Quality</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">100+ Approved molecules</p>
          </button>
        </div>
      </section>

      {/* Main Story & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              Our 40-Year Heritage
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              A History of Trust, Clinical Commitment and Patient Focus
            </h2>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Founded four decades ago, Salama Pharmaceuticals began with a singular focus: ensuring that essential,
                high-quality medications were reliably accessible to the people of Tanzania. Over the years, that commitment
                has evolved into a comprehensive healthcare enterprise.
              </p>
              <p>
                Today, Salama serves as an indispensable bridge between world-class pharmaceutical manufacturing
                and the everyday clinical needs of Tanzanian doctors, nurses, and patients. We work alongside the Ministry
                of Health, the Medical Stores Department (MSD), faith-based mission facilities, and the private healthcare
                sector to eliminate medicine stock-outs.
              </p>
              <p>
                Our portfolio encompasses over 100 registered molecules approved by the Tanzania Medicines and Medical
                Devices Authority (TMDA), spanning lifesaving antibiotics, cardiovascular agents, diabetes therapies,
                ophthalmic solutions, and topical analgesics.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-2xl font-black text-salama-teal dark:text-salama-orange">1984</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Inception of service</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-2xl font-black text-salama-orange">1,500+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hospitals & Clinics</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <img
                src="/assets/slides/slide-10.webp"
                alt="Salama clinical doctor with stethoscope - What Doctors Can Expect"
                width="1755"
                height="1241"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/slides/slide-10.jpg';
                }}
              />
              <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  What Doctors Can Expect from Salama
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-salama-orange"></span>
                    <span>100+ molecule applications approved by TMDA — broadest portfolio in Tanzania</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-salama-orange"></span>
                    <span>A portfolio that keeps growing to bring breadth of therapies to every specialty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-salama-orange"></span>
                    <span>The trusted and the new — molecules doctors know and future clinical therapies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100/70 dark:bg-slate-950/60 py-16 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Our Core Values
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              The ethical compass that directs every clinical conversation, manufacturing partnership, and logistics dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-salama-teal/10 text-salama-teal dark:text-salama-orange flex items-center justify-center">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Patients First</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Every commercial decision is evaluated by one metric: does it improve patient outcomes and alleviate suffering in our community?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-salama-orange flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Clinical Autonomy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                We believe doctors must have the freedom to choose the right drug, for the right patient, at the right time, without artificial market barriers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Uncompromising Quality</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                WHO-GMP compliance, rigorous batch analysis, TMDA validation, and climate-controlled GDP transport without exception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Are Headed (Slide 23) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-salama-teal text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                Future Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Where We’re Headed: “We’re just getting started.”
              </h2>
              <div className="space-y-3 text-sm text-emerald-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-salama-orange flex-shrink-0 mt-0.5" />
                  <span><strong>Expanding Therapeutic Coverage:</strong> Broadening oncology, critical care, and pediatric formulations.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-salama-orange flex-shrink-0 mt-0.5" />
                  <span><strong>Investing in New Molecules:</strong> Introducing modern therapies that address tomorrow's clinical challenges.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-salama-orange flex-shrink-0 mt-0.5" />
                  <span><strong>Strengthening National Supply Chains:</strong> Upgrading digital warehousing and faster cold-chain logistics across all 5 zones.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-salama-orange flex-shrink-0 mt-0.5" />
                  <span><strong>Deepening Healthcare Partnerships:</strong> Working alongside clinicians, hospitals, and national health authorities.</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/about/profile')}
                  className="px-6 py-3 rounded-xl bg-salama-orange hover:bg-salama-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                >
                  Explore Company Profile Deck
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-emerald-700/60 shadow-xl">
                <img
                  src="/assets/slides/slide-23.webp"
                  alt="Where Salama Pharmaceuticals is Headed in Tanzania"
                  width="1755"
                  height="1241"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/slides/slide-23.jpg';
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
