import React, { useRef } from 'react'
import { scaleLinear } from '@visx/scale'
import { AxisLeft } from '@visx/axis'
import { GridRows, GridColumns } from '@visx/grid'
import { Circle } from '@visx/shape'
import { withTooltip, Tooltip } from '@visx/tooltip'
import { animated } from '@react-spring/web'

import { extent } from 'd3'
import Annotation from './Annotation'
import useTooltip from './useTooltip'

const AnimatedCircle = animated(Circle)

const Plot = ({
  size,
  padding,
  pos,
  scale,
  data,
  selected,
  hideTooltip,
  showTooltip,
  tooltipData,
  tooltipLeft,
  tooltipTop,
  tooltipOpen,
}) => {
  const svgRef = useRef(null)
  const xScale = scaleLinear({
    range: [padding, size],
    domain: extent(data, (d) => d.x),
  })
  const yScale = scaleLinear({
    range: [size, padding],
    domain: extent(data, (d) => d.y),
  })

  const { handleMouseMove, handleMouseLeave } = useTooltip({
    svgRef,
    size,
    data,
    xScale,
    yScale,
    showTooltip,
    hideTooltip,
  })

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg width="100%" height="100%" ref={svgRef}>
        <rect
          width={size}
          height={size}
          rx={14}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
          fill="transparent"
        />
        <AxisLeft scale={yScale} left={padding} numTicks={2} />
        <GridColumns
          top={padding}
          scale={xScale}
          height={size}
          strokeOpacity={0.8}
          numTicks={2}
        />
        <GridRows
          left={padding}
          scale={xScale}
          width={size}
          strokeOpacity={0.8}
          numTicks={4}
        />
        <Annotation text="EXTERN EFFEKTIVITET" size={size} position={0} />
        <Annotation text="EXTERN INNOVATION" size={size} position={1} />
        <Annotation text="INTERN EFFEKTIVITET" size={size} position={2} />
        <Annotation text="INTERN INNOVATION" size={size} position={3} />
        {data.map((d, i) => {
          return (
            <AnimatedCircle
              key={i}
              cx={pos.value.to([0, 1], [d.x2, d.x]).to((v) => xScale(v))}
              cy={pos.value.to([0, 1], [d.y2, d.y]).to((v) => yScale(v))}
              r={scale.value
                .to([0, 1], [5, d.name == selected ? 12.5 : 5])
                .to((v) => v)}
              fill={d.name == selected ? '#ffadce' : '#7da5f9'}
              fillOpacity={d.name == selected ? 1 : selected ? 0.5 : 0.8}
            />
          )
        })}
      </svg>
      {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
        <Tooltip left={tooltipLeft} top={tooltipTop}>
          <div>{tooltipData.name}</div>
        </Tooltip>
      )}
    </div>
  )
}

export default withTooltip(Plot)
