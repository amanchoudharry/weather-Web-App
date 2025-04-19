const ThunderstormAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark cloud group 1 */}
      <div className="absolute top-10 left-[5%] animate-float-slow">
        <div className="relative">
          <div className="absolute w-40 h-20 bg-slate-800/90 rounded-full"></div>
          <div className="absolute w-28 h-20 bg-slate-800/90 rounded-full -top-8 left-16"></div>
          <div className="absolute w-32 h-18 bg-slate-800/90 rounded-full -top-4 left-24"></div>
          <div className="absolute w-36 h-22 bg-slate-800/90 rounded-full top-2 left-8"></div>
        </div>
      </div>

      {/* Dark cloud group 2 with lightning */}
      <div className="absolute top-30 right-[10%] animate-float">
        <div className="relative">
          <div className="absolute w-48 h-24 bg-slate-900/80 rounded-full"></div>
          <div className="absolute w-32 h-24 bg-slate-900/80 rounded-full -top-10 left-20"></div>
          <div className="absolute w-36 h-22 bg-slate-900/80 rounded-full -top-5 left-28"></div>
          <div className="absolute w-40 h-26 bg-slate-900/80 rounded-full top-3 left-10"></div>

          {/* Lightning bolt 1 */}
          <div
            className="absolute top-24 left-20 w-3 h-20 bg-yellow-300"
            style={{
              clipPath: "polygon(0 0, 100% 0, 60% 50%, 100% 50%, 0 100%, 40% 50%, 0 50%)",
              animation: "lightning 5s infinite",
              opacity: 0,
            }}
          ></div>

          {/* Lightning bolt 2 */}
          <div
            className="absolute top-24 left-32 w-2 h-16 bg-yellow-300"
            style={{
              clipPath: "polygon(0 0, 100% 0, 60% 50%, 100% 50%, 0 100%, 40% 50%, 0 50%)",
              animation: "lightning 5s infinite 2.5s",
              opacity: 0,
            }}
          ></div>
        </div>
      </div>

      {/* Raindrops */}
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-4 bg-blue-200/70 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            animation: `rainfall ${0.5 + Math.random() * 1}s linear ${Math.random() * 5}s infinite`,
          }}
        ></div>
      ))}
    </div>
  )
}

export default ThunderstormAnimation
