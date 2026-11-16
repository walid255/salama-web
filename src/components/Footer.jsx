import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Lock,
  Phone,
  Mail,
  MapPin,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import {
  LinkedInIcon,
  TwitterXIcon,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  WhatsAppIcon
} from './SocialIcons';

export default function Footer() {
  const {
    siteContent,
    currentUser,
    navigate,
    logout,
    addToast,
    showConfirm
  } = useApp();

  // Newsletter state
  const [emailInput, setEmailInput] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@') || !emailInput.includes('.')) {
      addToast('Please enter a valid healthcare professional email address', 'error');
      return;
    }
    if (!agreedPrivacy) {
      addToast('Please agree to receive clinical and pharmaceutical updates', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmailInput('');
      setAgreedPrivacy(false);
      showConfirm({
        title: 'Subscription Confirmed!',
        message: `Thank you for subscribing with ${emailInput}.\nYou will receive our monthly clinical monograph digests, TMDA updates, and Tanzanian hospital drug availability bulletins.`,
        confirmText: 'Done',
        type: 'success'
      });
    }, 500);
  };

  const social = siteContent?.socialLinks || {};

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Legacy (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Salama Pharmaceuticals"
            >
              <img
                src="/assets/brand/salama-logo.webp"
                alt="Salama Pharmaceuticals Logo"
                width="160"
                height="50"
                className="h-11 w-auto object-contain brightness-110"
                onError={(e) => {
                  e.currentTarget.src = '/assets/brand/salama-logo.png';
                }}
              />
            </button>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Salama Pharmaceuticals has served Tanzania for over 40 years. We champion clinical autonomy,
              reliable national distribution through 5 zonal depots, and supply over 1,500 healthcare facilities
              with TMDA-approved, WHO-GMP manufactured molecules.
            </p>

            {/* Social Network Links (Editable through CMS) */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-salama-orange mb-3">
                Connect With Salama
              </p>
              <div className="flex items-center gap-3 flex-wrap" aria-label="Social media links">
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-salama-teal hover:text-white border border-slate-800 text-slate-400 transition-all duration-200"
                    aria-label="Follow Salama on LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-salama-teal hover:text-white border border-slate-800 text-slate-400 transition-all duration-200"
                    aria-label="Follow Salama on X / Twitter"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                )}
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-salama-teal hover:text-white border border-slate-800 text-slate-400 transition-all duration-200"
                    aria-label="Follow Salama on Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-salama-teal hover:text-white border border-slate-800 text-slate-400 transition-all duration-200"
                    aria-label="Follow Salama on Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-salama-teal hover:text-white border border-slate-800 text-slate-400 transition-all duration-200"
                    aria-label="Subscribe to Salama on YouTube"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-salama-orange transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-salama-orange transition-colors"
                >
                  About Us & 40+ Years Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about/profile')}
                  className="hover:text-salama-orange transition-colors"
                >
                  Company Profile & Deck
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about/zones')}
                  className="hover:text-salama-orange transition-colors"
                >
                  5 National Zonal Centers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about/clinical-freedom')}
                  className="hover:text-salama-orange transition-colors"
                >
                  Doctor Choice & STG Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/catalog')}
                  className="hover:text-salama-orange transition-colors"
                >
                  Pharmaceutical Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contacts')}
                  className="hover:text-salama-orange transition-colors"
                >
                  Contacts & Zonal Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-salama-orange transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Zonal Distribution Hubs */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              National Supply Hubs
            </h2>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Corporate HQ:</strong> Dar es Salaam (Coastal & Zanzibar)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Northern Zone:</strong> Arusha (Prime MSD Hub)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Southern Highlands:</strong> Mbeya
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Central Zone:</strong> Dodoma (Capital Hub)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-salama-orange flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Lake Zone:</strong> Mwanza (Great Lakes)
                </span>
              </li>
            </ul>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs">
              <span className="text-emerald-400 font-medium">✓ WHO-GDP Certified Cold-Chain</span>
            </div>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinical Bulletin
            </h2>
            <p className="text-xs text-slate-400">
              Subscribe for registered molecule monographs, STG therapy alerts, and hospital inventory alerts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="doctor@hospital.co.tz"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-salama-orange focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-salama-orange hover:bg-salama-orange-hover text-white rounded-lg flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedPrivacy}
                  onChange={(e) => setAgreedPrivacy(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-salama-orange focus:ring-salama-orange bg-slate-900"
                />
                <span>
                  I consent to receive scientific bulletins in accordance with the medical privacy policy.
                </span>
              </label>
            </form>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-salama-orange" />
                <span>+255 22 286 4500</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-salama-orange" />
                <span>info@salama.co.tz</span>
              </p>
            </div>
          </div>
        </div>

        {/* Pharmacovigilance & Compliance Banner */}
        <div className="py-4 my-6 px-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-salama-orange flex-shrink-0" />
            <span>
              <strong>Pharmacovigilance Alert:</strong> Suspected adverse drug reactions or quality defects must be
              reported to <strong>safety@salama.co.tz</strong> or 24/7 Hotline <strong>+255 754 000 999</strong>.
            </span>
          </div>
          <button
            onClick={() => navigate('/contacts')}
            className="text-salama-orange hover:underline font-medium text-xs whitespace-nowrap"
          >
            Submit ADR Report &rarr;
          </button>
        </div>

        {/* Bottom Bar: Copyright, Legal Links, AND THE EXCLUSIVE ADMIN LOGIN LINK */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Salama Pharmaceuticals Limited. All Rights Reserved. Regulated by TMDA.
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Supply
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Sitemap.xml
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Robots.txt
            </a>

            {/* MANDATORY REQUIREMENT: Admin Login ONLY on the Footer! */}
            <div className="border-l border-slate-800 pl-4">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-salama-teal/30 text-emerald-300 border border-salama-teal/40 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    {currentUser.role}
                  </span>
                  <button
                    onClick={() => navigate('/admin')}
                    className="text-salama-orange hover:text-orange-400 font-semibold underline text-xs transition-colors"
                  >
                    Open CMS
                  </button>
                  <button
                    onClick={logout}
                    className="text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-salama-orange transition-colors text-xs font-medium py-1 px-2 rounded hover:bg-slate-900 border border-transparent hover:border-slate-800"
                  aria-label="Staff and Admin Portal Login (Footer Only)"
                  title="Restricted Staff & Admin Management Portal"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
