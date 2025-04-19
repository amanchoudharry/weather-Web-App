import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const CurrentWeatherSkeleton = () => {
  return (
    <div className="text-white text-center py-8 px-4">
      <div className="flex justify-center">
        <Skeleton width={150} height={30} baseColor="#334155" highlightColor="#475569" />
      </div>
      <div className="flex justify-center mt-2">
        <Skeleton width={200} height={20} baseColor="#334155" highlightColor="#475569" />
      </div>

      <div className="flex justify-center my-4">
        <Skeleton width={180} height={120} baseColor="#334155" highlightColor="#475569" />
      </div>

      <div className="flex justify-center items-center gap-2">
        <Skeleton width={80} height={30} baseColor="#334155" highlightColor="#475569" borderRadius={20} />
      </div>
    </div>
  )
}

export default CurrentWeatherSkeleton
