import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SEOHead from '../components/SEOHead';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  Navigation,
  Globe
} from 'lucide-react';

export default function ContactsPage() {
  const { zones, siteContent, addToast, showConfirm } = useApp();

  const [activeZoneId, setActiveZoneId] = useState('zone-dar');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    facilityName: '',
    cadre: 'Hospital Pharmacist',
    selectedZone: 'zone-dar',
    inquiryType: 'Institutional Supply & MSD Procurement',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedZoneObj = zones.find((z) => z.id === activeZoneId) || zones[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showConfirm({
        title: 'Inquiry Submitted Successfully!',
        message: `Thank you, ${formData.name}.\nYour dispatch request for "${formData.facilityName || 'your facility'}" has been assigned to our ${selectedZoneObj.hqCity} Zonal Depot team.\nA representative will contact you via ${formData.phone} within 4 business hours.`,
        confirmText: 'Done',
        type: 'success',
        onConfirm: () => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            facilityName: '',
            cadre: 'Hospital Pharmacist',
            selectedZone: 'zone-dar',
            inquiryType: 'Institutional Supply & MSD Procurement',
            message: ''
          });
        }
      });
    }, 600);
  };

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Contacts & 5 National Zonal Centers Map"
        description="Contact Salama Pharmaceuticals Tanzania: Corporate HQ in Dar es Salaam, regional distribution depots in Arusha, Mbeya, Dodoma, and Mwanza, with interactive geographic map and supply desk."
        canonicalUrl="/contacts"
      />

      {/* Header Banner */}
      <section className="bg-salama-teal text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salama-orange/20 text-salama-orange text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>5 Nationwide Hubs</span>
          </div>
          {/* Strictly 1 h1 tag on the page */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
            Contacts & Zonal Distribution Network
          </h1>
          <p className="mt-4 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
            Reach our central corporate headquarters in Dar es Salaam or connect directly with our regional dispatch
            depots across Tanzania.
          </p>
        </div>
      </section>

      {/* Interactive Map & Zonal Selector Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-6">
          <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
            Geographic Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Interactive Tanzania Distribution Map
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Click on any regional hub to view depot coordinates, warehouse capacity, and contact channels.
          </p>
        </div>

        {/* Zonal Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZoneId(zone.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeZoneId === zone.id
                  ? 'bg-salama-teal text-white shadow-lg ring-2 ring-salama-orange/50'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${activeZoneId === zone.id ? 'text-salama-orange' : 'text-slate-400'}`} />
              <span>{zone.hqCity}</span>
              {zone.isHeadquarters && (
                <span className="text-[10px] bg-salama-orange text-white px-1.5 py-0.2 rounded-full">
                  HQ
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Map Container + Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Styled Map View (8 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 min-h-[420px] relative flex flex-col justify-between p-6">
            
            {/* SVG Visual Stylized Tanzania Map */}
            <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
              <svg
                viewBox="0 0 600 450"
                className="w-full h-full max-h-[380px] drop-shadow-2xl"
                aria-label="Map of Tanzania showing Salama Distribution Hubs"
              >
                {/* Tanzania Boundary Stylized Contour */}
                <path
                  d="M140,50 Q280,40 380,80 Q450,120 480,180 Q520,240 500,310 Q450,420 380,410 Q280,390 180,380 Q100,320 80,240 Q90,130 140,50 Z"
                  fill="#013632"
                  stroke="#015852"
                  strokeWidth="3"
                  className="transition-colors"
                />

                {/* Lake Victoria */}
                <circle cx="210" cy="80" r="36" fill="#0d2927" stroke="#00544c" strokeWidth="2" />
                <text x="210" y="84" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">Lake Victoria</text>

                {/* Lake Tanganyika */}
                <path d="M70,180 Q85,260 110,330" fill="none" stroke="#00544c" strokeWidth="6" strokeLinecap="round" />

                {/* Connecting Supply Logistics Lines to Dar es Salaam HQ */}
                <g stroke="#F47920" strokeWidth="2" strokeDasharray="4 4" opacity="0.6">
                  {/* Dar to Arusha */}
                  <line x1="460" y1="210" x2="340" y2="120" />
                  {/* Dar to Dodoma */}
                  <line x1="460" y1="210" x2="310" y2="210" />
                  {/* Dar to Mbeya */}
                  <line x1="460" y1="210" x2="230" y2="330" />
                  {/* Dodoma to Mwanza */}
                  <line x1="310" y1="210" x2="210" y2="105" />
                </g>

                {/* 5 Hub Markers */}
                {/* 1. Mwanza (Lake Zone) */}
                <g
                  className="cursor-pointer transform hover:scale-125 transition-transform"
                  onClick={() => setActiveZoneId('zone-mwanza')}
                >
                  <circle cx="210" cy="105" r={activeZoneId === 'zone-mwanza' ? 12 : 8} fill={activeZoneId === 'zone-mwanza' ? '#F47920' : '#ffffff'} stroke="#015852" strokeWidth="3" />
                  <text x="210" y="130" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Mwanza</text>
                </g>

                {/* 2. Arusha (Northern Zone) */}
                <g
                  className="cursor-pointer transform hover:scale-125 transition-transform"
                  onClick={() => setActiveZoneId('zone-arusha')}
                >
                  <circle cx="340" cy="120" r={activeZoneId === 'zone-arusha' ? 12 : 8} fill={activeZoneId === 'zone-arusha' ? '#F47920' : '#ffffff'} stroke="#015852" strokeWidth="3" />
                  <text x="340" y="145" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Arusha</text>
                </g>

                {/* 3. Dodoma (Central Zone) */}
                <g
                  className="cursor-pointer transform hover:scale-125 transition-transform"
                  onClick={() => setActiveZoneId('zone-dodoma')}
                >
                  <circle cx="310" cy="210" r={activeZoneId === 'zone-dodoma' ? 12 : 8} fill={activeZoneId === 'zone-dodoma' ? '#F47920' : '#ffffff'} stroke="#015852" strokeWidth="3" />
                  <text x="310" y="235" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Dodoma</text>
                </g>

                {/* 4. Mbeya (Southern Zone) */}
                <g
                  className="cursor-pointer transform hover:scale-125 transition-transform"
                  onClick={() => setActiveZoneId('zone-mbeya')}
                >
                  <circle cx="230" cy="330" r={activeZoneId === 'zone-mbeya' ? 12 : 8} fill={activeZoneId === 'zone-mbeya' ? '#F47920' : '#ffffff'} stroke="#015852" strokeWidth="3" />
                  <text x="230" y="355" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Mbeya</text>
                </g>

                {/* 5. Dar es Salaam (Corporate HQ) */}
                <g
                  className="cursor-pointer transform hover:scale-125 transition-transform"
                  onClick={() => setActiveZoneId('zone-dar')}
                >
                  <circle cx="460" cy="210" r={activeZoneId === 'zone-dar' ? 14 : 10} fill="#F47920" stroke="#ffffff" strokeWidth="3" className="animate-pulse" />
                  <text x="460" y="235" textAnchor="middle" fill="#F47920" fontSize="12" fontWeight="bold">Dar es Salaam (HQ)</text>
                </g>

                {/* Zanzibar Island representation */}
                <ellipse cx="485" cy="180" rx="6" ry="12" fill="#5eead4" stroke="#00544c" strokeWidth="1" />
                <text x="515" y="184" textAnchor="start" fill="#5eead4" fontSize="9">Zanzibar</text>
              </svg>
            </div>

            {/* Bottom Map Note */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-salama-orange"></span>
                <span>Active Zonal Depot: <strong>{selectedZoneObj.hqCity}</strong></span>
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedZoneObj.coordinates.lat},${selectedZoneObj.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-salama-orange hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Active Depot Details Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-salama-teal/10 text-salama-teal dark:text-salama-orange text-xs font-bold uppercase tracking-wider">
                  Selected Depot
                </span>
                {selectedZoneObj.isHeadquarters && (
                  <span className="text-xs font-bold text-salama-orange">
                    Corporate Headquarters
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedZoneObj.name}
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 pt-2">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-salama-orange flex-shrink-0 mt-0.5" />
                  <span>{selectedZoneObj.address}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-salama-orange flex-shrink-0" />
                  <span>{selectedZoneObj.phone}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-salama-orange flex-shrink-0" />
                  <span>{selectedZoneObj.email}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{selectedZoneObj.warehouseCapacity}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{siteContent?.contactInfo?.workingHours || '08:00 – 17:00 EAT'}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Regional Coverage:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedZoneObj.coverage.map((reg, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={`tel:${selectedZoneObj.phone.split('/')[0].trim()}`}
              className="w-full py-3.5 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call {selectedZoneObj.hqCity} Depot Manager</span>
            </a>
          </div>

        </div>
      </section>

      {/* Hospital Procurement Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold text-salama-orange uppercase tracking-wider">
                Direct Hospital Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Institutional & Clinical Supply Inquiry
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Submit medication inquiries, tender documentation, or hospital pharmacy orders directly to our commercial team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. / Pharm. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hospital / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    placeholder="e.g. Regional Referral Hospital"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="doctor@health.go.tz"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+255 7XX XXX XXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Professional Cadre
                  </label>
                  <select
                    value={formData.cadre}
                    onChange={(e) => setFormData({ ...formData, cadre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                  >
                    <option>Consultant Physician / Medical Doctor</option>
                    <option>Chief Pharmacist / Pharmacist in Charge</option>
                    <option>Hospital Procurement Officer</option>
                    <option>MSD Zonal Coordinator</option>
                    <option>Community Pharmacy Director</option>
                    <option>Clinical Researcher / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Zonal Hub
                  </label>
                  <select
                    value={formData.selectedZone}
                    onChange={(e) => setFormData({ ...formData, selectedZone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                  >
                    {zones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.hqCity} ({z.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Inquiry Category
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                >
                  <option>Institutional Supply & MSD Procurement</option>
                  <option>Request Product Dossier & Certificate of Analysis (CoA)</option>
                  <option>Hospital Account Opening</option>
                  <option>Medical Representative Visit Request</option>
                  <option>Pharmacovigilance / Adverse Event Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message / Medication Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please specify molecules (e.g. Alcef-SB, Costan-H, Glauconil), batch quantities, and required delivery timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-salama-teal"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-salama-teal hover:bg-salama-teal-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting to Depot...' : 'Submit Procurement Inquiry'}</span>
              </button>
            </form>
          </div>

          {/* Right Information & Pharmacovigilance (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pharmacovigilance Box */}
            <div className="rounded-3xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/60 p-8 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-salama-orange text-white flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Pharmacovigilance & Drug Safety
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                If you suspect an adverse drug reaction (ADR) or observe any potential physical product defect, please report
                it immediately to our 24/7 dedicated medical surveillance unit.
              </p>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 font-semibold pt-1">
                <p>24/7 Safety Hotline: +255 754 000 999</p>
                <p>Safety Email: safety@salama.co.tz</p>
              </div>
            </div>

            {/* General Inquiries Box */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Central Corporate Switchboard
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-salama-teal dark:text-salama-orange" />
                  <span>+255 22 286 4500</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-salama-teal dark:text-salama-orange" />
                  <span>info@salama.co.tz</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-salama-teal dark:text-salama-orange mt-0.5" />
                  <span>Plot 45/47, Nyerere Road Industrial Area, P.O. Box 71822, Dar es Salaam, Tanzania</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
