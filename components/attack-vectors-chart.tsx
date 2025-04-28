"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate random attack vector data
const data = [
  { name: "Jan", malware: 65, phishing: 42, ddos: 23, ransomware: 18, zeroday: 7 },
  { name: "Feb", malware: 59, phishing: 38, ddos: 27, ransomware: 22, zeroday: 5 },
  { name: "Mar", malware: 80, phishing: 52, ddos: 19, ransomware: 29, zeroday: 12 },
  { name: "Apr", malware: 81, phishing: 41, ddos: 33, ransomware: 25, zeroday: 9 },
  { name: "May", malware: 56, phishing: 33, ddos: 45, ransomware: 31, zeroday: 8 },
  { name: "Jun", malware: 55, phishing: 48, ddos: 36, ransomware: 28, zeroday: 14 },
  { name: "Jul", malware: 72, phishing: 50, ddos: 39, ransomware: 24, zeroday: 11 },
]

export function AttackVectorsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Bar dataKey="malware" name="Malware" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="phishing" name="Phishing" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="ddos" name="DDoS" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="ransomware" name="Ransomware" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="zeroday" name="Zero-Day" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
