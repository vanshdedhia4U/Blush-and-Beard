import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Scissors, 
  Image, 
  MapPin, 
  Key, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Save,
  AlertCircle,
  Clock,
  UserCheck
} from 'lucide-react';
import { useSalon, BookingRecord } from '../context/SalonContext';
import { ServiceItem, GalleryItem } from '../data/salonData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    salonInfo,
    branches,
    services,
    galleryItems,
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
    updateBookingStatus,
    deleteBooking,
    updateInquiryStatus
  } = useSalon();

  // Login form state
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'media' | 'inquiries' | 'settings' | 'access'>('bookings');

  // New service state
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState<Omit<ServiceItem, 'id'>>({
    name: '',
    category: 'hair',
    categoryLabel: 'Hair Artistry',
    gender: 'unisex',
    duration: '45 mins',
    price: '₹999',
    popular: false,
    description: '',
    highlights: ['Consultation included', 'Premium formulations'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
  });

  // New image state
  const [showAddImage, setShowAddImage] = useState(false);
  const [newImage, setNewImage] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'hair',
    categoryLabel: 'Hair Artistry',
    image: '',
    caption: '',
    source: 'Google Maps Listing'
  });

  // Client key creation state
  const [clientKeyName, setClientKeyName] = useState('');
  const [clientKeyBranch, setClientKeyBranch] = useState(branches[0]?.name || 'Blush and Beard - Gauripada');
  const [newGeneratedKeyNotice, setNewGeneratedKeyNotice] = useState<string | null>(null);

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    name: salonInfo.name,
    tagline: salonInfo.tagline,
    primaryPhone: salonInfo.primaryPhone,
    operatingHours: salonInfo.operatingHours,
    announcementText: salonInfo.announcementText || '',
    heroImage: salonInfo.heroImage || ''
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginAdmin(passcode);
    if (!res.success) {
      setLoginError(res.message || 'Access denied.');
    } else {
      setPasscode('');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSalonInfo(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleCreateClientKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientKeyName.trim()) return;
    const created = createClientKey(clientKeyName, 'manager', clientKeyBranch);
    setNewGeneratedKeyNotice(`Client Key Generated: ${created.key} (Saved)`);
    setClientKeyName('');
    setTimeout(() => setNewGeneratedKeyNotice(null), 5000);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim()) return;
    addService(newService);
    setShowAddService(false);
    setNewService({
      name: '',
      category: 'hair',
      categoryLabel: 'Hair Artistry',
      gender: 'unisex',
      duration: '45 mins',
      price: '₹999',
      popular: false,
      description: '',
      highlights: ['Consultation included'],
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
    });
  };

  const handleCreateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.image.trim() || !newImage.title.trim()) return;
    addGalleryImage(newImage);
    setShowAddImage(false);
    setNewImage({
      title: '',
      category: 'hair',
      categoryLabel: 'Hair Artistry',
      image: '',
      caption: '',
      source: 'Google Maps Listing'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-[#101828] text-white w-full max-w-5xl rounded-2xl shadow-2xl border border-[#C6A56B]/40 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="bg-[#0B111E] p-4 sm:p-5 border-b border-[#C6A56B]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C6A56B]/20 border border-[#C6A56B]/40 flex items-center justify-center text-[#C6A56B]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  Blush &amp; Beard Atelier Control Hub
                </h3>
                {isAdminLoggedIn && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {currentUserRole === 'owner' ? 'Owner / Super Admin' : 'Client Manager Access'}
                  </span>
                )}
              </div>
              <div className="text-xs text-white/50">
                Authorized for master administrator &amp; client management
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Log out from admin"
              >
                <LogOut className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAdminLoggedIn ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#C6A56B]/15 border border-[#C6A56B]/30 flex items-center justify-center text-[#C6A56B] mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8 text-[#C6A56B]" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-bold font-heading text-white">
                Admin &amp; Client Authentication
              </h4>
              <p className="text-xs text-white/60 font-body">
                Enter your Master Passcode (<code className="text-[#C6A56B]">blush2026</code>) or client access key.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode or client key..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-[#C6A56B] focus:ring-2 focus:ring-[#C6A56B]/30 text-white placeholder:text-white/40 text-center tracking-widest text-base outline-none"
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] font-heading font-bold text-sm shadow-lg shadow-[#C6A56B]/20 transition-all cursor-pointer"
              >
                Unlock Atelier Dashboard
              </button>
            </form>

            <div className="pt-2 text-left text-[11px] text-white/40 bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="font-semibold text-white/70">Access Credentials:</div>
              <div>• Master Admin (Vansh Dedhia): <code className="text-[#C6A56B]">blush2026</code></div>
              <div>• Client Reception Key: <code className="text-white/80">bb-kalyan-desk</code></div>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard with Navigation Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Navigation Tabs */}
            <div className="bg-[#0B111E]/70 px-4 pt-2 border-b border-white/10 flex items-center gap-1 overflow-x-auto scrollbar-none text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'bookings'
                    ? 'border-[#C6A56B] text-[#C6A56B] bg-white/5'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Appointments ({bookings.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'border-[#C6A56B] text-[#C6A56B] bg-white/5'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Treatment Catalog ({services.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'border-[#C6A56B] text-[#C6A56B] bg-white/5'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Image className="w-3.5 h-3.5" />
                <span>Google Maps Photos &amp; Media</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'inquiries'
                    ? 'border-[#C6A56B] text-[#C6A56B] bg-white/5'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Client Inquiries ({inquiries.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-[#C6A56B] text-[#C6A56B] bg-white/5'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Salon Details &amp; Banner</span>
              </button>

              {currentUserRole === 'owner' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('access')}
                  className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'access'
                      ? 'border-[#C6A56B] text-[#C6A56B] bg-white/5'
                      : 'border-transparent text-white/60 hover:text-white'
                  }`}
                >
                  <Key className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Client Access Keys</span>
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {/* TAB 1: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white">
                        Appointment Reservations
                      </h4>
                      <p className="text-xs text-white/60">
                        Live customer booking requests from the website and walk-in registry.
                      </p>
                    </div>

                    <div className="text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      Auto-syncing with LocalStorage
                    </div>
                  </div>

                  <div className="space-y-3">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 rounded-xl bg-[#1E293B]/70 border border-white/10 hover:border-[#C6A56B]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#C6A56B]">
                              {booking.referenceCode}
                            </span>
                            <span className="text-white/30">·</span>
                            <span className="font-heading font-bold text-sm text-white">
                              {booking.customerName}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              booking.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                              booking.status === 'completed' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                              booking.status === 'cancelled' ? 'bg-red-950 text-red-400 border border-red-500/30' :
                              'bg-amber-950 text-amber-400 border border-amber-500/30'
                            }`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="text-xs text-white/80 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#C6A56B]" />
                              {booking.date} at {booking.timeSlot}
                            </span>
                            <span className="text-white/30">·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
                              {booking.branch}
                            </span>
                          </div>

                          <div className="text-xs text-[#C6A56B]">
                            Services: {booking.services.join(', ')}
                          </div>

                          {booking.notes && (
                            <div className="text-[11px] text-white/60 italic">
                              Note: {booking.notes}
                            </div>
                          )}
                        </div>

                        {/* Booking actions */}
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={`https://wa.me/91${booking.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${booking.customerName}! We confirm your appointment at Blush & Beard (${booking.branch}) on ${booking.date} at ${booking.timeSlot}. Reference: ${booking.referenceCode}. We look forward to welcoming you!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Client</span>
                          </a>

                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingRecord['status'])}
                            className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white outline-none"
                          >
                            <option value="pending" className="bg-[#101828]">Pending</option>
                            <option value="confirmed" className="bg-[#101828]">Confirmed</option>
                            <option value="in-service" className="bg-[#101828]">In Service</option>
                            <option value="completed" className="bg-[#101828]">Completed</option>
                            <option value="cancelled" className="bg-[#101828]">Cancelled</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => deleteBooking(booking.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors"
                            title="Delete booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SERVICES CATALOG */}
              {activeTab === 'services' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white">
                        Live Treatment &amp; Price Catalog
                      </h4>
                      <p className="text-xs text-white/60">
                        Edit prices, durations, and descriptions in real time on the live customer website.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddService(!showAddService)}
                      className="px-3.5 py-2 rounded-xl bg-[#C6A56B] text-[#101828] font-heading font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#101828]" />
                      <span>Add New Treatment</span>
                    </button>
                  </div>

                  {showAddService && (
                    <form onSubmit={handleCreateService} className="p-4 rounded-xl bg-white/5 border border-[#C6A56B]/40 space-y-3">
                      <div className="font-bold text-sm text-[#C6A56B]">Create New Salon Treatment</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Treatment Name"
                          value={newService.name}
                          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Price (e.g. ₹1,299)"
                          value={newService.price}
                          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g. 45 mins)"
                          value={newService.duration}
                          onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={newService.category}
                          onChange={(e) => {
                            const cat = e.target.value as ServiceItem['category'];
                            const labels: Record<string, string> = {
                              hair: 'Hair Artistry',
                              beard: 'Beard & Grooming',
                              skin: 'Skin & Facials',
                              nails: 'Hands & Nails',
                              bridal: 'Bridal & Groom',
                              spa: 'Spa & Therapy'
                            };
                            setNewService({ ...newService, category: cat, categoryLabel: labels[cat] });
                          }}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                        >
                          <option value="hair">Hair Artistry</option>
                          <option value="beard">Beard &amp; Grooming</option>
                          <option value="skin">Skin &amp; Facials</option>
                          <option value="nails">Hands &amp; Nails</option>
                          <option value="bridal">Bridal &amp; Groom</option>
                          <option value="spa">Spa &amp; Therapy</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Image URL"
                          value={newService.image}
                          onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Short benefit-oriented description"
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                        required
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddService(false)}
                          className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-[#C6A56B] text-[#101828] text-xs font-bold"
                        >
                          Save to Live Menu
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="text-xs text-[#C6A56B] uppercase font-semibold">
                            {service.categoryLabel}
                          </div>
                          <div className="font-heading font-bold text-sm text-white">
                            {service.name}
                          </div>
                          <div className="text-xs text-white/60">
                            {service.duration} · <span className="font-bold text-white">{service.price}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const newPrice = prompt(`Enter new price for ${service.name}:`, service.price);
                              if (newPrice) updateService(service.id, { price: newPrice });
                            }}
                            className="px-2.5 py-1 rounded bg-white/10 hover:bg-[#C6A56B] text-white hover:text-[#101828] text-xs font-semibold"
                          >
                            Edit Price
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteService(service.id)}
                            className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400"
                            title="Delete service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GOOGLE MAPS MEDIA & PHOTOS */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-[#0B111E] border border-[#C6A56B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase font-bold text-[#C6A56B] tracking-wider">
                        Google Maps Business Listing Integration
                      </div>
                      <div className="font-bold text-sm text-white mt-0.5">
                        Blush and Beard - Unisex Salon (Kalyan West)
                      </div>
                      <a 
                        href={salonInfo.mapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-[#C6A56B] hover:underline flex items-center gap-1 mt-1 font-mono"
                      >
                        <span>{salonInfo.mapsUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddImage(!showAddImage)}
                      className="px-4 py-2 rounded-xl bg-[#C6A56B] text-[#101828] font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Photo from Google Maps / Work</span>
                    </button>
                  </div>

                  {showAddImage && (
                    <form onSubmit={handleCreateImage} className="p-4 rounded-xl bg-white/5 border border-white/20 space-y-3">
                      <div className="font-bold text-sm text-[#C6A56B]">Add Google Maps Photo / Portfolio Asset</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Photo Title (e.g. Signature Beard Fade / Hair Spa)"
                          value={newImage.title}
                          onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Paste Direct Image URL from Google Maps or Instagram"
                          value={newImage.image}
                          onChange={(e) => setNewImage({ ...newImage, image: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none font-mono"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Short caption describing the work"
                          value={newImage.caption}
                          onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                        />
                        <select
                          value={newImage.category}
                          onChange={(e) => {
                            const cat = e.target.value as GalleryItem['category'];
                            const labels: Record<string, string> = {
                              beard: 'Beard Styling',
                              hair: 'Hair Artistry',
                              skin: 'Skin Therapy',
                              bridal: 'Bridal & Groom',
                              ambience: 'Salon Ambience'
                            };
                            setNewImage({ ...newImage, category: cat, categoryLabel: labels[cat] });
                          }}
                          className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                        >
                          <option value="beard">Beard Styling</option>
                          <option value="hair">Hair Artistry</option>
                          <option value="skin">Skin Therapy</option>
                          <option value="bridal">Bridal &amp; Groom</option>
                          <option value="ambience">Salon Ambience</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddImage(false)}
                          className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-[#C6A56B] text-[#101828] text-xs font-bold"
                        >
                          Publish to Website Showcase
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10 group aspect-[4/3]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 flex flex-col justify-between">
                          <span className="text-[10px] text-[#C6A56B] font-bold uppercase drop-shadow">
                            {item.categoryLabel}
                          </span>
                          <div>
                            <div className="font-heading font-bold text-xs text-white truncate">
                              {item.title}
                            </div>
                            <button
                              type="button"
                              onClick={() => deleteGalleryImage(item.id)}
                              className="mt-1 text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CLIENT INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-lg text-white">
                        Contact Form Messages
                      </h4>
                      <p className="text-xs text-white/60">
                        Inquiries submitted by visitors through the contact section.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-sm text-white">{inq.name}</span>
                            <span className="text-xs text-[#C6A56B]">({inq.phone})</span>
                            <span className="text-xs text-white/40">· {inq.branch}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="px-2 py-1 rounded bg-black/40 border border-white/20 text-xs text-white"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                            </select>

                            <a
                              href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${inq.name}! Thank you for your inquiry regarding Blush & Beard (${inq.branch}). How may we assist you today?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>Reply</span>
                            </a>
                          </div>
                        </div>

                        <p className="text-xs text-white/80 bg-black/20 p-2.5 rounded-lg italic">
                          &ldquo;{inq.message}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SALON DETAILS & BANNER SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl">
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">
                      Salon Brand &amp; Announcement Controls
                    </h4>
                    <p className="text-xs text-white/60">
                      Changes here directly update the header ticker, contact numbers, and brand hero visual.
                    </p>
                  </div>

                  {settingsSaved && (
                    <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Settings saved &amp; synchronized with live website!</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1">Top Announcement Ribbon Ticker</label>
                      <input
                        type="text"
                        value={settingsForm.announcementText}
                        onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1">Primary Salon Phone Number</label>
                        <input
                          type="text"
                          value={settingsForm.primaryPhone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, primaryPhone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-white mb-1">Operating Hours</label>
                        <input
                          type="text"
                          value={settingsForm.operatingHours}
                          onChange={(e) => setSettingsForm({ ...settingsForm, operatingHours: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white mb-1">Hero Visual Image URL</label>
                      <input
                        type="text"
                        value={settingsForm.heroImage}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#C6A56B] text-[#101828] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes to Website</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 6: CLIENT ACCESS KEYS (SUPER ADMIN ONLY) */}
              {activeTab === 'access' && currentUserRole === 'owner' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">
                      Client Key Provisioning &amp; Permissions
                    </h4>
                    <p className="text-xs text-white/60">
                      As the owner (<code className="text-[#C6A56B]">vanshdedhia4@gmail.com</code>), you control client access keys. Provide these keys to the salon owner or front desk staff so they can manage bookings and prices without seeing super-admin keys.
                    </p>
                  </div>

                  {newGeneratedKeyNotice && (
                    <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs">
                      {newGeneratedKeyNotice}
                    </div>
                  )}

                  <form onSubmit={handleCreateClientKey} className="p-4 rounded-xl bg-white/5 border border-white/20 space-y-3">
                    <div className="font-bold text-sm text-[#C6A56B]">Generate New Client Access Passcode</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Staff / Client Name (e.g. Gauripada Desk)"
                        value={clientKeyName}
                        onChange={(e) => setClientKeyName(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white"
                        required
                      />
                      <select
                        value={clientKeyBranch}
                        onChange={(e) => setClientKeyBranch(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-xs text-white"
                      >
                        {branches.map(b => (
                          <option key={b.id} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#C6A56B] text-[#101828] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Generate &amp; Issue Client Key</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-white/70">Active Client Keys:</div>
                    {clientKeys.map((ck) => (
                      <div key={ck.id} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="font-heading font-bold text-xs text-white">{ck.name}</div>
                          <div className="text-[11px] text-white/50">{ck.branch} · Created {ck.createdAt}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <code className="px-2.5 py-1 rounded bg-[#C6A56B]/20 text-[#C6A56B] text-xs font-mono font-bold">
                            {ck.key}
                          </code>
                          <button
                            type="button"
                            onClick={() => deleteClientKey(ck.id)}
                            className="p-1 text-white/40 hover:text-red-400"
                            title="Revoke access key"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
