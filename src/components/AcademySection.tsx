import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Users, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { ACADEMY_COURSES, SALON_INFO } from '../data/salonData';

interface AcademySectionProps {
  onOpenBooking: () => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ onOpenBooking }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(ACADEMY_COURSES[0].id);

  return (
    <section id="academy" className="py-20 lg:py-28 bg-[#101828] text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-0 w-96 h-96 bg-[#C6A56B]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
              Professional Education
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
              Blush &amp; Beard Hair, Spa &amp; Makeup Academy.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 font-body">
              Empowering the next generation of salon founders, master colorists, and precision barbers. Learn directly in live salon suites under master educators in Kalyan West.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent("Hello! I am interested in enrolling or learning more about Blush & Beard Academy courses.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#C6A56B] hover:bg-[#B89659] text-[#101828] font-heading font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Inquire for Admission</span>
            </a>
          </div>
        </div>

        {/* 3 Academy Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6A56B]/20 flex items-center justify-center text-[#C6A56B]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">80% Live Practical Training</h3>
            <p className="text-xs sm:text-sm text-white/70 font-body">
              Train on real clients with professional L&apos;Oréal, Olaplex, and professional clippers, not just mannequins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6A56B]/20 flex items-center justify-center text-[#C6A56B]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">Recognized Certifications</h3>
            <p className="text-xs sm:text-sm text-white/70 font-body">
              Receive accredited diplomas and certificates recognized by leading salons, spas, and bridal studios across Mumbai.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6A56B]/20 flex items-center justify-center text-[#C6A56B]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white">100% Placement Guidance</h3>
            <p className="text-xs sm:text-sm text-white/70 font-body">
              Alumni placed in premier salons throughout Kalyan, Thane, and Navi Mumbai, with salon startup mentorship.
            </p>
          </div>
        </div>

        {/* Courses Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl p-6 sm:p-8 bg-[#1E293B]/60 border border-white/10 hover:border-[#C6A56B]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#C6A56B] mb-2">
                  <span>{course.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.type}</span>
                </div>
                
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  {course.title}
                </h3>
                
                <div className="text-xs text-white/60 mb-4 font-mono">
                  Level: {course.level}
                </div>

                <p className="text-xs sm:text-sm text-white/75 font-body leading-relaxed mb-6">
                  {course.summary}
                </p>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="text-xs uppercase font-bold text-[#C6A56B]">Curriculum Highlights:</div>
                  {course.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A56B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <a
                  href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(`Hi Blush & Beard Academy! I would like to receive the brochure and syllabus for "${course.title}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#C6A56B] text-white hover:text-[#101828] font-heading font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Syllabus &amp; Fees</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
