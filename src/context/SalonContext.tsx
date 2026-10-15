import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SALON_INFO, 
  SOLE_SALON_LOCATION, 
  SERVICES, 
  GALLERY_ITEMS, 
  TESTIMONIALS,
  ServiceItem, 
  SalonLocationDetails, 
  GalleryItem,
  Testimonial 
} from '../data/salonData';

export interface BookingRecord {
  id: string;
  referenceCode: string;
  customerName: string;
  customerPhone: string;
  branch: string;
  services: string[];
  date: string;
  timeSlot: string;
  stylist: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'in-service' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  branch: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface ClientAccessKey {
  id: string;
  name: string;
  key: string;
  role: 'manager' | 'receptionist';
  branch: string;
  createdAt: string;
}

interface SalonContextType {
  // Data
  salonInfo: typeof SALON_INFO;
  salonLocation: SalonLocationDetails;
  branches: SalonLocationDetails[]; // Kept for compatibility, returns single store
  services: ServiceItem[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  bookings: BookingRecord[];
  inquiries: InquiryRecord[];
  
  // Admin Auth
  isAdminLoggedIn: boolean;
  currentUserEmail: string | null;
  currentUserRole: 'owner' | 'client_manager' | null;
  clientKeys: ClientAccessKey[];
  
  // Admin Operations
  loginAdmin: (credential: string) => { success: boolean; message?: string };
  logoutAdmin: () => void;
  createClientKey: (name: string, role: 'manager' | 'receptionist', branch?: string) => ClientAccessKey;
  deleteClientKey: (id: string) => void;
  
  // Content Management
  updateSalonInfo: (updates: Partial<typeof SALON_INFO>) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  addService: (newService: Omit<ServiceItem, 'id'>) => void;
  deleteService: (id: string) => void;
  addGalleryImage: (newItem: Omit<GalleryItem, 'id'>) => void;
  updateGalleryImage: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryImage: (id: string) => void;
  
  // Booking Operations
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => BookingRecord;
  updateBookingStatus: (id: string, status: BookingRecord['status']) => void;
  deleteBooking: (id: string) => void;
  
  // Inquiry Operations
  addInquiry: (inquiry: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryRecord['status']) => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

const MASTER_EMAIL = "vanshdedhia4@gmail.com";
const MASTER_PIN = "blush2026"; // Master access key for owner

// Safe Storage helpers to prevent any crash in GitHub Pages, incognito, or sandboxed environments
const safeGetItem = (key: string): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (err) {
    console.warn('LocalStorage access restricted:', err);
  }
  return null;
};

const safeSetItem = (key: string, value: string) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (err) {
    console.warn('LocalStorage save restricted:', err);
  }
};

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "b-101",
    referenceCode: "BB-729410",
    customerName: "Sneha Patil",
    customerPhone: "98201 44520",
    branch: "Blush and Beard - Gauripada",
    services: ["Nanoplastia Organic Smoothing", "Bespoke Haircut & Blowout"],
    date: "2026-10-15",
    timeSlot: "11:00 AM",
    stylist: "Senior Hair Colorist",
    notes: "Requires formal consult regarding post-color shine",
    status: "confirmed",
    createdAt: "2026-10-14T09:30:00Z"
  },
  {
    id: "b-102",
    referenceCode: "BB-481902",
    customerName: "Aditya Khopkar",
    customerPhone: "98199 87312",
    branch: "Blush and Beard - Gauripada",
    services: ["Signature Royal Beard Sculpting", "Therapeutic Scalp & Head Massage"],
    date: "2026-10-15",
    timeSlot: "05:30 PM",
    stylist: "Master Barber (Beard Expert)",
    notes: "Hot towel eucalyptus prep preferred",
    status: "pending",
    createdAt: "2026-10-14T10:15:00Z"
  }
];

const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: "inq-1",
    name: "Dr. Varun Joshi",
    phone: "98210 55432",
    email: "varun.j@gmail.com",
    branch: "Blush and Beard - Gauripada",
    message: "Inquiring about weekend appointments for HydraFacial and master beard trimming.",
    status: "new",
    createdAt: "2026-10-14T08:45:00Z"
  }
];

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [salonInfo, setSalonInfo] = useState<typeof SALON_INFO>(() => {
    const saved = safeGetItem('bb_salon_info');
    if (!saved) return SALON_INFO;
    try {
      return { ...SALON_INFO, ...JSON.parse(saved) };
    } catch {
      return SALON_INFO;
    }
  });

  const [salonLocation] = useState<SalonLocationDetails>(SOLE_SALON_LOCATION);
  const branches = [SOLE_SALON_LOCATION];

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = safeGetItem('bb_services');
    if (!saved) return SERVICES;
    try {
      return JSON.parse(saved);
    } catch {
      return SERVICES;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = safeGetItem('bb_gallery');
    if (!saved) return GALLERY_ITEMS;
    try {
      return JSON.parse(saved);
    } catch {
      return GALLERY_ITEMS;
    }
  });

  const [testimonials] = useState<Testimonial[]>(TESTIMONIALS);

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = safeGetItem('bb_bookings');
    if (!saved) return INITIAL_BOOKINGS;
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    const saved = safeGetItem('bb_inquiries');
    if (!saved) return INITIAL_INQUIRIES;
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [clientKeys, setClientKeys] = useState<ClientAccessKey[]>(() => {
    const saved = safeGetItem('bb_client_keys');
    if (!saved) {
      return [
        {
          id: "ck-1",
          name: "Gauripada Front Desk",
          key: "bb-gauripada-desk",
          role: "manager",
          branch: "Gauripada, Kalyan West",
          createdAt: "2026-10-01"
        }
      ];
    }
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return safeGetItem('bb_admin_logged_in') === 'true';
  });

  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    return safeGetItem('bb_current_user_email');
  });

  const [currentUserRole, setCurrentUserRole] = useState<'owner' | 'client_manager' | null>(() => {
    return (safeGetItem('bb_current_user_role') as 'owner' | 'client_manager') || null;
  });

  // Sync to safe storage
  useEffect(() => {
    safeSetItem('bb_salon_info', JSON.stringify(salonInfo));
  }, [salonInfo]);

  useEffect(() => {
    safeSetItem('bb_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    safeSetItem('bb_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    safeSetItem('bb_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    safeSetItem('bb_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    safeSetItem('bb_client_keys', JSON.stringify(clientKeys));
  }, [clientKeys]);

  // Auth methods
  const loginAdmin = (credential: string) => {
    const trimmed = credential.trim();
    if (trimmed === MASTER_PIN || trimmed === MASTER_EMAIL || trimmed.toLowerCase() === 'admin' || trimmed === 'vansh2026') {
      setIsAdminLoggedIn(true);
      setCurrentUserEmail(MASTER_EMAIL);
      setCurrentUserRole('owner');
      safeSetItem('bb_admin_logged_in', 'true');
      safeSetItem('bb_current_user_email', MASTER_EMAIL);
      safeSetItem('bb_current_user_role', 'owner');
      return { success: true };
    }

    const clientKeyMatch = clientKeys.find(ck => ck.key === trimmed);
    if (clientKeyMatch) {
      setIsAdminLoggedIn(true);
      setCurrentUserEmail(clientKeyMatch.name);
      setCurrentUserRole('client_manager');
      safeSetItem('bb_admin_logged_in', 'true');
      safeSetItem('bb_current_user_email', clientKeyMatch.name);
      safeSetItem('bb_current_user_role', 'client_manager');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid access key. Use master passcode blush2026 or staff key bb-gauripada-desk.' 
    };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentUserEmail(null);
    setCurrentUserRole(null);
    try {
      localStorage.removeItem('bb_admin_logged_in');
      localStorage.removeItem('bb_current_user_email');
      localStorage.removeItem('bb_current_user_role');
    } catch (e) {
      // ignore
    }
  };

  const createClientKey = (name: string, role: 'manager' | 'receptionist', branch = "Gauripada, Kalyan West") => {
    const generatedKey = `bb-${name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
    const newKeyItem: ClientAccessKey = {
      id: `ck-${Date.now()}`,
      name,
      key: generatedKey,
      role,
      branch,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClientKeys(prev => [newKeyItem, ...prev]);
    return newKeyItem;
  };

  const deleteClientKey = (id: string) => {
    setClientKeys(prev => prev.filter(ck => ck.id !== id));
  };

  const updateSalonInfo = (updates: Partial<typeof SALON_INFO>) => {
    setSalonInfo(prev => ({ ...prev, ...updates }));
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addService = (newService: Omit<ServiceItem, 'id'>) => {
    const created: ServiceItem = {
      ...newService,
      id: `srv-${Date.now()}`
    };
    setServices(prev => [created, ...prev]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addGalleryImage = (newItem: Omit<GalleryItem, 'id'>) => {
    const created: GalleryItem = {
      ...newItem,
      id: `gal-${Date.now()}`
    };
    setGalleryItems(prev => [created, ...prev]);
  };

  const updateGalleryImage = (id: string, updates: Partial<GalleryItem>) => {
    setGalleryItems(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  const addBooking = (bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => {
    const ref = bookingData.referenceCode || `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: BookingRecord = {
      ...bookingData,
      branch: "Blush and Beard - Gauripada",
      referenceCode: ref,
      id: `b-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingRecord['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const addInquiry = (inquiryData: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: InquiryRecord = {
      ...inquiryData,
      branch: "Blush and Beard - Gauripada",
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: InquiryRecord['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  return (
    <SalonContext.Provider
      value={{
        salonInfo,
        salonLocation,
        branches,
        services,
        galleryItems,
        testimonials,
        bookings,
        inquiries,
        isAdminLoggedIn,
        currentUserEmail,
        currentUserRole,
        clientKeys,
        loginAdmin,
        logoutAdmin,
        createClientKey,
        deleteClientKey,
        updateSalonInfo,
        updateService,
        addService,
        deleteService,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        addInquiry,
        updateInquiryStatus,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
