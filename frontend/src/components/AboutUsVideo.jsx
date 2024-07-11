import { useState, useRef } from "react";
import { AboutUsVideo } from "../assets";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const IntroVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className="flex justify-center items-center introvideobg h-[35vh] md:h-[60vh] lg:h-[75vh] xl:h-[90vh]">
      <div className="relative rounded-xl h-[40vh] w-[95vw] md:h-[70vh] md:w-[70vw] py-8 lg:h-[85vh] lg:w-[80vw] xl:w-[80vw]">
        <video
          ref={videoRef}
          src={AboutUsVideo}
          className="w-full h-full rounded-xl"
          autoPlay
          loop
          playsInline
          muted={isMuted}
        />
        <button
          onClick={handleMuteToggle}
          className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
};

export default IntroVideo;
