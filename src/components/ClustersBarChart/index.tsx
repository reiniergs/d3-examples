import { CSSProperties, useRef, createContext } from 'react'
import { Container, Svg } from './styled'
import useChartDimensions, { Dimensions } from './useChartDimensions'
import AxisBottom from './AxisBottom'
import AxisLeft from './AxisLeft'
import Prediction from './Prediction'
import Histogram from './Histogram'

export interface Cluster {
  min: number
  max: number
  houses: number
}

export interface Data {
  clusters: Cluster[]
  prediction: { min: number, max: number }
}

export interface Percentile {
  name: string
  color: string
}

interface ClustersBarChartProps {
  data: Data
  percentiles?: Percentile[]
  style?: CSSProperties
  className?: string
}

export interface Context {
  data: Data
  dimensions: Dimensions
  percentiles: Percentile[]
}

export const context = createContext<Context>({
  data: {
    clusters: [],
    prediction: { min: 0, max: 0 }
  },
  dimensions: { width: 0, height: 0 },
  percentiles: []
})

const ClustersBarChart = (props: ClustersBarChartProps) => {
  const { style, className, data, percentiles } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useChartDimensions({ ref: containerRef })
  const value = {
    data,
    dimensions,
    percentiles: percentiles as Percentile[]
  }
  return (
    <Container style={style} className={className} ref={containerRef}>
      <Svg width={dimensions.width} height={dimensions.height}>
        <context.Provider value={value}>
          <Histogram />
          <AxisBottom />
          <AxisLeft />
          <Prediction />
        </context.Provider>
      </Svg>
    </Container>
  )
}

ClustersBarChart.defaultProps = {
  percentiles: [
    { name: 'Lower Earners', color: 'rgba(163, 168, 169, 0.9)' },
    { name: 'Mid Lower Earners', color: 'rgba(159, 208, 151, 0.4)' },
    { name: 'Middle Earners', color: 'rgba(159, 208, 151, 0.6)' },
    { name: 'Mid High Earners', color: 'rgba(159, 208, 151, 0.9)' },
    { name: 'High Earners', color: 'rgba(141, 194, 132, 1)' }
  ]
}

export default ClustersBarChart
