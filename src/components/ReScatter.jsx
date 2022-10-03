import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { selectedAtom, selectedDataAtom } from '../state'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const Container = styled.div`
  height: 800px;
  padding: 1rem;

  @media (max-width: 640px) {
    padding: 0;
    height: 70vh;
  }
`

const ReScatter = () => {
  const [data] = useAtom(selectedDataAtom)
  const [selected] = useAtom(selectedAtom)

  const dataWithout = data.filter((d) => d.name !== selected)
  const selectedData = [data.find((d) => d.name == selected)]

  console.log(dataWithout, selectedData)

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="All" data={dataWithout} fill="#8884d8" />
          <Scatter
            name="Selected"
            data={selectedData}
            fill="#ds84d8"
            scale={2}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default ReScatter
