import { useAtom } from 'jotai'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { scaleLinear } from '@visx/scale'
import { Axis, AxisLeft } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'
import { Circle } from '@visx/shape'
import {} from '@visx/react-spring'
import { Text } from '@visx/text'
import { animated, useSpring, useSprings } from '@react-spring/web'

import { extent, format, interpolate } from 'd3'

import { selectedAtom, selectedDataAtom, selectedYearAtom } from '../state'

const Container = styled.div`
  width: 700;
  height: 700px;
  padding: 1rem;

  @media (max-width: 640px) {
    padding: 0;
    height: 70vh;
  }
  border: 1px dotted red;
`

const AnimatedCircle = animated(Circle)

const ScatterPlot = () => {
  const size = 700
  const [data] = useAtom(selectedDataAtom)
  const [selected] = useAtom(selectedAtom)
  const [year] = useAtom(selectedYearAtom)
  const prevYearRef = useRef()
  const prevNameRef = useRef()

  useEffect(() => {
    prevYearRef.current = year
  }, [year])
  useEffect(() => {
    prevNameRef.current = selected
  }, [selected])

  const xScale = scaleLinear({
    range: [10, size],
    domain: extent(data, (d) => d.x),
  })
  const yScale = scaleLinear({
    range: [size, 10],
    domain: extent(data, (d) => d.y),
  })

  const pos = useSpring({
    from: { value: 0 },
    to: { value: 1 },
    reset: prevYearRef.current !== year,
    config: { duration: !selected ? 1000 : 5000 },
  })
  const scale = useSpring({
    from: { value: 0 },
    to: { value: 1 },
    reset: prevNameRef.current !== selected,
  })

  return (
    <Container>
      <svg width="100%" height="100%">
        <AxisLeft scale={yScale} left={10} numTicks={2} />
        <GridColumns
          top={10}
          scale={xScale}
          height={800}
          strokeOpacity={0.8}
          numTicks={2}
        />
        <GridRows
          left={10}
          scale={xScale}
          width={800}
          strokeOpacity={0.8}
          numTicks={2}
        />
        <Text
          x={size / 4}
          width={size / 2}
          y={size / 4}
          height={size / 2}
          verticalAnchor="middle"
          textAnchor="middle"
          color="#abacaa"
        >
          EXTERN EFFEKTIVITET
        </Text>
        <Text
          x={size - size / 4}
          width={size}
          y={size / 4}
          height={size}
          verticalAnchor="middle"
          textAnchor="middle"
          color="#abacaa"
        >
          EXTERN INNOVATION
        </Text>
        <Text
          x={size / 4}
          width={size}
          y={size - size / 4}
          height={size}
          verticalAnchor="middle"
          textAnchor="middle"
          color="#abacaa"
        >
          INTERN EFFEKTIVITET
        </Text>
        <Text
          x={size - size / 4}
          width={size}
          y={size - size / 4}
          height={size}
          verticalAnchor="middle"
          textAnchor="middle"
          color="#abacaa"
        >
          INTERN INNOVATION
        </Text>
        {data.map((d, i) => {
          return (
            <AnimatedCircle
              key={i}
              cx={pos.value.to([0, 1], [d.x2, d.x]).to((v) => xScale(v))}
              cy={pos.value.to([0, 1], [d.y2, d.y]).to((v) => yScale(v))}
              r={scale.value
                .to([0, 1], [5, d.name == selected ? 10 : 5])
                .to((v) => v)}
              fill={d.name == selected ? '#ffadce' : '#7da5f9'}
              fillOpacity={0.8}
            />
          )
        })}
      </svg>
    </Container>
  )
}

export default ScatterPlot
