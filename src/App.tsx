/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SalonProvider } from './context/SalonContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustHighlights } from './components/TrustHighlights';
import { AboutSection } from './components/AboutSection';
import { ServicesMenu } from './components/ServicesMenu';
import { TransformationStudio } from './components/TransformationStudio';
import { BranchLocations } from './components/BranchLocations';
import { GalleryShowcase } from './components/GalleryShowcase';
import { AcademySection } from './components/AcademySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';

function MainApp() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();
  const [preSelectedBranchName, setPreSelectedBranchName] = useState<string | undefined>();
  const [activeSection, setActiveSection] = useState<string>('top');

  // Check URL hash for direct admin link #admin
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
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

  const handleOpenBookingForBranch = (branchName: string) => {
    setPreSelectedBranchName(branchName);
    setPreSelectedServiceId(undefined);
    setIsBookingOpen(true);
  };

  // Track active section for nav highlight
  useEffect(() => {
    const sectionIds = ['about', 'services', 'transformations', 'locations', 'gallery', 'academy', 'reviews', 'contact'];
    
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

        {/* 6. 3 Kalyan West Branches with Interactive Google Maps Embed */}
        <BranchLocations onOpenBookingForBranch={handleOpenBookingForBranch} />

        {/* 7. Verified Portfolio Showcase with Lightbox */}
        <GalleryShowcase />

        {/* 8. Blush & Beard Academy */}
        <AcademySection onOpenBooking={() => handleOpenBooking()} />

        {/* 9. Verified Google Maps Reviews */}
        <TestimonialsSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

        {/* 11. Concierge & Contact Form */}
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
        preSelectedBranchName={preSelectedBranchName}
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
    <SalonProvider>
      <MainApp />
    </SalonProvider>
  );
}
