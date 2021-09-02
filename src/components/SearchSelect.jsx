import React from 'react'
import { Select } from 'antd'
import { useAtom } from 'jotai'
import { dataAtom, selectedAtom } from '../state'

const { Option } = Select

const SearchSelect = () => {
  const [data] = useAtom(dataAtom)
  const [, setSelected] = useAtom(selectedAtom)

  const onChange = (value) => {
    setSelected(value)
  }

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Välj kommun"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data.map((d) => (
        <Option value={d.name}>{d.name}</Option>
      ))}
    </Select>
  )
}

export default SearchSelect
