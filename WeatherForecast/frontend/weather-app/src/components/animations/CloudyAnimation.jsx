const CloudyAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large cloud group 1 */}
      <div className="absolute top-20 left-[10%] animate-float-slow">
        <div className="relative">
          <div className="absolute w-32 h-16 bg-white/80 rounded-full"></div>
          <div className="absolute w-20 h-16 bg-white/80 rounded-full -top-6 left-12"></div>
          <div className="absolute w-24 h-14 bg-white/80 rounded-full -top-2 left-20"></div>
          <div className="absolute w-28 h-18 bg-white/80 rounded-full top-2 left-6"></div>
        </div>
      </div>

      {/* Large cloud group 2 */}
      <div className="absolute top-40 right-[15%] animate-float">
        <div className="relative">
          <div className="absolute w-40 h-20 bg-white/70 rounded-full"></div>
          <div className="absolute w-24 h-20 bg-white/70 rounded-full -top-8 left-16"></div>
          <div className="absolute w-28 h-18 bg-white/70 rounded-full -top-4 left-24"></div>
          <div className="absolute w-32 h-22 bg-white/70 rounded-full top-2 left-8"></div>
        </div>
      </div>

      {/* Medium cloud group */}
      <div className="absolute top-80 left-[30%] animate-float-medium">
        <div className="relative">
          <div className="absolute w-28 h-14 bg-white/60 rounded-full"></div>
          <div className="absolute w-18 h-14 bg-white/60 rounded-full -top-6 left-10"></div>
          <div className="absolute w-20 h-12 bg-white/60 rounded-full -top-2 left-16"></div>
          <div className="absolute w-24 h-16 bg-white/60 rounded-full top-1 left-4"></div>
        </div>
      </div>

      {/* Small clouds */}
      <div className="absolute top-60 right-[40%] w-24 h-10 bg-white/50 rounded-full animate-float-slow"></div>
      <div className="absolute top-30 left-[60%] w-20 h-8 bg-white/40 rounded-full animate-float-medium"></div>
    </div>
  )
}

export default CloudyAnimation
