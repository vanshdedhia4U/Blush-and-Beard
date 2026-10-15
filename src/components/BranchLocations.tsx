import React from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Train, 
  Car, 
  Star, 
  Scissors, 
  Calendar,
  MessageCircle,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface BranchLocationsProps {
  onOpenBookingForBranch?: () => void;
}

export const BranchLocations: React.FC<BranchLocationsProps> = ({ onOpenBookingForBranch }) => {
  const { salonLocation, salonInfo } = useSalon();

  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#F8F5EF] text-[#252525] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
            Visit Our Salon · Kalyan (West)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#101828] tracking-tight">
            Our Gauripada Atelier.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252525]/80 font-body">
            Conveniently situated near Guruatman Circle and Godrej Hill Junction in Kalyan West, bringing world-class barbering, advanced haircare, and clinical facials to you.
          </p>
        </div>

        {/* Studio Full Detailed Showcase */}
        <div className="rounded-3xl overflow-hidden border border-[#C6A56B]/40 bg-white shadow-2xl transition-all duration-300">
          
          {/* Top Studio Dossier Banner */}
          <div className="bg-[#101828] text-white p-6 sm:p-10 border-b border-[#C6A56B]/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#C6A56B] uppercase tracking-wider">
                    {salonLocation.formalName}
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Open Today: {salonLocation.timings}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                  {salonLocation.name}
                </h3>

                <p className="text-xs sm:text-sm text-white/75 font-body max-w-2xl">
                  {salonLocation.address}, {salonLocation.landmark}, {salonLocation.city} - {salonLocation.pincode}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenBookingForBranch ? onOpenBookingForBranch() : null}
                  className="px-6 py-3 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] font-heading font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#101828]" />
                  <span>Reserve Your Chair</span>
                </button>

                <a
                  href={salonLocation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl border border-white/20 hover:border-white text-white font-heading font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#C6A56B]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Studio Deep-Dive Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Visual & Facilities List */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Studio Photograph */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#1E293B] border border-[#101828]/10 shadow-md">
                <img
                  src={salonLocation.studioImage}
                  alt={salonLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold">{salonLocation.tag}</span>
                  <span className="text-[#C6A56B] font-bold">{salonLocation.rating} Verified on Google Maps</span>
                </div>
              </div>

              {/* Facilities & Equipment Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#101828]/10 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#101828] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>Studio Facilities:</span>
                  </div>
                  {salonLocation.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#252525]/80">
                      <Check className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#101828]/10 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#101828] flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>Signature Specialties:</span>
                  </div>
                  {salonLocation.specialties.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#252525]/80">
                      <Check className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transport, Auto & Parking Guide */}
              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#101828]/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                  Commute, Parking &amp; Access Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#252525]/80">
                  <div className="flex items-start gap-2">
                    <Train className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#101828]">Nearest Railway Station</div>
                      <div className="text-[11px] text-[#252525]/70">{salonLocation.nearestStation}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#101828]">Parking Information</div>
                      <div className="text-[11px] text-[#252525]/70">{salonLocation.parking}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Direct Contact & Live Google Maps Embed for this verified studio */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Studio Contact Cards */}
              <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#101828]/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                  Direct Studio Reception
                </div>
                
                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={`tel:${salonLocation.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-3 rounded-xl bg-white border border-[#101828]/10 hover:border-[#C6A56B] text-xs font-semibold text-[#101828] flex items-center justify-between transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#C6A56B]" />
                      <span>Call Reception: {salonLocation.phone}</span>
                    </div>
                    <span className="text-[10px] text-[#A98547] font-bold uppercase">Ring Now</span>
                  </a>

                  <a
                    href={`https://wa.me/${salonLocation.whatsapp}?text=${encodeURIComponent(`Hello Blush & Beard! I would like to book a chair at ${salonLocation.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white border border-emerald-500/20 hover:border-emerald-500 text-xs font-semibold text-emerald-800 flex items-center justify-between transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Studio Desk</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">Instant Chat</span>
                  </a>
                </div>
              </div>

              {/* Studio Interactive Google Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-[#101828]/15 shadow-lg bg-[#101828]">
                <div className="p-3 bg-[#101828] text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>{salonLocation.name}</span>
                  </div>
                  <a
                    href={salonLocation.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#C6A56B] hover:underline flex items-center gap-1"
                  >
                    <span>Open Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="w-full h-72 bg-[#1E293B] relative">
                  <iframe
                    title="Google Map for Blush and Beard Unisex Salon Gauripada"
                    src={`https://maps.google.com/maps?q=${salonLocation.mapEmbedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 filter contrast-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Hygiene & Booking Assurance */}
              <div className="flex items-center gap-2 text-xs text-[#252525]/70 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hospital-grade UV sterilized clippers &amp; shears before every client.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
