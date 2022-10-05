import React from 'react'
import { Text } from '@visx/text'

export const QuadrantBackgrounds = ({ size, padding }) => {
  const displaySize = size / 2 - padding / 2
  return (
    <>
      <rect
        x={padding}
        y={padding}
        width={displaySize}
        height={displaySize}
        fill="#fafdf9"
      />
      <rect
        x={padding / 2 + size / 2}
        y={padding}
        width={displaySize}
        height={displaySize}
        fill="#fdfcfb"
      />
      <rect
        x={padding}
        y={padding / 2 + size / 2}
        width={displaySize}
        height={displaySize}
        fill="#fdfcfb"
      />
      <rect
        x={padding / 2 + size / 2}
        y={padding / 2 + size / 2}
        width={displaySize}
        height={displaySize}
        fill="#fafdf9"
      />
    </>
  )
}

const Annotation = ({ text, size, position }) => {
  let x = size / 4 + 5
  let y = size / 4 + 5
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
        fontWeight={700}
      >
        {text}
      </Text>
    </>
  )
}

export default Annotation
