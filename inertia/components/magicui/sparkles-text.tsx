'use client'

import { motion } from 'motion/react'
import { CSSProperties, ReactElement, useEffect, useState } from 'react'

import { cn } from '../../lib/utils'

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

const Sparkle: React.FC<Sparkle> = ({ id, x, y, color, delay, scale }) => {
  return (
    <motion.svg
      key={id}
      className="pointer-events-none absolute z-20"
      style={{ left: x, top: y }} // <-- Set random position here
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [75, 120, 150],
      }}
      transition={{ duration: 2.25, repeat: Infinity, delay }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  )
}

interface SparklesTextProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the text
   * */
  as?: ReactElement

  /**
   * @default ""
   * @type string
   * @description
   * The className of the text
   */
  className?: string

  /**
   * @required
   * @type ReactNode
   * @description
   * The content to be displayed
   * */
  children: React.ReactNode

  /**
   * @default 10
   * @type number
   * @description
   * The count of sparkles
   * */
  sparklesCount?: number

  /**
   * @default "{first: '#9E7AFF', second: '#FE8BBB'}"
   * @type string
   * @description
   * The colors of the sparkles
   * */
  colors?: {
    first: string
    second: string
  }
}

export const SparklesText: React.FC<SparklesTextProps> = ({
  children,
  colors = { first: '#9E7AFF', second: '#FE8BBB' },
  className,
  sparklesCount = 10,
  ...props
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // Helper to check if a point is in the center exclusion zone
    const isInCenter = (x: number, y: number) => {
      return x > 30 && x < 70 && y > 30 && y < 70
    }

    // Helper to check if a point is too close to others
    const isTooClose = (x: number, y: number, others: Sparkle[], minDist = 10) => {
      return others.some((star) => {
        const ox = parseFloat(star.x)
        const oy = parseFloat(star.y)
        const dx = x - ox
        const dy = y - oy
        return Math.sqrt(dx * dx + dy * dy) < minDist
      })
    }

    const generateStar = (others: Sparkle[]): Sparkle => {
      let x: number, y: number
      let tries = 0
      do {
        x = Math.random() * 100
        y = Math.random() * 100
        tries++
        // Avoid infinite loop if too many sparkles
        if (tries > 50) break
      } while (isInCenter(x, y) || isTooClose(x, y, others))
      const color = Math.random() > 0.5 ? colors.first : colors.second
      const delay = Math.random() * 2
      const scale = Math.random() * 2 + 0.5
      const lifespan = Math.random() * 8 + 5
      const id = `${x}-${y}-${Date.now()}`
      return { id, x: `${x}%`, y: `${y}%`, color, delay, scale, lifespan }
    }

    const initializeStars = () => {
      const newSparkles: Sparkle[] = []
      for (let i = 0; i < sparklesCount; i++) {
        newSparkles.push(generateStar(newSparkles))
      }
      setSparkles(newSparkles)
    }

    const updateStars = () => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((star, idx, arr) => {
          if (star.lifespan <= 0) {
            // Regenerate, avoiding collisions with others
            const others = arr.filter((_, i) => i !== idx)
            return generateStar(others)
          } else {
            return { ...star, lifespan: star.lifespan - 0.1 }
          }
        })
      )
    }

    initializeStars()
    const interval = setInterval(updateStars, 100)

    return () => clearInterval(interval)
  }, [colors.first, colors.second, sparklesCount])

  return (
    <div
      className={cn('text-6xl font-bold', className)}
      {...props}
      style={
        {
          '--sparkles-first-color': `${colors.first}`,
          '--sparkles-second-color': `${colors.second}`,
        } as CSSProperties
      }
    >
      <span className="relative inline-block">
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
        <strong>{children}</strong>
      </span>
    </div>
  )
}
