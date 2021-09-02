import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import ScatterPlot from './components/ScatterPlot'
import SearchSelect from './components/SearchSelect'
import { dataAtom } from './state'

const Container = styled.div`
  padding: 1rem;
  width: 80%;
  margin: 0 auto;

  > * {
    margin-top: 0.5rem;
  }

  @media (max-width: 960px) {
    width: 100%;
    padding: 0.5rem;
  }
`

const Content = styled.div`
  display: grid;

  grid-template-columns: 2fr 1fr;

  > div {
    padding: 1rem;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`

const Footer = styled.div`
  margin-top: 1rem;
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
      <Content>
        <ScatterPlot />
        <div>
          <h1>Sveriges kommuners digitaliseringsstrategier</h1>
          <p>
            Grafen visar riktningen för samtliga svenska kommuners
            digitaliseringsstrategier. Underlaget är en innehållsanalys av
            samtliga tillgängliga MRP-dokument, för vidare detaljer kring metod
            och analys se
            <a
              href="https://www.digitalforvaltning.se/rapport/sveriges-kommuners-digitaliseringsstrategier/."
              target="_blank"
            >
              https://www.digitalforvaltning.se/rapport/sveriges-kommuners-digitaliseringsstrategier/.
            </a>
            <br></br>
            <br></br>
            Positionering sker på basis av dominerande riktning i hur kommunen
            mål- och resurssätter digitalisering i MRP. Utgångspunkten är två
            dimensioner med 1. Effektivitet kontra innovation (fokus på att
            exploatera givna förutsättningar eller utforska nya möjligheter)
            samt 2. Internt kontra externt (fokus på direkt nytta för
            organisationen eller invånare/företag).
          </p>
          <SearchSelect />
        </div>
      </Content>
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
