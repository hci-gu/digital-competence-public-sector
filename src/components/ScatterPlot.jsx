import React from 'react'
import { Scatter } from '@ant-design/charts'
import { useAtom } from 'jotai'
import { dataAtom, selectedAtom } from '../state'
import styled from 'styled-components'

const Container = styled.div`
  height: 800px;
  padding: 1rem;

  @media (max-width: 640px) {
    padding: 0;
    height: 70vh;
  }
`

const annotationStyle = {
  textAlign: 'center',
  fontWeight: '800',
  fontSize: window.innerWidth <= 640 ? 11 : 18,
  fill: 'rgba(92, 92, 92, 0.5)',
}

const ScatterPlot = () => {
  const [data] = useAtom(dataAtom)
  const [selected] = useAtom(selectedAtom)

  var config = {
    appendPadding: 10,
    width: 'auto',
    height: 'auto',
    data: data.map((d) => ({
      ...d,
      selected: d.name === selected,
    })),
    xField: 'x',
    yField: 'y',
    shape: 'circle',
    colorField: 'selected',
    sizeField: 'selected',
    size: [4, 15],
    xAxis: {
      label: false,
    },
    yAxis: {
      label: false,
    },
    // tooltip: {
    //   showMarkers: false,
    //   customContent: function customContent(title, items) {
    //     const item = items[0]
    //     if (!item) return null
    //     return `<div class="g2-tooltip-item" style="margin: 8px;display:flex;justify-content:space-between;>
    //       <span class="g2-tooltip-item-label">
    //         Effektivitet / Innovation : ${item.data.Effektivitet} /
    //         ${item.data.Intern}
    //       </span>
    //     </div>`
    //   },
    // },
    pointStyle: {
      fillOpacity: 0.8,
    },
    quadrant: {
      xBaseline: 0,
      yBaseline: 0,
    },
    annotations: [
      {
        type: 'text',
        position: ['-50', '-50'],
        content: 'Intern Effektivitet'.toUpperCase(),
        style: annotationStyle,
      },
      {
        type: 'text',
        position: ['50', '-50'],
        content: 'Intern Innovation'.toUpperCase(),
        style: annotationStyle,
      },
      {
        type: 'text',
        position: ['-50', '50'],
        content: 'Extern Effektivitet'.toUpperCase(),
        style: annotationStyle,
      },
      {
        type: 'text',
        position: ['50', '50'],
        content: 'Extern Innovation'.toUpperCase(),
        style: annotationStyle,
      },
    ],
  }
  return (
    <Container>
      <Scatter {...config} />
    </Container>
  )
}

export default ScatterPlot
