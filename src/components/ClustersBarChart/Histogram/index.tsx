import { useRef } from 'react'
import * as d3 from 'd3'
import { paddingTop, paddingLeft, paddingBottom, paddingRight } from '../config'
import useChartContext from '../useChartContext'
import useTickValues from '../useTickValues'
import useXDomain from '../useXDomain'

const Histogram = () => {
  const { data, dimensions, percentiles } = useChartContext()
  const { height, width } = dimensions
  const ref = useRef<SVGSVGElement>(null)
  const xDomain = useXDomain()
  const xTickValues = useTickValues()
  const yDomain = d3.extent(data.clusters, item => item.houses) as [number, number]

  const yScale = d3.scaleLinear()
    .domain([0, yDomain[1] + yDomain[1] / 5])
    .range([0, height - paddingTop - paddingBottom])
  const xScale = d3.scaleLinear().domain(
    xDomain
  ).range([0, width - paddingRight - paddingLeft])

  const labels = data.clusters.map((d, i) => {
    return (
      <text
        key={i}
        x={(xScale(d.min) + xScale(d.max)) / 2}
        y={height - paddingTop - paddingBottom - yScale(d.houses) - 10}
        className="label"
        textAnchor="middle"
      >
        {d.houses}
      </text>
    )
  })
  const bars = data.clusters.map((d, i) => {
    let fill
    let pos = 0
    while (d.min >= xTickValues[pos]) {
      pos += 1
    }
    if (xTickValues[pos] < d.max && xTickValues[pos] - d.min < d.max - xTickValues[pos]) {
      fill = percentiles[pos].color
    }
    fill = percentiles[pos - 1].color
    return (
      <rect
        key={i}
        x={xScale(d.min)}
        width={xScale(d.max) - xScale(d.min)}
        y={height - paddingTop - paddingBottom - yScale(d.houses)}
        height={yScale(d.houses)}
        rx={4}
        ry={4}
        strokeWidth={1}
        stroke="white"
        fill={fill}
      />
    )
  })
  return (
    <svg ref={ref}>
      <g transform={`translate(${paddingLeft},${paddingTop})`}>
        {bars}
      </g>
      <g transform={`translate(${paddingLeft},${paddingTop})`}>
        {labels}
      </g>
    </svg>
  )
}

export default Histogram
