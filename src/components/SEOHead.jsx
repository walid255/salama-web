import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/assets/brand/salama-logo.png',
  schemaData = null
}) {
  const { siteContent, zones } = useApp();
  const contactInfo = siteContent?.contactInfo || {};
  const headquarters = zones.find((zone) => zone.isHeadquarters) || zones[0];

  const siteTitle = 'Salama Pharmaceuticals | Empowering Choices for Healthier Life';
  const fullTitle = title ? `${title} | Salama Pharmaceuticals` : siteTitle;
  const metaDescription =
    description ||
    siteContent?.hero?.subheadline ||
    'Salama Pharmaceuticals: 40+ years of trusted service in Tanzania, providing 100+ TMDA-approved molecules across 1,500+ healthcare facilities nationwide.';
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://salamapharma.co.tz';
  const fullCanonical = canonicalUrl ? `${currentOrigin}${canonicalUrl}` : typeof window !== 'undefined' ? window.location.href : currentOrigin;
  const fullImage = ogImage.startsWith('http') ? ogImage : `${currentOrigin}${ogImage}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tags
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    setMeta('description', metaDescription);
    setMeta('robots', 'index, follow');

    // Google Search Console verification tag
    if (siteContent?.googleSearchConsole?.verificationMeta) {
      const token = siteContent.googleSearchConsole.verificationMeta.replace('google-site-verification=', '').trim();
      if (token) {
        setMeta('google-site-verification', token);
      }
    }

    // OpenGraph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', metaDescription, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', fullCanonical, true);
    setMeta('og:image', fullImage, true);
    setMeta('og:site_name', 'Salama Pharmaceuticals Tanzania', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', metaDescription);
    setMeta('twitter:image', fullImage);

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullCanonical);

    // 3. Inject Structured Data JSON-LD
    const baseOrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': ['PharmaceuticalOrganization', 'MedicalBusiness'],
      name: 'Salama Pharmaceuticals',
      legalName: 'Salama Pharmaceuticals Tanzania Limited',
      url: currentOrigin,
      logo: `${currentOrigin}/assets/brand/salama-logo.png`,
      description: metaDescription,
      foundingDate: '1984',
      areaServed: {
        '@type': 'Country',
        name: 'Tanzania'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: headquarters?.address || 'Dar es Salaam, Tanzania',
        addressLocality: headquarters?.hqCity || 'Dar es Salaam',
        addressCountry: 'TZ'
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: contactInfo.supportPhone || '+255 22 286 4500',
          contactType: 'customer service',
          areaServed: 'TZ',
          availableLanguage: ['English', 'Swahili']
        },
        {
          '@type': 'ContactPoint',
          telephone: contactInfo.emergencyHotline || '+255 754 000 999',
          contactType: 'emergency',
          contactOption: 'Pharmacovigilance & Medical Safety Hotline',
          availableLanguage: ['English', 'Swahili']
        }
      ],
      sameAs: [
        siteContent?.socialLinks?.linkedin,
        siteContent?.socialLinks?.twitter,
        siteContent?.socialLinks?.facebook,
        siteContent?.socialLinks?.instagram,
        siteContent?.socialLinks?.youtube
      ].filter(Boolean)
    };

    let schemaToInject = [baseOrganizationSchema];
    if (schemaData) {
      if (Array.isArray(schemaData)) {
        schemaToInject = [...schemaToInject, ...schemaData];
      } else {
        schemaToInject.push(schemaData);
      }
    }

    let scriptTag = document.getElementById('salama-json-ld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'salama-json-ld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaToInject);

    // Verification check for Header Hierarchy: Strict 1 h1 tag
    const h1Count = document.querySelectorAll('h1').length;
    if (h1Count > 1) {
      console.warn(`[SEO Warning] Detected ${h1Count} <h1> tags on current page. Expected strictly 1 <h1> tag per page.`);
    }
  }, [fullTitle, metaDescription, fullCanonical, fullImage, ogType, schemaData, siteContent]);

  return null;
}
