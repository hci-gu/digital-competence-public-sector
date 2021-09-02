import React from 'react'
import { Scatter } from '@ant-design/charts'
import { useAtom } from 'jotai'
import { dataAtom, selectedAtom } from '../state'
import styled from 'styled-components'

const Tooltip = styled.span`
  padding: 0.5rem;
  margin: 0.5rem;
`

const ScatterPlot = () => {
  const [data] = useAtom(dataAtom)
  const [selected] = useAtom(selectedAtom)

  var config = {
    appendPadding: 25,
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
    size: [4, 15],
    tooltip: {
      showMarkers: false,
      customContent: function customContent(title, items) {
        const item = items[0]
        if (!item) return null
        return `<div class="g2-tooltip-item" style="margin: 8px;display:flex;justify-content:space-between;>
          <span class="g2-tooltip-item-label">
            Effektivitet / Innovation : ${item.data.Effektivitet} /
            ${item.data.Intern}
          </span>
        </div>`
      },
    },
    quadrant: {
      xBaseline: 0,
      yBaseline: 0,
    },
    annotations: [
      {
        type: 'text',
        position: ['-50', '-110'],
        content: 'Effektivitet',
        style: {
          textAlign: 'center',
          fontWeight: '500',
          fill: 'rgb(92, 92, 92)',
        },
      },
      {
        type: 'text',
        position: ['50', '-110'],
        content: 'Innovation',
        style: {
          textAlign: 'center',
          fontWeight: '500',
          fill: 'rgb(92, 92, 92)',
        },
      },
      {
        type: 'text',
        position: ['-105', '-50'],
        content: 'Internt',
        rotate: -Math.PI / 2,
        style: {
          textAlign: 'left',
          fontWeight: '500',
          fill: 'rgb(92, 92, 92)',
        },
      },
      {
        type: 'text',
        position: ['-105', '50'],
        content: 'Externt',
        rotate: -Math.PI / 2,
        style: {
          textAlign: 'left',
          fontWeight: '500',
          fill: 'rgb(92, 92, 92)',
        },
      },
    ],
  }
  return <Scatter {...config} />
}

export default ScatterPlot
