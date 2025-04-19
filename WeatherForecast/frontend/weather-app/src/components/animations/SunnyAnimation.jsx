const SunnyAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun with rays */}
      <div className="absolute top-10 right-10 w-40 h-40">
        {/* Sun rays behind */}
        <div className="absolute inset-0 animate-spin-slow">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-1.5 bg-yellow-300/80"
              style={{
                width: '200px',
                transformOrigin: '0 50%',
                transform: `rotate(${i * 30}deg) translateY(-50%)`,
              }}
            ></div>
          ))}
        </div>

        {/* Sun on top */}
        <div className="relative w-full h-full">
          {/* Solid background circle to block rays */}
          <div className="absolute inset-0 rounded-full bg-[#4d94ff]"></div>
          {/* Sun circle */}
          <div className="absolute inset-0 rounded-full bg-yellow-300 shadow-lg shadow-yellow-500/50">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-400"></div>
          </div>
        </div>
      </div>

      {/* Small clouds */}
      <div className="absolute top-40 left-20 w-32 h-12 bg-white rounded-full opacity-40 animate-float"></div>
      <div className="absolute top-60 left-[40%] w-40 h-14 bg-white rounded-full opacity-30 animate-float-slow"></div>
    </div>
  );
};

export default SunnyAnimation;
