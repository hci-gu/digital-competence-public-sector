import React, { useEffect } from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.less'
import App from './App'
import Papa from 'papaparse'
import { useAtom } from 'jotai'
import { dataAtom } from './state'

const mapData = (row) => ({
  name: row.Kommunnamn,
  x: row.X ? parseFloat(row.X.replace('−', '-')) : null,
  y: row.Y ? parseFloat(row.Y.replace('−', '-')) : null,
})

const useData = (year) => {
  const [, setData] = useAtom(dataAtom)
  useEffect(() => {
    const run = async () => {
      const response = await fetch(`${year}.csv`)
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setData((s) => ({ ...s, [year]: rows.map(mapData) }))
    }
    run()
  }, [setData])
}

const Root = () => {
  useData('2022')
  useData('2021')

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root')
render(<Root />, rootElement)
