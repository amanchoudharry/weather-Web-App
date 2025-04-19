const RainyAnimation = () => {
  // Create an array of raindrops with random positions
  const raindrops = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${0.5 + Math.random() * 1}s`,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark cloud group 1 */}
      <div className="absolute top-10 left-[5%] animate-float-slow">
        <div className="relative">
          <div className="absolute w-40 h-20 bg-slate-600/90 rounded-full"></div>
          <div className="absolute w-28 h-20 bg-slate-600/90 rounded-full -top-8 left-16"></div>
          <div className="absolute w-32 h-18 bg-slate-600/90 rounded-full -top-4 left-24"></div>
          <div className="absolute w-36 h-22 bg-slate-600/90 rounded-full top-2 left-8"></div>
        </div>
      </div>

      {/* Dark cloud group 2 */}
      <div className="absolute top-30 right-[10%] animate-float">
        <div className="relative">
          <div className="absolute w-48 h-24 bg-slate-700/80 rounded-full"></div>
          <div className="absolute w-32 h-24 bg-slate-700/80 rounded-full -top-10 left-20"></div>
          <div className="absolute w-36 h-22 bg-slate-700/80 rounded-full -top-5 left-28"></div>
          <div className="absolute w-40 h-26 bg-slate-700/80 rounded-full top-3 left-10"></div>
        </div>
      </div>

      {/* Raindrops */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-0.5 h-4 bg-blue-200/70 rounded-full"
          style={{
            left: drop.left,
            top: "-10px",
            animation: `rainfall ${drop.animationDuration} linear ${drop.animationDelay} infinite`,
          }}
        ></div>
      ))}
    </div>
  )
}

export default RainyAnimation
