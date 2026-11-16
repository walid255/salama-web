import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Building2,
  Grid,
  Play,
  Share2,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function CompanyProfilePage() {
  const { copyToClipboard } = useApp();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [viewMode, setViewMode] = useState('carousel'); // carousel | grid
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 24;

  const slideTitles = [
    'Empowering Choices for Healthier Life',
    'With Deep Roots in Tanzania: 40+ Years of Service',
    'Shaping Access, Reach & Care: 5 Strategic Zonal Centers',
    'Wherever Care is Needed: National Cold-Chain Logistics',
    'Prime Supplier to Medical Stores Department (MSD)',
    '1,500+ Healthcare Facilities across Tanzania',
    'To Empower & Return to Doctors Freedom to Choose',
    'The Era of Market-Controlled Prescribing is Over',
    'Doctors Choose. Patients Come First.',
    'What Doctors Can Expect: 100+ TMDA Registered Molecules',
    'Support Beyond the Prescription: Education, Outreach, Partnerships',
    'ALCEF & ALCEF-SB (Ceftriaxone & Sulbactam 1.5g)',
    'ALPHACLAV 625 & ALPHACLAV-DS (Amoxicillin + Clavulanate)',
    'GLAUCONIL 0.005% (Latanoprost Ophthalmic Solution)',
    'FIXIM 400 (Cefixime Tablets USP 400mg)',
    'FLUCOZ 150 (Fluconazole Tablets USP 150mg)',
    'GLIMMET 2 (Glimepiride 2mg & Metformin 500mg SR)',
    'COSTAN 50 (Losartan Potassium 50mg)',
    'COSTAN-H (Losartan 50mg & Hydrochlorothiazide 12.5mg)',
    'MELKAM 15 (Meloxicam Tablets BP 15mg)',
    'MUSCOLEVE (Diclofenac + Methyl Salicylate + Menthol Gel 30g)',
    'KETOMUSC 2.5 (Ketoprofen 2.5% Gel 30g)',
    'Where We’re Headed: Expanding Therapeutic Coverage',
    'Your Decision. Your Patient. Your Treatment.'
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  };

  const currentSlidePadded = String(currentSlide).padStart(2, '0');

  return (
    <div className="space-y-12 pb-20">
      <SEOHead
        title="Interactive Company Profile & Deck"
        description="Explore the official Salama Pharmaceuticals company presentation: 40+ years of healthcare service, national supply reach across Tanzania, and our TMDA-approved molecule portfolio."
        canonicalUrl="/about/profile"
      />

      {/* Header section */}
      <section className="bg-gradient-to-b from-salama-teal-light/50 to-transparent dark:from-salama-dark py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-salama-orange text-xs font-bold uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Official Corporate Presentation</span>
              </div>
              {/* Only 1 h1 tag on the page */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Salama Pharmaceuticals Company Profile
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Explore our digital deck or download the complete PDF for hospital procurement committees.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/assets/brand/Salama_Pharmaceuticals_Profile.pdf"
                download="Salama_Pharmaceuticals_Company_Profile.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-salama-orange hover:bg-salama-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Deck</span>
              </a>

              <button
                onClick={() => {
                  copyToClipboard(window.location.href, 'Link to Company Profile copied!');
                }}
                className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share or Copy Profile Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Deck Viewer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Viewer Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'carousel'
                  ? 'bg-salama-teal text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Slide View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-salama-teal text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View (All 24)</span>
            </button>
          </div>

          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Slide {currentSlide} of {totalSlides}
          </div>
        </div>

        {/* Carousel Mode */}
        {viewMode === 'carousel' ? (
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-950 flex flex-col items-center">
            
            {/* Active Slide Image */}
            <div className="relative w-full aspect-[16/11] max-h-[640px] flex items-center justify-center bg-black/90">
              <img
                src={`/assets/slides/slide-${currentSlidePadded}.webp`}
                alt={`Salama Pharmaceuticals Presentation - Slide ${currentSlide}: ${slideTitles[currentSlide - 1]}`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = `/assets/slides/slide-${currentSlidePadded}.jpg`;
                }}
              />

              {/* Prev / Next overlay buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-salama-orange text-white backdrop-blur-md transition-all shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-salama-orange text-white backdrop-blur-md transition-all shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Slide Info bar */}
            <div className="w-full bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
              <div>
                <p className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                  Slide {currentSlide} of {totalSlides}
                </p>
                <h2 className="text-base font-bold text-slate-100">
                  {slideTitles[currentSlide - 1]}
                </h2>
              </div>

              {/* Chapter jumps */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setCurrentSlide(1)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    currentSlide >= 1 && currentSlide <= 11
                      ? 'bg-salama-teal text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Heritage & Reach (1-11)
                </button>
                <button
                  onClick={() => setCurrentSlide(12)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    currentSlide >= 12 && currentSlide <= 22
                      ? 'bg-salama-teal text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Molecules (12-22)
                </button>
                <button
                  onClick={() => setCurrentSlide(23)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    currentSlide >= 23
                      ? 'bg-salama-teal text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Outlook (23-24)
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="w-full bg-slate-950 px-4 py-3 overflow-x-auto flex items-center gap-2 border-t border-slate-800/80">
              {Array.from({ length: totalSlides }).map((_, i) => {
                const sNum = i + 1;
                const sPad = String(sNum).padStart(2, '0');
                const isSelected = sNum === currentSlide;
                return (
                  <button
                    key={sNum}
                    onClick={() => setCurrentSlide(sNum)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-salama-orange scale-105 shadow-md'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={`/assets/slides/slide-${sPad}.webp`}
                      alt={`Slide ${sNum}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-0 right-0 px-1 text-[9px] bg-black/80 text-white font-mono rounded-tl">
                      {sNum}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        ) : (
          /* Grid Mode: All 24 Slides */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: totalSlides }).map((_, i) => {
              const sNum = i + 1;
              const sPad = String(sNum).padStart(2, '0');
              return (
                <div
                  key={sNum}
                  onClick={() => {
                    setCurrentSlide(sNum);
                    setViewMode('carousel');
                  }}
                  className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-salama-orange overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/11] bg-slate-950 overflow-hidden">
                    <img
                      src={`/assets/slides/slide-${sPad}.webp`}
                      alt={slideTitles[i]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-mono">
                      #{sNum}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-salama-orange transition-colors">
                      {slideTitles[i]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Key Company Highlights Extracted from Presentation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Executive Summary: Salama at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-salama-teal dark:text-salama-orange">
                1. Heritage & National Scale
              </h3>
              <p>
                40+ years of uninterrupted pharmaceutical service in Tanzania. Established as a prime supplier to the Medical
                Stores Department (MSD), delivering essential hospital stock to Arusha, Dodoma, Lake Zone, and nationwide.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-salama-teal dark:text-salama-orange">
                2. Clinical Autonomy & Choice
              </h3>
              <p>
                Committed to ending market-controlled prescribing by stocking every essential therapy in Tanzania’s Standard
                Treatment Guidelines (STG). Backing doctor choice with therapeutic depth and registered alternatives.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-salama-teal dark:text-salama-orange">
                3. Quality Assurance & Support
              </h3>
              <p>
                100+ TMDA-approved molecule applications, manufactured under WHO-GMP compliance with full certificate of analysis
                (CoA) verification, accompanied by CME clinical symposiums and on-ground outreach.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
