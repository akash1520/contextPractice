import Features from "@/components/Features/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Internship from "@/components/Internship/Internship";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";

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
      <Testimonials />
      <Footer />
    </main>
  );
}
