import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { fetchShotMapData } from '../hooks/getShotsData'
import { fetchPassingEventData } from '../hooks/getPassingEventData'
import { useAuth } from '../context/AuthContext'
import { pitchConfig } from '../utils/pitchUtils'
import { teamColorMapping } from '../utils/dataUtils'

const PlayerEventMap = ({homeTeam, awayTeam, player}) => {
  const {team} = useAuth()
  const [mapType, setMapType] = useState('Shotmap')
  const [selectedEvent, setSelectedEvent] = useState('Pass')
  const [eventType, setEventType] = useState('Successful')
  const chartRef = useRef(null)

  homeTeam = homeTeam === 'Newcastle' ? 'Newcastle United' : homeTeam
  awayTeam = awayTeam === 'Newcastle' ? 'Newcastle United' : awayTeam

  const {data, isLoading, error} = fetchShotMapData(team, homeTeam, awayTeam, player)

  console.log(data)

  const eventMap = () => {
    const svg = d3.select(chartRef.current)

    svg.selectAll('*').remove()

    const handleMouseOver = (event, d) => {
        const shotxG = parseFloat(d.xG)
        const roundedxG = shotxG.toFixed(2)

        const tooltip = d3.select('body')
          .append('div')
          .attr('id', 'tooltip')
          .attr('class', 'absolute bg-black text-white text-xs rounded p-2 z-10')
          .html(`
            <p>Player Name: ${d.player}</p>
            <p>xG: ${roundedxG}</p>
            <p>Minute: ${d.minute}</p>
            <p>Result: ${d.result}</p>
            <p>Situation: ${d.situation}</p>
            <p>ShotType: ${d.shotType}</p>
          `);
          tooltip.style("top", event.pageY + "px")
        .style("left", event.pageX + "px")
    }

    const handleMouseOut = () => {
        d3.selectAll('#tooltip').remove()
    }
    
    svg.call(pitchConfig)

    // Select the pitch SVG container
    const pitchSvg = svg.select('#pitch')

    // Define the size range of the shot dots based on xG values
    const dotSizeScale = d3.scaleLinear().domain([0, 0.1, 0.2, 0.5, 0.75, 1]).range([0.5, 1, 1.5, 2, 2.5, 3])

    if (!data || data?.length === 0) {
        pitchSvg
        .append('text')
        .attr('class', 'message-text')
        .attr('y', 40)
        .attr('x', 105/2)
        .text(!data ? 'GAME YET TO BE PLAYED' : 'PLAYER HAS NO EVENTS')
        .attr('font-size', '4px')
        .attr('transform', 'rotate(90, 68, 25)')
        .attr('fill', 'white')
        return
    }

    // Plot the shot dots using the `data` array
    const shotsDots = pitchSvg
    .selectAll('.line') 
    .data(data) 
    .enter() 
    .append('g')
    .attr('class', 'shot-location')
    .attr('transform', (d) => `translate(${d.X * 105}, ${(1 - d.Y) * 68})`)

    shotsDots
        .append('circle')
        .attr('class', 'shot-dot')
        .attr('r', (d) => dotSizeScale(d.xG))
        .attr('fill', (d) => (d.result === 'Goal' ? 'lightgreen' : teamColorMapping[team].color))
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
                             
    const guideDotsData = [
        { xG: 0.1 },
        { xG: 0.2 },
        { xG: 0.6 },
        { xG: 0.8 },
    ];

    // Define the position of the guide dots along the x-axis (horizontally)
    const guideDotXPositions = [68 * 0.36, 68 * 0.42, 68 * 0.50, 68 * 0.60];

    // Append the guide dots to the pitchSvg
    const guideDotsGroup = pitchSvg.append('g').attr('class', 'guide-dots');
    
    guideDotsGroup
        .selectAll('.line')
        .data(guideDotsData)
        .enter()
        .append('circle')
        .attr('class', 'guide-dot')
        .attr('cy', (_, i) => guideDotXPositions[i])
        .attr('cx', 105 / 2 - 20)
        .attr('r', (d) => dotSizeScale(d.xG))
        .attr('fill', (_, i) => (i === 3 ? 'lightgreen' : teamColorMapping[team].color))
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)

    // Add text labels for low and high xG
    guideDotsGroup
    .append('text')
    .attr('class', 'guide-label')
    .attr('y', guideDotXPositions[0])
    .attr('x', 105 / 2 - 30)
    .text('Low xG')
    .attr('font-size', '3px')
    .attr('transform', 'rotate(90, 27, 23)')
    .attr('fill', 'white');
    
    guideDotsGroup
    .append('text')
    .attr('class', 'guide-label')
    .attr('y', guideDotXPositions[3])
    .attr('x', 105 / 2 - 30)
    .text('High xG')
    .attr('font-size', '3px')
    .attr('transform', 'rotate(90, 27, 39.5)')
    .attr('fill', 'white')
  }

  useEffect(() => {
    eventMap()
  }, [data])

  if (isLoading) {
    return <Loader/>
  }
  
  if (error) {
    return <Error/>
   }
  
  return (
    <div className='border-2 min-h-500' style={{borderColor: `${teamColorMapping[team].color}`}}>
        <h2 className='text-white text-2xl font-bold m-4 mx-auto text-center'>
            Player Event Map
        </h2>
        <div className='flex justify-center text-white m-2'>
            <button className={`${mapType === 'Shotmap' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${mapType === 'Shotmap' ? teamColorMapping[team].color  : ''}`}}
            onClick={() => setMapType('Shotmap')}>
                Shotmap
            </button>
            <button className={`${mapType === 'Other Events' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${mapType === 'Other Events' ? teamColorMapping[team].color  : ''}`}}
            onClick={() => setMapType('Other Events')}>
                Other Events
            </button>
        </div>
        <div id='chart' ref={chartRef} className='flex justify-center mt-8'/>
  </div>
  )
}

export default PlayerEventMap