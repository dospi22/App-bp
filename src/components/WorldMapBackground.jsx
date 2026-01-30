import { useEffect, useRef } from 'react'

const WorldMapBackground = ({ className = '' }) => {
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

    const drawWorldMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = Math.min(canvas.width, canvas.height) * 0.4

      // More detailed world map wireframe (teal/cyan - visibile su sfondo scuro)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)'
      ctx.lineWidth = 2

      // North America - More detailed
      ctx.beginPath()
      // Alaska
      ctx.moveTo(centerX - scale * 0.9, centerY - scale * 0.6)
      ctx.lineTo(centerX - scale * 0.85, centerY - scale * 0.5)
      ctx.lineTo(centerX - scale * 0.8, centerY - scale * 0.45)
      // Canada/USA West Coast
      ctx.lineTo(centerX - scale * 0.75, centerY - scale * 0.4)
      ctx.lineTo(centerX - scale * 0.7, centerY - scale * 0.35)
      ctx.lineTo(centerX - scale * 0.65, centerY - scale * 0.3)
      // USA East Coast
      ctx.lineTo(centerX - scale * 0.5, centerY - scale * 0.25)
      ctx.lineTo(centerX - scale * 0.45, centerY - scale * 0.2)
      ctx.lineTo(centerX - scale * 0.4, centerY - scale * 0.15)
      // USA South
      ctx.lineTo(centerX - scale * 0.4, centerY)
      ctx.lineTo(centerX - scale * 0.45, centerY + scale * 0.1)
      // Mexico/Central America
      ctx.lineTo(centerX - scale * 0.5, centerY + scale * 0.2)
      ctx.lineTo(centerX - scale * 0.55, centerY + scale * 0.25)
      ctx.lineTo(centerX - scale * 0.6, centerY + scale * 0.2)
      // Back to start
      ctx.lineTo(centerX - scale * 0.7, centerY - scale * 0.1)
      ctx.closePath()
      ctx.stroke()

      // South America - More detailed
      ctx.beginPath()
      ctx.moveTo(centerX - scale * 0.55, centerY + scale * 0.25)
      // North coast
      ctx.lineTo(centerX - scale * 0.5, centerY + scale * 0.3)
      // East coast
      ctx.lineTo(centerX - scale * 0.45, centerY + scale * 0.4)
      ctx.lineTo(centerX - scale * 0.4, centerY + scale * 0.5)
      ctx.lineTo(centerX - scale * 0.35, centerY + scale * 0.6)
      ctx.lineTo(centerX - scale * 0.3, centerY + scale * 0.7)
      // South tip
      ctx.lineTo(centerX - scale * 0.25, centerY + scale * 0.75)
      // West coast
      ctx.lineTo(centerX - scale * 0.3, centerY + scale * 0.7)
      ctx.lineTo(centerX - scale * 0.35, centerY + scale * 0.6)
      ctx.lineTo(centerX - scale * 0.4, centerY + scale * 0.5)
      ctx.lineTo(centerX - scale * 0.45, centerY + scale * 0.4)
      ctx.closePath()
      ctx.stroke()

      // Europe - More detailed
      ctx.beginPath()
      // Scandinavia
      ctx.moveTo(centerX - scale * 0.15, centerY - scale * 0.5)
      ctx.lineTo(centerX - scale * 0.1, centerY - scale * 0.45)
      // UK
      ctx.lineTo(centerX - scale * 0.2, centerY - scale * 0.4)
      ctx.lineTo(centerX - scale * 0.15, centerY - scale * 0.35)
      // Mainland Europe
      ctx.lineTo(centerX - scale * 0.05, centerY - scale * 0.3)
      ctx.lineTo(centerX + scale * 0.05, centerY - scale * 0.25)
      ctx.lineTo(centerX + scale * 0.1, centerY - scale * 0.2)
      ctx.lineTo(centerX + scale * 0.15, centerY - scale * 0.15)
      // Mediterranean
      ctx.lineTo(centerX + scale * 0.1, centerY)
      ctx.lineTo(centerX, centerY + scale * 0.05)
      // Back
      ctx.lineTo(centerX - scale * 0.1, centerY - scale * 0.1)
      ctx.closePath()
      ctx.stroke()

      // Africa - More detailed
      ctx.beginPath()
      ctx.moveTo(centerX - scale * 0.05, centerY + scale * 0.05)
      // North coast
      ctx.lineTo(centerX + scale * 0.05, centerY + scale * 0.1)
      // East coast
      ctx.lineTo(centerX + scale * 0.1, centerY + scale * 0.2)
      ctx.lineTo(centerX + scale * 0.15, centerY + scale * 0.35)
      ctx.lineTo(centerX + scale * 0.12, centerY + scale * 0.5)
      // South tip
      ctx.lineTo(centerX + scale * 0.05, centerY + scale * 0.55)
      // West coast
      ctx.lineTo(centerX - scale * 0.05, centerY + scale * 0.45)
      ctx.lineTo(centerX - scale * 0.08, centerY + scale * 0.3)
      ctx.closePath()
      ctx.stroke()

      // Asia - More detailed
      ctx.beginPath()
      // Russia/Siberia
      ctx.moveTo(centerX + scale * 0.15, centerY - scale * 0.4)
      ctx.lineTo(centerX + scale * 0.3, centerY - scale * 0.35)
      ctx.lineTo(centerX + scale * 0.45, centerY - scale * 0.3)
      ctx.lineTo(centerX + scale * 0.55, centerY - scale * 0.25)
      // China
      ctx.lineTo(centerX + scale * 0.6, centerY - scale * 0.15)
      ctx.lineTo(centerX + scale * 0.65, centerY - scale * 0.1)
      // India
      ctx.lineTo(centerX + scale * 0.6, centerY)
      ctx.lineTo(centerX + scale * 0.55, centerY + scale * 0.05)
      // Southeast Asia
      ctx.lineTo(centerX + scale * 0.6, centerY + scale * 0.1)
      ctx.lineTo(centerX + scale * 0.55, centerY + scale * 0.15)
      // Japan
      ctx.moveTo(centerX + scale * 0.7, centerY - scale * 0.1)
      ctx.lineTo(centerX + scale * 0.75, centerY - scale * 0.08)
      ctx.lineTo(centerX + scale * 0.72, centerY - scale * 0.05)
      ctx.closePath()
      ctx.stroke()

      // Australia
      ctx.beginPath()
      ctx.moveTo(centerX + scale * 0.55, centerY + scale * 0.4)
      ctx.lineTo(centerX + scale * 0.6, centerY + scale * 0.42)
      ctx.lineTo(centerX + scale * 0.65, centerY + scale * 0.4)
      ctx.lineTo(centerX + scale * 0.6, centerY + scale * 0.45)
      ctx.closePath()
      ctx.stroke()

      // Light rays effect (vertical streaks)
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 9) * (i + 1)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    const animate = () => {
      drawWorldMap()
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

export default WorldMapBackground
