import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2 } from 'lucide-react';

const inputClass = 'w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white disabled:opacity-60';
const buttonClass = 'px-4 py-2 rounded-xl bg-salama-teal text-white text-xs font-bold disabled:opacity-50';

function Field({ label, value, onChange, disabled, type = 'text', placeholder }) {
  return (
    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
      {label}
      <input
        type={type}
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`${inputClass} mt-1 font-normal`}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, disabled, rows = 4, placeholder }) {
  return (
    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
      {label}
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`${inputClass} mt-1 font-normal`}
      />
    </label>
  );
}

export default function AdminSiteManager() {
  const { siteContent, setSiteContent, zones, setZones, faqs, setFaqs, hasPermission, addToast } = useApp();
  const [activeSection, setActiveSection] = useState('home');
  const canEdit = hasPermission('edit_content');
  const canDelete = hasPermission('delete_records');

  const updatePage = (section, field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const updateRoot = (section, field, value) => {
    setSiteContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const updateObjectArray = (section, index, field, value) => {
    setSiteContent((prev) => {
      const [parent, child] = section.split('.');
      const currentItems = child ? prev[parent]?.[child] : prev[parent];
      const items = [...(currentItems || [])];
      items[index] = { ...items[index], [field]: value };
      return child
        ? { ...prev, [parent]: { ...prev[parent], [child]: items } }
        : { ...prev, [parent]: items };
    });
  };

  const updateLineArray = (section, field, value) => {
    updatePage(section, field, value.split('\n').filter((line) => line.trim()));
  };

  const page = (section) => siteContent[section] || {};

  const updateZone = (zoneId, field, value) => {
    setZones((current) => current.map((zone) =>
      zone.id === zoneId ? { ...zone, [field]: value } : zone
    ));
  };

  const updateZoneCoordinate = (zoneId, field, value) => {
    setZones((current) => current.map((zone) =>
      zone.id === zoneId
        ? { ...zone, coordinates: { ...(zone.coordinates || {}), [field]: value } }
        : zone
    ));
  };

  const setHeadquarters = (zoneId) => {
    setZones((current) => current.map((zone) => ({
      ...zone,
      isHeadquarters: zone.id === zoneId
    })));
  };

  const addZone = () => {
    setZones((current) => [...current, {
      id: `zone-${Date.now()}`,
      name: 'New Branch',
      hqCity: 'New Branch',
      coverage: [],
      address: '',
      phone: '',
      email: '',
      mapEmbedUrl: '',
      warehouseCapacity: '',
      isHeadquarters: false
    }]);
  };

  const removeZone = (zone) => {
    if (zone.isHeadquarters) {
      addToast('Set another branch as headquarters before removing this one.', 'error');
      return;
    }
    setZones((current) => current.filter((item) => item.id !== zone.id));
  };

  const addFaq = () => {
    setFaqs((current) => [{
      id: `faq-${Date.now()}`,
      category: 'General',
      question: '',
      answer: ''
    }, ...current]);
  };

  const addStats = () => {
    setSiteContent((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { value: '', label: '', suffix: '' }]
    }));
  };

  const removeStats = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      stats: (prev.stats || []).filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const addPillar = () => {
    setSiteContent((prev) => ({
      ...prev,
      pillars: [...(prev.pillars || []), { title: '', tagline: '', description: '', icon: 'BookOpen' }]
    }));
  };

  const removePillar = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      pillars: (prev.pillars || []).filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const addValue = () => {
    setSiteContent((prev) => ({
      ...prev,
      aboutPage: {
        ...prev.aboutPage,
        values: [...(prev.aboutPage?.values || []), { title: '', description: '' }]
      }
    }));
  };

  const removeValue = (index) => {
    setSiteContent((prev) => ({
      ...prev,
      aboutPage: {
        ...prev.aboutPage,
        values: (prev.aboutPage?.values || []).filter((_, itemIndex) => itemIndex !== index)
      }
    }));
  };

  const updateFaq = (faqId, field, value) => {
    setFaqs((current) => current.map((faq) =>
      faq.id === faqId ? { ...faq, [field]: value } : faq
    ));
  };

  const removeFaq = (faq) => {
    setFaqs((current) => current.filter((item) => item.id !== faq.id));
  };

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About us' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'contacts', label: 'Contacts & branches' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage website pages</h2>
        <p className="text-xs text-slate-500 mt-1">Changes are saved automatically in this browser.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-salama-teal text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {!canEdit && (
        <p className="rounded-xl bg-amber-50 dark:bg-amber-950/30 p-4 text-xs text-amber-800 dark:text-amber-200">
          Your account does not have permission to edit page content.
        </p>
      )}

      {activeSection === 'home' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Homepage hero and images</h3>
            <Field label="Hero headline" value={siteContent.hero?.headline} disabled={!canEdit} onChange={(value) => updateRoot('hero', 'headline', value)} />
            <TextArea label="Hero summary" value={siteContent.hero?.subheadline} disabled={!canEdit} onChange={(value) => updateRoot('hero', 'subheadline', value)} rows={3} />
            <Field label="Hero badge" value={siteContent.hero?.badge} disabled={!canEdit} onChange={(value) => updateRoot('hero', 'badge', value)} />
            <Field label="Hero supporting heading" value={page('homePage').heroSupportHeading} disabled={!canEdit} onChange={(value) => updatePage('homePage', 'heroSupportHeading', value)} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Primary button label" value={siteContent.hero?.primaryCtaText} disabled={!canEdit} onChange={(value) => updateRoot('hero', 'primaryCtaText', value)} />
              <Field label="Secondary button label" value={siteContent.hero?.secondaryCtaText} disabled={!canEdit} onChange={(value) => updateRoot('hero', 'secondaryCtaText', value)} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Primary button destination" value={siteContent.hero?.primaryCtaLink} disabled={!canEdit} onChange={(value) => updateRoot('hero', 'primaryCtaLink', value)} />
                <Field label="Secondary button destination" value={siteContent.hero?.secondaryCtaLink} disabled={!canEdit} onChange={(value) => updateRoot('hero', 'secondaryCtaLink', value)} />
              </div>
            </div>
            <Field label="Hero image URL" type="url" value={page('homePage').heroImageUrl} disabled={!canEdit} onChange={(value) => updatePage('homePage', 'heroImageUrl', value)} placeholder="https://example.com/image.jpg" />
            <Field label="Hero image alt text" value={page('homePage').heroImageAlt} disabled={!canEdit} onChange={(value) => updatePage('homePage', 'heroImageAlt', value)} />
            <Field label="Clinical freedom image URL" type="url" value={page('homePage').manifestoImageUrl} disabled={!canEdit} onChange={(value) => updatePage('homePage', 'manifestoImageUrl', value)} placeholder="https://example.com/image.jpg" />
            <Field label="Healthcare partners image URL" type="url" value={page('homePage').partnersImageUrl} disabled={!canEdit} onChange={(value) => updatePage('homePage', 'partnersImageUrl', value)} placeholder="https://example.com/image.jpg" />
            <Field label="Distribution image URL" type="url" value={page('homePage').distributionImageUrl} disabled={!canEdit} onChange={(value) => updatePage('homePage', 'distributionImageUrl', value)} placeholder="https://example.com/image.jpg" />
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Homepage statistics</h3>
            {(siteContent.stats || []).map((stat, index) => (
              <div key={index} className="grid sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                {['value', 'label', 'suffix'].map((field) => (
                  <Field
                    key={field}
                    label={field === 'value' ? 'Number' : field === 'label' ? 'Heading' : 'Caption'}
                    value={stat[field]}
                    disabled={!canEdit}
                    onChange={(value) => updateObjectArray('stats', index, field, value)}
                  />
                ))}
                <button type="button" disabled={!canDelete} onClick={() => removeStats(index)} className="text-xs font-semibold text-rose-600 disabled:opacity-40">Remove statistic</button>
              </div>
            ))}
            <button type="button" disabled={!canEdit} onClick={addStats} className={`${buttonClass} inline-flex items-center gap-2`}>
              <Plus className="w-4 h-4" /> Add statistic
            </button>
            <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Clinical freedom section</h4>
              <Field label="Heading" value={siteContent.doctorMission?.title} disabled={!canEdit} onChange={(value) => updateRoot('doctorMission', 'title', value)} />
              <TextArea label="Lead statement" value={siteContent.doctorMission?.lead} disabled={!canEdit} onChange={(value) => updateRoot('doctorMission', 'lead', value)} rows={2} />
              <TextArea label="Body paragraphs (one paragraph per line)" value={(siteContent.doctorMission?.paragraphs || []).join('\n')} disabled={!canEdit} onChange={(value) => updateRoot('doctorMission', 'paragraphs', value.split('\n').filter((line) => line.trim()))} rows={5} />
              <Field label="Closing pledge" value={siteContent.doctorMission?.tag} disabled={!canEdit} onChange={(value) => updateRoot('doctorMission', 'tag', value)} />
            </div>
            <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-bold text-slate-900 dark:text-white">Homepage service pillars</h4>
                <button type="button" disabled={!canEdit} onClick={addPillar} className={`${buttonClass} inline-flex items-center gap-2`}>
                  <Plus className="w-4 h-4" /> Add pillar
                </button>
              </div>
              {(siteContent.pillars || []).map((pillar, index) => (
                <div key={index} className="grid gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                  <Field label="Title" value={pillar.title} disabled={!canEdit} onChange={(value) => updateObjectArray('pillars', index, 'title', value)} />
                  <Field label="Tagline" value={pillar.tagline} disabled={!canEdit} onChange={(value) => updateObjectArray('pillars', index, 'tagline', value)} />
                  <TextArea label="Description" value={pillar.description} disabled={!canEdit} onChange={(value) => updateObjectArray('pillars', index, 'description', value)} rows={2} />
                  <button type="button" disabled={!canDelete} onClick={() => removePillar(index)} className="text-xs font-semibold text-rose-600 disabled:opacity-40">Remove pillar</button>
                </div>
              ))}
            </div>
            <TextArea
              label="Homepage partner names (one per line)"
              value={(siteContent.trustedHospitals || []).join('\n')}
              disabled={!canEdit}
              onChange={(value) => setSiteContent((prev) => ({
                ...prev,
                trustedHospitals: value.split('\n').filter((line) => line.trim())
              }))}
              rows={5}
            />
          </div>
        </div>
      )}

      {activeSection === 'about' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white">About page content</h3>
          <Field label="Page heading" value={page('aboutPage').headline} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'headline', value)} />
          <TextArea label="Introduction" value={page('aboutPage').intro} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'intro', value)} rows={3} />
          <Field label="Company story heading" value={page('aboutPage').storyHeading} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'storyHeading', value)} />
          <TextArea label="Company story paragraphs (one paragraph per line)" value={(page('aboutPage').storyParagraphs || []).join('\n')} disabled={!canEdit} onChange={(value) => updateLineArray('aboutPage', 'storyParagraphs', value)} rows={7} />
          <Field label="Company story image URL" type="url" value={page('aboutPage').storyImageUrl} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'storyImageUrl', value)} placeholder="https://example.com/image.jpg" />
          <Field label="Company story image alt text" value={page('aboutPage').storyImageAlt} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'storyImageAlt', value)} />
          <Field label="Clinical freedom image URL" type="url" value={page('aboutPage').clinicalFreedomImageUrl} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'clinicalFreedomImageUrl', value)} placeholder="https://example.com/image.jpg" />
          <Field label="Clinical education image URL" type="url" value={page('aboutPage').clinicalEducationImageUrl} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'clinicalEducationImageUrl', value)} placeholder="https://example.com/image.jpg" />
          <TextArea label="Future vision heading" value={page('aboutPage').visionHeading} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'visionHeading', value)} rows={2} />
          <TextArea label="Future vision points (one per line)" value={(page('aboutPage').visionPoints || []).join('\n')} disabled={!canEdit} onChange={(value) => updateLineArray('aboutPage', 'visionPoints', value)} rows={5} />
          <Field label="Future vision image URL" type="url" value={page('aboutPage').visionImageUrl} disabled={!canEdit} onChange={(value) => updatePage('aboutPage', 'visionImageUrl', value)} placeholder="https://example.com/image.jpg" />
          <TextArea
            label="Company profile slide image URLs (24 lines, one image URL per slide)"
            value={(page('companyProfilePage').slideImageUrls || []).join('\n')}
            disabled={!canEdit}
            onChange={(value) => updatePage('companyProfilePage', 'slideImageUrls', value.split('\n'))}
            rows={8}
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Core values</p>
              <button type="button" disabled={!canEdit} onClick={addValue} className={`${buttonClass} inline-flex items-center gap-2`}>
                <Plus className="w-4 h-4" /> Add value
              </button>
            </div>
            {(page('aboutPage').values || []).map((value, index) => (
              <div key={index} className="grid sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <Field label="Value title" value={value.title} disabled={!canEdit} onChange={(text) => updateObjectArray('aboutPage.values', index, 'title', text)} />
                <Field label="Value description" value={value.description} disabled={!canEdit} onChange={(text) => updateObjectArray('aboutPage.values', index, 'description', text)} />
                <button type="button" disabled={!canDelete} onClick={() => removeValue(index)} className="text-xs font-semibold text-rose-600 disabled:opacity-40">Remove value</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'catalog' && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white">Catalog page content</h3>
          <Field label="Catalog heading" value={page('catalogPage').title} disabled={!canEdit} onChange={(value) => updatePage('catalogPage', 'title', value)} />
          <TextArea label="Catalog introduction" value={page('catalogPage').description} disabled={!canEdit} onChange={(value) => updatePage('catalogPage', 'description', value)} rows={3} />
          <p className="text-xs text-slate-500">Manage products, image links, categories, and dosage forms in the Products tab. Catalog filters are generated from those product records.</p>
        </div>
      )}

      {activeSection === 'contacts' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Contact page headings</h3>
            <Field label="Page heading" value={page('contactsPage').title} disabled={!canEdit} onChange={(value) => updatePage('contactsPage', 'title', value)} />
            <TextArea label="Introduction" value={page('contactsPage').description} disabled={!canEdit} onChange={(value) => updatePage('contactsPage', 'description', value)} rows={3} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Central phone" value={siteContent.contactInfo?.supportPhone} disabled={!canEdit} onChange={(value) => updateRoot('contactInfo', 'supportPhone', value)} />
              <Field label="Central email" type="email" value={siteContent.contactInfo?.centralEmail} disabled={!canEdit} onChange={(value) => updateRoot('contactInfo', 'centralEmail', value)} />
              <Field label="Safety hotline" value={siteContent.contactInfo?.emergencyHotline} disabled={!canEdit} onChange={(value) => updateRoot('contactInfo', 'emergencyHotline', value)} />
              <Field label="Safety email" type="email" value={siteContent.contactInfo?.safetyEmail} disabled={!canEdit} onChange={(value) => updateRoot('contactInfo', 'safetyEmail', value)} />
            </div>
            <Field label="Working hours" value={siteContent.contactInfo?.workingHours} disabled={!canEdit} onChange={(value) => updateRoot('contactInfo', 'workingHours', value)} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Branches and branch-specific contact details</h3>
            <button type="button" onClick={addZone} disabled={!canEdit} className={`${buttonClass} inline-flex items-center gap-2`}>
              <Plus className="w-4 h-4" /> Add branch
            </button>
          </div>
          {zones.map((zone) => (
            <div key={zone.id} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-bold text-slate-900 dark:text-white">{zone.hqCity}{zone.isHeadquarters ? ' · HQ' : ''}</h4>
                <div className="flex gap-2">
                  {!zone.isHeadquarters && (
                    <button type="button" disabled={!canEdit} onClick={() => setHeadquarters(zone.id)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-50">
                      Set as HQ
                    </button>
                  )}
                  {!zone.isHeadquarters && (
                    <button type="button" disabled={!canDelete} onClick={() => removeZone(zone)} className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40" aria-label={`Remove ${zone.hqCity}`}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Branch display name" value={zone.name} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'name', value)} />
                <Field label="City" value={zone.hqCity} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'hqCity', value)} />
                <Field label="Address" value={zone.address} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'address', value)} />
                <Field label="Phone" value={zone.phone} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'phone', value)} />
                <Field label="Email" type="email" value={zone.email} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'email', value)} />
                <Field label="Warehouse / branch note" value={zone.warehouseCapacity} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'warehouseCapacity', value)} />
                <Field label="Latitude for directions" type="number" value={zone.coordinates?.lat} disabled={!canEdit} onChange={(value) => updateZoneCoordinate(zone.id, 'lat', value)} />
                <Field label="Longitude for directions" type="number" value={zone.coordinates?.lng} disabled={!canEdit} onChange={(value) => updateZoneCoordinate(zone.id, 'lng', value)} />
              </div>
              <TextArea label="Coverage areas (one per line)" value={(zone.coverage || []).join('\n')} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'coverage', value.split('\n').filter((line) => line.trim()))} rows={3} />
              <Field label="Google Maps embed URL (paste the URL from the iframe src)" value={zone.mapEmbedUrl} disabled={!canEdit} onChange={(value) => updateZone(zone.id, 'mapEmbedUrl', value)} placeholder="https://www.google.com/maps/embed?..." />
              {zone.isHeadquarters && <p className="text-xs text-slate-500">Only the designated HQ map is embedded by default. Add each branch’s own Google Maps embed URL when available.</p>}
            </div>
          ))}
        </div>
      )}

      {activeSection === 'faq' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">FAQ page heading</h3>
            <Field label="Page heading" value={page('faqPage').title} disabled={!canEdit} onChange={(value) => updatePage('faqPage', 'title', value)} />
            <TextArea label="Introduction" value={page('faqPage').description} disabled={!canEdit} onChange={(value) => updatePage('faqPage', 'description', value)} rows={3} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Questions and answers</h3>
            <button type="button" onClick={addFaq} disabled={!canEdit} className={`${buttonClass} inline-flex items-center gap-2`}>
              <Plus className="w-4 h-4" /> Add question
            </button>
          </div>
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
              <div className="flex justify-end">
                <button type="button" disabled={!canDelete} onClick={() => removeFaq(faq)} className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 disabled:opacity-40" aria-label="Remove FAQ">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Field label="Category" value={faq.category} disabled={!canEdit} onChange={(value) => updateFaq(faq.id, 'category', value)} />
              <Field label="Question" value={faq.question} disabled={!canEdit} onChange={(value) => updateFaq(faq.id, 'question', value)} />
              <TextArea label="Answer" value={faq.answer} disabled={!canEdit} onChange={(value) => updateFaq(faq.id, 'answer', value)} rows={4} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
