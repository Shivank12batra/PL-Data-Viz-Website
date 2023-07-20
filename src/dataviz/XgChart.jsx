import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import { fetchCumulativeXGChartData } from '../hooks/getShotsData'
import { useAuth } from '../context/AuthContext'

const XgChart = () => {
  const {team} = useAuth()
  const chartRef = useRef(null)

  const {data, isLoading, error, refetch} = fetchCumulativeXGChartData('Arsenal', 'Arsenal', 'Tottenham')
  

  const drawChart = () => {
    const chartContainer = d3.select(chartRef.current);

    // Clear previous chart
    chartContainer.selectAll('*').remove();

    const handleMouseOver = (event, d) => {
        const shotxG = parseFloat(d.xG)
        const roundedxG = shotxG.toFixed(2)
        console.log(d)
        const tooltip = d3.select('body')
          .append('div')
          .attr('id', 'tooltip')
          .attr('class', 'absolute bg-black bg-opacity-70 text-white text-xs rounded p-2 z-10')
          .html(`
            <p>Player Name: ${d.player}</p>
            <p>xG: ${roundedxG}</p>
            <p>Minute: ${d.minute}</p>
            <p>Result: ${d.result}</p>
            <p>Situation: ${d.situation}</p>
          `);
          tooltip.style("top", event.pageY + "px")
        .style("left", event.pageX + "px")
      };
      
      const handleMouseOut = () => {
        console.log('mouse out')
        d3.selectAll('#tooltip').remove();
      };

    // Define chart dimensions
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //star syhmbol svg path
    const starSymbol = 'M10.5,0.167 L13.458,6.583 L20.333,7.917 L15.625,12.542 L16.208,19.833 L10.5,16.542 L4.792,19.833 L5.375,12.542 L0.667,7.917 L7.542,6.583 L10.5,0.167 Z';

    // Prepare data
    const homeData = data?.homeData;
    const awayData = data?.awayData;

    // Process cumulative xG values
    const homeCumulativeXGValues = homeData.map((d) => +d.cumulativeXG);
    const awayCumulativeXGValues = awayData.map((d) => +d.cumulativeXG);
    const combinedCumulativeXGValues = [...homeCumulativeXGValues, ...awayCumulativeXGValues]

    // Extract minutes
    const homeMins = homeData.map((d) => +d.minute);
    const awayMins = awayData.map((d) => +d.minute);

    // Create scales
    const xScale = d3.scaleLinear().domain([d3.min(homeMins), d3.max(homeMins) + 3]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(combinedCumulativeXGValues)]).range([innerHeight, 0]);

    // home cumulative XG line
    const homeLine = d3.line()
      .x((_, i) => xScale(homeMins[i]))
      .y((d) => yScale(d))
      .curve(d3.curveStepAfter)
    
    // away cumulative XG line
    const awayLine = d3.line()
      .x((_, i) => xScale(awayMins[i]))
      .y((d) => yScale(d))
      .curve(d3.curveStepAfter)

    // Create SVG element
    const svg = chartContainer
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // home team line
    svg.append('path')
      .datum(homeCumulativeXGValues)
      .attr('class', 'home-line')
      .attr('d', homeLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 4)
    
    // away team line
    svg.append('path')
      .datum(awayCumulativeXGValues)
      .attr('class', 'away-line')
      .attr('d', awayLine)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 4)
    
    // home goals plotted
    svg.selectAll('.home-shot-dot')
        .data(homeData.filter((d) => d.result === 'Goal'))
        .enter()
        .append('path')
        .attr('class', 'shot-dot home-shot-dot')
        .attr('d', starSymbol)
        .attr('transform', (d) => `translate(${xScale(+d.minute) - 10},${yScale(d.cumulativeXG) - 10})`)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .attr('fill', 'gold')

    // away goals plotted
    svg.selectAll('.away-shot-dot')
        .data(awayData.filter((d) => d.result === 'Goal'))
        .enter()
        .append('path')
        .attr('class', 'shot-dot away-shot-dot')
        .attr('d', starSymbol)
        .attr('transform', (d) => `translate(${xScale(+d.minute) - 10},${yScale(d.cumulativeXG) - 10})`)
        .on('mouseover', handleMouseOver)
        .on('mouseleave', handleMouseOut)
        .attr('fill', 'gold');

    // Add x-axis label
    svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight + margin.top + 20)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text('Minutes');

    // Add y-axis label
    svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -margin.left)
    .attr('dy', '1em')
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text('Cumulative xG');

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis)
      .attr('class', 'text-white');

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .attr('class', 'text-white');
    };

  useEffect(() => {
    if (data) {
        drawChart()
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Something went wrong!</div>
  }

  return <div ref={chartRef} className='ml-16 mt-12 h-screen'/>
}

export default XgChart