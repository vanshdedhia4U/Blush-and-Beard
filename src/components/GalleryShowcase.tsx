import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const GalleryShowcase: React.FC = () => {
  const { galleryItems, salonInfo } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'beard', label: 'Beard & Men' },
    { id: 'hair', label: 'Hair Artistry' },
    { id: 'skin', label: 'Skin Glow' },
    { id: 'bridal', label: 'Bridal Couture' },
    { id: 'ambience', label: 'Salon Ambience' },
  ];

  const filteredItems = galleryItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#252525] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
              Verified Salon Imagery &amp; Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#101828] tracking-tight">
              Atmosphere &amp; Client Artistry.
            </h2>
            <p className="mt-3 text-base text-[#252525]/80 font-body">
              Photographs from our verified Google Maps listing and atelier floors across Yogidham, Gauripada, and Rambhag.
            </p>
          </div>

          <a
            href={salonInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#A98547] hover:text-[#101828] flex items-center gap-1.5 transition-colors self-start md:self-end"
          >
            <span>View More Photos on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Controls (Segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#F8F5EF] rounded-xl border border-[#101828]/10 max-w-2xl mb-10 overflow-x-auto scrollbar-none shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#101828] text-white shadow-sm'
                  : 'text-[#252525]/70 hover:text-[#101828] hover:bg-black/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#1E293B] aspect-[4/3] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-[#101828]/10 hover:border-[#C6A56B]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/90 via-[#101828]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-[#C6A56B] tracking-wider uppercase drop-shadow">
                    {item.categoryLabel}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/75 mt-1 font-body line-clamp-2">
                    {item.caption}
                  </p>
                  {item.source && (
                    <div className="text-[10px] text-[#C6A56B] mt-1 font-mono">
                      Source: {item.source}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#0B0F17]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col bg-[#101828]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[activeLightboxIndex]?.image}
              alt={filteredItems[activeLightboxIndex]?.title}
              className="max-h-[70vh] w-auto object-contain mx-auto"
            />
            <div className="p-4 sm:p-6 bg-[#101828] text-white border-t border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#C6A56B] font-semibold">
                    {filteredItems[activeLightboxIndex]?.categoryLabel}
                  </div>
                  <div className="text-base sm:text-lg font-bold font-heading">
                    {filteredItems[activeLightboxIndex]?.title}
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">
                    {filteredItems[activeLightboxIndex]?.caption}
                  </div>
                </div>
                <div className="text-xs text-white/40 font-mono">
                  {activeLightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
