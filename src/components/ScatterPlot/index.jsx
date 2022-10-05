import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSpring } from '@react-spring/web'

import { selectedAtom, selectedDataAtom, selectedYearAtom } from '../../state'
import Plot from './Plot'

const Container = styled.div`
  height: 900px;
  max-width: 900px;

  @media (max-width: 640px) {
    padding: 0;
    height: 70vh;
  }
`

const ScatterPlot = () => {
  const [size, setSize] = useState(0)
  const [data] = useAtom(selectedDataAtom)
  const [selected] = useAtom(selectedAtom)
  const [year] = useAtom(selectedYearAtom)
  const containerRef = useRef()
  const prevYearRef = useRef()
  const prevNameRef = useRef()

  useEffect(() => {
    setSize(containerRef.current.clientWidth - 10 * 4)
  }, [containerRef])

  useEffect(() => {
    let listener = () => {
      setSize(containerRef.current.clientWidth - 10 * 4)
    }
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  useEffect(() => {
    prevYearRef.current = year
  }, [year])
  useEffect(() => {
    prevNameRef.current = selected
  }, [selected])

  const pos = useSpring({
    from: { value: 0 },
    to: { value: 1 },
    reset: prevYearRef.current !== year,
    config: !selected
      ? {}
      : {
          tension: 280,
          friction: 120,
        },
  })
  const scale = useSpring({
    from: { value: 0 },
    to: { value: 1 },
    reset: prevNameRef.current !== selected,
  })

  return (
    <Container ref={containerRef}>
      <Plot
        size={size}
        padding={10}
        pos={pos}
        scale={scale}
        data={data}
        selected={selected}
      />
    </Container>
  )
}

export default ScatterPlot
