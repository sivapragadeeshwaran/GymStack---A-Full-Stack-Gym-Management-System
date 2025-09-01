import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      access_key: "cd94eddc-ad04-4036-96af-ed1df3c9e225",
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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
    ),
  };

  return (
    <div
      className="bg-[#1a1a1a] text-white"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-col items-center justify-center px-4 sm:px-10 lg:px-40 py-16">
        <div className="w-full max-w-[960px]">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#adadad] uppercase tracking-wider mb-4">
              Get In Touch
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <div className="w-16 h-1 bg-[#363636] mb-6"></div>
            <p className="text-base sm:text-lg max-w-[720px] text-[#adadad] leading-relaxed">
              Send us an inquiry, or drop by our fitness center in person to
              have a look around.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column - Contact Details */}
            <div className="md:w-1/2">
              <div className="space-y-6">
                {/* Address Block */}
                <div className="p-6 bg-neutral-800 border border-[#2d2d2d] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-3 bg-[#363636] rounded-full">
                      <svg
                        fill="white"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path d="M12 1C6.48 1 2 5.48 2 11c0 7.83 8 12 10 12s10-4.17 10-12c0-5.52-4.48-10-10-10zm0 18c-1.39 0-3.49-1.25-4.98-3.86C5.65 12.67 5 10.58 5 9c0-3.86 3.14-7 7-7s7 3.14 7 7c0 1.58-.65 3.67-2.02 6.14C15.49 17.75 13.39 19 12 19z" />
                        <path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                        ADDRESS
                      </h3>
                      <p className="text-sm text-[#adadad]">
                        1709 Paseo De Peralta
                        <br />
                        Santa Fe, New York, 87501
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Block */}
                <div className="p-6 bg-neutral-800 border border-[#2d2d2d] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-3 bg-[#363636] rounded-full">
                      <svg
                        fill="white"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                        PHONE
                      </h3>
                      <p className="text-sm text-[#adadad]">(505) 216-6688</p>
                    </div>
                  </div>
                </div>

                {/* Email Block */}
                <div className="p-6 bg-neutral-800 border border-[#2d2d2d] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-3 bg-[#363636] rounded-full">
                      <svg
                        fill="white"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                        EMAIL
                      </h3>
                      <p className="text-sm text-[#adadad]">
                        contact@fitnessplustheme.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                    FOLLOW US
                  </h3>
                  <div className="flex gap-4">
                    {[
                      "twitter",
                      "facebook",
                      "instagram",
                      "youtube",
                      "linkedin",
                    ].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-12 h-12 rounded-full bg-[#363636] flex items-center justify-center text-white hover:bg-[#4d4d4d] transition-all duration-300 hover:scale-110 shadow-md"
                        aria-label={social}
                      >
                        {socialIcons[social]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="md:w-1/2">
              <div className="p-8 bg-neutral-800 border border-[#2d2d2d] rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-2">Send us a message</h3>
                <p className="text-[#adadad] mb-6">
                  We'll get back to you as soon as possible
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#363636] rounded-lg px-5 py-4 text-white placeholder-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#4d4d4d] transition-all duration-300 border border-transparent focus:border-[#4d4d4d]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#363636] rounded-lg px-5 py-4 text-white placeholder-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#4d4d4d] transition-all duration-300 border border-transparent focus:border-[#4d4d4d]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#363636] rounded-lg px-5 py-4 text-white placeholder-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#4d4d4d] transition-all duration-300 border border-transparent focus:border-[#4d4d4d]"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Your message (optional)"
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#363636] rounded-lg px-5 py-4 text-white placeholder-[#adadad] focus:outline-none focus:ring-2 focus:ring-[#4d4d4d] transition-all duration-300 border border-transparent focus:border-[#4d4d4d] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#363636] text-white font-semibold rounded-lg px-8 py-4 hover:bg-[#4d4d4d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4d4d4d] shadow-md hover:shadow-lg w-full disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "SUBMIT"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
