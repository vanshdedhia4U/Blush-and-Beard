import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SALON_INFO, 
  BRANCHES, 
  SERVICES, 
  GALLERY_ITEMS, 
  TESTIMONIALS,
  ServiceItem, 
  BranchLocation, 
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
  branches: BranchLocation[];
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
  createClientKey: (name: string, role: 'manager' | 'receptionist', branch: string) => ClientAccessKey;
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
const MASTER_PIN = "blush2026"; // Master access key for owner/developer

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "b-101",
    referenceCode: "BB-729410",
    customerName: "Sneha Patil",
    customerPhone: "98201 44520",
    branch: "Yogidham Flagship & Academy",
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
    branch: "Gauripada Studio",
    services: ["Signature Royal Beard Sculpting", "Therapeutic Scalp & Head Massage"],
    date: "2026-10-15",
    timeSlot: "05:30 PM",
    stylist: "Master Barber (Beard Expert)",
    notes: "Hot towel prep preferred",
    status: "pending",
    createdAt: "2026-10-14T10:15:00Z"
  },
  {
    id: "b-103",
    referenceCode: "BB-392104",
    customerName: "Meera Nair",
    customerPhone: "97690 12345",
    branch: "Rambhag Lounge",
    services: ["Advanced 7-Step HydraFacial", "Rose Crystal Luxury Spa Pedicure"],
    date: "2026-10-16",
    timeSlot: "02:30 PM",
    stylist: "Any Master Stylist",
    notes: "Pre-event glowing skin prep",
    status: "pending",
    createdAt: "2026-10-14T11:00:00Z"
  }
];

const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: "inq-1",
    name: "Dr. Varun Joshi",
    phone: "98210 55432",
    email: "varun.j@gmail.com",
    branch: "Yogidham Flagship & Academy",
    message: "Inquiring about pre-wedding groom package timing and available Sunday slots for groom party.",
    status: "new",
    createdAt: "2026-10-14T08:45:00Z"
  },
  {
    id: "inq-2",
    name: "Priya Sawant",
    phone: "99300 78120",
    email: "priya.sawant@yahoo.com",
    branch: "Yogidham Flagship & Academy",
    message: "Interested in the 3-Month Diploma in Professional Hairdressing syllabus and batch start dates.",
    status: "contacted",
    createdAt: "2026-10-13T16:20:00Z"
  }
];

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistent state initialized from localStorage if available
  const [salonInfo, setSalonInfo] = useState<typeof SALON_INFO>(() => {
    const saved = localStorage.getItem('bb_salon_info');
    return saved ? JSON.parse(saved) : SALON_INFO;
  });

  const [branches, setBranches] = useState<BranchLocation[]>(() => {
    const saved = localStorage.getItem('bb_branches');
    if (!saved) return BRANCHES;
    try {
      const parsed: BranchLocation[] = JSON.parse(saved);
      return BRANCHES.map(def => {
        const found = parsed.find(p => p.id === def.id);
        return found ? { ...def, ...found } : def;
      });
    } catch {
      return BRANCHES;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('bb_services');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('bb_gallery');
    return saved ? JSON.parse(saved) : GALLERY_ITEMS;
  });

  const [testimonials] = useState<Testimonial[]>(TESTIMONIALS);

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('bb_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    const saved = localStorage.getItem('bb_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [clientKeys, setClientKeys] = useState<ClientAccessKey[]>(() => {
    const saved = localStorage.getItem('bb_client_keys');
    return saved ? JSON.parse(saved) : [
      {
        id: "ck-1",
        name: "Kalyan Flagship Front Desk",
        key: "bb-kalyan-desk",
        role: "manager",
        branch: "Yogidham Flagship & Academy",
        createdAt: "2026-10-01"
      }
    ];
  });

  // Admin auth states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('bb_admin_logged_in') === 'true';
  });

  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('bb_current_user_email');
  });

  const [currentUserRole, setCurrentUserRole] = useState<'owner' | 'client_manager' | null>(() => {
    return (localStorage.getItem('bb_current_user_role') as 'owner' | 'client_manager') || null;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('bb_salon_info', JSON.stringify(salonInfo));
  }, [salonInfo]);

  useEffect(() => {
    localStorage.setItem('bb_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('bb_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('bb_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('bb_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('bb_client_keys', JSON.stringify(clientKeys));
  }, [clientKeys]);

  // Auth methods
  const loginAdmin = (credential: string) => {
    const trimmed = credential.trim();
    
    // Check if master owner login
    if (trimmed === MASTER_PIN || trimmed === MASTER_EMAIL || trimmed.toLowerCase() === 'admin' || trimmed === 'vansh2026') {
      setIsAdminLoggedIn(true);
      setCurrentUserEmail(MASTER_EMAIL);
      setCurrentUserRole('owner');
      localStorage.setItem('bb_admin_logged_in', 'true');
      localStorage.setItem('bb_current_user_email', MASTER_EMAIL);
      localStorage.setItem('bb_current_user_role', 'owner');
      return { success: true };
    }

    // Check if client access key
    const clientKeyMatch = clientKeys.find(ck => ck.key === trimmed);
    if (clientKeyMatch) {
      setIsAdminLoggedIn(true);
      setCurrentUserEmail(clientKeyMatch.name);
      setCurrentUserRole('client_manager');
      localStorage.setItem('bb_admin_logged_in', 'true');
      localStorage.setItem('bb_current_user_email', clientKeyMatch.name);
      localStorage.setItem('bb_current_user_role', 'client_manager');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid access key or credentials. Use master key or client access key.' 
    };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentUserEmail(null);
    setCurrentUserRole(null);
    localStorage.removeItem('bb_admin_logged_in');
    localStorage.removeItem('bb_current_user_email');
    localStorage.removeItem('bb_current_user_role');
  };

  const createClientKey = (name: string, role: 'manager' | 'receptionist', branch: string) => {
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

  // Content updates
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

  // Bookings
  const addBooking = (bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>) => {
    const ref = bookingData.referenceCode || `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: BookingRecord = {
      ...bookingData,
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

  // Inquiries
  const addInquiry = (inquiryData: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: InquiryRecord = {
      ...inquiryData,
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
