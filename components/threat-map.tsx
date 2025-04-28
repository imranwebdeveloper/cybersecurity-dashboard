"use client"

import { useEffect, useRef, useState } from "react"

// Dummy data for threat map
const threatLocations = [
  { source: { lat: 37.7749, lng: -122.4194 }, target: { lat: 40.7128, lng: -74.006 }, type: "ddos" }, // SF to NYC
  { source: { lat: 51.5074, lng: -0.1278 }, target: { lat: 48.8566, lng: 2.3522 }, type: "malware" }, // London to Paris
  { source: { lat: 55.7558, lng: 37.6173 }, target: { lat: 52.52, lng: 13.405 }, type: "phishing" }, // Moscow to Berlin
  { source: { lat: 39.9042, lng: 116.4074 }, target: { lat: 35.6762, lng: 139.6503 }, type: "unauthorized" }, // Beijing to Tokyo
  { source: { lat: -33.8688, lng: 151.2093 }, target: { lat: 1.3521, lng: 103.8198 }, type: "malware" }, // Sydney to Singapore
  { source: { lat: 19.4326, lng: -99.1332 }, target: { lat: 40.7128, lng: -74.006 }, type: "phishing" }, // Mexico City to NYC
  { source: { lat: 25.2048, lng: 55.2708 }, target: { lat: 28.6139, lng: 77.209 }, type: "ddos" }, // Dubai to Delhi
]

// Colors for different attack types
const attackColors = {
  ddos: "#ef4444", // red
  malware: "#f59e0b", // amber
  phishing: "#8b5cf6", // purple
  unauthorized: "#06b6d4", // cyan
}

export function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()
  const [activeThreats, setActiveThreats] = useState<any[]>([])

  // Set up canvas dimensions
  useEffect(() => {
    if (canvasRef.current) {
      const updateDimensions = () => {
        if (canvasRef.current) {
          const { width, height } = canvasRef.current.getBoundingClientRect()
          setDimensions({ width, height })
          canvasRef.current.width = width
          canvasRef.current.height = height
        }
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)

      return () => {
        window.removeEventListener("resize", updateDimensions)
      }
    }
  }, [])

  // Convert lat/lng to x/y coordinates
  const latLngToXY = (lat: number, lng: number, width: number, height: number) => {
    // Simple Mercator projection
    const x = (lng + 180) * (width / 360)
    const latRad = (lat * Math.PI) / 180
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
    const y = height / 2 - (width * mercN) / (2 * Math.PI)
    return { x, y }
  }

  // Initialize active threats
  useEffect(() => {
    // Start with some initial threats
    const initialThreats = threatLocations.slice(0, 3).map((threat) => ({
      ...threat,
      progress: Math.random(), // Random progress
      speed: 0.001 + Math.random() * 0.003, // Random speed
      pulseSize: 0,
      pulseOpacity: 1,
    }))

    setActiveThreats(initialThreats)

    // Add new threats periodically
    const interval = setInterval(() => {
      setActiveThreats((prev) => {
        // Remove completed threats
        const filtered = prev.filter((t) => t.progress < 1)

        // Add a new threat if we have less than 5 active
        if (filtered.length < 5) {
          const newThreatIndex = Math.floor(Math.random() * threatLocations.length)
          const newThreat = {
            ...threatLocations[newThreatIndex],
            progress: 0,
            speed: 0.001 + Math.random() * 0.003,
            pulseSize: 0,
            pulseOpacity: 1,
          }
          return [...filtered, newThreat]
        }

        return filtered
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Load world map image
    const worldMap = new Image()
    worldMap.src = "/placeholder.svg?height=500&width=1000"
    worldMap.crossOrigin = "anonymous"

    worldMap.onload = () => {
      const animate = () => {
        if (!canvas) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw world map background
        ctx.globalAlpha = 0.2
        ctx.drawImage(worldMap, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1

        // Update and draw active threats
        setActiveThreats((prev) =>
          prev
            .map((threat) => {
              // Update progress
              const updatedThreat = {
                ...threat,
                progress: threat.progress + threat.speed,
                pulseSize: (threat.pulseSize + 0.02) % 1,
                pulseOpacity: threat.pulseSize > 0.5 ? 2 * (1 - threat.pulseSize) : 1,
              }

              // Draw the threat line
              const sourcePos = latLngToXY(threat.source.lat, threat.source.lng, canvas.width, canvas.height)
              const targetPos = latLngToXY(threat.target.lat, threat.target.lng, canvas.width, canvas.height)

              // Draw curved path
              ctx.beginPath()
              ctx.strokeStyle = attackColors[threat.type as keyof typeof attackColors]
              ctx.lineWidth = 1
              ctx.globalAlpha = 0.5

              // Create a curved line
              const midX = (sourcePos.x + targetPos.x) / 2
              const midY = (sourcePos.y + targetPos.y) / 2 - 50 // Control point above the midpoint

              ctx.moveTo(sourcePos.x, sourcePos.y)
              ctx.quadraticCurveTo(midX, midY, targetPos.x, targetPos.y)
              ctx.stroke()

              // Draw moving dot along the path
              const currentX = sourcePos.x + (targetPos.x - sourcePos.x) * updatedThreat.progress
              const currentY =
                sourcePos.y +
                (targetPos.y - sourcePos.y) * updatedThreat.progress -
                Math.sin(updatedThreat.progress * Math.PI) * 50

              ctx.globalAlpha = 1
              ctx.beginPath()
              ctx.fillStyle = attackColors[threat.type as keyof typeof attackColors]
              ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
              ctx.fill()

              // Draw source and target points
              ctx.beginPath()
              ctx.fillStyle = "#ef4444" // Source color (red)
              ctx.arc(sourcePos.x, sourcePos.y, 4, 0, Math.PI * 2)
              ctx.fill()

              ctx.beginPath()
              ctx.fillStyle = "#3b82f6" // Target color (blue)
              ctx.arc(targetPos.x, targetPos.y, 4, 0, Math.PI * 2)
              ctx.fill()

              // Draw pulse at target
              if (updatedThreat.progress > 0.9) {
                ctx.beginPath()
                ctx.globalAlpha = updatedThreat.pulseOpacity * 0.5
                ctx.fillStyle = attackColors[threat.type as keyof typeof attackColors]
                ctx.arc(targetPos.x, targetPos.y, 10 * updatedThreat.pulseSize, 0, Math.PI * 2)
                ctx.fill()
              }

              return updatedThreat
            })
            .filter((threat) => threat.progress < 1.2),
        )

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions])

  return <canvas ref={canvasRef} className="w-full h-full bg-slate-900" />
}
