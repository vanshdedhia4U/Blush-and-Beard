import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  Clock, 
  Star, 
  MessageCircle, 
  ChevronRight,
  Lock,
  Sparkles
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin, activeSection }) => {
  const { salonInfo, isAdminLoggedIn, currentUserRole } = useSalon();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#about' },
    { name: 'Treatment Atelier', href: '#services' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Ateliers & Map', href: '#locations' },
    { name: 'Portfolio', href: '#gallery' },
    { name: 'Academy', href: '#academy' },
    { name: 'Journal', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro-ticker announcement bar */}
      <div className="bg-[#0B0F17] border-b border-[#C6A56B]/20 text-[#F8F5EF] text-xs py-2 px-4 transition-all z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#C6A56B] font-medium tracking-wide">
              <Star className="w-3.5 h-3.5 fill-[#C6A56B]" />
              <span>4.9★ (590+ Google Reviews)</span>
            </span>
            <span className="hidden md:inline text-white/30" aria-hidden="true">|</span>
            <span className="hidden md:inline text-white/80 font-body">
              {salonInfo.announcementText || "Kalyan West Ateliers · Yogidham · Gauripada · Rambhag"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-white/60 hover:text-[#C6A56B] transition-colors cursor-pointer py-0.5 px-2 rounded hover:bg-white/5 border border-transparent hover:border-[#C6A56B]/30"
              title="Admin and Client Management Portal"
            >
              <Lock className="w-3 h-3 text-[#C6A56B]" />
              <span className="font-mono text-[11px]">
                {isAdminLoggedIn ? (currentUserRole === 'owner' ? 'Admin: Vansh' : 'Client Desk') : 'Portal Login'}
              </span>
            </button>

            <a 
              href={`https://wa.me/${salonInfo.whatsappRaw}?text=${encodeURIComponent("Hello Blush & Beard! I'd like to inquire about booking an appointment.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#C6A56B] hover:text-[#DFBE82] transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: +91 81080 19891</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header 
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#101828]/95 backdrop-blur-md shadow-xl shadow-black/30 border-b border-[#C6A56B]/20 py-3' 
            : 'bg-[#101828] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Editorial Typography */}
            <a 
              href="#top" 
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0B0F17] border border-[#C6A56B]/50 flex items-center justify-center shadow-lg group-hover:border-[#C6A56B] transition-colors">
                <span className="font-serif-luxury text-base font-bold text-[#C6A56B] tracking-wider">
                  B&amp;B
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#F8F5EF] transition-colors">
                  BLUSH <span className="text-[#C6A56B] font-serif-luxury italic">&amp;</span> BEARD
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C6A56B]/90 font-medium">
                  Atelier · Spa · Academy
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#C6A56B] relative py-1 focus:outline-none ${
                    activeSection === link.href.substring(1)
                      ? 'text-[#C6A56B]'
                      : 'text-white/75'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A56B] rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${salonInfo.phoneRaw}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/90 hover:text-white border border-white/20 hover:border-[#C6A56B]/60 transition-all"
                title="Call salon directly"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>81080 19891</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] text-xs font-bold shadow-md shadow-[#C6A56B]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#101828]" />
                <span>Reserve Chair</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-3 py-1.5 rounded-lg bg-[#C6A56B] text-[#101828] text-xs font-bold sm:hidden"
              >
                Book
              </button>
              
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#C6A56B]" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#101828] border-b border-[#C6A56B]/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:text-[#C6A56B]"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C6A56B] text-[#101828] text-sm font-bold shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment Slot</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-white/20 text-white text-xs font-medium"
              >
                <Lock className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Atelier Portal / Admin</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
