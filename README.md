# Salama Pharmaceuticals — Web & CMS Platform

A modern, elegant, and professional web platform and Content Management System (CMS) with Role-Based Access Control (RBAC) designed for **Salama Pharmaceuticals Limited** (Tanzania).

Built with **React**, **Vite**, **Tailwind CSS**, and architected as an installable **Progressive Web App (PWA)** optimized for hosting on **Cloudflare Pages**.

---

## 🌟 Brand & Visual Identity
- **Primary Brand Colors**:
  - **Teal / Forest Green**: `#015852` (clinical excellence, trust)
  - **Vibrant Orange**: `#F47920` (vitality, warmth, accessibility)
- **Picture-based Logo**: Extracted from official high-resolution vector artwork (`/assets/brand/salama-logo.webp`).
- **Favicon Suite**: Multi-resolution crisp favicons (32x32, 180x180 Apple Touch, 192x192 & 512x512 PWA icons).

---

## 🚀 Key Features

### 1. Pages & Architecture
- **Home (`/`)**:
  - Dynamic Hero: *"Empowering Choices for Healthier Life"* with 40+ Years heritage badge.
  - National metrics (40+ Years, 100+ TMDA-Approved Molecules, 1,500+ Healthcare Facilities, 5 Zonal Centers).
  - Doctor Prescribing Freedom Manifesto: *"The era of Market-Controlled prescribing is over"*.
  - Featured Molecules carousel/grid from the official formulary.
  - 3 Core Engagement Pillars: Clinical Education, Patient Outreach, On-ground Partnerships.
  - Hospital Partners badge ticker (Muhimbili, KCMC, Bugando, Benjamin Mkapa, Aga Khan, Shree Hindu Mandal).
- **About Us & Company Profile (`/about`)**:
  - **Auto-hiding dropdown menu** with quick sub-navigation:
    - *Our Story & 40+ Years Legacy* (`/about`)
    - *Interactive Company Profile & Deck* (`/about/profile`) — Interactive 24-slide presentation viewer with PDF download.
    - *National Supply & 5 Zonal Centers* (`/about/zones`) — Good Distribution Practice (GDP) cold chain.
    - *Doctor Choice & STG Guidelines* (`/about/clinical-freedom`) — Prescribing autonomy.
    - *Quality Assurance & TMDA* (`/about/quality`) — WHO-GMP compliance & Certificates of Analysis (CoA).
- **Catalogy (`/catalog`)**:
  - Searchable by Brand, Generic Formula, TMDA Code, or Clinical Indication.
  - Filterable by Therapeutic Area & Dosage Form.
  - Clinical Monograph Modal with indications, packaging, mechanism, copy-to-clipboard buttons, and Schema.org Product data.
  - Deep-linkable product routes (e.g. `/catalog/alcef-sb-ceftriaxone-sulbactam`).
- **Contacts & Zonal Map (`/contacts`)**:
  - **Interactive Graphic Map of Tanzania** marking all 5 regional distribution depots (Dar es Salaam HQ, Arusha HQ, Mbeya HQ, Dodoma HQ, Mwanza HQ) with active supply lines.
  - Hospital & Institutional Procurement requisition form with validation and confirmation modals.
  - Dedicated 24/7 Pharmacovigilance & Drug Safety hotline (`+255 754 000 999`).
- **FAQs (`/faq`)**:
  - Expandable, searchable accordion covering TMDA licensing, cold-chain logistics, and hospital credit accounts.
- **Clean 404 Page (`/404`)**:
  - Branded recovery page with search bar and direct clinical navigation shortcuts.

### 2. Admin Portal & Role-Based Access Control (RBAC)
- **Mandatory Placement**: Admin portal login is placed **strictly on the footer** (`/admin`).
- **Password Visibility Toggle**: Eye / Eye-off icon on login inputs.
- **Pre-configured Roles & Accounts**:
  - **Super Admin**: `admin@salama.co.tz` / `Salama@2026!Admin` (Full permissions, Cloudflare purge, factory reset, user management)
  - **Content Editor**: `editor@salama.co.tz` / `Salama@Editor2026` (Manage catalog, hero copy, FAQs, social links)
  - **Medical Reviewer**: `reviewer@salama.co.tz` / `Salama@Reviewer2026` (Review monographs, view logs)
- **CMS Managed Content**:
  - Full CRUD on registered molecules and products.
  - Social network links (LinkedIn, Twitter/X, Facebook, Instagram, YouTube, WhatsApp).
  - Homepage banners and hero messaging.
  - Cloudflare Cache Purge tool with Zone ID and API Token inputs.
  - One-click JSON backup export and restore.

### 3. Google SEO & Web Performance Checklist
- ✅ **Strict 1 `<h1>` per page**: Verified across all 12 page routes.
- ✅ **Sitemap.xml**: Valid XML at `/sitemap.xml`.
- ✅ **Robots.txt**: Clean file at `/robots.txt` disallowing `/admin`.
- ✅ **Schema.org Structured Data**: JSON-LD scripts for `PharmaceuticalOrganization`, `MedicalBusiness`, `WebSite`, `Product`, `FAQPage`.
- ✅ **Canonical URLs & Dynamic Meta Tags**: Automated via `SEOHead.jsx`.
- ✅ **Image Compression**: All 24 presentation slides and product boxes converted to lightweight WebP.
- ✅ **Force HTTPS**: Content-Security-Policy `upgrade-insecure-requests` enabled.
- ✅ **Google Search Console**: Verification meta tag support in CMS.
- ✅ **PWA Capabilities**: Web App Manifest (`manifest.webmanifest`) and Service Worker (`sw.js`).
- ✅ **Micro-Interactions**: Hover lift, smooth scroll-to-top, floating WhatsApp desk, sticky help widget, dark mode toggle, and accessible skip link.

---

## 📦 Cloudflare Deployment

### Deploy via Cloudflare Pages
1. Push this repository to GitHub or GitLab.
2. In your Cloudflare Dashboard, navigate to **Compute (Workers) > Pages > Create a project**.
3. Select your repository with these build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Deploy! The included `public/_redirects` ensures seamless client-side SPA routing (`/* /index.html 200`).

---

## ⚡ Cloudflare Cache Purging Integration
The app includes the requested edge purge function in `src/context/AppContext.jsx` and the Admin Control Center:

```javascript
async function purgeCloudflareCache(urlsToPurge) {
  const ZONE_ID = 'your_cloudflare_zone_id';
  const API_TOKEN = 'your_cloudflare_api_token';

  const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: urlsToPurge 
    }),
  });

  const result = await response.json();
  if (!result.success) {
    console.error('Cloudflare purge failed:', result.errors);
  }
}
```
In the Admin Portal (`/admin`), you can enter your live Zone ID and API Token to purge specific URLs or the entire cache with one click.
