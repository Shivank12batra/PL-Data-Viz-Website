import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import { fetchShotMapData } from '../../hooks/getShotsData'
import { fetchPassingEventData } from '../../hooks/getPassingEventData'
import { useAuth } from '../../context/AuthContext'
import { pitchConfig } from '../../utils/pitchUtils'
import { alterTeamName } from '../../utils/dataUtils'
import { teamColorMapping } from '../../utils/dataUtils'

const PlayerEventMap = ({homeTeam, awayTeam, venue, player}) => {
  const {team} = useAuth()
  const [mapType, setMapType] = useState('Shotmap')
  const [eventType, setEventType] = useState('Pass')
  const [eventOutcome, setEventOutcome] = useState('Successful')
  const chartRef = useRef(null)

  if (mapType === 'Shotmap') {
    homeTeam = homeTeam === 'Newcastle' ? 'Newcastle United' : homeTeam
    awayTeam = awayTeam === 'Newcastle' ? 'Newcastle United' : awayTeam
  } else {
    homeTeam = alterTeamName(homeTeam)
    awayTeam = alterTeamName(awayTeam)
  }

  let data, isLoading, error;
  if (mapType === 'Shotmap') {
    ({data, isLoading, error} = fetchShotMapData(team, homeTeam, awayTeam, player))
  } else {
    ({data, isLoading, error} = fetchPassingEventData(team, homeTeam, awayTeam,
        venue, eventType, eventOutcome,
        player))
  }

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
        .text(!data ? 'GAME YET TO BE PLAYED' : mapType === 'Shotmap' ? 'PLAYER HAS NO SHOTS' : 
        'PLAYER HAS NO EVENTS')
        .attr('font-size', '4px')
        .attr('transform', 'rotate(90, 68, 25)')
        .attr('fill', 'white')
        return
    }

    if (mapType === 'Other Events') {
      if (eventType === 'Pass') {
        const passLines = pitchSvg
          .selectAll('.line')
          .data(data)
          .enter()
          .append('g')
          .attr('class', 'pass-line')

        passLines
        .append('line')
        .attr('x1', (d) => (d.x * 1.05))
        .attr('y1', (d) => ((100 - d.y) * 0.68))
        .attr('x2', (d) => (d.endX * 1.05))
        .attr('y2', (d) => ((100 - d.endY) * 0.68))
        .attr('stroke', eventOutcome === 'Successful' ? 'green' : 'red')
        .attr('stroke-width', 0.4)

        passLines
        .append('circle')
        .attr('cx', (d) => (d.endX * 1.05))
        .attr('cy', (d) => ((100 - d.endY) * 0.68))
        .attr('r', 1)
        .attr('stroke', eventOutcome === 'Successful' ? 'green' : 'red')
        .attr('stroke-width', 0.5)
        
      } else {
        // Plot the ball recoveries using the `data` array
        const ballRecoveries = pitchSvg
        .selectAll('.line') 
        .data(data) 
        .enter()
        .append('g')
        .attr('class', 'event-location')
        .attr('transform', (d) => `translate(${d.x * 1.05}, ${(100 - d.y) * 0.68})`)

        ballRecoveries
        .append('circle')
        .attr('class', 'ball-recovery')
        .attr('r', 2)
        .attr('fill', eventOutcome === 'Successful' ? 'lightgreen' : 'red')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
      }
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
  

   // TODO: a lot of refactoring needed // create a different component for the input parameters, also lot of repeatable button code to be wrapped around a map function
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
        {mapType === 'Other Events' ? 
         <div className='flex justify-center text-white m-2'>
            <button className={`${eventType === 'Pass' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${eventType === 'Pass' ? teamColorMapping[team].color  : ''}`}}
            onClick={() => setEventType('Pass')}>
                Passes
            </button>
            <button className={`${eventType === 'BallRecovery' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${eventType === 'BallRecovery' ? teamColorMapping[team].color  : ''}`}}
            onClick={() => setEventType('BallRecovery')}>
                BallRecovery
            </button>
         </div> 
         :
          null}
        {mapType === 'Other Events' ? 
         <div className='flex justify-center text-white m-2'>
            <button className={`${eventOutcome === 'Successful' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${eventOutcome === 'Successful' ? teamColorMapping[team].color  : ''}`}}
            onClick={() => setEventOutcome('Successful')}>
                Successful
            </button>
            <button className={`${eventOutcome === 'Unsuccessful' && team === 'Tottenham' ? 'text-black' : null} py-2 px-8 border-2 cursor-pointer transition-colors duration-100`} style={{borderColor: `${teamColorMapping[team].color}`, backgroundColor: `${eventOutcome === 'Unsuccessful' ? teamColorMapping[team].color  : ''}`}}
            onClick={() => setEventOutcome('Unsuccessful')}>
                Unsuccessful
            </button>
         </div>
         :
          null}
          {mapType === 'Other Events' && data ? 
            <div className='flex justify-center text-white mt-4'>
              {data.length} {eventOutcome} {eventType === 'Pass' ? 'Passes' : 'Ball Recoveries'}
            </div> : 
          null}
        <div id='chart' ref={chartRef} className='flex justify-center mt-8'/>
  </div>
  )
}

export default PlayerEventMap