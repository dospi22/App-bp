import { useEffect, useRef } from 'react'

const HexagonalGrid = ({ className = '' }) => {
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

    const hexSize = 40
    const hexWidth = hexSize * Math.sqrt(3)
    const hexHeight = hexSize * 2

    const drawHexagon = (x, y, size, alpha = 0.1) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const cols = Math.ceil(canvas.width / hexWidth) + 1
      const rows = Math.ceil(canvas.height / hexHeight) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + (row % 2 === 0 ? 0 : hexWidth / 2)
          const y = row * hexHeight * 0.75
          
          // Vary opacity for depth effect
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          )
          const maxDistance = Math.sqrt(
            Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
          )
          const alpha = 0.15 * (1 - distanceFromCenter / maxDistance)
          
          drawHexagon(x, y, hexSize, alpha)
        }
      }
    }

    const animate = () => {
      drawGrid()
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
      style={{ opacity: 0.4 }}
    />
  )
}

export default HexagonalGrid
