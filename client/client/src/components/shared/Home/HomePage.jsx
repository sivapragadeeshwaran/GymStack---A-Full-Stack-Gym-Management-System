import { useRef, useEffect, useState } from "react";
import Navbar from "../Navbar";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Membership from "./Membership";
import Training from "./Training";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";

export default function HomePage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const trainingRef = useRef(null);
  const membershipRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const [activeSection, setActiveSection] = useState("home");
  const HEADER_OFFSET = 80; // adjust if header height changes

  const sectionMap = {
    home: heroRef,
    features: featuresRef,
    classes: trainingRef, // assuming "Classes" corresponds to Training
    membership: membershipRef,
    testimonials: testimonialsRef,
    contact: contactRef,
  };

  const scrollTo = (ref) => {
    if (!ref?.current) return;
    const top = ref.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = top - HEADER_OFFSET;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleNavigate = (section) => {
    const ref = sectionMap[section];
    if (ref) {
      scrollTo(ref);
      // update hash without page jump
      window.history.replaceState(null, "", `#${section}`);
    }
  };

  // IntersectionObserver to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`,
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-section");
          setActiveSection(id);
          window.history.replaceState(null, "", `#${id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const refs = [
      { ref: heroRef, id: "home" },
      { ref: featuresRef, id: "features" },
      { ref: trainingRef, id: "classes" },
      { ref: membershipRef, id: "membership" },
      { ref: testimonialsRef, id: "testimonials" },
      { ref: contactRef, id: "contact" },
    ];

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // On mount, if URL has hash, navigate there
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionMap[hash]) {
      // small delay to ensure layout is ready
      setTimeout(() => handleNavigate(hash), 100);
    }
  }, []);

  return (
    <div className="bg-[#1a1a1a]">
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      <div ref={heroRef} data-section="home" id="home" className="mt-4" >
        <HeroSection />
      </div>

      <div ref={featuresRef} data-section="features" id="features" >
        <Features />
      </div>

      <div ref={trainingRef} data-section="classes" id="classes" >
        <Training />
      </div>

      <div ref={membershipRef} data-section="membership" id="membership" >
        <Membership />
      </div>

      <div ref={testimonialsRef} data-section="testimonials" id="testimonials" >
        <Testimonials />
      </div>

      <div ref={contactRef} data-section="contact" id="contact" >
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
