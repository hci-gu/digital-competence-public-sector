import { useAtom } from 'jotai'
import React, { useEffect, useRef } from 'react'
import Chart from 'react-apexcharts'
import styled from 'styled-components'
import { selectedAtom, selectedDataAtom } from '../state'

const Container = styled.div`
  height: 800px;
  padding: 1rem;

  @media (max-width: 640px) {
    padding: 0;
    height: 70vh;
  }
`

const ChartComponent = React.forwardRef((props, ref) => {
  const state = {
    options: {
      chart: {
        id: 'apexchart-example',
        animations: {
          enabled: true,
          dynamicAnimation: {
            enabled: true,
            speed: 5000,
          },
        },
        // markers: {
        //   discrete: [
        //     {
        //       series: 0,
        //       dataPointIndex: data.findIndex((d) => d.name == selected?.name),
        //     },
        //   ],
        // },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    series: [
      {
        data: [],
      },
    ],
  }

  return (
    <Chart
      options={state.options}
      series={state.series}
      type="scatter"
      ref={ref}
    />
  )
})

const ChartUpdater = ({ chartRef }) => {
  const [data] = useAtom(selectedDataAtom)
  const [selected] = useAtom(selectedAtom)
  // console.log(data.map((d) => `${d.name}, ${d.x}, ${d.y}`))

  useEffect(() => {
    const chart = chartRef.current.chart
    chart.updateSeries([
      {
        name: 'all',
        data: data.filter((d) => selected !== d.name).map((d) => [d.x, d.y]),
      },
      {
        name: 'selected',
        data: selected ? [data.find((d) => d.name == selected)] : [],
      },
    ])
    console.log(
      {
        name: 'all',
        data: data.filter((d) => selected !== d.name).map((d) => [d.x, d.y]),
      },
      {
        name: 'selected',
        data: selected ? [data.find((d) => d.name == selected)] : [],
      }
    )
  }, [selected, data])

  return null
}

const Scatter = () => {
  const ref = useRef(null)

  return (
    <Container>
      <ChartComponent ref={ref} />
      <ChartUpdater chartRef={ref} />
    </Container>
  )
}

export default Scatter
