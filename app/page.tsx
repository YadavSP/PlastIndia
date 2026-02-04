'use client'

import Link from 'next/link';

export default function Dashboard() {
  return (



    
    <div className="relative flex flex-col items-center justify-center  p-4"> {/* Added items-center, min-h-screen, and p-4 for overall centering and responsiveness */}

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center"> {/* Ensured text is centered and added responsive margin */}
        Petrochemical Products Selector
      </h1>

      {/* Blurred glass effect container */}
      <div className="w-full max-w-5xl bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10 p-4 md:p-8 border border-white border-opacity-20 flex items-center justify-center min-h-[200px] h-[58vh] overflow-hidden"> {/* Added overflow-hidden to prevent video from spilling out */}
        {/* Video element */}
        <video
          src="/Touch_Kiosk_Intro.mp4" // Path to your video in the public folder
          autoPlay // Autoplay the video
          loop     // Loop the video
          muted    // Mute the video by default (good practice for autoplay)
          playsInline // Recommended for mobile to play within the element's playback area
          className="w-full h-full object-fill rounded-xl m-4" // Ensures video covers the div, is responsive, and respects border-radius
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Button container */}
        {/* Button container */}
      <div
  className="
    bg-gradient-to-b from-[#f36f21] to-[#ffd6be]
    hover:from-[#ff5a00] hover:to-[#ffb48a]
    mt-8 md:mt-12 flex justify-center
   
    items-center justify-center
    px-[24px] md:px-[32px]
    py-[16px] md:py-[24px]

    relative rounded-[20px]
    
    hover:border-[#001a66]

    shadow-[0px_0px_24px_0px_rgba(0,0,0,0.14)]
    hover:shadow-[0px_0px_35px_0px_rgba(0,0,0,0.25)]

    flex shrink-0
    transition-all duration-300 ease-out
    hover:scale-105
    active:scale-100

    cursor-pointer
  "
  data-name="Button"
>
  <Link href="/form">
    <p className="font-bold leading-[24px] md:leading-[28px] text-[#002480] text-[24px] md:text-[32px]">
      Tap to Begin
    </p>
  </Link>
</div>

    </div>
  );
}