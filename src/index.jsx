import React, { useEffect } from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.less'
import App from './App'
import Papa from 'papaparse'
import { useAtom } from 'jotai'
import { dataAtom } from './state'

const mapData = (row) => ({
  ...row,
  name: row.Kommunnamn,
  x: row.X ? parseFloat(row.X.replace('−', '-')) : null,
  y: row.Y ? parseFloat(row.Y.replace('−', '-')) : null,
  population: parseInt(row.Invånare),
})

const Root = () => {
  const [, setData] = useAtom(dataAtom)
  useEffect(() => {
    const run = async () => {
      const response = await fetch('/data.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setData(rows.map(mapData))
    }
    run()
  }, [setData])

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')
render(<Root />, rootElement)
