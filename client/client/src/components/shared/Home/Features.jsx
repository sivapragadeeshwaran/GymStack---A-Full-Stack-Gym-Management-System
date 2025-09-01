export default function Features() {
  return (
    <div className="bg-[#1a1a1a] text-white" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      {/* Stats Section */}
      <div className="flex  flex-col items-center justify-center px-4 sm:px-10 lg:px-40 pt-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[960px] rounded-2xl shadow-2xl">
          {[
            { title: "Happy Members", value: "500+" },
            { title: "Weekly Classes", value: "30+" },
            { title: "Certified Trainers", value: "10" },
            { title: "Customer Satisfaction", value: "99%" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2 rounded-xl bg-[#363636] p-6 w-full transition active:scale-95">
              <p className="text-sm sm:text-base font-medium">{item.title}</p>
              <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-10 lg:px-40 py-16">
  <div className="w-full max-w-[960px]">
    {/* Header Section */}
    <div className="flex flex-col text-white items-center text-center mb-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 uppercase tracking-wider">Why Choose Us</h2>
      <div className="w-20 h-1 bg-[#363636] mb-4 rounded-full"></div>
    </div>
    
    <div className="flex flex-col gap-8 sm:gap-12 pt-4">
      {/* Title and Description */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Discover the Difference</h1>
        <p className="text-base sm:text-lg max-w-[720px] mx-auto text-[#adadad] leading-relaxed">
          At our gym, we're committed to providing an exceptional fitness experience. Here's why we stand out:
        </p>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Facility Amenities",
            desc: "Our gym boasts state-of-the-art equipment, spacious workout areas, and luxurious amenities to enhance your fitness journey.",
            icon: (
              <div className="p-3 bg-[#363636] rounded-lg">
                <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M3 3h18v2H3V3zm3 4h12v2H6V7zm-3 4h18v2H3v-2zm3 4h12v2H6v-2zm-3 4h18v2H3v-2z" />
                </svg>
              </div>
            ),
          },
          {
            title: "Membership Cost",
            desc: "We offer competitive and flexible membership options tailored to fit your budget and fitness goals.",
            icon: (
              <div className="p-3 bg-[#363636] rounded-lg">
                <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 1C5.924 1 1 5.924 1 12s4.924 11 11 11 11-4.924 11-11S18.076 1 12 1zm1 17.93V19a1 1 0 1 1-2 0v-.07A8.001 8.001 0 0 1 4.07 13H5a1 1 0 1 1 0 2H4.07A8.001 8.001 0 0 1 11 17.93zM13 5v2a1 1 0 1 1-2 0V5h2zm0 12v-2a1 1 0 1 1 2 0v2h-2z" />
                </svg>
              </div>
            ),
          },
          {
            title: "Trainer Qualifications",
            desc: "Our certified trainers bring extensive expertise and personalized guidance to help you achieve optimal results.",
            icon: (
              <div className="p-3 bg-[#363636] rounded-lg">
                <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-3.314 0-10 1.672-10 5v3h20v-3c0-3.328-6.686-5-10-5z" />
                </svg>
              </div>
            ),
          },
          {
            title: "Operating Hours",
            desc: "We're open early and close late, providing ample time for you to fit workouts into your busy schedule.",
            icon: (
              <div className="p-3 bg-[#363636] rounded-lg">
                <svg fill="white" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zm1-14h-2v6l5.25 3.15 1-1.65-4.25-2.5z" />
                </svg>
              </div>
            ),
          },
        ].map((card, idx) => (
          <div 
            key={idx} 
            className="flex flex-col gap-4 p-6 bg-neutral-800 border border-[#4d4d4d] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-white">{card.icon}</div>
            <h2 className="text-lg sm:text-xl font-bold">{card.title}</h2>
            <p className="text-sm text-[#adadad] leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
