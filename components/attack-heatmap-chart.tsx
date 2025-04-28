"use client"

import { useState } from "react"
import { Cell, Tooltip, XAxis, YAxis, ResponsiveContainer, Rectangle, ScatterChart, ZAxis } from "recharts"

// Generate random heatmap data for attack frequency by hour and day
const generateHeatmapData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const data = []

  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // More attacks during business hours and weekdays
      let baseValue = Math.random() * 10

      // Increase likelihood during business hours (9-17)
      if (hour >= 9 && hour <= 17) {
        baseValue *= 1.5
      }

      // Decrease on weekends
      if (day >= 5) {
        baseValue *= 0.6
      }

      data.push({
        day: days[day],
        hour: hour,
        value: Math.floor(baseValue),
        dayIndex: day,
      })
    }
  }
  return data
}

const data = generateHeatmapData()

// Color scale for the heatmap
const getColor = (value) => {
  const maxValue = 15
  const minValue = 0
  const ratio = (value - minValue) / (maxValue - minValue)

  // Color scale from blue (low) to red (high)
  if (ratio < 0.2) return "hsl(210, 100%, 90%)"
  if (ratio < 0.4) return "hsl(210, 100%, 70%)"
  if (ratio < 0.6) return "hsl(35, 100%, 70%)"
  if (ratio < 0.8) return "hsl(25, 100%, 65%)"
  return "hsl(0, 100%, 65%)"
}

export function AttackHeatmapChart() {
  const [tooltipContent, setTooltipContent] = useState(null)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card p-2 border rounded-md shadow-sm">
          <p className="font-medium">{`${data.day}, ${data.hour}:00`}</p>
          <p className="text-sm">{`${data.value} attacks`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis
          type="category"
          dataKey="hour"
          name="Hour"
          tick={{ fontSize: 12 }}
          tickFormatter={(hour) => `${hour}:00`}
          interval={3}
        />
        <YAxis type="category" dataKey="day" name="Day" tick={{ fontSize: 12 }} width={40} />
        <ZAxis type="number" dataKey="value" range={[0, 0]} />
        <Tooltip content={<CustomTooltip />} />
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            width={20}
            height={20}
            x={entry.hour * 20 + 20}
            y={entry.dayIndex * 20 + 20}
            fill={getColor(entry.value)}
          />
        ))}
        {data.map((entry, index) => (
          <Rectangle
            key={`rect-${index}`}
            x={entry.hour * 20 + 20}
            y={entry.dayIndex * 20 + 20}
            width={20}
            height={20}
            fill={getColor(entry.value)}
            fillOpacity={0.8}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  )
}
