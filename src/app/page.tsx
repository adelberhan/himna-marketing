import Image from "next/image";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Stats from "./components/sections/Stats";
import About from "./components/sections/About";
import Portfolio from "./components/sections/Portfolio";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/ContatUs";
import Footer from "./components/layout/Footer";
import Partners from "./components/sections/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Portfolio />
      <Partners />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
