import useXDomain from './useXDomain'
import useChartContext from './useChartContext'

const useTickValues = () => {
  const { percentiles } = useChartContext()
  const xDomain = useXDomain()
  return [0].concat(
    Array.from(
      Array(percentiles.length).keys()).map((v) => xDomain[1] / percentiles.length * (v + 1)
    )
  )
}

export default useTickValues
