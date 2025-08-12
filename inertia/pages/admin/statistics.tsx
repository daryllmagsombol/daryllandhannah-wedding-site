import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'
import axiosInstance from '~/shared/axios_config'
import { Loader } from '../shared/loader'
import NavigationBar from '~/components/common/NavigationBar/navigation-bar'

type FamilyGroup = {
  noOfGuestsAttending: number
  familyName: string
  guests: { name: string; tableNumber?: string }[]
  isAttending?: number | null
  updatedAt?: string
}

type StatisticsProps = {
  expectedVisitors: number
  seating: { tableNumber: string; guests: string[] }[]
  familyGroups: FamilyGroup[]
}

export default function StatisticsPage() {
  const [stats, setStats] = useState<StatisticsProps | null>(null)
  const [sortType, setSortType] = useState<'total' | 'attending'>('total')
  const [totalKidsBelow7, setTotalKidsBelow7] = useState<number>(0)
  const seatingRef = useRef<SVGSVGElement>(null)
  const familyRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    axiosInstance.get<StatisticsProps>('/statistics/lists').then((res) => setStats(res.data))
    // Fetch total kids below 7
    axiosInstance.get('/guest/total-kids-below-7').then((res) => {
      setTotalKidsBelow7(Number(res.data.count))
    })
  }, [])

  const totalAttending = useMemo(
    () =>
      (stats?.familyGroups ?? []).reduce(
        (sum, guest) => sum + (guest.isAttending ? guest.noOfGuestsAttending : 0),
        0
      ),
    [stats]
  )

  useEffect(() => {
    if (!stats) return

    // Seating arrangement visualization
    if (seatingRef.current && stats.seating) {
      const svg = d3.select(seatingRef.current)
      svg.selectAll('*').remove()
      const width = 600,
        height = 400,
        radius = Math.min(width, height) / 2 - 40
      svg.attr('width', width).attr('height', height)

      const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`)

      // Pie chart data
      const pie = d3
        .pie<{ tableNumber: string; guests: string[] }>()
        .value((d) => d.guests.length)
        .sort(null)

      const arc = d3
        .arc<d3.PieArcDatum<{ tableNumber: string; guests: string[] }>>()
        .innerRadius(0)
        .outerRadius(radius)

      const color = d3.scaleOrdinal(d3.schemeCategory10)

      // Tooltip
      const parentNode = svg.node() ? (svg.node()!.parentNode as HTMLElement) : null
      const tooltip = parentNode
        ? d3
            .select(parentNode)
            .append('div')
            .style('position', 'absolute')
            .style('background', '#fff')
            .style('border', '1px solid #ccc')
            .style('padding', '8px 12px')
            .style('border-radius', '8px')
            .style('pointer-events', 'none')
            .style('font-size', '14px')
            .style('box-shadow', '0 2px 8px rgba(0,0,0,0.15)')
            .style('opacity', 0)
        : d3.select(document.createElement('div')) // fallback, won't be shown

      g.selectAll('path')
        .data(pie(stats.seating))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i.toString()))
        .on('mouseover', function (event, d) {
          tooltip
            .html(
              `<strong>Table ${d.data.tableNumber}</strong><br/>Guests:<br/>${
                d.data.guests.length > 0 ? d.data.guests.join('<br/>') : '<em>No guests</em>'
              }`
            )
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`)
            .style('opacity', 1)
        })
        .on('mousemove', function (event) {
          tooltip.style('left', `${event.pageX + 10}px`).style('top', `${event.pageY - 10}px`)
        })
        .on('mouseout', function () {
          tooltip.style('opacity', 0)
        })

      // Table labels
      g.selectAll('text')
        .data(pie(stats.seating))
        .enter()
        .append('text')
        .attr('transform', (d) => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('font-size', 14)
        .attr('fill', '#333')
        .attr('font-weight', 'bold')
        .text((d) => `Table ${d.data.tableNumber}`)
    }

    // Family groups bar chart race with improved readability and sorting
    if (familyRef.current && stats.familyGroups) {
      const svg = d3.select(familyRef.current)
      svg.selectAll('*').remove()

      // Prepare data
      let data = stats.familyGroups.map((f) => ({
        family: f.familyName,
        count: f.guests.length,
        attending: f.isAttending === 1 ? (f.noOfGuestsAttending ?? 0) : 0, // Use noOfGuestsAttending
        isAttending: f.isAttending,
      }))
      if (sortType === 'attending') {
        data = data.filter((d) => d.isAttending === 1).sort((a, b) => b.attending - a.attending)
      } else {
        data = data.sort((a, b) => b.count - a.count)
      }
      // Ensure data is always an array of objects with 'family' property
      if (!Array.isArray(data) || typeof data[0]?.family !== 'string') {
        data = []
      }

      const width = 1400,
        height = Math.max(300, data.length * 60) // <-- Use data.length instead of stats.familyGroups.length
      svg.attr('width', width).attr('height', height)

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => (sortType === 'attending' ? d.attending : d.count))!])
        .range([0, width - 350])

      const y = d3
        .scaleBand()
        .domain(data.map((d) => d.family))
        .range([0, height - 80])
        .padding(0.25)

      // Draw axes
      svg
        .append('g')
        .attr('transform', 'translate(300,40)')
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll('text')
        .attr('font-size', 16)
        .attr('font-weight', 'bold')
        .attr('fill', '#333')
        .attr('font-family', 'Sofia Pro') // Use current website font

      // Bar chart race animation
      const bars = svg
        .append('g')
        .attr('transform', 'translate(300,40)')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', (d) => y(d.family)!)
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('width', 0)
        .attr('fill', (d, i) => d3.schemeCategory10[i % 10])

      // Tooltip setup
      let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null = null
      const parentNode = svg.node() ? (svg.node()!.parentNode as HTMLElement) : null
      if (parentNode) {
        // Remove any existing tooltip
        d3.select(parentNode).selectAll('.family-tooltip').remove()
        tooltip = d3
          .select(parentNode)
          .append('div')
          .attr('class', 'family-tooltip')
          .style('position', 'absolute')
          .style('background', '#fff')
          .style('border', '1px solid #ccc')
          .style('padding', '8px 12px')
          .style('border-radius', '8px')
          .style('pointer-events', 'none')
          .style('font-size', '14px')
          .style('box-shadow', '0 2px 8px rgba(0,0,0,0.15)')
          .style('opacity', 0) as unknown as d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
      }

      bars
        .on('mouseover', function (event, d) {
          if (sortType === 'attending' && tooltip) {
            // Find the family group to get updatedAt
            const familyGroup = stats.familyGroups.find((f) => f.familyName === d.family)
            tooltip
              .html(
                `<strong>${d.family}</strong><br/>
                 Last updated:<br/>
                 ${
                   familyGroup && familyGroup.updatedAt
                     ? new Date(familyGroup.updatedAt).toLocaleString('en-US', {
                         month: 'short',
                         day: '2-digit',
                         year: 'numeric',
                         hour: '2-digit',
                         minute: '2-digit',
                         hour12: true,
                       })
                     : '<em>Unknown</em>'
                 }`
              )
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 10}px`)
              .style('opacity', 1)
          }
          // ...existing tooltip for 'total' mode...
          else if (sortType === 'total' && tooltip) {
            const familyGroup = stats.familyGroups.find((f) => f.familyName === d.family)
            tooltip
              .html(
                `<strong>${d.family}</strong><br/>Guests:<br/>${
                  familyGroup && familyGroup.guests.length > 0
                    ? familyGroup.guests.map((g) => g.name).join('<br/>')
                    : '<em>No guests</em>'
                }`
              )
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 10}px`)
              .style('opacity', 1)
          }
        })
        .on('mousemove', function (event) {
          if (tooltip) {
            tooltip.style('left', `${event.pageX + 10}px`).style('top', `${event.pageY - 10}px`)
          }
        })
        .on('mouseout', function () {
          if (tooltip) tooltip.style('opacity', 0)
        })
        .transition()
        .duration(1500)
        .attr('width', (d) => x(sortType === 'attending' ? d.attending : d.count))

      // Add family name and count inside bars, centered and readable
      svg
        .append('g')
        .attr('transform', 'translate(300,40)')
        .selectAll('text.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('y', (d) => y(d.family)! + y.bandwidth() / 2 + 8)
        .attr('x', 20)
        .attr('font-size', 16)
        .attr('fill', '#fff')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .attr('font-family', 'Sofia Pro') // Use current website font
        .text((d) =>
          sortType === 'attending' ? `${d.attending} attending` : ` ${d.count} guest(s)`
        )
        .attr('opacity', 0)
        .transition()
        .duration(1500)
        .attr('x', (d) => {
          const barWidth = x(sortType === 'attending' ? d.attending : d.count)
          return barWidth > 200 ? barWidth / 2 : 20
        })
        .attr('text-anchor', (d) =>
          x(sortType === 'attending' ? d.attending : d.count) > 200 ? 'middle' : 'start'
        )
        .attr('opacity', 1)
    }
  }, [stats, sortType])

  if (!stats) {
    return <Loader message="Loading statistics..." />
  }

  return (
    <div className="p-8">
      <NavigationBar />
      <h1 className="text-4xl font-bold mb-6">Wedding Statistics</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Expected Visitors</h2>
        <div className="text-4xl font-extrabold text-indigo-600">
          {totalAttending} out of {stats.expectedVisitors} (
          {Math.round((totalAttending / stats.expectedVisitors) * 100)}%)
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Total Adults:{' '}
          <span className="font-semibold">{stats.expectedVisitors - totalKidsBelow7}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Total kids below 7 years old: <span className="font-semibold">{totalKidsBelow7}</span>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Seating Arrangement{' '}
          {stats.seating && stats.seating.length > 0
            ? `(${stats.seating.length} tables, ${stats.seating.reduce(
                (sum, t) => sum + t.guests.length,
                0
              )} assigned seat)`
            : ''}
        </h2>
        {stats.seating && stats.seating.length > 0 ? (
          <svg ref={seatingRef}></svg>
        ) : (
          <div>No seating arrangement data available</div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-4">
          Family Groups{' '}
          {sortType === 'total'
            ? ` (${stats.familyGroups.length} families)`
            : `(${totalAttending} confirmed attending)`}
          <select
            className="ml-4 px-2 py-1 border rounded text-base"
            value={sortType}
            onChange={(e) => setSortType(e.target.value as 'total' | 'attending')}
          >
            <option value="total">Sort by Number of Families</option>
            <option value="attending">Sort by Families Attending</option>
          </select>
        </h2>
        {stats.familyGroups && stats.familyGroups.length > 0 ? (
          <svg ref={familyRef}></svg>
        ) : (
          <div>No family group data available</div>
        )}
      </div>
    </div>
  )
}
