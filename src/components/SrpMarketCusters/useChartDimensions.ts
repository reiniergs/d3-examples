import { ResizeObserver } from '@juggle/resize-observer'
import { useEffect, useState, RefObject } from 'react'

interface Props {
  ref: RefObject<HTMLDivElement>
}

export interface Dimensions {
  width: number
  height: number
}

const useChartDimensions = ({ ref }: Props) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0
  })
  useEffect(() => {
    if (ref.current != null) {
      const rect = ref.current.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height
      })
      const resizeObserver = new ResizeObserver((entries) => {
        if (Array.isArray(entries) && (entries.length > 0)) {
          const entry = entries[0]
          if (dimensions.width !== entry.contentRect.width || dimensions.height !== entry.contentRect.height) {
            setDimensions({
              width: entry.contentRect.width,
              height: entry.contentRect.height
            })
          }
        }
      })
      resizeObserver.observe(ref.current)
      return () => {
        if (ref.current != null) {
          resizeObserver.unobserve(ref.current)
        }
      }
    }
  }, [])
  return dimensions
}

export default useChartDimensions
