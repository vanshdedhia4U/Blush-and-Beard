import React, { useState } from 'react';
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
  onOpenBookingForBranch: (branchName: string) => void;
}

export const BranchLocations: React.FC<BranchLocationsProps> = ({ onOpenBookingForBranch }) => {
  const { branches, salonInfo } = useSalon();
  const [activeBranchId, setActiveBranchId] = useState<string>(branches[0]?.id || 'branch-yogidham');

  const activeBranch = branches.find(b => b.id === activeBranchId) || branches[0];

  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#F8F5EF] text-[#252525] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
            Atelier Network · Kalyan (West)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#101828] tracking-tight">
            Our 3 Kalyan West Studios.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252525]/80 font-body">
            Each studio features a distinct aesthetic specialty — from our flagship training academy at Yogidham to the signature barbershop in Gauripada and the station nail boutique at Rambhag.
          </p>
        </div>

        {/* Studio Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {branches.map((branch, index) => {
            const isSelected = branch.id === activeBranchId;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => setActiveBranchId(branch.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#101828] text-white border-[#C6A56B] shadow-xl ring-2 ring-[#C6A56B]/40'
                    : 'bg-white hover:bg-white/90 text-[#252525] border-[#101828]/10 hover:border-[#C6A56B]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                      isSelected ? 'text-[#C6A56B]' : 'text-[#A98547]'
                    }`}>
                      Studio {index + 1} · {branch.tag}
                    </span>
                    {branch.isFlagship && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C6A56B] text-[#101828]">
                        Flagship
                      </span>
                    )}
                  </div>

                  <h3 className={`font-heading font-bold text-lg sm:text-xl leading-tight ${
                    isSelected ? 'text-white' : 'text-[#101828]'
                  }`}>
                    {branch.name}
                  </h3>

                  <p className={`text-xs mt-2 line-clamp-1 ${
                    isSelected ? 'text-white/70' : 'text-[#252525]/60'
                  }`}>
                    {branch.address}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                  isSelected ? 'border-white/10 text-[#C6A56B]' : 'border-[#101828]/10 text-[#101828]'
                }`}>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{branch.rating} ({branch.reviewCount})</span>
                  </span>
                  <span className="underline text-[11px]">View Studio Dossier →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Studio Full Interactive Dossier */}
        {activeBranch && (
          <div className="rounded-3xl overflow-hidden border border-[#C6A56B]/40 bg-white shadow-2xl transition-all duration-300">
            
            {/* Top Studio Dossier Banner */}
            <div className="bg-[#101828] text-white p-6 sm:p-10 border-b border-[#C6A56B]/30">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#C6A56B] uppercase tracking-wider">
                      {activeBranch.formalName}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      Open Today: {activeBranch.timings}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                    {activeBranch.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/75 font-body max-w-2xl">
                    {activeBranch.address}, {activeBranch.landmark}, {activeBranch.city} - {activeBranch.pincode}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenBookingForBranch(activeBranch.name)}
                    className="px-6 py-3 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] font-heading font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#101828]" />
                    <span>Reserve Chair at this Studio</span>
                  </button>

                  <a
                    href={activeBranch.mapsUrl}
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
                    src={activeBranch.studioImage}
                    alt={activeBranch.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold">{activeBranch.tag}</span>
                    <span className="text-[#C6A56B] font-bold">{activeBranch.rating} Verified Destination</span>
                  </div>
                </div>

                {/* Facilities & Equipment Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#101828]/10 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#101828] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C6A56B]" />
                      <span>Studio Facilities:</span>
                    </div>
                    {activeBranch.facilities.map((fac, idx) => (
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
                    {activeBranch.specialties.map((spec, idx) => (
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
                        <div className="text-[11px] text-[#252525]/70">{activeBranch.nearestStation}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Car className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#101828]">Parking Information</div>
                        <div className="text-[11px] text-[#252525]/70">{activeBranch.parking}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Direct Contact & Live Google Maps Embed for this exact studio */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Direct Studio Contact Cards */}
                <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#101828]/10 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#101828]">
                    Direct Studio Reception
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-1">
                    <a
                      href={`tel:${activeBranch.phone.replace(/[^0-9+]/g, '')}`}
                      className="p-3 rounded-xl bg-white border border-[#101828]/10 hover:border-[#C6A56B] text-xs font-semibold text-[#101828] flex items-center justify-between transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#C6A56B]" />
                        <span>Call Reception: {activeBranch.phone}</span>
                      </div>
                      <span className="text-[10px] text-[#A98547] font-bold uppercase">Ring Now</span>
                    </a>

                    <a
                      href={`https://wa.me/${activeBranch.whatsapp}?text=${encodeURIComponent(`Hello Blush & Beard! I would like to book a chair at ${activeBranch.name}.`)}`}
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
                      <span>{activeBranch.name}</span>
                    </div>
                    <a
                      href={activeBranch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#C6A56B] hover:underline flex items-center gap-1"
                    >
                      <span>Open Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="w-full h-64 bg-[#1E293B] relative">
                    <iframe
                      title={`Google Map for ${activeBranch.name}`}
                      src={`https://maps.google.com/maps?q=${activeBranch.mapEmbedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0 filter contrast-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Hygiene & Booking Assurance */}
                <div className="flex items-center gap-2 text-xs text-[#252525]/70 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>UV Sterilized clippers &amp; shears before every client at this location.</span>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
