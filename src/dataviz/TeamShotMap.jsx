import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import { pitch } from 'd3-soccer'
import { fetchShotMapData } from '../hooks/getShotsData'
import { useAuth } from '../context/AuthContext'

const TeamShotMap = () => {
    const {team} = useAuth()
    const chartRef = useRef(null)
    const h = 500
    const w = 500

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
    };
      
    const handleMouseOut = () => {
      console.log('mouse out')
      d3.selectAll('#tooltip').remove();
    };

    const pitchConfig = pitch()
      .height(h)
      .clip([[0, 0], [68, 105]])
      .goals('line')
      .rotate(true)
      .showDirOfPlay(true)
      .shadeMiddleThird(false)

    const {data, isLoading, error, refetch} = fetchShotMapData('Arsenal', 'Arsenal', 'Tottenham')

    console.log(data)

    const shotMap = () => {
        const svg = d3.select(chartRef.current)
        
        svg.selectAll('*').remove()

        svg.call(pitchConfig)

        // Select the pitch SVG container
        const pitchSvg = svg.select('#pitch')

        // Define the size range of the shot dots based on xG values
        const dotSizeScale = d3.scaleLinear().domain([0, 0.1, 0.2, 0.5, 0.75, 1]).range([0.5, 1, 1.5, 2, 2.5, 3]);

        // Plot the shot dots using the `data` array
        const shotsDots = pitchSvg
            .selectAll('.line') 
            .data(data) 
            .enter() 
            .append('g')
            .attr('class', 'shot-location')
            .attr('transform', (d) => `translate(${d.X * 105}, ${(1 - d.Y) * 68})`);

        shotsDots
            .append('circle')
            .attr('class', 'shot-dot')
            .attr('r', (d) => dotSizeScale(d.xG))
            .attr('fill', (d) => (d.result === 'Goal' ? 'lightgreen' : 'red'))
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5)
            .on('mouseover', handleMouseOver)
            .on('mouseleave', handleMouseOut)
                             
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
    .attr('fill', (_, i) => (i === 3 ? 'lightgreen' : 'red'))
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
        if (data) {
            shotMap()
        }
    }, [data])

    if (isLoading) {
        return <div>Loading</div>
      }
    
    if (error) {
        return <div>Something went wrong!</div>
    }
    
    return (
      <div>
        <h2 className='text-white text-2xl font-bold m-4 mx-auto text-center'>Team Shot Map</h2>
        <div ref={chartRef} className='flex justify-center mt-8'/>
      </div>
    )
}

export default TeamShotMap