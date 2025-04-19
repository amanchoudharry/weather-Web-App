const SnowyAnimation = () => {
  // Create an array of snowflakes with random positions
  const snowflakes = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 7}s`,
    size: `${Math.random() * 0.5 + 0.2}rem`,
    opacity: Math.random() * 0.5 + 0.5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Light cloud group 1 */}
      <div className="absolute top-10 left-[5%] animate-float-slow">
        <div className="relative">
          <div className="absolute w-40 h-20 bg-slate-300/80 rounded-full"></div>
          <div className="absolute w-28 h-20 bg-slate-300/80 rounded-full -top-8 left-16"></div>
          <div className="absolute w-32 h-18 bg-slate-300/80 rounded-full -top-4 left-24"></div>
          <div className="absolute w-36 h-22 bg-slate-300/80 rounded-full top-2 left-8"></div>
        </div>
      </div>

      {/* Light cloud group 2 */}
      <div className="absolute top-30 right-[10%] animate-float">
        <div className="relative">
          <div className="absolute w-48 h-24 bg-slate-400/70 rounded-full"></div>
          <div className="absolute w-32 h-24 bg-slate-400/70 rounded-full -top-10 left-20"></div>
          <div className="absolute w-36 h-22 bg-slate-400/70 rounded-full -top-5 left-28"></div>
          <div className="absolute w-40 h-26 bg-slate-400/70 rounded-full top-3 left-10"></div>
        </div>
      </div>

      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: flake.left,
            top: "-10px",
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration} linear ${flake.animationDelay} infinite`,
          }}
        ></div>
      ))}
    </div>
  )
}

export default SnowyAnimation
