import { atom } from 'jotai'

export const years = ['2021', '2022']

export const dataAtom = atom({})

const allNamesAtom = atom((get) => {
  const data = get(dataAtom)

  const allData = Object.keys(data).map((year) => {
    const yearData = data[year]
    const names = yearData.map((d) => d.name)

    return names
  })

  return [...new Set(allData.flat())]
})

export const selectedDataAtom = atom((get) => {
  const data = get(dataAtom)
  const selectedYear = get(selectedYearAtom)
  const names = get(allNamesAtom)

  const selectedData = data[selectedYear]
  if (!selectedData) return []

  const dataMap = selectedData.reduce((acc, d) => {
    acc[d.name] = d
    return acc
  }, {})

  // sort by name
  return names.slice(0, 5).map((name) => {
    return {
      name,
      x: dataMap[name]?.x ?? 0,
      y: dataMap[name]?.y ?? 0,
    }
  })
})

export const selectedYearAtom = atom(years[0])

export const selectedAtom = atom(null)
