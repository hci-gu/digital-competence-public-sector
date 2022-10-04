import { useCallback, useMemo } from 'react'
import { voronoi } from '@visx/voronoi'
import { localPoint } from '@visx/event'
import debounce from 'lodash.debounce'

let tooltipTimeout
const useTooltip = ({
  svgRef,
  size,
  data,
  xScale,
  yScale,
  showTooltip,
  hideTooltip,
}) => {
  const voronoiLayout = useMemo(
    () =>
      voronoi({
        x: (d) => xScale(d.x) ?? 0,
        y: (d) => yScale(d.y) ?? 0,
        width: size,
        height: size,
      })(data),
    [size, xScale, yScale]
  )

  const handleMouseMove = useCallback(
    debounce((event) => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout)
      if (!svgRef.current) return

      // find the nearest polygon to the current mouse position
      const point = localPoint(svgRef.current, event)
      if (!point) return
      const neighborRadius = 25
      const closest = voronoiLayout.find(point.x, point.y, neighborRadius)
      if (closest) {
        showTooltip({
          tooltipLeft: xScale(closest.data.x),
          tooltipTop: yScale(closest.data.y),
          tooltipData: closest.data,
        })
      }
    }, 50),
    [xScale, yScale, showTooltip, voronoiLayout]
  )

  const handleMouseLeave = useCallback(() => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip()
    }, 300)
  }, [hideTooltip])

  return { handleMouseMove, handleMouseLeave }
}

export default useTooltip
