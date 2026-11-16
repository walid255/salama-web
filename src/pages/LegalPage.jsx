import React from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export default function LegalPage({ mode = 'privacy' }) {
  const { navigate } = useApp();
  const isPrivacy = mode === 'privacy';

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      <SEOHead
        title={isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Pharmaceutical Supply'}
        description="Legal and compliance guidelines for Salama Pharmaceuticals Tanzania."
        canonicalUrl={isPrivacy ? '/privacy' : '/terms'}
      />

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-salama-teal dark:text-salama-orange hover:underline mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </button>

      {/* Strictly 1 h1 tag on the page */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
        {isPrivacy ? 'Privacy & Healthcare Data Protection Policy' : 'Terms & Conditions of Pharmaceutical Supply'}
      </h1>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 font-mono">
        Last updated: November 2026 • Regulated by the Tanzania Medicines and Medical Devices Authority (TMDA)
      </div>

      <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Commitment to Data Integrity</h2>
              <p>
                Salama Pharmaceuticals Limited is dedicated to safeguarding the confidential information of clinicians,
                hospital procurement personnel, and community healthcare professionals in the United Republic of Tanzania.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Medical & Pharmacovigilance Data</h2>
              <p>
                All Adverse Drug Reaction (ADR) reports and product quality feedback submitted through this website
                are treated as confidential clinical correspondence and reported strictly to TMDA pharmacovigilance registries
                in compliance with the Tanzania Medicines and Medical Devices Act.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Cookies & Analytical Usage</h2>
              <p>
                Our web platform employs essential technical session cookies and privacy-respecting analytics to optimize
                medication supply availability notices and hospital requisition requests.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Institutional Requisitions</h2>
              <p>
                All prescription-only medicines (POM) listed in our formulary are distributed exclusively to licensed
                health facilities, government medical stores (MSD), accredited hospitals, and registered community pharmacies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Cold-Chain & Batch Traceability</h2>
              <p>
                Every consignment leaves our zonal transit centers with temperature tracking verification. Hospital receiving
                officers inspect seal tamper-evidence and batch numbers against the accompanying Certificate of Analysis (CoA).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Regulatory Compliance</h2>
              <p>
                These terms are governed in accordance with the laws of the United Republic of Tanzania and the guidelines
                stipulated by TMDA and the Pharmacy Council of Tanzania.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
