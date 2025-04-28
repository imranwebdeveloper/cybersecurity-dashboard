"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate random security event data
const generateData = () => {
  const now = new Date()
  const data = []

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now)
    time.setHours(now.getHours() - i)

    data.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      malware: Math.floor(Math.random() * 10),
      phishing: Math.floor(Math.random() * 8),
      unauthorized: Math.floor(Math.random() * 5),
      ddos: Math.floor(Math.random() * 15),
    })
  }

  return data
}

export function SecurityChart() {
  const [data, setData] = useState(generateData())

  // Update data every 30 seconds to simulate real-time
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...data.slice(1)]
      const now = new Date()

      newData.push({
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        malware: Math.floor(Math.random() * 10),
        phishing: Math.floor(Math.random() * 8),
        unauthorized: Math.floor(Math.random() * 5),
        ddos: Math.floor(Math.random() * 15),
      })

      setData(newData)
    }, 30000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <ChartContainer
      config={{
        malware: {
          label: "Malware",
          color: "hsl(var(--chart-1))",
        },
        phishing: {
          label: "Phishing",
          color: "hsl(var(--chart-2))",
        },
        unauthorized: {
          label: "Unauthorized Access",
          color: "hsl(var(--chart-3))",
        },
        ddos: {
          label: "DDoS Attempts",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="aspect-[16/9]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs text-muted-foreground"
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} className="text-xs text-muted-foreground" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="malware"
            stackId="1"
            stroke="var(--color-malware)"
            fill="var(--color-malware)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="phishing"
            stackId="1"
            stroke="var(--color-phishing)"
            fill="var(--color-phishing)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="unauthorized"
            stackId="1"
            stroke="var(--color-unauthorized)"
            fill="var(--color-unauthorized)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="ddos"
            stackId="1"
            stroke="var(--color-ddos)"
            fill="var(--color-ddos)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
