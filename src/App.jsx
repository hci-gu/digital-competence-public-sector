import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import ScatterPlot from './components/ScatterPlot'
import SearchSelect from './components/SearchSelect'
import { dataAtom } from './state'

const Container = styled.div`
  padding: 1rem;
  width: 75%;
  margin: 0 auto;

  > * {
    margin-top: 1rem;
  }
`

const App = () => {
  const [data] = useAtom(dataAtom)
  return (
    <Container>
      <SearchSelect />
      <ScatterPlot />
    </Container>
  )
}

export default App
