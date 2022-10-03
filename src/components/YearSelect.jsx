import React from 'react'
import { Select } from 'antd'
import { useAtom } from 'jotai'
import { dataAtom, selectedAtom, years, selectedYearAtom } from '../state'
import styled from 'styled-components'

const { Option } = Select

const Container = styled.div`
  width: 200px;

  @media (max-width: 640px) {
    margin: 0 auto;
  }
`

const YearSelect = () => {
  const [selected, setSelected] = useAtom(selectedYearAtom)

  const onChange = (value) => {
    setSelected(value)
  }

  return (
    <Container>
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="Välj år"
        optionFilterProp="children"
        onChange={onChange}
        options={years.map((year) => ({
          value: year,
        }))}
        value={selected}
      />
    </Container>
  )
}

export default YearSelect
