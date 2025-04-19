const FoggyAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fog layers */}
      <div
        className="absolute inset-x-0 h-16 bg-gradient-to-b from-gray-300/80 to-transparent"
        style={{ top: "10%", animation: "fogMove 15s infinite alternate" }}
      ></div>

      <div
        className="absolute inset-x-0 h-20 bg-gradient-to-b from-gray-300/70 to-transparent"
        style={{ top: "25%", animation: "fogMove 18s infinite alternate-reverse" }}
      ></div>

      <div
        className="absolute inset-x-0 h-24 bg-gradient-to-b from-gray-300/60 to-transparent"
        style={{ top: "40%", animation: "fogMove 20s infinite alternate" }}
      ></div>

      <div
        className="absolute inset-x-0 h-16 bg-gradient-to-b from-gray-300/50 to-transparent"
        style={{ top: "60%", animation: "fogMove 17s infinite alternate-reverse" }}
      ></div>

      {/* Light cloud group */}
      <div className="absolute top-10 left-[5%] animate-float-slow">
        <div className="relative">
          <div className="absolute w-40 h-20 bg-gray-400/60 rounded-full"></div>
          <div className="absolute w-28 h-20 bg-gray-400/60 rounded-full -top-8 left-16"></div>
          <div className="absolute w-32 h-18 bg-gray-400/60 rounded-full -top-4 left-24"></div>
          <div className="absolute w-36 h-22 bg-gray-400/60 rounded-full top-2 left-8"></div>
        </div>
      </div>

      {/* Light cloud group 2 */}
      <div className="absolute top-30 right-[10%] animate-float">
        <div className="relative">
          <div className="absolute w-48 h-24 bg-gray-400/50 rounded-full"></div>
          <div className="absolute w-32 h-24 bg-gray-400/50 rounded-full -top-10 left-20"></div>
          <div className="absolute w-36 h-22 bg-gray-400/50 rounded-full -top-5 left-28"></div>
          <div className="absolute w-40 h-26 bg-gray-400/50 rounded-full top-3 left-10"></div>
        </div>
      </div>
    </div>
  )
}

export default FoggyAnimation
