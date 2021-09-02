import React from 'react'
import { Select } from 'antd'
import { useAtom } from 'jotai'
import { dataAtom, selectedAtom } from '../state'
import styled from 'styled-components'

const { Option } = Select

const Container = styled.div`
  width: 200px;

  @media (max-width: 640px) {
    margin: 0 auto;
  }
`

const SearchSelect = () => {
  const [data] = useAtom(dataAtom)
  const [, setSelected] = useAtom(selectedAtom)

  const onChange = (value) => {
    setSelected(value)
  }

  return (
    <Container>
      {' '}
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="Välj kommun"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {data.map((d) => (
          <Option value={d.name} key={`Select_${d.name}`}>
            {d.name}
          </Option>
        ))}
      </Select>
    </Container>
  )
}

export default SearchSelect
