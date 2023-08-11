import Features from "@/components/Features/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Internship from "@/components/Internship/Internship";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import Mentor from "@/components/Mentor";
import Mentee from "@/components/Mentee";
import React from "react"

// colors
// primary: #feec01
// text color: #191817
// secondary: #fefffe

// fonts
// primary font: TT Trailers bold
// secondary font: Sailec regular

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Internship />
      <Mentee />
      <Mentor />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
