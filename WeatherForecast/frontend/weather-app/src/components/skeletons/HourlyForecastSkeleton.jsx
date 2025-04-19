import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const HourlyForecastSkeleton = () => {
  return (
    <div className="bg-white/10 rounded-xl p-4 mb-4">
      <Skeleton width={150} height={24} baseColor="#334155" highlightColor="#475569" />
      <div className="flex overflow-x-auto gap-4 pb-2 mt-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex flex-col items-center min-w-[60px]">
              <Skeleton width={40} height={16} baseColor="#334155" highlightColor="#475569" />
              <Skeleton circle width={48} height={48} baseColor="#334155" highlightColor="#475569" className="my-2" />
              <Skeleton width={30} height={24} baseColor="#334155" highlightColor="#475569" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default HourlyForecastSkeleton
