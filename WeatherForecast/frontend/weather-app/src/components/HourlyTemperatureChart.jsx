"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const HourlyTemperatureChart = ({ hourlyData, unit, locationTime }) => {
  if (!hourlyData || hourlyData.length === 0 || !locationTime) return null;

  // Parse location time (format: "2025-04-20 07:59")
  const [datePart, timePart] = locationTime.split(' ');
  const [hours, minutes] = timePart.split(':').map(num => parseInt(num));
  
  // Create a sorted array of the next 24 hours from the location's current time
  const sortedData = [...hourlyData]
    .sort((a, b) => {
      const timeA = parseInt(a.time.split(':')[0]);
      const timeB = parseInt(b.time.split(':')[0]);
      return timeA - timeB;
    });

  // Find the index where we should start based on the current hour
  const startIndex = sortedData.findIndex(item => {
    const itemHour = parseInt(item.time.split(':')[0]);
    return itemHour >= hours;
  });

  // Reorder the array to start from the current hour
  const reorderedData = [
    ...sortedData.slice(startIndex),
    ...sortedData.slice(0, startIndex)
  ].slice(0, 24);

  // Format data for the chart
  const chartData = reorderedData.map((hour) => ({
    time: hour.time,
    temperature: Number.parseFloat(hour.temperature || hour.temp || 0),
    icon: hour.icon,
    condition: hour.condition,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-lg">
          <p className="text-sm font-medium">{data.time}</p>
          <div className="flex items-center gap-2 mt-1">
            {data.icon && (
              <img
                src={`https:${data.icon}`}
                alt={data.condition}
                className="w-10 h-10"
              />
            )}
            <p className="text-lg font-semibold">
              {Math.round(data.temperature)}
              {unit}
            </p>
          </div>
          <p className="text-xs text-gray-300">{data.condition}</p>
        </div>
      )
    }
    return null
  }

  // Custom tick component
  const CustomTick = ({ x, y, payload }) => {
    const data = chartData.find(item => item.time === payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={12}>
          {payload.value}
        </text>
        {data?.icon && (
          <image
            x={-12}
            y={20}
            width={24}
            height={24}
            href={`https:${data.icon}`}
          />
        )}
      </g>
    )
  }

  return (
    <div className="bg-white/10 rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">
        24 Hour Forecast
        <span className="text-sm font-normal text-gray-400 ml-2">
          ({locationTime} Local Time)
        </span>
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 40,
            }}
          >
            <XAxis
              dataKey="time"
              tick={<CustomTick />}
              axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
              tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
              height={60}
            />
            <YAxis 
              hide={true}
              domain={["dataMin - 2", "dataMax + 2"]}
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
