import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      text: "I have been a proud member of this incredible gym for over a year now, and the experience has been nothing short of amazing. The state-of-the-art equipment, knowledgeable staff, and diverse group classes have made my fitness journey not only effective but truly enjoyable.",
      name: "Eleanor Pena",
      role: "Athlete",
      image: "eleanor"
    },
    {
      text: "This gym has completely transformed my approach to fitness. The trainers are exceptional, and the community is so supportive. I've achieved goals I never thought possible!",
      name: "Michael Johnson",
      role: "Bodybuilder",
      image: "michael"
    },
    {
      text: "As someone who hated going to the gym, I can honestly say this place changed my perspective. The atmosphere is welcoming, and the variety of classes keeps me motivated.",
      name: "Sarah Williams",
      role: "Athlete",
      image: "sarah"
    }
  ];

  const updateTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="flex items-center justify-center py-6 lg:px-40  ">
      <div className="w-full max-w-6xl bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="w-full md:w-2/5 mb-8 md:mb-0">
          <h3 className="text-xs uppercase tracking-widest text-[#B0B0B0] mb-4">DON'T TAKE OUR WORDS</h3>
          <h1 className="text-4xl font-bold text-white mb-8">Listen from our Happy Clients</h1>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#FF7A00] flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
             <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#FF7A00] flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="w-full md:w-3/5 relative">
          <div 
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-[rgba(255,122,0,0.1)] rounded-2xl"
            style={{
              background: "radial-gradient(circle at top right, rgba(255, 122, 0, 0.1), transparent 70%)"
            }}
          ></div>
          <div className="testimonial-content bg-[#262626] rounded-2xl p-8 relative z-10">
            {/* Quotation Mark */}
            <div className="absolute top-7 left-1 text-gray-500 text-5xl">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            
            {/* Testimonial Text */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-[500px] mt-6 mb-8">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"{currentTestimonial.text}"
            </p>
            
            {/* Client Profile */}
            <div className="flex items-center">
              <img 
                src={`https://picsum.photos/seed/${currentTestimonial.image}/100/100.jpg`} 
                alt={currentTestimonial.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <h4 className="text-white font-bold">{currentTestimonial.name}</h4>
                <p className="text-[#B0B0B0] text-sm">{currentTestimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;