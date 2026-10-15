import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Navigation,
  Sparkles
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

export const ContactSection: React.FC = () => {
  const { salonInfo, branches, addInquiry } = useSalon();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: salonInfo.formalName,
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      setStatus('error');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      // Add inquiry to shared SalonContext
      addInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        branch: formData.branch,
        message: formData.message || 'General Salon Query'
      });
      setStatus('success');
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#252525] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C6A56B] font-bold mb-3">
            Atelier Concierge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#101828] tracking-tight">
            We&apos;d Love to Welcome You.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#252525]/80 font-body">
            Have questions regarding hair treatments, academy admissions, or bridal scheduling? Reach out to our concierge or leave a message below.
          </p>
        </div>

        {/* 2-Column Contact Info & Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct verified details & Quick links */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <a
                href={`tel:${salonInfo.phoneRaw}`}
                className="p-5 rounded-2xl bg-[#F8F5EF] hover:bg-[#101828] text-[#101828] hover:text-white border border-[#101828]/10 hover:border-[#101828] transition-all flex items-start gap-4 group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#C6A56B]/20 border border-[#101828]/10 flex items-center justify-center text-[#C6A56B] shrink-0 transition-colors">
                  <Phone className="w-5 h-5 text-[#C6A56B]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A98547] group-hover:text-[#C6A56B] font-bold">
                    Direct Reception
                  </div>
                  <div className="text-lg font-bold font-heading mt-0.5">
                    {salonInfo.primaryPhone}
                  </div>
                  <div className="text-xs text-[#252525]/60 group-hover:text-white/70 mt-0.5">
                    Call for instant bookings or stylist queries
                  </div>
                </div>
              </a>

              <a
                href={`https://wa.me/${salonInfo.whatsappRaw}?text=${encodeURIComponent("Hi Blush & Beard! I'd like to ask a question.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#F8F5EF] hover:bg-emerald-900 text-[#101828] hover:text-white border border-[#101828]/10 hover:border-emerald-800 transition-all flex items-start gap-4 group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-emerald-500/20 border border-[#101828]/10 flex items-center justify-center text-emerald-600 shrink-0 transition-colors">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-emerald-600 group-hover:text-emerald-300 font-bold">
                    Official WhatsApp
                  </div>
                  <div className="text-lg font-bold font-heading mt-0.5">
                    Chat with Stylist
                  </div>
                  <div className="text-xs text-[#252525]/60 group-hover:text-white/70 mt-0.5">
                    Send hair photos for instant estimates
                  </div>
                </div>
              </a>

              <a
                href={salonInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#F8F5EF] hover:bg-[#101828] text-[#101828] hover:text-white border border-[#101828]/10 hover:border-[#101828] transition-all flex items-start gap-4 group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#C6A56B]/20 border border-[#101828]/10 flex items-center justify-center text-[#C6A56B] shrink-0 transition-colors">
                  <Navigation className="w-5 h-5 text-[#C6A56B]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A98547] group-hover:text-[#C6A56B] font-bold">
                    Google Maps Listing
                  </div>
                  <div className="text-base font-bold font-heading mt-0.5">
                    Gauripada Atelier, Kalyan West
                  </div>
                  <div className="text-xs text-[#252525]/60 group-hover:text-white/70 mt-0.5">
                    Click to launch turn-by-turn driving navigation
                  </div>
                </div>
              </a>
            </div>

            {/* Operating Hours card */}
            <div className="p-6 rounded-2xl bg-[#101828] text-white border border-[#C6A56B]/25 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A56B] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#C6A56B]" />
                <span>Working Hours</span>
              </div>
              <div className="text-base font-bold text-white font-heading">
                {salonInfo.operatingHours}
              </div>
              <p className="text-xs text-white/70 font-body">
                Open all 7 days in Gauripada, Kalyan West. Walk-ins welcomed warmly.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-[#F8F5EF]/80 p-6 sm:p-10 rounded-2xl border border-[#101828]/10 shadow-sm">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#101828] mb-2">
              Send an Online Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#252525]/70 mb-6 font-body">
              Messages submitted here are routed straight to the Kalyan front desk and management dashboard.
            </p>

            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-white border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-lg text-[#101828]">
                  Enquiry Received!
                </h4>
                <p className="text-xs sm:text-sm text-[#252525]/75 max-w-sm mx-auto font-body">
                  Thank you! Our salon coordinator will connect with you at <strong className="text-[#101828]">{formData.phone}</strong> promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', phone: '', email: '', branch: salonInfo.formalName, message: '' });
                  }}
                  className="mt-3 px-4 py-2 bg-[#101828] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sanya Kulkarni"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#101828]/15 bg-white text-xs sm:text-sm text-[#252525] focus:border-[#C6A56B] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98190 00000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#101828]/15 bg-white text-xs sm:text-sm text-[#252525] focus:border-[#C6A56B] outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sanya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#101828]/15 bg-white text-xs sm:text-sm text-[#252525] focus:border-[#C6A56B] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Salon Destination
                    </label>
                    <div className="w-full px-3.5 py-2.5 rounded-xl border border-[#101828]/15 bg-white text-xs sm:text-sm text-[#101828] font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                      <span className="truncate">Near Guruatman Circle, Gauripada, Kalyan (W)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1">
                    Your Message or Inquiry
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what treatment you're interested in, preferred time, or questions about academy diploma courses..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#101828]/15 bg-white text-xs sm:text-sm text-[#252525] focus:border-[#C6A56B] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#101828] hover:bg-[#1E293B] text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>Sending Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C6A56B]" />
                      <span>Submit Message to Desk</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
