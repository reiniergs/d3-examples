import { CSSProperties, useRef } from 'react'
import { Container, Svg } from './styled'
import useChartDimensions from './useChartDimensions'
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

interface SrpMarketClustersProps {
  data: Data
  style?: CSSProperties
  className?: string
}

const SrpMarketClusters = (props: SrpMarketClustersProps) => {
  const { style, className, data } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useChartDimensions({ ref: containerRef })

  return (
    <Container style={style} className={className} ref={containerRef}>
      <Svg width={dimensions.width} height={dimensions.height}>
        <Histogram data={data} dimensions={dimensions} />
        <AxisBottom data={data} dimensions={dimensions} />
        <AxisLeft data={data} dimensions={dimensions} />
        <Prediction data={data} dimensions={dimensions} />
      </Svg>

    </Container>
  )
}

export default SrpMarketClusters
