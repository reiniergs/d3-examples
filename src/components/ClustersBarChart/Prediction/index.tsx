import { useRef } from 'react'
import * as d3 from 'd3'
import { Data } from '..'
import { Dimensions } from '../useChartDimensions'
import { paddingTop, paddingLeft, paddingBottom, paddingRight, currencyFormatter } from '../config'

interface Props {
  dimensions: Dimensions
  data: Data
}

const Prediction = (props: Props) => {
  const { data, dimensions } = props
  const { height, width } = dimensions
  const ref = useRef<SVGSVGElement>(null)
  const xDomain = [
    0,
    d3.max(data.clusters, item => item.max) as number
  ]
  const xScale = d3.scaleLinear().domain(
    xDomain
  ).range([0, width - paddingRight - paddingLeft])

  return (
    <svg ref={ref}>
      <line
        x1={xScale(data.prediction.min) + paddingLeft} y1={paddingTop}
        x2={xScale(data.prediction.min) + paddingLeft} y2={height - paddingTop}
        stroke="#F5BF45"
        strokeWidth={2}
      />
      <line
        x1={xScale(data.prediction.max) + paddingLeft} y1={paddingTop}
        x2={xScale(data.prediction.max) + paddingLeft} y2={height - paddingTop}
        stroke="#F5BF45"
        strokeWidth={2}
      />
      <rect
        x={xScale(data.prediction.min) + paddingLeft} y={paddingTop}
        width={xScale(data.prediction.max) - xScale(data.prediction.min)}
        height={height - paddingTop - paddingBottom}
        fill="#F5BF45"
        fillOpacity={0.3}
      />
      <text
        x={xScale(data.prediction.min) + paddingLeft - 5}
        y={paddingTop + 20}
        textAnchor="end"
        className="label"
      >
        {currencyFormatter(data.prediction.min)}
      </text>
      <text
        x={xScale(data.prediction.max) + paddingLeft + 5}
        y={paddingTop + 20}
        textAnchor="start"
        className="label"
      >
        {currencyFormatter(data.prediction.max)}
      </text>
    </svg>
  )
}

export default Prediction
