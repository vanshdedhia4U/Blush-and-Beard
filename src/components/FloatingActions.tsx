import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone, MessageCircle, Calendar } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Back to Top */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="pointer-events-auto p-3 rounded-full bg-[#101828] text-white hover:text-[#C6A56B] shadow-lg border border-[#C6A56B]/30 hover:border-[#C6A56B] transition-all transform hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C6A56B]"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Direct Float */}
        <a
          href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent("Hello Blush & Beard! I'd like to ask about booking an appointment.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-1 flex items-center justify-center cursor-pointer group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:group-hover:inline ml-2 text-xs font-bold font-heading whitespace-nowrap pr-1">
            Chat on WhatsApp
          </span>
        </a>

        {/* Quick Booking Floating Pill (Mobile Only Bar) */}
        <div className="sm:hidden pointer-events-auto fixed bottom-0 left-0 right-0 bg-[#101828]/95 backdrop-blur-md border-t border-[#C6A56B]/30 p-2.5 px-4 flex items-center justify-between gap-3 z-50">
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="flex-1 py-2.5 px-3 rounded-xl border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={onOpenBooking}
            className="flex-[2] py-2.5 px-4 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] text-xs font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#101828]" />
            <span>Book Appointment</span>
          </button>
        </div>

      </div>
    </>
  );
};
