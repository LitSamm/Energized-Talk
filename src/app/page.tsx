"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventTracks from "@/components/EventTracks";
import RegistrationForm from "@/components/RegistrationForm";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080b09] text-gray-100 selection:bg-[#00ff87]/20 selection:text-white relative overflow-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with countdown */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Tracks & Presentation Topics */}
        <EventTracks />

        {/* Interactive Registration Form */}
        <RegistrationForm />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
