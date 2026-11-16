// Initial Data for Salama Pharmaceuticals CMS
// Grounded in official presentation and Tanzanian healthcare context

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-01',
    slug: 'alcef-ceftriaxone',
    name: 'ALCEF',
    genericName: 'Ceftriaxone Injection 1000mg',
    brand: 'neoMedic',
    category: 'Antibiotics & Infectious Diseases',
    therapeuticArea: 'Infectious Disease',
    dosageForm: 'Injection',
    strength: '1000 mg (1g) Vial',
    tmdaRegNo: 'TMDA-TZ-MED-04821',
    image: '',
    isFeatured: true,
    keyHighlight: 'Empiric therapy backbone in hospitals due to broad spectrum + safety.',
    indications: [
      'Empiric therapy backbone in Tanzanian referral & regional hospitals',
      'Severe respiratory tract infections and community-acquired pneumonia',
      'Bacterial meningitis and complicated septicemia',
      'Complicated urinary tract infections and surgical prophylaxis'
    ],
    presentation: '1 Vial + Water for Injection (WFI), IM / IV Use',
    mechanism: 'Third-generation cephalosporin inhibiting bacterial cell wall synthesis.',
    stgAligned: true,
    updatedAt: '2026-10-15'
  },
  {
    id: 'prod-02',
    slug: 'alcef-sb-ceftriaxone-sulbactam',
    name: 'ALCEF-SB',
    genericName: 'Ceftriaxone Sodium 1000mg + Sulbactam 500mg',
    brand: 'neoMedic',
    category: 'Antibiotics & Infectious Diseases',
    therapeuticArea: 'Infectious Disease',
    dosageForm: 'Injection',
    strength: '1.5 g (1000mg + 500mg)',
    tmdaRegNo: 'TMDA-TZ-MED-04822',
    image: '',
    isFeatured: true,
    keyHighlight: 'Extended Spectrum β-lactamase (ESBL) producing Gram-negative bacilli; carbapenem-sparing option.',
    indications: [
      'Extended Spectrum Beta-Lactamase (ESBL) producing Gram-negative bacilli',
      'Carbapenem-sparing antibiotic protocol to safeguard hospital antimicrobial stewardship',
      'Complicated intra-abdominal and pelvic infections',
      'Severe hospital-acquired bacteremia and polymicrobial infections'
    ],
    presentation: '20 mL Injection Vial + WFI, IM / IV Use, Single use only',
    mechanism: 'Dual action: Ceftriaxone bactericidal cell wall inhibition protected by irreversible beta-lactamase inhibitor Sulbactam.',
    stgAligned: true,
    updatedAt: '2026-10-15'
  },
  {
    id: 'prod-03',
    slug: 'alphaclav-625-tablets',
    name: 'ALPHACLAV 625',
    genericName: 'Amoxicillin & Clavulanate Potassium Tablets USP 625 mg',
    brand: 'neoMedic',
    category: 'Antibiotics & Infectious Diseases',
    therapeuticArea: 'Infectious Disease',
    dosageForm: 'Tablets',
    strength: '625 mg (500mg Amoxicillin + 125mg Clavulanate)',
    tmdaRegNo: 'TMDA-TZ-MED-03914',
    image: '',
    isFeatured: true,
    keyHighlight: 'Oral alternative to IV therapy in moderate infections allowing outpatient management.',
    indications: [
      'Trusted oral choice for resistant community respiratory infections',
      'Step-down oral alternative to IV therapy in moderate infections',
      'Recurrent otitis media, acute sinusitis, and tonsillopharyngitis',
      'Skin and soft tissue infections, dental infections, and uncomplicated UTIs'
    ],
    presentation: '2 x 7 Blister Packed Tablets (14 Tablets per pack)',
    mechanism: 'Potentiated aminopenicillin combining bactericidal amoxicillin with suicide beta-lactamase inhibitor clavulanate.',
    stgAligned: true,
    updatedAt: '2026-09-20'
  },
  {
    id: 'prod-04',
    slug: 'alphaclav-ds-oral-suspension',
    name: 'ALPHACLAV-DS',
    genericName: 'Amoxicillin and Clavulanate Potassium for Oral Suspension USP',
    brand: 'neoMedic',
    category: 'Antibiotics & Infectious Diseases',
    therapeuticArea: 'Pediatrics & Infectious Disease',
    dosageForm: 'Oral Suspension',
    strength: '228.5 mg / 5 mL (Dry Powder)',
    tmdaRegNo: 'TMDA-TZ-MED-03915',
    image: '',
    isFeatured: false,
    keyHighlight: 'Pediatric high-compliance suspension for resistant childhood infections.',
    indications: [
      'Pediatric community-acquired pneumonia and bronchopneumonia',
      'Acute bacterial otitis media resistant to standard amoxicillin',
      'Persistent pediatric upper respiratory infections',
      'Pediatric skin and urinary tract bacterial infections'
    ],
    presentation: '100 mL Dry Powder for Oral Suspension with measuring cup',
    mechanism: 'Pediatric-tailored clavulanate-protected aminopenicillin formulation.',
    stgAligned: true,
    updatedAt: '2026-09-20'
  },
  {
    id: 'prod-05',
    slug: 'glauconil-latanoprost-drops',
    name: 'GLAUCONIL',
    genericName: 'Latanoprost Ophthalmic Solution 0.005% W/V',
    brand: 'neoMedic',
    category: 'Ophthalmology',
    therapeuticArea: 'Ophthalmic Care',
    dosageForm: 'Eye Drops',
    strength: '0.005% (50 mcg/mL)',
    tmdaRegNo: 'TMDA-TZ-MED-05118',
    image: '',
    isFeatured: true,
    keyHighlight: 'Once-daily prostaglandin analog reducing IOP by 25–35% via uveoscleral outflow.',
    indications: [
      'First-line monotherapy for primary open-angle glaucoma',
      'Ocular hypertension with elevated intraocular pressure',
      'Once-daily night-time dosing improving patient compliance',
      'Excellent long-term pressure control with minimal irritation'
    ],
    presentation: '10 mL Sterile Eye Drops Dropper Bottle',
    mechanism: 'Selective FP prostanoid receptor agonist that increases uveoscleral outflow of aqueous humor.',
    stgAligned: true,
    updatedAt: '2026-10-02'
  },
  {
    id: 'prod-06',
    slug: 'fixim-400-cefixime-tablets',
    name: 'FIXIM 400',
    genericName: 'Cefixime Tablets USP 400 mg',
    brand: 'neoMedic',
    category: 'Antibiotics & Infectious Diseases',
    therapeuticArea: 'Infectious Disease',
    dosageForm: 'Tablets',
    strength: '400 mg',
    tmdaRegNo: 'TMDA-TZ-MED-04229',
    image: '',
    isFeatured: true,
    keyHighlight: 'First-line oral cephalosporin in Tanzania and step-down option after hospital ceftriaxone.',
    indications: [
      'First-line oral 3rd generation cephalosporin for respiratory, urinary, and enteric typhoid infections',
      'Hospital step-down therapy after IV ceftriaxone providing uninterrupted continuity of care post-discharge',
      'OPD single-dose option for uncomplicated urogenital gonorrhea, enhancing compliance',
      'Acute exacerbation of chronic bronchitis and pyelonephritis'
    ],
    presentation: '1 x 10 Tablets in Alu-Alu Blister',
    mechanism: 'Oral bactericidal cephalosporin resistant to a wide variety of beta-lactamases.',
    stgAligned: true,
    updatedAt: '2026-09-18'
  },
  {
    id: 'prod-07',
    slug: 'flucoz-150-fluconazole',
    name: 'FLUCOZ 150',
    genericName: 'Fluconazole Tablets USP 150 mg',
    brand: 'neoMedic',
    category: 'Antifungals',
    therapeuticArea: 'Mycology & Infectious Disease',
    dosageForm: 'Tablets',
    strength: '150 mg',
    tmdaRegNo: 'TMDA-TZ-MED-03774',
    image: '',
    isFeatured: false,
    keyHighlight: 'Gold standard systemic antifungal with high oral bioavailability and deep tissue penetration.',
    indications: [
      'Gold standard systemic antifungal for acute & recurrent vaginal candidiasis',
      'Oropharyngeal, esophageal, and mucocutaneous candidiasis',
      'Dermatophytosis, tinea corporis, tinea cruris, tinea pedis, and pityriasis versicolor',
      'Prophylaxis in immunocompromised patients against deep fungal infections'
    ],
    presentation: '1 x 1 Tablet Blister Pack (Single Dose)',
    mechanism: 'Highly selective fungal cytochrome P450 sterol 14-alpha-demethylase inhibitor.',
    stgAligned: true,
    updatedAt: '2026-08-30'
  },
  {
    id: 'prod-08',
    slug: 'glimmet-2-glimepiride-metformin',
    name: 'GLIMMET 2',
    genericName: 'Glimepiride 2mg & Metformin HCl 500mg Sustained Release Tablets',
    brand: 'neoMedic',
    category: 'Diabetes & Endocrinology',
    therapeuticArea: 'Metabolic & Endocrinology',
    dosageForm: 'Sustained Release Tablets',
    strength: '2 mg Glimepiride + 500 mg Metformin SR',
    tmdaRegNo: 'TMDA-TZ-MED-05341',
    image: '',
    isFeatured: true,
    keyHighlight: 'Fixed-dose dual-action oral therapy for T2DM inadequately controlled on monotherapy.',
    indications: [
      'Type 2 Diabetes Mellitus inadequately controlled on Metformin or Glimepiride monotherapy',
      'Superior HbA1c reduction through synergistic insulin secretion and insulin sensitization',
      'Weight-neutral to modest weight profile with sustained glucose regulation',
      'Low hypoglycemia risk when properly titrated due to glucose-dependent insulin release'
    ],
    presentation: '3 x 10 Tablets (30 Sustained Release Tablets per box)',
    mechanism: 'Dual therapeutic action: second-generation sulfonylurea stimulation coupled with biguanide hepatic glucose suppression.',
    stgAligned: true,
    updatedAt: '2026-10-10'
  },
  {
    id: 'prod-09',
    slug: 'costan-50-losartan',
    name: 'COSTAN 50',
    genericName: 'Losartan Potassium Tablets BP 50 mg',
    brand: 'neoMedic',
    category: 'Cardiovascular & Renal',
    therapeuticArea: 'Cardiovascular & Renal Care',
    dosageForm: 'Tablets',
    strength: '50 mg',
    tmdaRegNo: 'TMDA-TZ-MED-04981',
    image: '',
    isFeatured: true,
    keyHighlight: 'Preferred first-line for hypertensive diabetics & CKD patients; proven CV, stroke & renal protection.',
    indications: [
      'Preferred first-line antihypertensive for diabetic hypertension and chronic kidney disease (CKD)',
      'Proven clinical trial evidence (LIFE, RENAAL, MARVAL) for CV, stroke, and renal protection',
      'Substantially lower risk of dry cough and angioedema compared to ACE inhibitors',
      'Reduction of stroke risk in hypertensive patients with left ventricular hypertrophy'
    ],
    presentation: '3 x 10 Tablets (30 Tablets per box)',
    mechanism: 'Specific, competitive angiotensin II receptor type 1 (AT1) antagonist.',
    stgAligned: true,
    updatedAt: '2026-09-15'
  },
  {
    id: 'prod-10',
    slug: 'costan-h-losartan-hctz',
    name: 'COSTAN-H',
    genericName: 'Losartan Potassium 50mg & Hydrochlorothiazide 12.5mg Tablets USP',
    brand: 'neoMedic',
    category: 'Cardiovascular & Renal',
    therapeuticArea: 'Cardiovascular & Renal Care',
    dosageForm: 'Tablets',
    strength: '50 mg / 12.5 mg',
    tmdaRegNo: 'TMDA-TZ-MED-04982',
    image: '',
    isFeatured: true,
    keyHighlight: 'Synergistic BP reduction in uncontrolled hypertension with potassium-sparing renal protection.',
    indications: [
      'Synergistic blood pressure reduction in patients uncontrolled on monotherapy',
      'Potassium-sparing renoprotection from Losartan offsets diuretic-induced hypokalemia',
      'Optimized risk reduction of stroke, myocardial infarction, and heart failure progression',
      'Retards progression of renal disease in high-risk patients'
    ],
    presentation: '3 x 10 Tablets (POM - Prescription Only Medicine)',
    mechanism: 'Complementary synergy of AT1 receptor blocker with distal tubule thiazide diuretic.',
    stgAligned: true,
    updatedAt: '2026-09-15'
  },
  {
    id: 'prod-11',
    slug: 'melkam-15-meloxicam',
    name: 'MELKAM 15',
    genericName: 'Meloxicam Tablets BP 15 mg',
    brand: 'neoMedic',
    category: 'Pain & Anti-inflammatory',
    therapeuticArea: 'Musculoskeletal & Orthopedics',
    dosageForm: 'Tablets',
    strength: '15 mg',
    tmdaRegNo: 'TMDA-TZ-MED-03612',
    image: '',
    isFeatured: false,
    keyHighlight: 'Selective preferential COX-2 inhibitor with reduced gastric side effects for chronic pain & OA.',
    indications: [
      'Selective preferential COX-2 inhibitor providing effective anti-inflammatory and analgesic relief',
      'Significantly reduced gastric ulceration and bleeding side effects compared to non-selective NSAIDs',
      'Ideal for chronic osteoarthritis, rheumatoid arthritis, and ankylosing spondylitis',
      'Once-daily dosing ensures maximum patient compliance and round-the-clock symptom control'
    ],
    presentation: '10 x 10 Tablets (100 Tablets Dispenser Box)',
    mechanism: 'Preferential inhibition of inducible cyclooxygenase-2 (COX-2) over constitutive COX-1.',
    stgAligned: true,
    updatedAt: '2026-08-25'
  },
  {
    id: 'prod-12',
    slug: 'muscoleve-analgesic-gel',
    name: 'MUSCOLEVE GEL',
    genericName: 'Diclofenac Diethylamine + Methyl Salicylate + Menthol Topical Gel',
    brand: 'neoMedic',
    category: 'Pain & Anti-inflammatory',
    therapeuticArea: 'Pain Management & Topicals',
    dosageForm: 'Topical Gel',
    strength: '30 g Gel Tube',
    tmdaRegNo: 'TMDA-TZ-MED-05201',
    image: '',
    isFeatured: true,
    keyHighlight: 'Triple-action anti-inflammatory, counterirritant, and rubefacient for fast localized relief.',
    indications: [
      'Combines anti-inflammatory (Diclofenac), counterirritant (Menthol), and rubefacient (Salicylate)',
      'Immediate cooling sensation followed by deep penetration heating to ease joint stiffness',
      'Suitable for long-term topical management of knee osteoarthritis, acute back, neck & shoulder pain',
      'Effective treatment for athletic sprains, muscle strains, and tendonitis'
    ],
    presentation: '30 gm Laminated Squeeze Tube with Tamper-evident Seal',
    mechanism: 'Transdermal NSAID delivery paired with sensory gate-control neuro-sensory modulation.',
    stgAligned: true,
    updatedAt: '2026-10-01'
  },
  {
    id: 'prod-13',
    slug: 'ketomusc-25-ketoprofen-gel',
    name: 'KETOMUSC 2.5',
    genericName: 'Ketoprofen Gel BP 2.5% w/w',
    brand: 'neoMedic',
    category: 'Pain & Anti-inflammatory',
    therapeuticArea: 'Pain Management & Sports Medicine',
    dosageForm: 'Topical Gel',
    strength: '2.5% w/w (30 g Tube)',
    tmdaRegNo: 'TMDA-TZ-MED-05202',
    image: '',
    isFeatured: false,
    keyHighlight: 'Direct targeted anti-inflammatory action at the site of pain, minimizing systemic exposure.',
    indications: [
      'Delivers targeted anti-inflammatory effect directly at the site of inflammation, minimizing systemic exposure',
      'Clinically useful for tennis elbow, tendonitis, bursitis, mild joint arthritis, and post-exercise pain',
      'Non-greasy, fast-absorbing soothing formula providing immediate patient comfort',
      'Recommended for patients unable to tolerate oral systemic NSAIDs'
    ],
    presentation: '30 gm Tube for Topical Application',
    mechanism: 'Inhibition of prostaglandin synthesis via cutaneous tissue absorption.',
    stgAligned: true,
    updatedAt: '2026-10-01'
  }
];

export const INITIAL_ZONES = [
  {
    id: 'zone-dar',
    name: 'Coastal & Zanzibar Zone (National Corporate HQ)',
    hqCity: 'Dar es Salaam',
    coverage: ['Dar es Salaam Region', 'Pwani', 'Tanga', 'Morogoro', 'Unguja (Zanzibar)', 'Pemba'],
    address: 'Plot 45/47, Nyerere Road Industrial Area, P.O. Box 71822, Dar es Salaam, Tanzania',
    phone: '+255 22 286 4500 / +255 754 000 111',
    email: 'coast@salama.co.tz',
    coordinates: { lat: -6.852255593146081, lng: 39.224117574995454 },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3194746712384!2d39.224117574995454!3d-6.852255593146081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4ba96c1eb7e3%3A0x19847ee7dd486067!2sSalama%20Pharmaceuticals%20Limited!5e0!3m2!1sen!2stz!4v1794819000704!5m2!1sen!2stz',
    warehouseCapacity: '25,000 sq ft Cold-Chain & Climate Controlled GDP Hub',
    isHeadquarters: true
  },
  {
    id: 'zone-arusha',
    name: 'Northern Highlands Zone (Prime MSD Hub)',
    hqCity: 'Arusha',
    coverage: ['Arusha', 'Kilimanjaro (Moshi)', 'Manyara'],
    address: 'Sokoine Road, Central Business District, Arusha, Tanzania',
    phone: '+255 27 254 8820 / +255 754 000 222',
    email: 'northern@salama.co.tz',
    coordinates: { lat: -3.3869, lng: 36.6830 },
    warehouseCapacity: '12,000 sq ft Regional Distribution Depot',
    isHeadquarters: false
  },
  {
    id: 'zone-mbeya',
    name: 'Southern Highlands Zone',
    hqCity: 'Mbeya',
    coverage: ['Mbeya', 'Songwe', 'Iringa', 'Njombe', 'Ruvuma (Songea)', 'Rukwa (Sumbawanga)'],
    address: 'Karume Avenue, Industrial Area, Mbeya, Tanzania',
    phone: '+255 25 250 3340 / +255 754 000 333',
    email: 'southern@salama.co.tz',
    coordinates: { lat: -8.9094, lng: 33.4608 },
    warehouseCapacity: '10,000 sq ft Regional Transit Center',
    isHeadquarters: false
  },
  {
    id: 'zone-dodoma',
    name: 'Central Zone (Capital & Government MSD Center)',
    hqCity: 'Dodoma',
    coverage: ['Dodoma Region', 'Singida', 'Tabora'],
    address: 'Government Boulevard, Area D, Dodoma Capital City, Tanzania',
    phone: '+255 26 232 1190 / +255 754 000 444',
    email: 'central@salama.co.tz',
    coordinates: { lat: -6.1630, lng: 35.7516 },
    warehouseCapacity: '14,000 sq ft Public Procurement Supply Facility',
    isHeadquarters: false
  },
  {
    id: 'zone-mwanza',
    name: 'Lake Zone (Great Lakes Regional Center)',
    hqCity: 'Mwanza',
    coverage: ['Mwanza', 'Kagera (Bukoba)', 'Mara (Musoma)', 'Shinyanga', 'Geita', 'Simiyu', 'Kigoma'],
    address: 'Nyerere Road, Kirumba, Mwanza, Tanzania',
    phone: '+255 28 250 0980 / +255 754 000 555',
    email: 'lake@salama.co.tz',
    coordinates: { lat: -2.5164, lng: 32.9175 },
    warehouseCapacity: '16,000 sq ft Regional Lake Basin Hub',
    isHeadquarters: false
  }
];

export const INITIAL_FAQS = [
  {
    id: 'faq-1',
    category: 'Regulatory & Quality',
    question: 'Are all Salama molecules approved by the Tanzania Medicines and Medical Devices Authority (TMDA)?',
    answer: 'Yes. 100% of our products undergo rigorous evaluation, registration, and laboratory quality verification by the TMDA before market introduction. Each consignment is manufactured under strict WHO-GMP conditions with full certificates of analysis (CoA).'
  },
  {
    id: 'faq-2',
    category: 'Distribution & Logistics',
    question: 'How does Salama ensure timely medicine supply across Tanzania?',
    answer: 'We maintain our own dedicated nationwide temperature-controlled logistics fleet and five strategic regional warehouse hubs in Dar es Salaam, Arusha, Mbeya, Dodoma, and Mwanza. This enables same-day or next-day delivery to over 1,500 healthcare facilities.'
  },
  {
    id: 'faq-3',
    category: 'Hospital Procurement',
    question: 'Is Salama an accredited vendor to the Medical Stores Department (MSD)?',
    answer: 'Yes. Salama is recognized as one of the largest and most dependable pharmaceutical suppliers to MSD and is a prime vendor in major strategic healthcare zones including Arusha, Dodoma, and the Lake Zone.'
  },
  {
    id: 'faq-4',
    category: 'Clinical Autonomy',
    question: 'What does "Doctor Choice & STG Alignment" mean for healthcare providers?',
    answer: 'For decades, clinical decisions in the region were constrained by market supply shortages or procurement limits. Salama commits to stocking every essential molecule designated in the Tanzania Standard Treatment Guidelines (STG), restoring to doctors the genuine clinical freedom to choose the best specific therapy for each individual patient.'
  },
  {
    id: 'faq-5',
    category: 'Pharmacovigilance',
    question: 'How do healthcare professionals report an adverse drug reaction (ADR)?',
    answer: 'Doctors and pharmacists can immediately submit suspected adverse events via our online Pharmacovigilance reporting form, by emailing safety@salama.co.tz, or calling our 24/7 dedicated medical safety hotline at +255 754 000 999.'
  },
  {
    id: 'faq-6',
    category: 'Ordering & Verification',
    question: 'Can private hospitals, pharmacies, and clinics order directly from Salama?',
    answer: 'Yes, licensed healthcare facilities, community pharmacies, and institutions can establish institutional trade accounts through our commercial sales team or via their zonal depot managers.'
  }
];

export const INITIAL_SITE_CONTENT = {
  hero: {
    tagline: 'With deep roots in Tanzania, We’re Shaping the Future of Pharma',
    headline: 'Empowering Choices for Healthier Life',
    subheadline: 'Serving 1,500+ healthcare facilities across Government, Mission, and Private sectors with 100+ TMDA-approved molecules and 5 nationwide distribution hubs.',
    primaryCtaText: 'Explore Product Catalog',
    primaryCtaLink: '/catalog',
    secondaryCtaText: 'Company Profile & Heritage',
    secondaryCtaLink: '/about/profile',
    badge: '40+ Years of Trusted Pharmaceutical Service in Tanzania'
  },
  homePage: {
    heroSupportHeading: 'With Deep Roots in Tanzania',
    heroImageUrl: '',
    heroImageAlt: 'Salama Pharmaceutical doctors shaping the future of pharma in Tanzania',
    manifestoImageUrl: '',
    partnersImageUrl: '',
    distributionImageUrl: ''
  },
  aboutPage: {
    headline: 'With Deep Roots in Tanzania, We’re Shaping the Future of Pharma',
    intro: 'For four decades, Salama has been a steadfast healthcare partner across Tanzania. Built on trust, enduring relationships, and a mission to empower doctors and serve communities.',
    storyHeading: 'A History of Trust, Clinical Commitment and Patient Focus',
    storyParagraphs: [
      'Founded four decades ago, Salama Pharmaceuticals began with a singular focus: ensuring that essential, high-quality medications were reliably accessible to the people of Tanzania. Over the years, that commitment has evolved into a comprehensive healthcare enterprise.',
      'Today, Salama serves as an indispensable bridge between world-class pharmaceutical manufacturing and the everyday clinical needs of Tanzanian doctors, nurses, and patients. We work alongside the Ministry of Health, the Medical Stores Department (MSD), faith-based mission facilities, and the private healthcare sector to eliminate medicine stock-outs.',
      'Our portfolio encompasses over 100 registered molecules approved by the Tanzania Medicines and Medical Devices Authority (TMDA), spanning lifesaving antibiotics, cardiovascular agents, diabetes therapies, ophthalmic solutions, and topical analgesics.'
    ],
    storyImageUrl: '',
    storyImageAlt: 'Salama clinical doctor with stethoscope',
    clinicalFreedomImageUrl: '',
    clinicalEducationImageUrl: '',
    visionImageUrl: '',
    values: [
      { title: 'Patients First', description: 'Every commercial decision is evaluated by one metric: does it improve patient outcomes and alleviate suffering in our community?' },
      { title: 'Clinical Autonomy', description: 'We believe doctors must have the freedom to choose the right drug, for the right patient, at the right time, without artificial market barriers.' },
      { title: 'Uncompromising Quality', description: 'WHO-GMP compliance, rigorous batch analysis, TMDA validation, and climate-controlled GDP transport without exception.' }
    ],
    visionHeading: 'Where We’re Headed: “We’re just getting started.”',
    visionPoints: [
      'Expanding Therapeutic Coverage: Broadening oncology, critical care, and pediatric formulations.',
      'Investing in New Molecules: Introducing modern therapies that address tomorrow’s clinical challenges.',
      'Strengthening National Supply Chains: Upgrading digital warehousing and faster cold-chain logistics across all 5 zones.',
      'Deepening Healthcare Partnerships: Working alongside clinicians, hospitals, and national health authorities.'
    ]
  },
  companyProfilePage: {
    slideImageUrls: Array(24).fill('')
  },
  catalogPage: {
    title: 'Pharmaceutical Catalog & Molecule Directory',
    description: 'Every molecule is registered with TMDA, manufactured under WHO-GMP compliance, and stocked across our 5 nationwide zonal distribution centers.'
  },
  contactsPage: {
    title: 'Contacts & Zonal Distribution Network',
    description: 'Reach our central corporate headquarters in Dar es Salaam or connect directly with our regional dispatch depots across Tanzania.'
  },
  faqPage: {
    title: 'Frequently Asked Questions',
    description: 'Find immediate answers regarding TMDA molecule registration, MSD partnership, Good Distribution Practice (GDP) cold chain, and institutional order procedures.'
  },
  stats: [
    { label: 'Years of Trusted Service', value: '40+', suffix: 'Years in Tanzania' },
    { label: 'TMDA Approved Molecules', value: '100+', suffix: 'Registered & Aligned' },
    { label: 'Healthcare Facilities Served', value: '1,500+', suffix: 'National Coverage' },
    { label: 'Nationwide Zonal Hubs', value: '5', suffix: 'HQs Across Tanzania' }
  ],
  pillars: [
    {
      title: 'Clinical Education',
      tagline: 'Empowering doctors through continuous medical learning',
      description: 'We organize accredited CME symposiums, therapeutic workshops, and pharmacological updates for clinicians nationwide.',
      icon: 'BookOpen'
    },
    {
      title: 'Patient Outreach',
      tagline: 'Helping patients understand and adhere to treatment',
      description: 'Educational campaigns on chronic hypertension, diabetes management, and responsible antibiotic usage to enhance compliance.',
      icon: 'Users'
    },
    {
      title: 'On-Ground Partnerships',
      tagline: 'Advancing Tanzania’s public health mission hand-in-hand',
      description: 'Deep collaborative alliances with the Ministry of Health, MSD, regional referral hospitals, and community health teams.',
      icon: 'Handshake'
    }
  ],
  doctorMission: {
    title: 'The era of Market-Controlled prescribing is over',
    lead: 'We stand for a new standard: Doctors choose. Patients come first.',
    paragraphs: [
      'For too long, pricing and procurement bottlenecks dictated clinical therapy. Doctors were forced to prescribe whatever happened to be on the shelf — and patients had no say.',
      'Salama backs clinical freedom with depth, therapeutic range, and respect. We ensure that every essential molecule outlined in Tanzania’s Standard Treatment Guidelines (STG) is continuously available, registered, and affordable.'
    ],
    tag: 'Your decision. Your patient. Your treatment.'
  },
  trustedHospitals: [
    'Muhimbili National Hospital',
    'Kilimanjaro Christian Medical Centre (KCMC)',
    'Bugando Medical Centre',
    'Benjamin Mkapa Hospital Dodoma',
    'The Aga Khan Hospital Dar es Salaam',
    'Shree Hindu Mandal Hospital'
  ],
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/salama-pharmaceuticals-tz',
    twitter: 'https://twitter.com/SalamaPharmaTZ',
    facebook: 'https://facebook.com/SalamaPharmaTanzania',
    instagram: 'https://instagram.com/salamapharma_tz',
    youtube: 'https://youtube.com/@SalamaPharmaTZ',
    whatsapp: 'https://wa.me/255754000111'
  },
  contactInfo: {
    headquarters: 'Dar es Salaam, Tanzania',
    centralEmail: 'info@salama.co.tz',
    supportPhone: '+255 22 286 4500',
    emergencyHotline: '+255 754 000 999',
    safetyEmail: 'safety@salama.co.tz',
    workingHours: 'Monday – Friday: 08:00 – 17:00 | Saturday: 08:30 – 13:00 EAT'
  },
  googleSearchConsole: {
    verificationMeta: 'google-site-verification=salama_pharma_tz_official_search_console_token_2026',
    verified: true
  },
  cloudflare: {
    zoneId: '',
    apiToken: '',
    lastPurgeStatus: 'Never purged'
  }
};

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Dr. Amani Mwita',
    email: 'admin@salama.co.tz',
    password: 'Salama@2026!Admin',
    role: 'Super Admin',
    department: 'Executive Board',
    permissions: ['all', 'manage_users', 'purge_cache', 'edit_content', 'delete_records']
  },
  {
    id: 'usr-2',
    name: 'Neema Kavishe, BPharm',
    email: 'editor@salama.co.tz',
    password: 'Salama@Editor2026',
    role: 'Content Editor',
    department: 'Medical Communications',
    permissions: ['edit_content', 'manage_products', 'manage_faqs']
  },
  {
    id: 'usr-3',
    name: 'Pharm. David Mushi',
    email: 'reviewer@salama.co.tz',
    password: 'Salama@Reviewer2026',
    role: 'Medical Reviewer',
    department: 'Regulatory Affairs & Pharmacovigilance',
    permissions: ['review_products', 'audit_logs', 'view_reports']
  }
];
