"use client"
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"

// System health data
const data = [
  { name: "Score", value: 82, color: "#10b981" },
  { name: "Remaining", value: 18, color: "#e5e7eb" },
]

export function SystemHealthGauge() {
  return (
    <div className="relative w-full h-[200px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Pie
            data={[{ value: 100 }]}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="55%"
            outerRadius="85%"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">82%</div>
        <div className="text-sm text-muted-foreground">System Health</div>
      </div>
    </div>
  )
}
