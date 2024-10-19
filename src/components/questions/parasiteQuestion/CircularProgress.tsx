import React, { useEffect, useState } from 'react'

interface CircularProgressProps {
  size: number // Diameter of the circle
  strokeWidth: number // Width of the circle stroke
  duration: number // Duration in seconds to fill the circle
  color: string // Progress color
  onCompleted?: () => void // Callback function when progress completes
}

const CircularProgress: React.FC<CircularProgressProps> = ({ size, strokeWidth, duration, color, onCompleted }) => {
  const [progress, setProgress] = useState(0) // Progress starts at 0

  // Circle dimensions and calculations
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    // Animate progress to 100% over the specified duration
    const startTime = Date.now()

    const updateProgress = () => {
      const elapsedTime = (Date.now() - startTime) / 1000
      const percentage = Math.min((elapsedTime / duration) * 100, 100)
      setProgress(percentage)

      if (percentage < 100) {
        requestAnimationFrame(updateProgress)
      } else if (onCompleted) {
        onCompleted()
      }
    }

    updateProgress() // Start the progress update

    return () => {
      // Cleanup if the component is unmounted
      setProgress(0)
    }
  }, [duration, onCompleted])

  return (
    <svg width={size} height={size} className='progress-circle'>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill='none'
        stroke='#e6e6e6' // Background color of the circle
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill='none'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap='round'
        style={{
          transition: `stroke-dashoffset 0.1s ease-in-out`,
        }}
      />
      {/* Text in the center */}
      <text x='50%' y='50%' dominantBaseline='middle' textAnchor='middle' fontSize='20px' fill={color}>
        {Math.round(progress)}%
      </text>
    </svg>
  )
}

export default CircularProgress
