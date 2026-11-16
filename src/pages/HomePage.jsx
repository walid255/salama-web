import React from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  ShieldCheck,
  Stethoscope,
  Pill,
  Truck,
  Building2,
  Users,
  BookOpen,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const { siteContent, products, zones, navigate } = useApp();

  const hero = siteContent.hero || {};
  const stats = siteContent.stats || [];
  const pillars = siteContent.pillars || [];
  const doctorMission = siteContent.doctorMission || {};
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      <SEOHead
        title="Home"
        description="Salama Pharmaceuticals Tanzania: Empowering choices for healthier life with 40+ years of trusted service, 100+ TMDA-approved molecules, and nationwide supply."
        canonicalUrl="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-salama-teal-light/40 via-white to-white dark:from-salama-dark dark:via-slate-900 dark:to-slate-900 pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle decorative geometric background */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-salama-orange/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-salama-teal/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-salama-teal/10 dark:bg-salama-orange/15 border border-salama-teal/20 dark:border-salama-orange/30 text-salama-teal dark:text-salama-orange text-xs font-bold tracking-wide animate-in fade-in slide-in-from-top-2">
                <span className="w-2 h-2 rounded-full bg-salama-orange"></span>
                <span>{hero.badge || '40+ Years of Trusted Pharmaceutical Service in Tanzania'}</span>
              </div>

              {/* STRICT REQUIREMENT: Only 1 H1 Tag per page! */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                {hero.headline}
                <span className="block text-salama-teal dark:text-salama-orange text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-2">
                  With Deep Roots in Tanzania
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {hero.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => navigate(hero.primaryCtaLink || '/catalog')}
                  className="px-7 py-4 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>{hero.primaryCtaText || 'Explore Product Catalog'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate(hero.secondaryCtaLink || '/about/profile')}
                  className="px-7 py-4 rounded-xl border-2 border-salama-orange text-salama-orange hover:bg-salama-orange hover:text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>{hero.secondaryCtaText || 'Company Profile & Heritage'}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-salama-orange flex-shrink-0" />
                  <span>TMDA Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-salama-teal dark:text-salama-orange flex-shrink-0" />
                  <span>MSD Prime Vendor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>WHO-GMP Quality</span>
                </div>
              </div>

            </div>

            {/* Right Media Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-salama-teal via-salama-orange to-amber-400 opacity-20 blur-2xl transform scale-95"></div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 group">
                  <img
                    src="/assets/slides/slide-02.webp"
                    alt="Salama Pharmaceutical Doctors shaping the future of pharma in Tanzania"
                    width="1755"
                    height="1241"
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/slides/slide-02.jpg';
                    }}
                  />

                  {/* Floating floating card badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 shadow-xl flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-salama-orange uppercase tracking-wider">
                        Doctor-Centered Healthcare
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Prescribing Freedom & Quality
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/about/clinical-freedom')}
                      className="p-2 rounded-xl bg-salama-teal text-white hover:bg-salama-teal-hover transition-colors"
                      aria-label="Learn about clinical freedom"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-salama-teal rounded-3xl shadow-2xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-salama-orange/20 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-salama-teal-dark">
            {stats.map((stat, idx) => (
              <div key={idx} className={`pt-6 md:pt-0 ${idx > 0 ? 'md:pl-8' : ''} text-center md:text-left`}>
                <p className="text-4xl sm:text-5xl font-black text-salama-orange tracking-tight">
                  {stat.value}
                </p>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-white">
                  {stat.label}
                </h3>
                <p className="text-xs text-emerald-200/80 mt-1 font-medium">
                  {stat.suffix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Prescribing Manifesto (Slide 8 & 9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[380px]">
              <img
                src="/assets/slides/slide-08.webp"
                alt="Empowering Tanzanian clinicians to freely prescribe"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/slides/slide-08.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                <span className="text-xs font-bold uppercase tracking-wider text-salama-orange">
                  Clinical Principle
                </span>
                <p className="text-base font-bold">The era of Market-Controlled prescribing is over.</p>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-salama-orange text-xs font-bold">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Restoring Clinical Freedom</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {doctorMission.title || 'The era of Market-Controlled prescribing is over'}
              </h2>

              <p className="text-lg font-semibold text-salama-teal dark:text-salama-orange">
                {doctorMission.lead || 'We stand for a new standard: Doctors choose. Patients come first.'}
              </p>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {doctorMission.paragraphs?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-salama-teal-light dark:bg-slate-800/80 border border-salama-teal/20 dark:border-salama-teal/40">
                  <p className="text-xs font-bold text-salama-teal dark:text-salama-orange uppercase tracking-wider">
                    Our Pledge to Healthcare Providers
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                    “{doctorMission.tag || 'Your decision. Your patient. Your treatment.'}”
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigate('/about/clinical-freedom')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-salama-teal dark:text-salama-orange hover:underline"
                >
                  <span>Read our Clinical Autonomy Manifesto</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Featured Pharmaceutical Catalog Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-salama-orange uppercase tracking-wider mb-2">
              <Pill className="w-4 h-4" />
              <span>Essential Therapies</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured TMDA-Approved Molecules
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Engineered for efficacy, compliance, and safety in Tanzanian referral hospitals, private clinics, and primary care centers.
            </p>
          </div>

          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs tracking-wide transition-colors self-start md:self-auto"
          >
            <span>View Full 13+ Product Catalog</span>
            <ArrowRight className="w-4 h-4 text-salama-orange" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/catalog/${product.slug}`)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-salama-teal dark:hover:border-salama-orange shadow-md hover:shadow-2xl transition-all duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Product Image preview */}
                <div className="relative w-full h-48 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 flex items-center justify-center p-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    width="400"
                    height="300"
                    className="max-h-full max-w-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-salama-teal text-white text-[10px] font-bold tracking-wider uppercase">
                      {product.dosageForm}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 text-[10px] font-mono border border-slate-200 dark:border-slate-700">
                      {product.tmdaRegNo}
                    </span>
                  </div>
                </div>

                {/* Information */}
                <div className="mt-4">
                  <p className="text-xs font-semibold text-salama-orange uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-salama-teal dark:group-hover:text-salama-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {product.genericName}
                  </p>
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {product.keyHighlight}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {product.strength}
                </span>
                <span className="text-xs font-bold text-salama-teal dark:text-salama-orange flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Beyond The Prescription (Slide 11) */}
      <section className="bg-slate-100/70 dark:bg-slate-950/60 py-16 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              Comprehensive Medical Engagement
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Support Beyond the Prescription
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              We extend our clinical commitment beyond supplying medicines, fostering enduring healthcare partnerships across Tanzania.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              let Icon = BookOpen;
              if (pillar.icon === 'Users') Icon = Users;
              if (pillar.icon === 'Handshake') Icon = Handshake;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-salama-teal-light dark:bg-salama-surface-dark text-salama-teal dark:text-salama-orange flex items-center justify-center shadow-inner">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-salama-orange">
                      {pillar.tagline}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-salama-teal dark:text-salama-orange">
                      Accredited by Tanzanian Medical Councils
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Hospital Trust & MSD Section (Slide 5 & 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              Serving Tanzania's Health Facilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              1,500+ Healthcare Facilities across Government, Mission & Private Sectors
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When healthcare needs scale, leading medical centers turn to Salama. We are recognized as one of the largest
              pharmaceutical suppliers to the Medical Stores Department (MSD) and a prime vendor in major national healthcare corridors.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Trusted by Tanzania’s Leading Hospitals:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                {siteContent.trustedHospitals?.map((hosp, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                    <Building2 className="w-3.5 h-3.5 text-salama-orange flex-shrink-0" />
                    <span className="truncate">{hosp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigate('/contacts')}
                className="px-6 py-3 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                Inquire For Institutional Supply
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <img
                src="/assets/slides/slide-06.webp"
                alt="The Aga Khan Hospital Dar es Salaam - 1500+ healthcare facilities served across Tanzania"
                width="1755"
                height="1241"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/assets/slides/slide-06.jpg';
                }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-salama-orange">
                  National Footprint
                </p>
                <p className="text-sm font-semibold">
                  Consistent supply delivery to referral, district & faith-based hospitals nationwide.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Nationwide Logistics & 5 Zonal Centers (Slide 3 & 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-salama-dark text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-salama-teal/20 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salama-orange/20 text-salama-orange text-xs font-bold">
                <Truck className="w-3.5 h-3.5" />
                <span>Wherever Care is Needed</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Shaping Access, Reach & Care Through 5 Strategic Zonal Depots
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Our national distribution network ensures temperature-monitored pharmaceutical delivery
                across the United Republic of Tanzania, reaching deep into regional and district health centers.
              </p>

              {/* 5 Zones Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    onClick={() => navigate('/contacts')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-salama-orange cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-salama-orange font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{zone.hqCity} HQ</span>
                    </div>
                    <p className="text-slate-200 font-semibold mt-1">{zone.name}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5 line-clamp-1">
                      {zone.coverage.join(', ')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/contacts')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-salama-orange hover:bg-salama-orange-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Open Interactive Tanzania Map</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                <img
                  src="/assets/slides/slide-04.webp"
                  alt="Salama Pharmaceutical cold-chain delivery fleet on highway across Tanzania"
                  width="1755"
                  height="1241"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/slides/slide-04.jpg';
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action: Your decision. Your patient. Your treatment (Slide 24) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-salama-teal-light via-white to-orange-50/50 dark:from-salama-surface-dark dark:via-slate-900 dark:to-slate-900 p-8 sm:p-12 lg:p-16 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-left">
            <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
              A Healthier Tomorrow for Tanzania
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              You’re Not Alone — We’re Building This Future With You.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Join more than 1,500 healthcare facilities that rely on Salama for uncompromising quality,
              transparent supply continuity, and patient-first care.
            </p>
            <div className="flex items-center gap-6 text-xs font-bold text-salama-teal dark:text-salama-orange pt-2">
              <span>✓ More options</span>
              <span>✓ More confidence</span>
              <span>✓ More care</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <button
              onClick={() => navigate('/contacts')}
              className="px-8 py-4 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all"
            >
              Get In Touch
            </button>
            <button
              onClick={() => navigate('/about/profile')}
              className="px-8 py-4 rounded-xl border border-salama-orange text-salama-orange hover:bg-salama-orange hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              Download Profile
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
