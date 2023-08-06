import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { fetchTopPlayersData } from '../hooks/getPlayersData';
import { teamColorMapping } from '../utils/dataUtils';
import { useAuth } from '../context/AuthContext';

const StatChart = () => {
  const chartRef = useRef()
  const { team } = useAuth()
  const { stat } = useParams()
  const [height, setHeight] = useState(getHeight())
  const width = 600

  function getHeight() {
    return window.innerWidth > 540 ? 300 : 600
  }
  
  const transformStat = stat === 'Pass%20Completion%20%' ? 'Pass Completion %' : stat

  const { data, isLoading, error } = fetchTopPlayersData(team, transformStat)

  const barChart = () => {
    const chartContainer = d3.select(chartRef.current)

    const chartData = data.map((d) => ({
      name: d['name'],
      value: d['Per 90'][stat],
    }))

    // Clear previous chart
    chartContainer.selectAll('*').remove()

    function handleMouseOver (event, d) {
      d3.select(this).attr('fill', 'rgba(0, 0, 0, 0.2)')
      const currentPlayer = data[d]

      const tooltip = d3.select('#chart')
        .append('div')
        .attr('id', 'tooltip')
        .attr('class', 'absolute bg-black text-white rounded p-4 z-10 text-center')
        .html(`
          <img src=${currentPlayer.image_url} alt=${currentPlayer.name} width="100" height="50" style="border-radius: 50%; margin: auto"/>
          <p>Player Name: ${currentPlayer.name}</p>
          <p>Minutes: ${currentPlayer.minutes}</p>
          <p>Position: ${currentPlayer.position}</p>
          <p>${stat}: ${currentPlayer['Per 90'][stat]}</p>
        `);
        tooltip
          .attr('transform', `translate(${event.page.X}, ${event.page.Y})`);
  };


    function handleMouseOut() {
      d3.select(this).attr('fill', teamColorMapping[team].color)
      d3.selectAll('#tooltip').remove()
    };

    const margin = { top: 20, right: 20, bottom: 20, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = chartContainer
                .append('svg')
                .attr('viewBox', `15 15 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet') 
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1)

    const yScale = d3.scaleLinear().domain([0, d3.max(chartData, (d) => d.value + 5)]).range([innerHeight, 0])

    // X-Axis
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0).tickPadding(5)

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('class', 'text-white')
      .attr('font-size', '8px')
      .selectAll('text')
      .text((label) => {
        const nameParts = label.split(' ');
        const length = nameParts.length;
        if (length === 1 || length === 3) {
          return nameParts[0]
        } else if (length === 2) {
          return nameParts[1]
        } else {
          return label
        }})

    // Y-Axis
    const yAxis = d3.axisLeft(yScale).ticks(5)

    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .attr('class', 'text-white')
      .attr('font-size', '6px')

    // Bars
    svg
      .selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.value))
      .attr('fill', teamColorMapping[team].color)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)
  }

  useEffect(() => {
    const updateHeight = () => {
        setHeight(getHeight())
    }
    window.addEventListener('resize', updateHeight);


    return(() => {
        window.removeEventListener('resize', updateHeight);
    })
}, [height])

  useEffect(() => {
    if (data) {
      barChart()
    }
  })

  if (isLoading) {
    return <div className='flex justify-center items-center bg-gradient-to-b from-black to-gray-800 min-h-screen'>
      <Loader/>
    </div>
  }

  if (error) {
    return <div className='flex justify-center items-center bg-gradient-to-b from-black to-gray-800 min-h-screen'>
      <Error/>
    </div>
  }

  if (!data) {
    return
  }

  return (
    <div className='bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent min-h-screen'>
      <h1 className='text-white text-2xl sm:text-4xl font-bold mb-2 mx-auto underline underline-offset-4 text-center mt-32'>{transformStat.toUpperCase()} CHART</h1>
      <div id='chart' ref={chartRef} className='flex justify-center mb-8'/>
    </div>
  )
}

export default StatChart

