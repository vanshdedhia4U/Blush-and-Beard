import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Calendar, 
  MapPin, 
  Scissors, 
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { salonInfo } = useSalon();
  const [focusMode, setFocusMode] = useState<'gentlemen' | 'women'>('women');

  const focusData = {
    women: {
      tag: "Haute Coiffure & Glow Rituals",
      headlineLead: "Radiance Defined.",
      headlineSub: "Organic Smoothing & Hair Chemistry.",
      description: "From biological Nanoplastia mirror treatments and hand-painted French Balayage to medical-grade HydraFacials. Experience South Mumbai salon luxury right in Kalyan West.",
      image: salonInfo.heroImage || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
      quickServiceId: "srv-nanoplastia",
      quickServiceName: "Nanoplastia Organic Smoothing",
      badgeText: "Formaldehyde-Free Botanical Keratin"
    },
    gentlemen: {
      tag: "British Barbering & Facial Architecture",
      headlineLead: "Precision Sculpted.",
      headlineSub: "Straight-Razor Fades & Beard Craft.",
      description: "Hot eucalyptus steam towels, Japanese steel razors, custom anatomical jawline contouring, and stress-melting acupressure scalp therapies.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85",
      quickServiceId: "srv-beard-sculpt",
      quickServiceName: "Royal Beard Sculpting & Taper",
      badgeText: "Single-Blade Hot Steam Ritual"
    }
  };

  const currentFocus = focusData[focusMode];

  return (
    <section id="top" className="relative min-h-[92vh] flex flex-col justify-between bg-[#0B0F17] text-white overflow-hidden pt-8 pb-12">
      {/* Subtle luxury ambient backdrops */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#C6A56B]/10 rounded-full blur-[160px] pointer-events-none"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#899681]/10 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Main Architectural Split Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        
        {/* Top Lookbook Focus Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/50 font-bold mr-2">
              Select Lookbook Focus:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/15">
              <button
                type="button"
                onClick={() => setFocusMode('women')}
                className={`px-4 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                  focusMode === 'women'
                    ? 'bg-[#C6A56B] text-[#101828] shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Women&apos;s Couture &amp; Hair Spa
              </button>
              <button
                type="button"
                onClick={() => setFocusMode('gentlemen')}
                className={`px-4 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                  focusMode === 'gentlemen'
                    ? 'bg-[#C6A56B] text-[#101828] shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Gentlemen&apos;s Barbering
              </button>
            </div>
          </div>

          {/* Google Maps Verified Status */}
          <div className="flex items-center gap-3 text-xs">
            <a 
              href={salonInfo.mapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/80 hover:text-[#C6A56B] transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-[#C6A56B] text-[#C6A56B]" />
              <span className="font-bold text-white">4.9 / 5.0</span>
              <span className="text-white/50">(590+ Google Reviews)</span>
            </a>
            <span className="text-white/30" aria-hidden="true">·</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Chairs Open in Kalyan</span>
            </span>
          </div>
        </div>

        {/* 2-Column Haute Atelier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Typographic Statement & Direct Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block text-xs uppercase tracking-[0.3em] text-[#C6A56B] font-bold">
              ✦ {currentFocus.tag}
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08]">
              {currentFocus.headlineLead}{' '}
              <span className="font-serif-luxury italic font-normal text-gold-gradient block sm:inline">
                {currentFocus.headlineSub}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-2xl font-body leading-relaxed">
              {currentFocus.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={() => onOpenBooking(currentFocus.quickServiceId)}
                className="group px-7 py-3.5 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] font-heading font-extrabold text-sm sm:text-base shadow-lg shadow-[#C6A56B]/25 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#101828]" />
                <span>Reserve Chair Online</span>
                <ArrowRight className="w-4 h-4 text-[#101828] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-heading font-medium text-sm sm:text-base border border-white/20 hover:border-[#C6A56B] transition-all"
              >
                <span>View Atelier Menu</span>
              </a>

              <a
                href={salonInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl text-white/70 hover:text-[#C6A56B] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                title="Open Google Maps listing"
              >
                <Navigation className="w-4 h-4 text-[#C6A56B]" />
                <span>Directions to Salon</span>
              </a>
            </div>

            {/* Live operational badge bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-wider">Prime Location</div>
                <div className="font-bold text-white mt-0.5">Near Guruatman Circle, Gauripada</div>
              </div>
              <div>
                <div className="text-white/50 text-[11px] uppercase tracking-wider">Sterilization</div>
                <div className="font-bold text-white mt-0.5">Hospital-Grade UV Sterilized</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-white/50 text-[11px] uppercase tracking-wider">Certified Formulations</div>
                <div className="font-bold text-[#C6A56B] mt-0.5">Olaplex &amp; L&apos;Oréal Certified</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fashion Architectural Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#C6A56B]/40 shadow-2xl bg-[#1E293B]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={focusMode}
                  src={currentFocus.image}
                  alt={currentFocus.headlineLead}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-[460px] sm:h-[520px] object-cover"
                />
              </AnimatePresence>

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />

              {/* Bottom Overlaid Action Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0F17]/90 backdrop-blur-md border border-white/15 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#C6A56B] font-bold">
                      {currentFocus.badgeText}
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {currentFocus.quickServiceName}
                    </div>
                    <div className="text-[11px] text-white/60 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#C6A56B]" />
                      <span>Near Guruatman Circle · Open daily</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(currentFocus.quickServiceId)}
                    className="px-3.5 py-2 rounded-lg bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>

              {/* Top floating badge */}
              <div className="absolute top-4 right-4 bg-[#0B0F17]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#C6A56B]/30 text-[11px] text-[#C6A56B] font-mono font-bold">
                590+ Reviews
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Horizontal High-Fashion Ticker Strip */}
      <div className="mt-8 border-t border-b border-white/10 bg-[#0B0F17] py-2.5 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee text-[11px] uppercase tracking-[0.25em] text-[#C6A56B]/90 font-bold space-x-8">
          <span>✦ BLUSH &amp; BEARD UNISEX SALON ✦ GAURIPADA KALYAN WEST ✦ 4.9★ RATED (590+ REVIEWS) ✦ OLAPLEX USA &amp; L&apos;ORÉAL PARIS ✦ MASTER BARBERSHOP ✦ NANOPLASTIA ARTISTRY ✦ HYDRAFACIAL RITUALS ✦ WALK-INS &amp; APPOINTMENTS OPEN DAILY ✦</span>
          <span>✦ BLUSH &amp; BEARD UNISEX SALON ✦ GAURIPADA KALYAN WEST ✦ 4.9★ RATED (590+ REVIEWS) ✦ OLAPLEX USA &amp; L&apos;ORÉAL PARIS ✦ MASTER BARBERSHOP ✦ NANOPLASTIA ARTISTRY ✦ HYDRAFACIAL RITUALS ✦ WALK-INS &amp; APPOINTMENTS OPEN DAILY ✦</span>
        </div>
      </div>
    </section>
  );
};
