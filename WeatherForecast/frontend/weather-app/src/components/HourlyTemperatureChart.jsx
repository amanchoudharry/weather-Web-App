"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const HourlyTemperatureChart = ({ hourlyData, unit }) => {
  if (!hourlyData || hourlyData.length === 0) return null

  // Format data for the chart
  const chartData = hourlyData.map((hour) => ({
    time: hour.time,
    temperature: Number.parseFloat(hour.temperature || hour.temp || 0),
    icon: hour.icon,
    condition: hour.condition,
  }))

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-lg">
          <p className="text-sm font-medium">{data.time}</p>
          <div className="flex items-center gap-2 mt-1">
            {data.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt={data.condition}
                className="w-10 h-10"
              />
            )}
            <p className="text-lg font-semibold">
              {data.temperature}
              {unit}
            </p>
          </div>
          <p className="text-xs text-gray-300">{data.condition}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white/10 rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">Temperature Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="time"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
              tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
              tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
              domain={["dataMin - 2", "dataMax + 2"]}
              label={{
                value: unit,
                angle: -90,
                position: "insideLeft",
                style: { fill: "rgba(255,255,255,0.7)" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#1e3a8a",
                r: 4,
              }}
              activeDot={{
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#1e3a8a",
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HourlyTemperatureChart
