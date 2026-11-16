import React from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  MapPin,
  Truck,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function ZonalSupplyPage() {
  const { zones, navigate } = useApp();

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="5 National Zonal Centers & Cold-Chain Supply"
        description="Salama Pharmaceuticals operates 5 strategic distribution hubs in Dar es Salaam, Arusha, Mbeya, Dodoma, and Mwanza, delivering WHO-GDP certified pharmaceuticals nationwide."
        canonicalUrl="/about/zones"
      />

      {/* Header */}
      <section className="bg-salama-teal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salama-orange/20 text-salama-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Truck className="w-3.5 h-3.5" />
            <span>Nationwide Logistics</span>
          </div>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            Shaping Access, Reach & Care: 5 Strategic Zonal Centers
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
            Delivering deeper market penetration, temperature-monitored pharmaceutical logistics, and unmatched
            serviceability to hospitals, mission facilities, and pharmacies across Tanzania.
          </p>
        </div>
      </section>

      {/* Zonal Hubs Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {zones.map((zone, idx) => (
            <div
              key={zone.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-salama-teal/10 dark:bg-salama-teal/30 text-salama-teal dark:text-salama-orange text-xs font-bold uppercase tracking-wider">
                    Zone #{idx + 1}
                  </span>
                  {zone.isHeadquarters && (
                    <span className="px-3 py-1 rounded-full bg-salama-orange text-white text-xs font-bold tracking-wider">
                      National Corporate Headquarters
                    </span>
                  )}
                  {zone.hqCity === 'Arusha' && (
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-wider">
                      Prime MSD Vendor Zone
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {zone.name}
                </h2>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-salama-orange flex-shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> {zone.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-salama-orange flex-shrink-0" />
                    <span><strong>Hotline:</strong> {zone.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-salama-orange flex-shrink-0" />
                    <span><strong>Direct Zonal Email:</strong> {zone.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span><strong>Storage Facility:</strong> {zone.warehouseCapacity}</span>
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Regions Served in this Zonal Corridor:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.coverage.map((reg, rIdx) => (
                      <span
                        key={rIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-6 lg:pt-0 lg:pl-8">
                <div className="text-left lg:text-right">
                  <p className="text-xs text-slate-400">Transit Commitment</p>
                  <p className="text-xl font-bold text-salama-teal dark:text-salama-orange">
                    Same-Day / 24h
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">To registered hospital pharmacies</p>
                </div>

                <button
                  onClick={() => navigate('/contacts')}
                  className="px-5 py-2.5 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Inquire at {zone.hqCity}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cold Chain Certification */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              Good Distribution Practice (GDP)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Unbroken Cold-Chain & Climate-Controlled Fleet
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every sensitive antibiotic, suspension, and ophthalmic solution is preserved within calibrated 2°C–8°C
              or controlled room temperature (CRT) thresholds from our bonded central hub in Dar es Salaam to zonal delivery docks.
            </p>
          </div>
          <button
            onClick={() => navigate('/about/quality')}
            className="px-6 py-3 rounded-xl bg-salama-orange hover:bg-salama-orange-hover text-white text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0"
          >
            Review Quality Controls
          </button>
        </div>
      </section>

    </div>
  );
}
