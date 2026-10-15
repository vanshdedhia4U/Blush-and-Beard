import React, { useState } from 'react';
import { Sparkles, Scissors, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const TransformationStudio: React.FC<{ onOpenBooking: (serviceId?: string) => void }> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'hair' | 'beard' | 'skin'>('hair');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const presets = {
    hair: {
      title: "Nanoplastia Organic Smoothing & Balayage",
      subtitle: "From stubborn frizzy, heat-stressed waves to silk mirror-gloss reflection",
      serviceId: "srv-nanoplastia",
      beforeImg: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
      afterImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      beforeLabel: "Before: Porous & Frizz-Prone",
      afterLabel: "After: 6-Month Mirror Gloss",
      details: ["100% Formaldehyde-Free", "Amino-Acid Botanical Infusion", "Zero morning blowout hassle"]
    },
    beard: {
      title: "Royal Beard Architecture & Skin Fade",
      subtitle: "From uneven cheek growth to precision straight-razor anatomical contouring",
      serviceId: "srv-beard-sculpt",
      beforeImg: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80",
      afterImg: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80",
      beforeLabel: "Before: Unshaped & Rough",
      afterLabel: "After: Razor Sharp Taper",
      details: ["Hot Towel Eucalyptus Steam", "Single-Blade Neck Alignment", "Organic Argan Butter Seal"]
    },
    skin: {
      title: "7-Step HydraFacial & Deep Oxygen Infusion",
      subtitle: "From clogged pollution pores to high-definition red-carpet luminous glow",
      serviceId: "srv-hydrafacial",
      beforeImg: "https://images.unsplash.com/photo-1512290900672-1f02e6a39396?auto=format&fit=crop&w=1000&q=80",
      afterImg: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      beforeLabel: "Before: Sun-Tanned & Fatigued",
      afterLabel: "After: Dewy Camera-Ready Glow",
      details: ["Vortex Deep Suction Extraction", "Hyaluronic Acid Plump", "Cryo Cold Hammer Pore Seal"]
    }
  };

  const current = presets[activeTab];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#101828] text-white relative overflow-hidden border-t border-b border-[#C6A56B]/20">
      {/* Decorative ambient glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#C6A56B]/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
            Real Transformations · Interactive Viewer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
            See the Difference Precision Craft Makes.
          </h2>
          <p className="mt-3 text-base text-white/75 font-body">
            Drag the divider slider horizontally to witness actual hair smoothing, beard architecture, and skin rejuvenation results.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => { setActiveTab('hair'); setSliderPos(50); }}
            className={`px-5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hair'
                ? 'bg-[#C6A56B] text-[#101828] shadow-lg shadow-[#C6A56B]/20'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            Nanoplastia Hair Smoothing
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('beard'); setSliderPos(50); }}
            className={`px-5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'beard'
                ? 'bg-[#C6A56B] text-[#101828] shadow-lg shadow-[#C6A56B]/20'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            Royal Beard Sculpting
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('skin'); setSliderPos(50); }}
            className={`px-5 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'skin'
                ? 'bg-[#C6A56B] text-[#101828] shadow-lg shadow-[#C6A56B]/20'
                : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            HydraFacial Glow
          </button>
        </div>

        {/* Main Interactive Slider Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Split Canvas */}
          <div className="lg:col-span-8">
            <div 
              className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#C6A56B]/30 select-none shadow-2xl bg-[#0B111E] cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After image (Base layer) */}
              <img
                src={current.afterImg}
                alt={current.afterLabel}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute bottom-4 right-4 bg-[#101828]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#C6A56B] border border-[#C6A56B]/30 shadow-md">
                {current.afterLabel}
              </div>

              {/* Before image (Clipped overlay layer) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={current.beforeImg}
                  alt={current.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: '100%', minWidth: '100%' }}
                  draggable={false}
                />
                <div className="absolute bottom-4 left-4 bg-[#101828]/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-bold text-white border border-white/20 shadow-md">
                  {current.beforeLabel}
                </div>
              </div>

              {/* Divider line & handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#C6A56B] shadow-[0_0_15px_rgba(198,165,107,0.8)] flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-[#101828] border-2 border-[#C6A56B] text-[#C6A56B] flex items-center justify-center shadow-xl text-[10px] font-bold">
                  ↔
                </div>
              </div>

              {/* Instruction pill */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#101828]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white/70 border border-white/10 pointer-events-none">
                Drag slider to compare Before &amp; After
              </div>
            </div>
          </div>

          {/* Details & CTA Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#C6A56B] mb-1">
                Featured Ritual
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                {current.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/75 font-body leading-relaxed">
                {current.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-bold uppercase text-white/90">Clinical &amp; Aesthetic Highlights:</div>
              {current.details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                  <Check className="w-3.5 h-3.5 text-[#C6A56B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking(current.serviceId)}
                className="w-full py-3.5 px-6 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] font-heading font-bold text-xs sm:text-sm shadow-lg shadow-[#C6A56B]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Scissors className="w-4 h-4 text-[#101828]" />
                <span>Book This Transformation</span>
                <ArrowRight className="w-4 h-4 text-[#101828]" />
              </button>
            </div>

            <div className="text-center text-[11px] text-white/50">
              Performed exclusively by senior artists at our Kalyan West salons.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
