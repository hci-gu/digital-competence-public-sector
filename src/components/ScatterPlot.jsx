import React from 'react'
import { Scatter } from '@ant-design/charts'
import { useAtom } from 'jotai'
import { dataAtom, selectedAtom } from '../state'

const ScatterPlot = () => {
  const [data] = useAtom(dataAtom)
  const [selected] = useAtom(selectedAtom)

  var config = {
    width: 1250,
    height: 800,
    data: data.map((d) => ({
      ...d,
      selected: d.name === selected,
    })),
    xField: 'x',
    yField: 'y',
    shape: 'circle',
    colorField: 'selected',
    sizeField: 'selected',
    size: [5, 15],
    quadrant: {
      xBaseline: 0,
      yBaseline: 0,
    },
    // regressionLine: {
    //   type: 'linear',
    // },
  }
  return <Scatter {...config} />
}

export default ScatterPlot
