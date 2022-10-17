import { useContext } from 'react'
import { context } from './'

const useChartContext = () => {
  return useContext(context)
}

export default useChartContext
