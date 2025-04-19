import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const WeatherDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Sunrise & Sunset Card */}
      <div className="bg-white/10 rounded-xl p-4">
        <Skeleton width={150} height={24} baseColor="#334155" highlightColor="#475569" />
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Skeleton circle width={48} height={48} baseColor="#334155" highlightColor="#475569" className="mr-4" />
            <div>
              <Skeleton width={80} height={16} baseColor="#334155" highlightColor="#475569" />
              <Skeleton width={60} height={24} baseColor="#334155" highlightColor="#475569" className="mt-1" />
            </div>
          </div>
          <div className="flex items-center">
            <Skeleton circle width={48} height={48} baseColor="#334155" highlightColor="#475569" className="mr-4" />
            <div>
              <Skeleton width={80} height={16} baseColor="#334155" highlightColor="#475569" />
              <Skeleton width={60} height={24} baseColor="#334155" highlightColor="#475569" className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Wind Information Card */}
      <div className="bg-white/10 rounded-xl p-4">
        <Skeleton width={150} height={24} baseColor="#334155" highlightColor="#475569" />
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Skeleton circle width={48} height={48} baseColor="#334155" highlightColor="#475569" className="mr-4" />
            <div>
              <Skeleton width={80} height={16} baseColor="#334155" highlightColor="#475569" />
              <Skeleton width={60} height={24} baseColor="#334155" highlightColor="#475569" className="mt-1" />
            </div>
          </div>
          <div className="flex items-center">
            <Skeleton circle width={48} height={48} baseColor="#334155" highlightColor="#475569" className="mr-4" />
            <div>
              <Skeleton width={80} height={16} baseColor="#334155" highlightColor="#475569" />
              <Skeleton width={60} height={24} baseColor="#334155" highlightColor="#475569" className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Visibility Card */}
      <div className="bg-white/10 rounded-xl p-4">
        <Skeleton width={150} height={24} baseColor="#334155" highlightColor="#475569" />
        <div className="flex items-center mt-4">
          <Skeleton circle width={48} height={48} baseColor="#334155" highlightColor="#475569" className="mr-4" />
          <div>
            <Skeleton width={120} height={16} baseColor="#334155" highlightColor="#475569" />
            <Skeleton width={80} height={24} baseColor="#334155" highlightColor="#475569" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Feels Like Temperature Card */}
      <div className="bg-white/10 rounded-xl p-4">
        <Skeleton width={150} height={24} baseColor="#334155" highlightColor="#475569" />
        <div className="flex items-center mt-4">
          <Skeleton circle width={48} height={48} baseColor="#334155" highlightColor="#475569" className="mr-4" />
          <div>
            <Skeleton width={160} height={16} baseColor="#334155" highlightColor="#475569" />
            <Skeleton width={80} height={24} baseColor="#334155" highlightColor="#475569" className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetailsSkeleton
