import * as d3 from 'd3'
import { useRef } from 'react'
import { paddingTop, paddingLeft, paddingBottom, paddingRight, currencyFormatter } from '../config'
import useChartContext from '../useChartContext'
import RenderIf from 'react-rainbow-components/components/RenderIf'
import useXDomain from '../useXDomain'
import useTickValues from '../useTickValues'

const AxisBottom = () => {
  const { dimensions, percentiles } = useChartContext()
  const { width, height } = dimensions
  const ref = useRef<SVGSVGElement>(null)

  const xDomain = useXDomain()
  const xTickValues = useTickValues()

  const xScale = d3.scaleLinear().domain(
    xDomain
  ).range([0, width - paddingRight - paddingLeft])

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
        <RenderIf isTrue={i < percentiles.length}>
          <text
            x={xScale(xTickValues[1] / 2)}
            y={-height + paddingTop + paddingBottom - 5}
            textAnchor="middle"
            className="label"
          >
            {percentiles[i]?.name}
          </text>
        </RenderIf>
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
