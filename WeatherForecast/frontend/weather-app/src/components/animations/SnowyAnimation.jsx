const SnowyAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Snow particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 10}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          >
            <div className="h-2 w-2 bg-white rounded-full opacity-70"></div>
          </div>
        ))}
      </div>

      {/* Cloud cover */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-700 opacity-40"></div>
      
      {/* Clouds */}
      <div className="absolute top-10 left-10 w-40 h-16 bg-white/30 rounded-full filter blur-md animate-float-slow"></div>
      <div className="absolute top-20 right-20 w-48 h-16 bg-white/20 rounded-full filter blur-md animate-float"></div>
      <div className="absolute top-40 left-1/3 w-52 h-16 bg-white/25 rounded-full filter blur-md animate-float-medium"></div>
    </div>
  );
};

export default SnowyAnimation;
