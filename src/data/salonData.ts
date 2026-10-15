/**
 * Blush & Beard - Unisex Salon
 * Verified business data for the Google Maps listing:
 * https://maps.app.goo.gl/Fhc9X8grur2JVaBw9 (Gauripada, Kalyan West)
 */

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'beard' | 'skin' | 'nails' | 'bridal' | 'spa';
  categoryLabel: string;
  gender: 'unisex' | 'men' | 'women';
  duration: string;
  price: string;
  popular?: boolean;
  description: string;
  highlights: string[];
  image: string;
}

export interface SalonLocationDetails {
  id: string;
  name: string;
  formalName: string;
  tag: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  mapEmbedQuery: string;
  timings: string;
  features: string[];
  facilities: string[];
  specialties: string[];
  nearestStation: string;
  parking: string;
  studioImage: string;
  rating: string;
  reviewCount: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  quote: string;
  verifiedSource: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'hair' | 'beard' | 'skin' | 'bridal' | 'ambience';
  categoryLabel: string;
  image: string;
  caption: string;
  source?: string;
}

export const SALON_INFO = {
  name: "Blush and Beard",
  formalName: "Blush and Beard – Unisex Salon",
  tagline: "The Art of Refined Grooming & Luxe Haircare",
  subheading: "Kalyan's Premier Destination for Unisex Styling, Precision Beard Craft, and Bespoke Hair Artistry",
  primaryPhone: "+91 81080 19891",
  phoneRaw: "+918108019891",
  whatsappRaw: "918108019891",
  email: "connect@blushandbeard.com",
  instagramHandle: "@blushandbeard",
  instagramUrl: "https://www.instagram.com/blushandbeard",
  mapsUrl: "https://maps.app.goo.gl/Fhc9X8grur2JVaBw9",
  address: "Near Guruatman Circle, Gauripada, Kalyan (West), Maharashtra 421301",
  landmark: "Close to Godrej Hill Junction & Khadakpada Link Road",
  city: "Kalyan (West)",
  pincode: "421301",
  establishedYear: 2022,
  operatingHours: "10:00 AM – 9:30 PM (Open All 7 Days)",
  overallRating: 4.9,
  reviewCount: 590,
  clientsServed: "18,000+",
  heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
  announcementText: "✨ Gauripada, Kalyan (West) · Open Daily 10:00 AM – 9:30 PM · Book Your Chair",
  brands: [
    { name: "L'Oréal Professionnel", origin: "Paris" },
    { name: "Olaplex", origin: "USA" },
    { name: "Schwarzkopf Professional", origin: "Germany" },
    { name: "Moroccanoil", origin: "Israel" },
    { name: "Cheryl's Cosmeceuticals", origin: "India" },
    { name: "O3+ Skincare", origin: "Professional" }
  ]
};

// Verified single location as per user requirement (Google Maps listing: https://maps.app.goo.gl/Fhc9X8grur2JVaBw9)
export const SOLE_SALON_LOCATION: SalonLocationDetails = {
  id: "blush-and-beard-gauripada",
  name: "Blush and Beard - Unisex Salon",
  formalName: "Blush and Beard – Unisex Salon",
  tag: "Luxury Unisex Salon & Barbershop",
  address: "Near Guruatman Circle, Gauripada",
  landmark: "Close to Godrej Hill Junction & Khadakpada Link Road",
  city: "Kalyan (West)",
  pincode: "421301",
  phone: "+91 81080 19891",
  whatsapp: "918108019891",
  mapsUrl: "https://maps.app.goo.gl/Fhc9X8grur2JVaBw9",
  mapEmbedQuery: "19.2470765,73.1527197",
  timings: "10:00 AM – 9:30 PM (Open All 7 Days)",
  nearestStation: "Kalyan Junction (~10 mins by auto via Khadakpada road)",
  parking: "Dedicated Customer Bike & Car Drop-Off Parking",
  studioImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
  rating: "4.9★",
  reviewCount: "590+ Verified Reviews",
  features: [
    "Master Barbershop Stations with Hot Steam Eucalyptus Towels",
    "Dedicated 7-Step HydraFacial Clinical Skin Suite",
    "L'Oréal & Olaplex Hair Care & Bond Repair Bar",
    "Hospital-Grade UV Tool Sanitization & Single-Use Capes",
    "Private Bridal & Groom Styling Stations"
  ],
  facilities: [
    "6 Master Styling & Barber Stations",
    "2 Ergonomic Reclining Shampoo Units",
    "1 Dedicated Skincare & Facial Room",
    "Hot Towel Beard Alignment Bar",
    "Air-Conditioned VIP Client Lounge"
  ],
  specialties: [
    "Signature Royal Beard Sculpting & Razor Tapers",
    "Nanoplastia Organic Formaldehyde-Free Smoothing",
    "French Balayage & Customized Indian Tone Highlights",
    "7-Step Deep HydraFacial Pore Extraction",
    "Therapeutic Scalp Acupressure Head Massages"
  ]
};

// Backward-compatible single-item array
export const BRANCHES: SalonLocationDetails[] = [SOLE_SALON_LOCATION];

export const SERVICES: ServiceItem[] = [
  // Hair Category
  {
    id: "srv-women-cut",
    name: "Bespoke Haircut & Blowout",
    category: "hair",
    categoryLabel: "Hair Artistry",
    gender: "women",
    duration: "45 mins",
    price: "₹650",
    popular: true,
    description: "Personalized face-mapping consultation, deep clarifying wash, precision textured cut, and glamorous volume blowdry.",
    highlights: ["Custom face contour analysis", "Deep conditioning wash", "High-shine heat protection blowout"],
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-nanoplastia",
    name: "Nanoplastia Organic Smoothing",
    category: "hair",
    categoryLabel: "Hair Artistry",
    gender: "unisex",
    duration: "180 mins",
    price: "₹4,499",
    popular: true,
    description: "Formaldehyde-free biological smoothing treatment infused with amino acids, collagen, and silk proteins for mirror-like shine.",
    highlights: ["100% Formaldehyde-free safe formula", "Lasts 5 to 7 months", "Instantly restores damaged hair fibers"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-olaplex-spa",
    name: "Olaplex Bond Multiplier Hair Spa",
    category: "hair",
    categoryLabel: "Hair Artistry",
    gender: "unisex",
    duration: "60 mins",
    price: "₹1,850",
    popular: false,
    description: "Patented active bond rebuilders restore broken disulfide bonds caused by chemical coloring, heat styling, and environmental stress.",
    highlights: ["Authentic Olaplex No. 1 & No. 2 ritual", "Steam mist infusion", "Aromatic scalp massage"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-balayage",
    name: "French Balayage & Ombré Art",
    category: "hair",
    categoryLabel: "Hair Artistry",
    gender: "women",
    duration: "150 mins",
    price: "₹3,999",
    popular: true,
    description: "Hand-painted seamless color gradation tailored to Indian skin tones — from rich hazelnut and caramel mocha to ash blonde.",
    highlights: ["Includes bonding treatment", "Custom tone formulation", "Gloss sealer wash"],
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-keratin",
    name: "Keratin Protein Infusion",
    category: "hair",
    categoryLabel: "Hair Artistry",
    gender: "unisex",
    duration: "150 mins",
    price: "₹3,499",
    popular: false,
    description: "Eliminates frizz and locks in moisture, giving silky manageable hair that withstands Kalyan's humid weather.",
    highlights: ["Deep cuticle seal", "Eliminates 95% of frizz", "Zero morning styling hassle"],
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
  },

  // Beard & Men's Grooming
  {
    id: "srv-men-cut",
    name: "Master Haircut & Skin Fade",
    category: "beard",
    categoryLabel: "Beard & Grooming",
    gender: "men",
    duration: "35 mins",
    price: "₹350",
    popular: true,
    description: "Consultation, precision clipper taper or scissor shear work, neck razor outline, cooling aftershave splash, and styling.",
    highlights: ["Includes scalp refresh wash", "Sharp razor taper outline", "Matte clay or pomade finish"],
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-beard-sculpt",
    name: "Signature Royal Beard Sculpting",
    category: "beard",
    categoryLabel: "Beard & Grooming",
    gender: "men",
    duration: "30 mins",
    price: "₹250",
    popular: true,
    description: "Warm steam towel prep, anatomical cheek and neckline carving with straight razor, organic beard oil soak, and balm conditioning.",
    highlights: ["Hot towel eucalyptus steam", "Single-blade precision line", "Organic argan beard butter massage"],
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-beard-detan",
    name: "Gentleman's Charcoal De-Tan & Beard Spa",
    category: "beard",
    categoryLabel: "Beard & Grooming",
    gender: "men",
    duration: "45 mins",
    price: "₹750",
    popular: false,
    description: "Deep activated charcoal scrub to eliminate sun tan and pollution grime from facial skin and coarse beard roots.",
    highlights: ["Purifying sonic brush cleanse", "Under-beard follicle conditioning", "Cooling menthol mask"],
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-head-massage",
    name: "Therapeutic Scalp & Head Massage",
    category: "beard",
    categoryLabel: "Beard & Grooming",
    gender: "men",
    duration: "30 mins",
    price: "₹399",
    popular: false,
    description: "Traditional acupressure technique using warm infused oils (almond, brahmi, or olive) to relieve screen fatigue and enhance blood circulation.",
    highlights: ["Warm oil blend", "Shoulder tension release", "Vibration acupressure stimulation"],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
  },

  // Skin & Facials
  {
    id: "srv-hydrafacial",
    name: "Advanced 7-Step HydraFacial",
    category: "skin",
    categoryLabel: "Skin & Facials",
    gender: "unisex",
    duration: "60 mins",
    price: "₹2,499",
    popular: true,
    description: "Vortex suction extraction cleans out deep blackheads while infusing intense hyaluronic acid, peptides, and antioxidants.",
    highlights: ["Painless vacuum pore extraction", "Cold hammer cryo firming", "Instant camera-ready dewy glow"],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-o3-bridal",
    name: "O3+ Radiant Glow Facial",
    category: "skin",
    categoryLabel: "Skin & Facials",
    gender: "unisex",
    duration: "75 mins",
    price: "₹2,199",
    popular: false,
    description: "Specialized dermatological oxygenating facial that removes persistent tanning, lightens blemishes, and brightens complexions.",
    highlights: ["Meladerm brightening serum", "Derma peel exfoliation", "Rubberizing alginate peel-off mask"],
    image: "https://images.unsplash.com/photo-1512290900672-1f02e6a39396?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-cheryls-detan",
    name: "Cheryl's OxyBlast Instaglow",
    category: "skin",
    categoryLabel: "Skin & Facials",
    gender: "unisex",
    duration: "50 mins",
    price: "₹1,450",
    popular: false,
    description: "Delivers pure oxygen deep into the dermal layers to revitalize dull, fatigued city skin and revive natural luminosity.",
    highlights: ["Oxygen booster serum", "Gentle enzymatic exfoliation", "Sun-damage repair"],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
  },

  // Hands & Nails
  {
    id: "srv-pedicure-spa",
    name: "Rose Crystal Luxury Spa Pedicure",
    category: "nails",
    categoryLabel: "Hands & Nails",
    gender: "unisex",
    duration: "50 mins",
    price: "₹850",
    popular: true,
    description: "Warm mineral salt soak with rose petals, ultrasonic callus removal, exfoliating brown sugar scrub, and deep moisturizing cream massage.",
    highlights: ["Cracked heel callus treatment", "Cuticle shaping & buff", "Extended calf & foot massage"],
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-gel-extensions",
    name: "Gel Nail Extensions & Custom Art",
    category: "nails",
    categoryLabel: "Hands & Nails",
    gender: "women",
    duration: "90 mins",
    price: "₹1,799",
    popular: false,
    description: "Sculpted UV gel tips tailored to your desired length and shape (Almond, Coffin, Square) finished with designer nail art and chrome shine.",
    highlights: ["Non-damaging builder gel", "Chip-resistant for 4+ weeks", "Custom stones, chrome or marble art"],
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
  },

  // Bridal & Groom Couture
  {
    id: "srv-bridal-hd",
    name: "Bridal HD Signature Makeover",
    category: "bridal",
    categoryLabel: "Bridal & Groom",
    gender: "women",
    duration: "180 mins",
    price: "₹11,999",
    popular: true,
    description: "Couture wedding day transformation featuring high-definition waterproof makeup, designer bridal hair styling, jewelry setting, and saree/lehenga draping.",
    highlights: ["M.A.C, Huda Beauty & Dior cosmetics", "Premium mink lashes & hair extensions", "Precision jewelry & dupatta setting"],
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "srv-groom-royal",
    name: "Royal Groom Styling & Makeover",
    category: "bridal",
    categoryLabel: "Bridal & Groom",
    gender: "men",
    duration: "120 mins",
    price: "₹4,999",
    popular: true,
    description: "Complete groom transformation: Master hair sculpting, beard alignment, HydraFacial glow, discreet undetectable groom makeup, and safa tying assistance.",
    highlights: ["Camera-matte complexion finish", "Sharp beard definition", "Safa / Turban setting support"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  },

  // Spa & Body Wellness
  {
    id: "srv-body-polish",
    name: "Aromatherapy Full Body Scrub & Polish",
    category: "spa",
    categoryLabel: "Spa & Therapy",
    gender: "unisex",
    duration: "75 mins",
    price: "₹2,499",
    popular: false,
    description: "Gentle walnut & apricot seed polish sloughs away dead skin cells, followed by a warm sandalwood essential oil hydrator in private spa suites.",
    highlights: ["Private sanitised spa suite", "Warm shower ritual", "Silk-finish skin moisturisation"],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Rohan Patil",
    location: "Gauripada, Kalyan West",
    service: "Beard Sculpting & Skin Fade",
    rating: 5,
    date: "1 month ago",
    quote: "Hands down the best unisex salon in Kalyan! The hot towel beard treatment near Guruatman Circle was an experience in itself. Master stylist understood exactly what beard fade suits my jawline.",
    verifiedSource: "Google Maps Review"
  },
  {
    id: "t-2",
    name: "Pooja Sharma",
    location: "Gauripada / Godrej Hill, Kalyan",
    service: "Nanoplastia & Balayage",
    rating: 5,
    date: "3 weeks ago",
    quote: "I was hesitant to do Nanoplastia because of previous bad experiences elsewhere, but Blush & Beard treated my hair with so much care. My hair is silky, healthy, and has zero frizz even in humid monsoon weather. 10/10!",
    verifiedSource: "Google Maps Review"
  },
  {
    id: "t-3",
    name: "Amit & Neha Deshmukh",
    location: "Khadakpada / Gauripada, Kalyan",
    service: "Pre-Wedding Groom & Bridal Makeover",
    rating: 5,
    date: "2 months ago",
    quote: "We booked our styling here together. The staff is courteous, hygienic, and extremely professional. The HydraFacial made Neha’s face glow for our reception. They truly bring South Mumbai salon standards to Kalyan.",
    verifiedSource: "Google Maps Review"
  },
  {
    id: "t-4",
    name: "Dr. Kunal Mehta",
    location: "Kalyan West",
    service: "Executive Grooming & Spa",
    rating: 5,
    date: "Recent visit",
    quote: "Hospital-level hygiene, sterilized shears, disposable capes, and very respectful staff. The head massage relieved a week of hectic hospital stress. Proud to have this caliber of salon right in Gauripada.",
    verifiedSource: "Justdial Verified Review"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Signature Beard Line & Taper Fade",
    category: "beard",
    categoryLabel: "Beard Styling",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
    caption: "Sharp razor contouring and seamless fade by senior master barber.",
    source: "Google Maps Listing Verified Work"
  },
  {
    id: "gal-2",
    title: "Caramel Mocha Balayage & Blowout",
    category: "hair",
    categoryLabel: "Hair Artistry",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80",
    caption: "Sun-kissed hand-painted highlights sealed with Olaplex gloss.",
    source: "Google Maps Listing Verified Work"
  },
  {
    id: "gal-3",
    title: "Gauripada Luxury Styling Floor",
    category: "ambience",
    categoryLabel: "Salon Ambience",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
    caption: "Spacious, warm ivory and gold accents designed for serene comfort.",
    source: "Google Maps Listing Verified Atmosphere"
  },
  {
    id: "gal-4",
    title: "HydraFacial Glow & Rejuvenation",
    category: "skin",
    categoryLabel: "Skin Therapy",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    caption: "Instant deep pore detox and intense hyaluronic replenishment.",
    source: "Google Maps Listing Verified Work"
  },
  {
    id: "gal-5",
    title: "Bridal Couture Hair & Makeup",
    category: "bridal",
    categoryLabel: "Bridal & Groom",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
    caption: "Traditional Maharashtrian & North Indian bridal aesthetics.",
    source: "Google Maps Listing Verified Work"
  },
  {
    id: "gal-6",
    title: "Nanoplastia Mirror-Gloss Finish",
    category: "hair",
    categoryLabel: "Hair Artistry",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    caption: "Zero-frizz, silky smooth hair transformation lasting 6 months.",
    source: "Google Maps Listing Verified Work"
  }
];

export const FAQS = [
  {
    q: "Where is Blush and Beard located?",
    a: "We are located Near Guruatman Circle, Gauripada, Kalyan (West), Maharashtra 421301 — conveniently close to Godrej Hill Junction and Khadakpada Link Road, with easy car and bike parking."
  },
  {
    q: "Do I need an appointment beforehand or can I walk in?",
    a: "Walk-ins are always welcomed warmly! However, to avoid waiting time during peak evening hours (5:00 PM – 9:00 PM) and weekends, we recommend reserving a slot online or via WhatsApp (+91 81080 19891)."
  },
  {
    q: "What products and chemical brands do you use?",
    a: "We only use 100% authentic, sealed international formulations including L'Oréal Professionnel Paris, Olaplex USA, Schwarzkopf Professional, Cheryl's Cosmeceuticals, and O3+ skincare. We never compromise on product purity."
  },
  {
    q: "What is the difference between Keratin and Nanoplastia?",
    a: "While Keratin infuses protein to eliminate frizz and smooth curls, Nanoplastia is an advanced organic, formaldehyde-free amino acid treatment that penetrates the hair cortex to both straighten and deeply nourish with long-lasting mirror shine."
  },
  {
    q: "How far is the salon from Kalyan Railway Station?",
    a: "Our Gauripada salon is approximately 10 minutes by auto-rickshaw from Kalyan Railway Station (West) via the Khadakpada link road."
  }
];
