import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/salonData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FFFFFF] text-[#252525]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
            Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#101828] tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="mt-3 text-base text-[#252525]/75 font-body">
            Everything you need to know before visiting Blush &amp; Beard in Kalyan West.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-[#101828]/10 overflow-hidden transition-all bg-[#F8F5EF]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#F8F5EF]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-[#101828]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C6A56B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#252525]/80 font-body leading-relaxed border-t border-[#101828]/5 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
