import React from 'react'
import { Text } from '@visx/text'

const Annotation = ({ text, size, position }) => {
  let x = size / 4
  let y = size / 4
  switch (position) {
    case 0:
      break
    case 1:
      x = size - size / 4
      break
    case 2:
      y = size - size / 4
      break
    case 3:
      x = size - size / 4
      y = size - size / 4
    default:
      break
  }

  const displaySize = size / 4

  return (
    <>
      <Text
        x={x}
        width={displaySize}
        y={y}
        height={displaySize}
        verticalAnchor="middle"
        textAnchor="middle"
        fill="#abacaa"
        scaleToFit
      >
        {text}
      </Text>
    </>
  )
}

export default Annotation
