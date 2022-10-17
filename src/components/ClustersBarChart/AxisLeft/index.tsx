import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { paddingTop, paddingLeft, paddingBottom } from '../config'
import useChartContext from '../useChartContext'

const AxisLeft = () => {
  const { dimensions, data } = useChartContext()
  const { height } = dimensions
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = d3.select(ref.current)
    const yDomain = d3.extent(data.clusters, item => item.houses) as [number, number]
    const yScale = d3.scaleLinear()
      .domain([0, yDomain[1] + yDomain[1] / 5])
      .range([0, height - paddingTop - paddingBottom])
    const axisLeft = d3
      .axisLeft(yScale.range([height - paddingTop - paddingBottom, 0]))
      .ticks((height - paddingTop - paddingBottom) / 50)
    svg.append('g')
      .call(axisLeft).call((g) => {
        g.attr('transform', `translate(${paddingLeft}, ${paddingTop})`)
      })
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').remove())
      .call(g => g.selectAll('.tick text').classed('label', true))
  }, [dimensions, data])

  return (
    <svg ref={ref}></svg>
  )
}

export default AxisLeft
