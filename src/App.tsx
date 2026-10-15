/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { SalonProvider } from './context/SalonContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustHighlights } from './components/TrustHighlights';
import { AboutSection } from './components/AboutSection';
import { ServicesMenu } from './components/ServicesMenu';
import { TransformationStudio } from './components/TransformationStudio';
import { BranchLocations } from './components/BranchLocations';
import { GalleryShowcase } from './components/GalleryShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';

// ErrorBoundary to prevent any blank page when sharing to GitHub / external hosting
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#101828] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#C6A56B]/20 border border-[#C6A56B] flex items-center justify-center text-[#C6A56B] font-bold text-xl mb-4">
            B&amp;B
          </div>
          <h1 className="text-2xl font-bold font-heading mb-2">Blush and Beard – Unisex Salon</h1>
          <p className="text-sm text-white/70 max-w-md mb-6 font-body">
            Gauripada, Kalyan (West). The salon experience is ready. Click below to refresh.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-[#C6A56B] text-[#101828] font-bold text-sm hover:bg-[#B89659] transition-all cursor-pointer shadow-lg"
          >
            Reload Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();
  const [activeSection, setActiveSection] = useState<string>('top');

  // Check URL hash for direct admin link #admin
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
    const handleHashChange = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  // Track active section for nav highlight
  useEffect(() => {
    const sectionIds = ['about', 'services', 'transformations', 'locations', 'gallery', 'reviews', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#252525] selection:bg-[#C6A56B]/30 flex flex-col relative font-body">
      {/* Navigation */}
      <Navbar 
        onOpenBooking={handleOpenBooking} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection} 
      />

      {/* Main Flow */}
      <main className="flex-1">
        {/* 1. Avant-Garde Editorial Hero with Lookbook Focus Switcher */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. Verified Trust Pillars & Brand Formulations */}
        <TrustHighlights />

        {/* 3. About the Salon Story & Philosophy */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 4. Curated Atelier Treatment Menu (HAUTE LOOKBOOK) */}
        <ServicesMenu onSelectServiceForBooking={handleOpenBooking} />

        {/* 5. Interactive Before & After Transformation Studio */}
        <div id="transformations">
          <TransformationStudio onOpenBooking={handleOpenBooking} />
        </div>

        {/* 6. Single Verified Gauripada Salon Location with Live Google Maps Embed */}
        <BranchLocations onOpenBookingForBranch={() => handleOpenBooking()} />

        {/* 7. Verified Portfolio Showcase with Lightbox */}
        <GalleryShowcase />

        {/* 8. Verified Google Maps Reviews */}
        <TestimonialsSection />

        {/* 9. Frequently Asked Questions */}
        <FaqSection />

        {/* 10. Concierge & Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
      />

      {/* Secure Admin & Client Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            history.pushState(null, '', ' ');
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SalonProvider>
        <MainApp />
      </SalonProvider>
    </ErrorBoundary>
  );
}
