import React, { useState } from 'react';
import { Clock, Check, Sparkles, Search, ArrowRight, Calendar } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface ServicesMenuProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectServiceForBooking }) => {
  const { services } = useSalon();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'women' | 'men' | 'unisex'>('all');

  const categories = [
    { id: 'all', num: '00', label: 'All Services', note: 'Complete Atelier Portfolio' },
    { id: 'hair', num: '01', label: 'Hair Artistry & Chemistry', note: 'Nanoplastia, Balayage, Olaplex' },
    { id: 'beard', num: '02', label: 'Beard & Master Barbershop', note: 'Fades, Hot Towel, Razor Carving' },
    { id: 'skin', num: '03', label: 'Clinical Facials & Glow', note: 'HydraFacial, O3+ Oxygen D-Tan' },
    { id: 'nails', num: '04', label: 'Hands, Feet & Nail Art', note: 'Russian Manicure, Gel Extensions' },
    { id: 'bridal', num: '05', label: 'Bridal & Groom Couture', note: 'HD Airbrush Makeup, Draping' },
    { id: 'spa', num: '06', label: 'Spa Sanctuary & Therapy', note: 'Aromatherapy, Scalp Massages' },
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesGender = genderFilter === 'all' || service.gender === 'unisex' || service.gender === genderFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesGender && matchesSearch;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#252525] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6 pb-8 border-b border-[#101828]/10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-2">
              The Atelier Catalog
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#101828] tracking-tight">
              Bespoke Hair &amp; Body Rituals.
            </h2>
            <p className="mt-3 text-base text-[#252525]/75 font-body">
              Crafted with authentic L&apos;Oréal, Olaplex, and Schwarzkopf formulations. Every service includes an in-depth scalp and texture consultation.
            </p>
          </div>

          {/* Search & Gender Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#252525]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F5EF] border border-[#101828]/10 focus:border-[#C6A56B] outline-none text-xs sm:text-sm"
              />
            </div>

            {/* Gender filter buttons */}
            <div className="flex items-center p-1 bg-[#F8F5EF] rounded-xl border border-[#101828]/10">
              <button
                type="button"
                onClick={() => setGenderFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  genderFilter === 'all' ? 'bg-[#101828] text-white shadow-sm' : 'text-[#252525]/60 hover:text-[#101828]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setGenderFilter('women')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  genderFilter === 'women' ? 'bg-[#101828] text-white shadow-sm' : 'text-[#252525]/60 hover:text-[#101828]'
                }`}
              >
                Women
              </button>
              <button
                type="button"
                onClick={() => setGenderFilter('men')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  genderFilter === 'men' ? 'bg-[#101828] text-white shadow-sm' : 'text-[#252525]/60 hover:text-[#101828]'
                }`}
              >
                Men
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE CATEGORY SELECTOR (Clean horizontal scroll, preventing any vertical overlap glitch) */}
        <div className="lg:hidden mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? services.length 
                : services.filter(s => s.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-[#101828] text-white shadow-md'
                      : 'bg-[#F8F5EF] text-[#252525]/80 hover:bg-[#101828]/10 border border-[#101828]/10'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isSelected ? 'text-[#C6A56B]' : 'text-[#252525]/40'}`}>
                    {cat.num}
                  </span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/10 text-[#C6A56B]' : 'bg-black/5 text-[#252525]/50'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Haute Atelier Editorial Layout: Vertical Index strictly on Desktop (lg:block) + Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Numbered Category Index (DESKTOP ONLY, safe lg:sticky without bleed-through) */}
          <div className="hidden lg:block lg:col-span-4 space-y-2 lg:sticky lg:top-28 z-20">
            <div className="text-xs font-bold uppercase tracking-widest text-[#252525]/40 mb-3 px-2">
              Browse By Atelier Wing:
            </div>

            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = cat.id === 'all' 
                ? services.length 
                : services.filter(s => s.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#101828] text-white shadow-lg shadow-black/10'
                      : 'hover:bg-[#F8F5EF] text-[#252525] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#C6A56B]' : 'text-[#252525]/40'}`}>
                      {cat.num}
                    </span>
                    <div>
                      <div className="font-heading font-bold text-sm tracking-tight leading-tight">
                        {cat.label}
                      </div>
                      <div className={`text-[11px] ${isSelected ? 'text-white/60' : 'text-[#252525]/50'}`}>
                        {cat.note}
                      </div>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-white/10 text-[#C6A56B]' : 'bg-[#101828]/5 text-[#252525]/50'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Atelier Consultation Notice */}
            <div className="mt-6 p-4 rounded-xl bg-[#F8F5EF] border border-[#C6A56B]/30 text-xs text-[#252525]/80 space-y-2">
              <div className="font-bold text-[#101828] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Complimentary Hair &amp; Scalp Check</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Not sure whether your hair needs Keratin, Nanoplastia, or Botox? Walk into any of our 3 Kalyan West locations for a free microscopic scalp assessment.
              </p>
            </div>
          </div>

          {/* Right Column: Treatment Cards Grid (Solid bg-white, preventing any visual glitch) */}
          <div className="lg:col-span-8 relative z-10">
            {filteredServices.length === 0 ? (
              <div className="text-center py-16 bg-[#F8F5EF] rounded-2xl border border-dashed border-[#101828]/20 p-8">
                <p className="text-base font-semibold text-[#101828]">No treatments found matching your filters</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); setGenderFilter('all'); }}
                  className="mt-4 px-4 py-2 bg-[#101828] text-white text-xs font-bold rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="group rounded-2xl overflow-hidden border border-[#101828]/15 hover:border-[#C6A56B] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative z-10"
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative h-44 overflow-hidden bg-[#1E293B]">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3 text-white text-xs font-bold drop-shadow">
                          {service.categoryLabel} · <span className="capitalize">{service.gender}</span>
                        </div>

                        <div className="absolute bottom-3 right-3 bg-[#101828] px-3 py-1 rounded-lg text-white font-heading font-extrabold text-sm border border-[#C6A56B]/40">
                          <span className="text-[10px] text-[#C6A56B] font-normal mr-1">from</span>
                          {service.price}
                        </div>

                        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1 drop-shadow">
                          <Clock className="w-3.5 h-3.5 text-[#C6A56B]" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      {/* Content (Solid white background) */}
                      <div className="p-5 space-y-3 bg-white">
                        <h3 className="font-heading font-bold text-lg text-[#101828] group-hover:text-[#A98547] transition-colors leading-tight">
                          {service.name}
                        </h3>

                        <p className="text-xs text-[#252525]/75 font-body leading-relaxed">
                          {service.description}
                        </p>

                        <div className="pt-2 border-t border-[#101828]/10 space-y-1.5">
                          {service.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-[#252525]/85">
                              <Check className="w-3.5 h-3.5 text-[#C6A56B] shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer booking action */}
                    <div className="p-5 pt-0 bg-white">
                      <button
                        type="button"
                        onClick={() => onSelectServiceForBooking(service.id)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#101828] hover:bg-[#1E293B] text-white hover:text-[#C6A56B] font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C6A56B]" />
                        <span>Reserve This Treatment</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
