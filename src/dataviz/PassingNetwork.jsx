import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import { pitch } from 'd3-soccer'
import { fetchPassingNetworkData } from '../hooks/getPassingNetworkData'
import { useAuth } from '../context/AuthContext'

const PassingNetwork = () => {
    const {team} = useAuth()
    const chartRef = useRef(null)
    const h = 500
    const w = 500

    const pitchConfig = pitch()
      .height(h)
      .clip([[0, 0], [68, 105]])
      .goals('line')
      .rotate(true)
      .showDirOfPlay(true)
      .shadeMiddleThird(false)

    const {data, isLoading, error, refetch} = fetchPassingNetworkData('Arsenal', 'Arsenal', 'Tottenham', 'Home') 

    console.log(data)

    const passNetworkChart = () => {
        const svg = d3.select(chartRef.current)

            svg.selectAll('*').remove()

            svg.call(pitchConfig)

            const averageLocations = data.average_locations
            const passBetween = data.pass_between

            // Select the pitch SVG container
            const pitchSvg = svg.select('#pitch');

            // Plot average locations (circles) on the pitch
            const circleRadius = 4;
            const circleColor = 'red';
            const circleBorderWidth = 1;
            const circleBorderColor = 'white';
            const shirtNumberColor = 'white';
            const shirtFontSize = 2;

            const playerCircles = pitchSvg
            .selectAll('.line')
            .data(averageLocations)
            .enter()
            .append('g')
            .attr('class', 'player-location')
            .attr('transform', (d) => `translate(${d.x * 1.05}, ${(100- d.y) * 0.68})`);
        
          playerCircles
            .append('circle')
            .attr('r', circleRadius)
            .attr('fill', circleColor)
            .attr('stroke', circleBorderColor)
            .attr('stroke-width', circleBorderWidth);
        
          playerCircles
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', shirtNumberColor)
            .attr('font-size', shirtFontSize)
            .attr('transform', 'rotate(90)')
            .text((d) => d.shirtNo);

    }

    useEffect(() => {
        if (data) {
            passNetworkChart()
        }
    }, [data])

    if (isLoading) {
        return <div>Loading</div>
      }
    
    if (error) {
        return <div>Something went wrong!</div>
    }
    
    return <div id="chart" ref={chartRef} className='mb-12'></div>
}


export default PassingNetwork;
