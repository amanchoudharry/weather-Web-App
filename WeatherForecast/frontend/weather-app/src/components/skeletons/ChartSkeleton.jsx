import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const ChartSkeleton = () => {
  return (
    <div className="bg-white/10 rounded-xl p-4 mb-4">
      <Skeleton width={150} height={24} baseColor="#334155" highlightColor="#475569" />
      <div className="h-64 mt-4">
        <Skeleton height="100%" baseColor="#334155" highlightColor="#475569" />
      </div>
    </div>
  )
}

export default ChartSkeleton
