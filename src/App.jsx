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
    margin-top: 0.5rem;
  }
`

const Footer = styled.div`
  width: 100%;
  display: flex;

  justify-content: flex-end;
  font-weight: 200;

  > a {
    font-weight: 400;
    margin: 0 3px;
  }
`

const App = () => {
  return (
    <Container>
      <SearchSelect />
      <ScatterPlot />
      <Footer>
        Skapad av
        <a href="https://hci-gu.github.io/appademin/" target="_blank">
          Appademin
        </a>{' '}
        @ GU
      </Footer>
    </Container>
  )
}

export default App
