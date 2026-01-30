import { useEffect, useRef } from 'react'

const FinancialCharts = ({ className = '' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let time = 0

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawFinancialCharts = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const chartY = canvas.height * 0.75
      const chartWidth = canvas.width * 0.7
      const startX = canvas.width * 0.15

      ctx.save()
      ctx.globalAlpha = 0.8
      ctx.strokeStyle = '#06b6d4'
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)'
      ctx.lineWidth = 2

      // Line Chart (left side) - animated
      ctx.beginPath()
      const linePoints = []
      const numPoints = 12
      for (let i = 0; i < numPoints; i++) {
        const x = startX + (i / (numPoints - 1)) * (chartWidth * 0.4)
        const baseY = chartY - 40
        const variation = Math.sin((time + i) * 0.1) * 20
        const trend = (i / numPoints) * 30
        const y = baseY - trend + variation
        linePoints.push({ x, y })
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Fill area under line
      ctx.lineTo(linePoints[linePoints.length - 1].x, chartY)
      ctx.lineTo(linePoints[0].x, chartY)
      ctx.closePath()
      ctx.fill()

      // Data points with glow
      linePoints.forEach(point => {
        ctx.fillStyle = '#06b6d4'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#06b6d4'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Bar Chart (middle)
      const barStartX = startX + chartWidth * 0.45
      const bars = [60, 45, 70, 55, 80, 65, 75, 50]
      bars.forEach((height, index) => {
        const barX = barStartX + index * 25
        const barWidth = 18
        const animatedHeight = height + Math.sin(time * 0.05 + index) * 5
        
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)'
        ctx.fillRect(barX, chartY - animatedHeight, barWidth, animatedHeight)
        
        ctx.strokeStyle = '#06b6d4'
        ctx.strokeRect(barX, chartY - animatedHeight, barWidth, animatedHeight)
        
        // Glow on top
        ctx.shadowBlur = 8
        ctx.shadowColor = '#06b6d4'
        ctx.fillRect(barX, chartY - animatedHeight, barWidth, 2)
        ctx.shadowBlur = 0
      })

      // Candlestick Chart (right side)
      const candleStartX = startX + chartWidth * 0.7
      const candles = [
        { open: 50, close: 60, high: 65, low: 45 },
        { open: 55, close: 50, high: 60, low: 48 },
        { open: 52, close: 58, high: 62, low: 50 },
        { open: 58, close: 55, high: 63, low: 52 },
        { open: 55, close: 62, high: 65, low: 53 }
      ]
      
      candles.forEach((candle, index) => {
        const candleX = candleStartX + index * 35
        const isUp = candle.close > candle.open
        
        // Wick
        ctx.strokeStyle = '#06b6d4'
        ctx.lineWidth = 1.5
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
        ctx.strokeStyle = isUp ? '#06b6d4' : '#14b8a6'
        ctx.strokeRect(candleX - 8, chartY - bodyBottom, 16, bodyHeight)
      })

      // Grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)'
      ctx.lineWidth = 1
      for (let i = 0; i < 6; i++) {
        const y = chartY - (i * 20)
        ctx.beginPath()
        ctx.moveTo(startX, y)
        ctx.lineTo(startX + chartWidth, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i < 8; i++) {
        const x = startX + (i / 7) * chartWidth
        ctx.beginPath()
        ctx.moveTo(x, chartY - 80)
        ctx.lineTo(x, chartY)
        ctx.stroke()
      }

      // Chart labels/values (simplified)
      ctx.fillStyle = 'rgba(6, 182, 212, 0.6)'
      ctx.font = '10px monospace'
      ctx.fillText('$', startX - 20, chartY - 70)
      ctx.fillText('0', startX - 15, chartY + 5)

      ctx.restore()
    }

    const animate = () => {
      time += 0.5
      drawFinancialCharts()
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
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default FinancialCharts
