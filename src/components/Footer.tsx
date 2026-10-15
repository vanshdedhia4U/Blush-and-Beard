import React from 'react';
import { 
  Phone, 
  MapPin, 
  Instagram, 
  ExternalLink, 
  Sparkles
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const { salonInfo, branches } = useSalon();

  return (
    <footer className="bg-[#0B0F17] text-white border-t border-[#C6A56B]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#C6A56B]/40 flex items-center justify-center">
                <span className="font-serif-luxury text-base font-bold text-[#C6A56B]">B&amp;B</span>
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl tracking-tight text-white">
                  BLUSH <span className="text-[#C6A56B]">&amp;</span> BEARD
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C6A56B]/90 font-medium">
                  Atelier · Spa · Academy
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-body">
              Kalyan&apos;s premier unisex salon bringing master barbering precision, bespoke hair artistry, certified skin therapies, and bridal couture together under one luxurious roof.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={salonInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#C6A56B] text-white hover:text-[#101828] transition-colors flex items-center justify-center"
                aria-label="Blush and Beard on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={salonInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#C6A56B] text-white hover:text-[#101828] transition-colors flex items-center justify-center"
                aria-label="Google Maps Business Listing"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs text-white/50 pt-1">
              Instagram: <a href={salonInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#C6A56B] hover:underline font-mono">{salonInfo.instagramHandle}</a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C6A56B]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#about" className="hover:text-[#C6A56B] transition-colors">Story &amp; Philosophy</a></li>
              <li><a href="#services" className="hover:text-[#C6A56B] transition-colors">Treatment Atelier</a></li>
              <li><a href="#transformations" className="hover:text-[#C6A56B] transition-colors">Transformations</a></li>
              <li><a href="#gallery" className="hover:text-[#C6A56B] transition-colors">Portfolio</a></li>
              <li><a href="#reviews" className="hover:text-[#C6A56B] transition-colors">Client Reviews</a></li>
              <li><a href="#locations" className="hover:text-[#C6A56B] transition-colors">Location &amp; Map</a></li>
            </ul>
          </div>

          {/* Signature Treatments */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C6A56B]">
              Signature Treatments
            </div>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#services" className="hover:text-[#C6A56B] transition-colors">Nanoplastia Smoothing</a></li>
              <li><a href="#services" className="hover:text-[#C6A56B] transition-colors">Royal Hot Towel Beard Sculpting</a></li>
              <li><a href="#services" className="hover:text-[#C6A56B] transition-colors">7-Step HydraFacial Glow</a></li>
              <li><a href="#services" className="hover:text-[#C6A56B] transition-colors">French Balayage &amp; Highlights</a></li>
              <li><a href="#services" className="hover:text-[#C6A56B] transition-colors">Olaplex Bond Multiplier</a></li>
              <li><a href="#services" className="hover:text-[#C6A56B] transition-colors">Bridal &amp; Groom Couture</a></li>
            </ul>
          </div>

          {/* Kalyan Location */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C6A56B]">
              Salon Destination
            </div>
            <div className="space-y-2 text-xs text-white/75 font-body">
              <div className="font-semibold text-white">Blush and Beard – Unisex Salon</div>
              <div className="text-[11px] text-white/70">Near Guruatman Circle, Gauripada, Kalyan (West), Maharashtra 421301</div>
              <div className="text-[11px] text-[#C6A56B] font-medium">Daily: 10:00 AM – 9:30 PM</div>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="mt-3 w-full py-2.5 px-3 rounded-lg bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] text-xs font-bold text-center transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} {salonInfo.name}. All rights reserved. Kalyan West, Maharashtra.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href={salonInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C6A56B] transition-colors">
              Google Maps Listing
            </a>
            <span aria-hidden="true">·</span>
            <a href={`tel:${salonInfo.phoneRaw}`} className="hover:text-[#C6A56B] transition-colors">
              Phone: {salonInfo.primaryPhone}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
