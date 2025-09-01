export default function Training() {
  return (
    <div  className="px-4 sm:px-6 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-[1280px]">
        <div className="flex flex-col text-white  items-center text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Our Training Programs</h1>
            <div className="w-16 h-1 bg-[#363636] mb-2"></div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-2 sm:p-4">
          {[
            {
              title: "Weight Training",
              desc: "Build strength and sculpt your physique with our comprehensive weight training program.",
              img: "https://www.jefit.com/wp/wp-content/uploads/2023/08/medium-shot-man-lifting-bar-1024x683.jpg", // Weight training
            },
            {
              title: "Calisthenics",
              desc: "Master bodyweight exercises and achieve functional fitness with our dynamic calisthenics program.",
              img: "https://cdn.muscleandstrength.com/sites/default/files/field/feature-wide-image/workout/calisthenics_for_lifters_-_1000x500.jpg", // Calisthenics
            },
            {
              title: "Crossfit",
              desc: "Push your limits and achieve peak performance with our high-intensity crossfit program.",
              img: "https://www.online-trainer-lizenz.de/blog/wp-content/uploads/2018/12/crossfit.webp", // Crossfit
            },
            {
              title: "Power Lifting",
              desc: "Maximize your strength and power with our specialized power lifting program.",
              img: "https://media.istockphoto.com/id/496070946/photo/man-at-the-gym.jpg?s=612x612&w=0&k=20&c=TF8qNNMuPmisaDUJZRknZqUgAiSmsii65JF8a5b_7Y0=", // Power lifting
            },
          ].map((program, i) => (
            <div
              key={i}
              className="hover:[transform:translateY(2%)] flex flex-col gap-3 rounded-xl border border-[#4d4d4d] bg-neutral-800 p-4 hover:shadow-lg transition-shadow"
            >
              <div
                className="w-full h-[160px] bg-center bg-no-repeat bg-cover rounded-md"
                style={{ backgroundImage: `url(${program.img})` }}
              ></div>
              <div className="flex flex-col gap-1">
                <h2 className="text-white text-base font-bold leading-tight">
                  {program.title}
                </h2>
                <p className="text-[#adadad] text-sm font-normal leading-normal">
                  {program.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
