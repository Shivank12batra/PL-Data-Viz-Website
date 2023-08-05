import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { fetchTopPlayersData } from '../hooks/getPlayersData';
import { teamColorMapping } from '../utils/dataUtils';
import { useAuth } from '../context/AuthContext';

const StatChart = () => {
  const svgRef = useRef();
  const { team } = useAuth();
  const { stat } = useParams();
  
  const transformStat = stat === 'Pass%20Completion%20%' ? 'Pass Completion %' : stat;

  const { data, isLoading, error } = fetchTopPlayersData(team, transformStat);

  const barChart = () => {
    const svg = select(svgRef.current)
    const margin = { top: 20, right: 30, bottom: 40, left: 100 }
    const width = 600
    const height = 600
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = scaleLinear()
      .domain([0, max(data, d => d['Per 90'][transformStat])])
      .range([0, innerWidth]);

    const y = scaleBand()
      .domain(data.map(d => d.name))
      .range([0, innerHeight])
      .padding(0.1)

    const xAxis = axisBottom(x).ticks(5)
    const yAxis = axisLeft(y)

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', margin.left)
      .attr('y', d => y(d.name) + margin.top)
      .attr('width', d => x(d['Per 90'][transformStat]))
      .attr('height', y.bandwidth())
      .attr('fill', teamColorMapping[team].color)

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis)

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
  };

  useEffect(() => {
    if (data) {
      barChart()
    }
  })

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <Error/>
  }

  if (!data) {
    return
  }

  return (
    <div className='bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent min-h-screen'>
      <h1 className='text-white text-4xl font-bold mb-6 mx-auto underline underline-offset-4 text-center mt-32'>{transformStat.toUpperCase()} CHART</h1>
      <svg ref={svgRef} className='flex justify-center mt-12 mb-8 max-w-100'/>
    </div>
  );
};

export default StatChart
