"use client"

import React from 'react'
import { useEffect, useState } from "react"
import { getAnimationComponent } from '../utils/weatherConditions'
import SunnyAnimation from "./animations/SunnyAnimation"
import CloudyAnimation from "./animations/CloudyAnimation"
import RainyAnimation from "./animations/RainyAnimation"
import SnowyAnimation from "./animations/SnowyAnimation"
import ThunderAnimation from "./animations/ThunderAnimation"
import FoggyAnimation from "./animations/FoggyAnimation"

const WeatherBackground = ({ condition }) => {
  const getBackground = (condition) => {
    if (!condition) return "from-blue-400 via-blue-300 to-blue-200"

    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
      return "from-sky-200 via-sky-400 to-blue-600"
    } else if (lowerCondition.includes("cloud")) {
      return "from-gray-300 via-gray-200 to-gray-100"
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return "from-gray-400 via-gray-300 to-gray-200"
    } else if (lowerCondition.includes("snow")) {
      return "from-slate-300 via-slate-200 to-slate-100"
    } else if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
      return "from-slate-600 via-slate-500 to-slate-400"
    } else if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
      return "from-gray-300 via-gray-200 to-gray-100"
    }
    return "from-blue-400 via-blue-300 to-blue-200"
  }

  const getAnimationByCondition = () => {
    if (!condition) return <CloudyAnimation />;

    const animationName = getAnimationComponent(condition);
    switch (animationName) {
      case 'SunnyAnimation':
        return <SunnyAnimation />;
      case 'CloudyAnimation':
        return <CloudyAnimation />;
      case 'RainyAnimation':
        return <RainyAnimation />;
      case 'SnowyAnimation':
        return <SnowyAnimation />;
      case 'ThunderAnimation':
        return <ThunderAnimation />;
      case 'FoggyAnimation':
        return <FoggyAnimation />;
      default:
        return <CloudyAnimation />;
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getBackground(condition)} transition-colors duration-500`}></div>
      
      {/* Weather animation */}
      {getAnimationByCondition()}
    </div>
  )
}

export default WeatherBackground
