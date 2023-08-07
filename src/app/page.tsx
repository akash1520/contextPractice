import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

// colors
// primary: #feec01
// text color: #191817
// secondary: #fefffe

// fonts
// primary font: TT Trailers bold
// secondary font: Sailec regular

export default function Home() {
  return (
    <main className="bg-[#F9FAFB] min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
