"use client"

import { useEffect, useState } from "react"
import SunnyAnimation from "./animations/SunnyAnimation"
import CloudyAnimation from "./animations/CloudyAnimation"
import RainyAnimation from "./animations/RainyAnimation"
import SnowyAnimation from "./animations/SnowyAnimation"
import ThunderstormAnimation from "./animations/ThunderstormAnimation"
import FoggyAnimation from "./animations/FoggyAnimation"
import { Player } from "@lottiefiles/react-lottie-player"

const WeatherBackground = ({ condition }) => {
  const [lottieAnimation, setLottieAnimation] = useState(null)

  useEffect(() => {
    // Load appropriate Lottie animation based on weather condition
    if (!condition) return

    const lowerCondition = condition.toLowerCase()
    let animationPath = ""

    if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
      animationPath = "https://assets5.lottiefiles.com/packages/lf20_KUFdS6.json"
    } else if (lowerCondition.includes("cloud")) {
      animationPath = "https://assets9.lottiefiles.com/packages/lf20_trr3kzyu.json"
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      animationPath = "https://assets3.lottiefiles.com/packages/lf20_bco9p3ju.json"
    } else if (lowerCondition.includes("snow")) {
      animationPath = "https://assets6.lottiefiles.com/packages/lf20_jq3t6at2.json"
    } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
      animationPath = "https://assets6.lottiefiles.com/private_files/lf30_22gtsfnq.json"
    } else if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
      animationPath = "https://assets9.lottiefiles.com/packages/lf20_keiycwak.json"
    }

    setLottieAnimation(animationPath)
  }, [condition])

  const getWeatherAnimation = () => {
    if (!condition) return null

    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
      return <SunnyAnimation />
    } else if (lowerCondition.includes("cloud")) {
      return <CloudyAnimation />
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return <RainyAnimation />
    } else if (lowerCondition.includes("snow")) {
      return <SnowyAnimation />
    } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
      return <ThunderstormAnimation />
    } else if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
      return <FoggyAnimation />
    }

    return null
  }

  const getWeatherGradient = () => {
    if (!condition) return "from-[#0e172b] to-[#1f2f45]"

    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
      return "from-blue-500 to-sky-300"
    } else if (lowerCondition.includes("cloud")) {
      return "from-slate-600 to-slate-400"
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return "from-slate-700 to-slate-500"
    } else if (lowerCondition.includes("snow")) {
      return "from-slate-300 to-blue-200"
    } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
      return "from-slate-800 to-slate-600"
    } else if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
      return "from-gray-400 to-gray-300"
    } else {
      return "from-[#0e172b] to-[#1f2f45]"
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${getWeatherGradient()} transition-colors duration-1000`}
      ></div>

      {/* SVG Animation */}
      {getWeatherAnimation()}

      {/* Lottie Animation (positioned in a corner or as an overlay) */}
      {lottieAnimation && (
        <div className="absolute bottom-0 right-0 w-full h-full opacity-30 pointer-events-none">
          <Player
            autoplay
            loop
            src={lottieAnimation}
            style={{ width: "100%", height: "100%" }}
            background="transparent"
          />
        </div>
      )}
    </div>
  )
}

export default WeatherBackground
