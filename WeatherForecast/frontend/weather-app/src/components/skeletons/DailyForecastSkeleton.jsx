import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const DailyForecastSkeleton = () => {
  return (
    <div className="bg-white/10 rounded-xl p-4 mb-4">
      <Skeleton width={150} height={24} baseColor="#334155" highlightColor="#475569" />
      <div className="space-y-4 mt-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <Skeleton width={80} height={20} baseColor="#334155" highlightColor="#475569" />
              <div className="flex items-center gap-2">
                <Skeleton circle width={32} height={32} baseColor="#334155" highlightColor="#475569" />
                <Skeleton width={60} height={16} baseColor="#334155" highlightColor="#475569" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton width={30} height={16} baseColor="#334155" highlightColor="#475569" />
                <Skeleton width={64} height={8} baseColor="#334155" highlightColor="#475569" borderRadius={4} />
                <Skeleton width={30} height={16} baseColor="#334155" highlightColor="#475569" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DailyForecastSkeleton
