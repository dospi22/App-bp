import { useEffect, useRef } from 'react'

const NeuralNetwork = ({ className = '' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let nodes = []
    let connections = []

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create nodes
    const createNodes = () => {
      nodes = []
      const nodeCount = 25
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01
        })
      }
    }

    // Create connections
    const createConnections = () => {
      connections = []
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 200) {
            connections.push({
              from: i,
              to: j,
              distance: distance,
              opacity: 1 - distance / 200
            })
          }
        }
      }
    }

    // Update nodes
    const updateNodes = () => {
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += node.pulseSpeed

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })
    }

    // Draw connections
    const drawConnections = () => {
      connections.forEach(conn => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]
        
        const gradient = ctx.createLinearGradient(
          fromNode.x, fromNode.y,
          toNode.x, toNode.y
        )
        gradient.addColorStop(0, `rgba(20, 184, 166, ${conn.opacity * 0.3})`)
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${conn.opacity * 0.4})`)
        gradient.addColorStop(1, `rgba(236, 72, 153, ${conn.opacity * 0.3})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()
      })
    }

    // Draw nodes
    const drawNodes = () => {
      nodes.forEach(node => {
        const pulseSize = Math.sin(node.pulse) * 2 + node.radius
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, pulseSize * 3
        )
        gradient.addColorStop(0, `rgba(20, 184, 166, ${0.6 + Math.sin(node.pulse) * 0.2})`)
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.4 + Math.sin(node.pulse) * 0.2})`)
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Node core
        const coreGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, pulseSize
        )
        coreGradient.addColorStop(0, '#14b8a6')
        coreGradient.addColorStop(0.5, '#8b5cf6')
        coreGradient.addColorStop(1, '#ec4899')

        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      updateNodes()
      createConnections()
      drawConnections()
      drawNodes()

      animationFrameId = requestAnimationFrame(animate)
    }

    createNodes()
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
      style={{ opacity: 0.6 }}
    />
  )
}

export default NeuralNetwork
