const ThunderAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark cloud cover */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-700 opacity-60"></div>

      {/* Thunder clouds */}
      <div className="absolute top-10 left-10 w-48 h-20 bg-gray-600/70 rounded-full filter blur-sm animate-float-slow"></div>
      <div className="absolute top-20 right-20 w-56 h-20 bg-gray-700/60 rounded-full filter blur-sm animate-float"></div>
      <div className="absolute top-40 left-1/3 w-64 h-20 bg-gray-600/65 rounded-full filter blur-sm animate-float-medium"></div>

      {/* Lightning flashes */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-lightning"
          style={{
            left: `${20 + i * 30}%`,
            top: '20%',
            width: '2px',
            height: '100px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            animationDelay: `${i * 2 + Math.random() * 2}s`,
          }}
        ></div>
      ))}

      {/* Rain drops */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-rainfall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 10}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '1s',
          }}
        >
          <div className="h-3 w-0.5 bg-blue-200/50 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ThunderAnimation; 