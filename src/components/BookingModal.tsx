import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  Check, 
  Scissors, 
  AlertCircle,
  Copy,
  ShieldCheck
} from 'lucide-react';
import { useSalon } from '../context/SalonContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedBranchName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedBranchName,
}) => {
  const { branches, services, salonInfo, addBooking } = useSalon();

  const [selectedBranch, setSelectedBranch] = useState<string>(
    preSelectedBranchName || branches[0]?.name || 'Yogidham Flagship & Academy'
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');
  const [stylistPreference, setStylistPreference] = useState<string>('Any Master Stylist');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  
  // Submission states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingReference, setBookingReference] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // Default date
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sync pre-selected service
  useEffect(() => {
    if (preSelectedServiceId && preSelectedServiceId !== 'custom') {
      const match = services.find(s => s.id === preSelectedServiceId);
      if (match && !selectedServices.includes(match.name)) {
        setSelectedServices([match.name]);
      }
    }
    if (preSelectedBranchName) {
      setSelectedBranch(preSelectedBranchName);
    }
  }, [preSelectedServiceId, preSelectedBranchName, isOpen, services]);

  if (!isOpen) return null;

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
    "02:30 PM", "04:00 PM", "05:30 PM", "06:30 PM",
    "07:30 PM", "08:30 PM"
  ];

  const handleToggleService = (serviceName: string) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter(s => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const handleWhatsAppDirect = () => {
    if (!fullName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const servicesText = selectedServices.length > 0 
      ? selectedServices.join(', ') 
      : 'General Consultation / Scalp Assessment';

    const refCode = `BB-${Math.floor(100000 + Math.random() * 900000)}`;

    // Add to shared bookings context
    addBooking({
      referenceCode: refCode,
      customerName: fullName,
      customerPhone: phone,
      branch: selectedBranch,
      services: selectedServices.length > 0 ? selectedServices : ['General Consultation'],
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      stylist: stylistPreference,
      notes: notes || undefined
    });

    const message = `✨ *New Appointment Request - Blush & Beard Atelier*
📍 *Branch:* ${selectedBranch}
👤 *Name:* ${fullName}
📞 *Phone:* ${phone}
📅 *Preferred Date:* ${selectedDate}
⏰ *Preferred Time:* ${selectedTimeSlot}
✂️ *Services:* ${servicesText}
💈 *Stylist Preference:* ${stylistPreference}
${notes ? `📝 *Notes:* ${notes}` : ''}
🎫 *Ref Code:* ${refCode}

Please confirm my appointment slot availability. Thank you!`;

    const waUrl = `https://wa.me/${salonInfo.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setBookingReference(refCode);
    setBookingConfirmed(true);
  };

  const handleInAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMsg('Please select at least one treatment or choose General Consultation.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const refCode = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
      addBooking({
        referenceCode: refCode,
        customerName: fullName,
        customerPhone: phone,
        branch: selectedBranch,
        services: selectedServices,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        stylist: stylistPreference,
        notes: notes || undefined
      });
      setBookingReference(refCode);
      setBookingConfirmed(true);
    }, 600);
  };

  const copyRefToClipboard = () => {
    navigator.clipboard.writeText(bookingReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const resetAndClose = () => {
    setBookingConfirmed(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0F17]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#C6A56B]/40 overflow-hidden my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-[#101828] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A56B]/30">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C6A56B] font-bold">
              Blush &amp; Beard · Priority Chair Reservation
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-0.5">
              Book Your Atelier Appointment
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {bookingConfirmed ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-bold font-heading text-[#101828]">
                Appointment Request Confirmed!
              </h4>
              <p className="text-sm text-[#252525]/75 font-body max-w-md mx-auto">
                Thank you, <strong className="text-[#101828]">{fullName}</strong>. Your reservation has been sent directly to the desk at <strong className="text-[#101828]">{selectedBranch}</strong>.
              </p>
            </div>

            {/* Reference ticket */}
            <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#101828]/10 max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#101828]/10 text-xs">
                <span className="font-semibold text-[#252525]/70">Booking Reference</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-[#101828]">
                  <span>{bookingReference}</span>
                  <button
                    type="button"
                    onClick={copyRefToClipboard}
                    className="p-1 hover:text-[#C6A56B]"
                    title="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {copiedRef && <div className="text-[11px] text-emerald-600 text-right">Reference code copied!</div>}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#252525]/60 block">Date &amp; Time</span>
                  <span className="font-bold text-[#101828]">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div>
                  <span className="text-[#252525]/60 block">Branch</span>
                  <span className="font-bold text-[#101828]">{selectedBranch}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#101828]/5">
                  <span className="text-[#252525]/60 block">Treatments Selected</span>
                  <span className="font-semibold text-[#101828]">{selectedServices.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${salonInfo.whatsappRaw}?text=${encodeURIComponent(`Hi Blush & Beard! I booked reference ${bookingReference} for ${fullName} on ${selectedDate} at ${selectedTimeSlot} (${selectedBranch}). Please verify my chair reservation.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>

              <a
                href={`tel:${salonInfo.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#101828]/20 hover:border-[#101828] text-[#101828] font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C6A56B]" />
                <span>Call Atelier: 81080 19891</span>
              </a>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="text-xs text-[#252525]/60 hover:text-[#101828] underline cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleInAppBooking} className="p-5 sm:p-7 space-y-6">
            
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. Branch Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#101828] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>1. Select Kalyan Atelier Branch</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranch(b.name)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedBranch === b.name
                        ? 'border-[#C6A56B] bg-[#F8F5EF] text-[#101828] shadow-sm ring-1 ring-[#C6A56B]'
                        : 'border-[#101828]/15 bg-white text-[#252525]/80 hover:border-[#101828]/40'
                    }`}
                  >
                    <div className="font-heading font-bold text-xs text-[#101828]">{b.name}</div>
                    <div className="text-[11px] text-[#252525]/60 truncate">{b.address}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Services Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#101828] flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>2. Select Treatments</span>
                </label>
                <span className="text-[11px] text-[#252525]/60">
                  {selectedServices.length} selected
                </span>
              </div>
              
              <div className="max-h-40 overflow-y-auto border border-[#101828]/15 rounded-xl p-2.5 bg-[#F8F5EF]/40 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {services.map((s) => {
                  const isChecked = selectedServices.includes(s.name);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleToggleService(s.name)}
                      className={`p-2 rounded-lg text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        isChecked 
                          ? 'bg-[#101828] text-white' 
                          : 'bg-white hover:bg-[#101828]/5 text-[#252525] border border-black/5'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <div className="font-semibold truncate">{s.name}</div>
                        <div className={`text-[10px] ${isChecked ? 'text-[#C6A56B]' : 'text-[#252525]/50'}`}>
                          {s.price} · {s.duration}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#C6A56B] border-[#C6A56B]' : 'border-black/20'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 text-[#101828] stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Date, Time & Stylist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#101828]/15 focus:border-[#C6A56B] outline-none bg-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1.5">
                  Time Slot
                </label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#101828]/15 focus:border-[#C6A56B] outline-none bg-white font-medium"
                >
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1.5">
                  Stylist Preference
                </label>
                <select
                  value={stylistPreference}
                  onChange={(e) => setStylistPreference(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#101828]/15 focus:border-[#C6A56B] outline-none bg-white font-medium"
                >
                  <option value="Any Master Stylist">Any Master Stylist</option>
                  <option value="Senior Hair Colorist">Senior Hair Colorist</option>
                  <option value="Master Barber (Beard Expert)">Master Barber (Beard Expert)</option>
                  <option value="Bridal Specialist">Bridal Specialist</option>
                </select>
              </div>
            </div>

            {/* 4. Guest Details */}
            <div className="space-y-3 pt-2 border-t border-[#101828]/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#252525]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#101828]/15 focus:border-[#C6A56B] outline-none bg-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1">
                    Mobile Number (for SMS &amp; WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#252525]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98200 12345"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#101828]/15 focus:border-[#C6A56B] outline-none bg-white font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#101828] mb-1">
                  Specific Requests (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sensitive scalp, event date on weekend, skin patch test"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#101828]/15 focus:border-[#C6A56B] outline-none bg-white font-medium"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#101828] hover:bg-[#1E293B] text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Chair...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-[#C6A56B]" />
                    <span>Confirm Reservation</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reserve via WhatsApp</span>
              </button>
            </div>

            <div className="text-center text-[11px] text-[#252525]/60 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>No advance deposit required · Free reschedule anytime</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
