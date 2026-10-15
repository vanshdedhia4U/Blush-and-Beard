import React from 'react';
import { Star, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import { TESTIMONIALS, SALON_INFO } from '../data/salonData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#252525] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#101828] tracking-tight">
              Trusted by Kalyan&apos;s Discerning Patrons.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#252525]/80 font-body">
              Verified Google Maps reviews from clients visiting our Gauripada salon in Kalyan West.
            </p>
          </div>

          {/* Google Maps Review Summary Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F5EF] border border-[#101828]/10 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#101828]/10">
              <span className="text-2xl font-black text-[#101828] font-heading">4.9</span>
              <div className="flex text-[#C6A56B] mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#C6A56B]" />
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#101828] uppercase tracking-wider">
                Google Maps Verified
              </div>
              <div className="text-xs text-[#252525]/70">
                590+ Cumulative Reviews
              </div>
              <a
                href={SALON_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-xs text-[#A98547] hover:text-[#101828] font-bold flex items-center gap-1 transition-colors"
              >
                <span>Read all on Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#F8F5EF]/70 border border-[#101828]/10 hover:border-[#C6A56B]/60 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Top row: stars + verified source */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C6A56B]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C6A56B]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-medium text-[#252525]/60 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{t.verifiedSource}</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#252525]/90 font-body leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-[#101828]/10 flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-sm text-[#101828]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#252525]/60">
                    {t.location}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-[#A98547]">
                    {t.service}
                  </div>
                  <div className="text-[10px] text-[#252525]/50">
                    {t.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Review Callout */}
        <div className="mt-12 text-center">
          <a
            href={SALON_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#101828] hover:text-[#C6A56B] transition-colors"
          >
            <span>Have you visited Blush &amp; Beard? Leave a review on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C6A56B]" />
          </a>
        </div>

      </div>
    </section>
  );
};
