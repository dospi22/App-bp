import { useEffect, useRef } from 'react'

const HandsWithCharts = ({ className = '' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawHumanHand = () => {
      const centerX = canvas.width * 0.3
      const centerY = canvas.height * 0.7
      
      ctx.save()
      ctx.globalAlpha = 0.6
      ctx.strokeStyle = '#06b6d4'
      ctx.fillStyle = 'rgba(6, 182, 212, 0.2)'
      ctx.lineWidth = 2

      // Hand outline (left hand)
      ctx.beginPath()
      // Wrist
      ctx.moveTo(centerX - 30, centerY + 80)
      ctx.lineTo(centerX - 20, centerY + 60)
      // Palm
      ctx.quadraticCurveTo(centerX - 10, centerY + 40, centerX, centerY + 30)
      ctx.quadraticCurveTo(centerX + 20, centerY + 25, centerX + 30, centerY + 20)
      // Thumb
      ctx.lineTo(centerX + 35, centerY + 10)
      ctx.lineTo(centerX + 40, centerY)
      ctx.lineTo(centerX + 35, centerY - 10)
      ctx.lineTo(centerX + 30, centerY - 5)
      // Index finger
      ctx.lineTo(centerX + 25, centerY - 20)
      ctx.lineTo(centerX + 20, centerY - 35)
      ctx.lineTo(centerX + 15, centerY - 40)
      ctx.lineTo(centerX + 10, centerY - 35)
      // Middle finger
      ctx.lineTo(centerX + 5, centerY - 45)
      ctx.lineTo(centerX, centerY - 55)
      ctx.lineTo(centerX - 5, centerY - 50)
      // Ring finger
      ctx.lineTo(centerX - 10, centerY - 40)
      ctx.lineTo(centerX - 15, centerY - 45)
      ctx.lineTo(centerX - 20, centerY - 40)
      // Pinky
      ctx.lineTo(centerX - 25, centerY - 30)
      ctx.lineTo(centerX - 30, centerY - 25)
      ctx.lineTo(centerX - 25, centerY - 20)
      // Back to wrist
      ctx.lineTo(centerX - 20, centerY + 10)
      ctx.lineTo(centerX - 25, centerY + 40)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = '#06b6d4'
      ctx.stroke()
      ctx.shadowBlur = 0

      // Particles on hand
      for (let i = 0; i < 15; i++) {
        const x = centerX + (Math.random() - 0.5) * 60
        const y = centerY + (Math.random() - 0.5) * 80
        ctx.fillStyle = '#06b6d4'
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const drawRobotHand = () => {
      const centerX = canvas.width * 0.7
      const centerY = canvas.height * 0.7
      
      ctx.save()
      ctx.globalAlpha = 0.6
      ctx.strokeStyle = '#14b8a6'
      ctx.fillStyle = 'rgba(20, 184, 166, 0.2)'
      ctx.lineWidth = 2

      // Robot hand outline (right hand) - more geometric
      ctx.beginPath()
      // Wrist (rectangular)
      ctx.moveTo(centerX + 30, centerY + 80)
      ctx.lineTo(centerX + 20, centerY + 60)
      ctx.lineTo(centerX + 10, centerY + 55)
      ctx.lineTo(centerX, centerY + 50)
      // Palm (more angular)
      ctx.lineTo(centerX - 10, centerY + 40)
      ctx.lineTo(centerX - 20, centerY + 30)
      ctx.lineTo(centerX - 25, centerY + 20)
      // Thumb (geometric)
      ctx.lineTo(centerX - 30, centerY + 10)
      ctx.lineTo(centerX - 35, centerY)
      ctx.lineTo(centerX - 30, centerY - 10)
      ctx.lineTo(centerX - 25, centerY - 5)
      // Index finger (straight lines)
      ctx.lineTo(centerX - 20, centerY - 20)
      ctx.lineTo(centerX - 15, centerY - 35)
      ctx.lineTo(centerX - 10, centerY - 40)
      ctx.lineTo(centerX - 5, centerY - 35)
      // Middle finger
      ctx.lineTo(centerX, centerY - 45)
      ctx.lineTo(centerX + 5, centerY - 55)
      ctx.lineTo(centerX + 10, centerY - 50)
      // Ring finger
      ctx.lineTo(centerX + 15, centerY - 40)
      ctx.lineTo(centerX + 20, centerY - 45)
      ctx.lineTo(centerX + 25, centerY - 40)
      // Pinky
      ctx.lineTo(centerX + 30, centerY - 30)
      ctx.lineTo(centerX + 35, centerY - 25)
      ctx.lineTo(centerX + 30, centerY - 20)
      // Back to wrist
      ctx.lineTo(centerX + 25, centerY + 10)
      ctx.lineTo(centerX + 20, centerY + 40)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Robot joints (circular)
      const joints = [
        { x: centerX - 15, y: centerY + 15 },
        { x: centerX - 10, y: centerY - 10 },
        { x: centerX, y: centerY - 20 },
        { x: centerX + 10, y: centerY - 15 },
        { x: centerX + 20, y: centerY - 10 }
      ]
      
      joints.forEach(joint => {
        ctx.fillStyle = '#14b8a6'
        ctx.beginPath()
        ctx.arc(joint.x, joint.y, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = '#14b8a6'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = '#14b8a6'
      ctx.stroke()
      ctx.shadowBlur = 0

      // Tech particles
      for (let i = 0; i < 15; i++) {
        const x = centerX + (Math.random() - 0.5) * 60
        const y = centerY + (Math.random() - 0.5) * 80
        ctx.fillStyle = '#14b8a6'
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    const drawFinancialCharts = () => {
      const chartY = canvas.height * 0.85
      const chartWidth = canvas.width * 0.8
      const chartHeight = 100
      const startX = canvas.width * 0.1

      ctx.save()
      ctx.globalAlpha = 0.7
      ctx.strokeStyle = '#06b6d4'
      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)'
      ctx.lineWidth = 2

      // Line Chart (left side)
      ctx.beginPath()
      const linePoints = [
        { x: startX + 50, y: chartY - 20 },
        { x: startX + 100, y: chartY - 40 },
        { x: startX + 150, y: chartY - 30 },
        { x: startX + 200, y: chartY - 50 },
        { x: startX + 250, y: chartY - 35 },
        { x: startX + 300, y: chartY - 45 }
      ]
      
      ctx.moveTo(linePoints[0].x, linePoints[0].y)
      for (let i = 1; i < linePoints.length; i++) {
        ctx.lineTo(linePoints[i].x, linePoints[i].y)
      }
      ctx.stroke()

      // Fill area under line
      ctx.lineTo(linePoints[linePoints.length - 1].x, chartY)
      ctx.lineTo(linePoints[0].x, chartY)
      ctx.closePath()
      ctx.fill()

      // Data points
      linePoints.forEach(point => {
        ctx.fillStyle = '#06b6d4'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Bar Chart (middle)
      const barStartX = startX + 350
      const bars = [60, 45, 70, 55, 80, 65, 75]
      bars.forEach((height, index) => {
        const barX = barStartX + index * 30
        const barWidth = 20
        
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)'
        ctx.fillRect(barX, chartY - height, barWidth, height)
        
        ctx.strokeStyle = '#06b6d4'
        ctx.strokeRect(barX, chartY - height, barWidth, height)
      })

      // Candlestick Chart (right side)
      const candleStartX = startX + 600
      const candles = [
        { open: 50, close: 60, high: 65, low: 45 },
        { open: 55, close: 50, high: 60, low: 48 },
        { open: 52, close: 58, high: 62, low: 50 },
        { open: 58, close: 55, high: 63, low: 52 }
      ]
      
      candles.forEach((candle, index) => {
        const candleX = candleStartX + index * 40
        const isUp = candle.close > candle.open
        
        // Wick
        ctx.strokeStyle = '#06b6d4'
        ctx.beginPath()
        ctx.moveTo(candleX, chartY - candle.high)
        ctx.lineTo(candleX, chartY - candle.low)
        ctx.stroke()
        
        // Body
        const bodyTop = Math.min(candle.open, candle.close)
        const bodyBottom = Math.max(candle.open, candle.close)
        const bodyHeight = bodyBottom - bodyTop
        
        ctx.fillStyle = isUp ? 'rgba(6, 182, 212, 0.8)' : 'rgba(20, 184, 166, 0.8)'
        ctx.fillRect(candleX - 8, chartY - bodyBottom, 16, bodyHeight)
        ctx.strokeRect(candleX - 8, chartY - bodyBottom, 16, bodyHeight)
      })

      // Grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)'
      ctx.lineWidth = 1
      for (let i = 0; i < 5; i++) {
        const y = chartY - (i * 20)
        ctx.beginPath()
        ctx.moveTo(startX, y)
        ctx.lineTo(startX + chartWidth, y)
        ctx.stroke()
      }

      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw charts first (behind hands)
      drawFinancialCharts()
      
      // Draw hands on top
      drawHumanHand()
      drawRobotHand()
      
      // Connection point glow where hands meet
      const connectionX = canvas.width * 0.5
      const connectionY = canvas.height * 0.65
      
      ctx.save()
      ctx.globalAlpha = 0.5
      const gradient = ctx.createRadialGradient(connectionX, connectionY, 0, connectionX, connectionY, 50)
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.8)')
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(connectionX, connectionY, 50, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  )
}

export default HandsWithCharts
