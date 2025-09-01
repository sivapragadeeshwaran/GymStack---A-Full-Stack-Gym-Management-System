import React from 'react';

const Footer = () => {
  // Define SVG icons for each social media platform
  const socialIcons = {
    twitter: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    facebook: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
      </svg>
    ),
    youtube: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    linkedin: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  };

  return (
    <footer className="bg-black text-white" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="px-4 sm:px-10 lg:px-20 py-16 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {/* Column 1 - Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#363636] flex items-center justify-center shadow-lg">
                <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">
              STRENGTH <span className="text-[#adadad]">ZONE</span>
              </h2>
            </div>
            <p className="text-[#adadad] mb-8 leading-relaxed text-sm sm:text-base">
              Your premium fitness destination. Transform your body and mind with our state-of-the-art facilities and expert trainers.
            </p>
            <div className="flex flex-wrap gap-4">
              {['twitter', 'facebook', 'instagram', 'youtube', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#363636] flex items-center justify-center text-white hover:bg-[#4d4d4d] transition-all duration-300 hover:scale-110 shadow-md"
                  aria-label={social}
                >
                  {socialIcons[social]}
                </a>
              ))}
            </div>
          </div>
          {/* Column 2 - Quick Links */}
          <div className='lg:ml-10'>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              {['Home', 'Classes', 'Membership', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[#adadad] hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-xs group-hover:translate-x-1 transition-transform duration-300">▶</span>
                    <span className="font-medium">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-[#363636] rounded-full shadow-md">
                  <svg fill="white" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M12 1C6.48 1 2 5.48 2 11c0 7.83 8 12 10 12s10-4.17 10-12c0-5.52-4.48-10-10-10zm0 18c-1.39 0-3.49-1.25-4.98-3.86C5.65 12.67 5 10.58 5 9c0-3.86 3.14-7 7-7s7 3.14 7 7c0 1.58-.65 3.67-2.02 6.14C15.49 17.75 13.39 19 12 19z" />
                    <path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#adadad] font-medium">1709 Paseo De Peralta</p>
                  <p className="text-[#adadad]">Santa Fe, New York, 87501</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-[#363636] rounded-full shadow-md">
                  <svg fill="white" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <p className="text-[#adadad] font-medium">(505) 216-6688</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-[#363636] rounded-full shadow-md">
                  <svg fill="white" viewBox="0 0 24 24" width="16" height="16">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <p className="text-[#adadad] font-medium">contact@fitnessplustheme.com</p>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2d2d2d] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#adadad]">
          <p>© {new Date().getFullYear()} Strength Zone. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4d4d4d] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;