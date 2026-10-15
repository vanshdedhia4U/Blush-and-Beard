import React from 'react';
import { Star, Award, Sparkles, MapPin, CheckCircle2, HeartHandshake } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const TrustHighlights: React.FC = () => {
  const stats = [
    {
      value: "4.9★",
      label: "Customer Rating",
      subtext: "Across 590+ verified Google & Justdial reviews"
    },
    {
      value: "18,000+",
      label: "Clients Styled",
      subtext: "Serving Kalyan West since June 2022"
    },
    {
      value: "Gauripada",
      label: "Kalyan (West)",
      subtext: "Near Guruatman Circle & Godrej Hill"
    },
    {
      value: "100%",
      label: "Genuine Formulations",
      subtext: "Sealed Olaplex, L'Oréal & Schwarzkopf"
    }
  ];

  return (
    <section className="bg-[#F8F5EF] py-12 border-b border-[#C6A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-[#101828]/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col text-left">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#101828] tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-[#101828] mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#252525]/70 mt-0.5 font-body leading-normal">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>

        {/* Global Brand Formulations Partner Row */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-xs uppercase tracking-widest text-[#252525]/60 font-semibold">
              Certified Global Formulations &amp; Tools Used
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-semibold text-[#101828]/80">
              {SALON_INFO.brands.map((brand, i) => (
                <div key={i} className="flex items-center gap-1.5 transition-colors hover:text-[#C6A56B]">
                  <span className="text-xs text-[#C6A56B] font-mono">✦</span>
                  <span>{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
