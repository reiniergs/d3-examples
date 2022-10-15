import * as d3 from 'd3'
import { useRef } from 'react'
import { Data } from '..'
import { Dimensions } from '../useChartDimensions'
import { percentileLabels, paddingTop, paddingLeft, paddingBottom, paddingRight, currencyFormatter } from '../config'

interface AxisProps {
  dimensions: Dimensions
  data: Data
}

const AxisBottom = (props: AxisProps) => {
  const { dimensions, data } = props
  const { width, height } = dimensions
  const ref = useRef<SVGSVGElement>(null)
  const xDomain = [
    0,
    d3.max(data.clusters, item => item.max) as number
  ]
  const xScale = d3.scaleLinear().domain(
    xDomain
  ).range([0, width - paddingRight - paddingLeft])
  const xTickValues = [
    0,
    xDomain[1] / 5,
    xDomain[1] / 5 * 2,
    xDomain[1] / 5 * 3,
    xDomain[1] / 5 * 4,
    xDomain[1]
  ]
  const ticks = xTickValues.map((d, i) => {
    return (
      <g
        key={d}
        transform={`translate(${xScale(d) + paddingLeft}, ${height - paddingBottom})`}
      >
        <line
          y2="6"
          stroke="currentColor"
        />
        <line
          y2={-height + paddingTop + paddingBottom}
          strokeOpacity={0.2}
          stroke="currentColor"
          strokeDasharray="10,10"
        />
        <text
          textAnchor="middle"
          className="label"
          y={20}
        >
          {currencyFormatter(d)}
        </text>
        <text
          x={xScale(xTickValues[1] / 2)}
          y={-height + paddingTop + paddingBottom - 5}
          textAnchor="middle"
          className="label"
        >
          {percentileLabels[i]}
        </text>
      </g>
    )
  })
  return (
    <svg ref={ref}>
      <path
        d={[
          'M', 0, 6,
          'v', -6,
          'H', width - paddingRight - paddingLeft,
          'v', 6
        ].join(' ')}
        fill="none"
        stroke="rgba(163, 168, 169, 0.9)"
        transform={`translate(${paddingLeft}, ${height - paddingBottom})`}
      />
      {ticks}
    </svg>
  )
}

export default AxisBottom
