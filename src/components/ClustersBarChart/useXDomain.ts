import useChartContext from './useChartContext'
import * as d3 from 'd3'

const useXDomain = () => {
  const { data } = useChartContext()
  return [
    0,
    d3.max(data.clusters, item => item.max) as number
  ]
}

export default useXDomain
