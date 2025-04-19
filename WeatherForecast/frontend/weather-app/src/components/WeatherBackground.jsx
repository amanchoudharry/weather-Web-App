"use client"

import React from 'react'
import { useEffect, useState } from "react"
import SunnyAnimation from "./animations/SunnyAnimation"
import CloudyAnimation from "./animations/CloudyAnimation"
import RainyAnimation from "./animations/RainyAnimation"
import SnowyAnimation from "./animations/SnowyAnimation"
import ThunderAnimation from "./animations/ThunderStormAnimation"
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

  const getBackground = (condition) => {
    if (!condition) return "from-blue-500 to-blue-400"

    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
      return "from-blue-500 to-blue-400"
    } else if (lowerCondition.includes("cloud")) {
      return "from-gray-400 to-gray-300"
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return "from-gray-600 to-gray-500"
    } else if (lowerCondition.includes("snow")) {
      return "from-slate-500 to-slate-600"
    } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
      return "from-gray-800 to-gray-700"
    } else {
      return "from-blue-500 to-blue-400"
    }
  }

  const getAnimation = (condition) => {
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
      return <ThunderAnimation />
    }
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${getBackground(condition)} transition-colors duration-500`}
      ></div>

      {/* SVG Animation */}
      {getAnimation(condition)}

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
