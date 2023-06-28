import React, { useEffect, useRef } from 'react';
import { pitch } from 'd3-soccer';

const MyComponent = () => {
  const chartRef = useRef(null)  

  useEffect(() => {
    // const h = 300;
    // const w = 500; 

    function handleMouseOver(d, i) {
        const tooltip = d3.select("body")
            .append("div")
            .attr('id', 'tooltip')
            .attr("class", "absolute top-[-30px] left-[10px] py-1 px-2 bg-black bg-opacity-70 text-white text-xs rounded")
            .text("endPass")
            
        tooltip.style("top", d3.event.pageY + "px")
        .style("left", d3.event.pageX + "px")
      }
      
      // Define mouseout event handler
      function handleMouseOut() {
        // Hide the tooltip element
        d3.select("#tooltip").remove();
      }

  //   const pitchConfig = pitch()
  //     .height(h)
  //     .clip([[0, 0], [105, 68]])
  //     .goals('line')
  //     .rotate(false)
  //     .showDirOfPlay(true)
  //     .shadeMiddleThird(false)

  //   const svg = d3.select(chartRef.current)
  //     .attr('width', w)
  //     .attr('height', (h / 105) * w)
  // .attr('preserveAspectRatio', 'xMidYMid meet');

  //   svg.call(pitchConfig);
  const h = 300;
  const w = 500;

  const pitchConfig = pitch()
    .height(h)
    .clip([[0, 0], [68, 105]])
    .goals('line')
    .rotate(true)
    .showDirOfPlay(true)
    .shadeMiddleThird(false)

  const svg = d3.select(chartRef.current).call(pitchConfig)

  // const svg = d3.select(chartRef.current)
  //   .append('svg')
  //   .attr('width', w)
  //   .attr('height', h)

    const lineData = [
        { x1: 0, y1: 0, x2: 105, y2: 68, color: 'green' },
      ];

      svg.select('#pitch')
      .selectAll('.line')
      .data(lineData)
      .enter()
      .append('line')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2)
      .attr('stroke', d => d.color)

  }, []);

  return (
    <div id="chart" ref={chartRef} className="dark-theme"/>
  )
};

export default MyComponent;







