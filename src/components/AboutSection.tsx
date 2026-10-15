import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      title: "Uncompromising Barbering Heritage",
      desc: "For gentlemen, we treat beard trimming and hair styling as an art form — employing hot steam towels, Japanese steel razors, and facial contour mapping."
    },
    {
      title: "High-Fashion Hair & Color Chemistry",
      desc: "For ladies, our colorists and hair doctors utilize genuine Olaplex bond rebuilding, Nanoplastia smoothing, and French Balayage tailored to Indian textures."
    },
    {
      title: "Hospital-Grade Hygiene Standards",
      desc: "All metal clippers, shears, and cuticle pushers undergo medical-grade UV and chemical sterilization before each client. Single-use disposable capes guaranteed."
    },
    {
      title: "Master Stylist Consultation",
      desc: "Every appointment begins with a personalized face-mapping, scalp assessment, and hair health consultation to recommend exact bespoke treatments."
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#252525] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
            Our Story &amp; Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#101828] tracking-tight leading-tight">
            Redefining Salon Culture in Kalyan West.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252525]/80 font-body leading-relaxed">
            Founded in 2022, <strong className="text-[#101828] font-semibold">Blush &amp; Beard</strong> was created with a singular mission: to eliminate the compromise between casual neighborhood salons and overpriced metropolitan parlors.
          </p>
        </div>

        {/* Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column (Asymmetric Collage) */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4">
              
              {/* Primary Image */}
              <div className="col-span-8 rounded-2xl overflow-hidden shadow-xl border border-[#C6A56B]/30 relative aspect-[4/5] bg-[#1E293B]">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
                  alt="Precision beard styling and men's grooming at Blush and Beard"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101828]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C6A56B]">
                    Gentlemen&apos;s Lounge
                  </div>
                  <div className="text-sm font-bold">
                    Signature Hot Towel Grooming
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Image */}
              <div className="col-span-4 flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#C6A56B]/20 aspect-square bg-[#1E293B]">
                  <img
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80"
                    alt="Women's bespoke hair styling at Blush and Beard"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#C6A56B]/20 aspect-square bg-[#1E293B]">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
                    alt="HydraFacial skin treatment at Blush and Beard"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -left-2 sm:left-6 bg-[#101828] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#C6A56B]/40 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6A56B]/20 flex items-center justify-center text-[#C6A56B] shrink-0 font-bold font-serif-luxury text-lg">
                  B
                </div>
                <div>
                  <div className="text-xs text-[#C6A56B] font-bold uppercase tracking-wider">
                    Verified Google Maps Salon
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Near Guruatman Circle, Gauripada
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Text and Pillars Column */}
          <div className="lg:col-span-6 space-y-8 pt-6 lg:pt-0">
            <div className="space-y-4 text-[#252525]/85 text-base sm:text-lg leading-relaxed font-body">
              <p>
                Whether you step in for an express beard taper during a hectic weekday or spend a Saturday afternoon enjoying our complete Nanoplastia hair overhaul and HydraFacial session, we craft an atmosphere of relaxed opulence.
              </p>
              <p className="text-base text-[#252525]/75">
                Every member of our team is thoroughly certified in hair geometry, scalp health, color chemistry, and safety protocols. We listen to your hair goals, examine your skin undertone, and customize each cut and treatment specifically for you.
              </p>
            </div>

            {/* 4 Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pillar, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C6A56B]" />
                    <h3 className="font-heading font-bold text-sm text-[#101828]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#252525]/70 leading-relaxed font-body pl-4">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl bg-[#101828] hover:bg-[#1E293B] text-white font-heading font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
              </button>

              <a
                href={SALON_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-[#101828]/20 hover:border-[#C6A56B] text-[#101828] font-heading font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#C6A56B]" />
                <span>Visit Us in Kalyan West</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
