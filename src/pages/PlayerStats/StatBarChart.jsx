import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { fetchTopPlayersData } from "../../hooks/getPlayersData";
import { teamColorMapping } from "../../utils/dataUtils";
import { useAuth } from "../../context/AuthContext";
import ronaldo from "../../assets/ronaldo.jpg";

const StatBarChart = () => {
  const chartRef = useRef();
  const { team } = useAuth();
  const { stat } = useParams();
  const [height, setHeight] = useState(getHeight());
  const width = 600;

  function getHeight() {
    return window.innerWidth > 540 ? 300 : 600;
  }

  const transformStat =
    stat === "Pass%20Completion%20%" ? "Pass Completion %" : stat;

  const { data, isLoading, error } = fetchTopPlayersData(team, transformStat);

  const barChart = () => {
    const chartContainer = d3.select(chartRef.current);

    const chartData = data.map((d) => ({
      name: d["name"],
      value:
        transformStat !== "Pass Completion %"
          ? d["Per 90"][transformStat]
          : +d["Per 90"][transformStat].replace("%", ""),
    }));

    // Clear previous chart
    chartContainer.selectAll("*").remove();

    function handleMouseOver(event, d) {
      d3.select(this).attr("fill", "rgba(0, 0, 0, 0.2)");
      const currentPlayer = data.find(({ name }) => d.name === name);

      const tooltip = d3
        .select("#chart")
        .append("div")
        .attr("id", "tooltip")
        .attr(
          "class",
          "absolute bg-black text-white rounded p-4 z-10 text-center"
        ).html(`
          <img src=${currentPlayer.image_url} alt=${currentPlayer.name} width="100" height="50" style="border-radius: 50%; margin: auto"/>
          <p>Player Name: ${currentPlayer.name}</p>
          <p>Minutes: ${currentPlayer.minutes}</p>
          <p>Position: ${currentPlayer.position}</p>
          <p>${transformStat}: ${currentPlayer["Per 90"][transformStat]}</p>
        `);
      // tooltip.style("top", event.pageY - 100 + "px")
      // .style("left", event.pageX + "px")
    }

    function handleMouseOut() {
      d3.select(this).attr("fill", teamColorMapping[team].color);
      d3.selectAll("#tooltip").remove();
    }

    const margin = { top: 20, right: 20, bottom: 20, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = chartContainer
      .append("svg")
      .attr("viewBox", `15 15 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value + 5)])
      .range([innerHeight, 0]);

    // X-Axis
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0).tickPadding(5);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("class", "text-white")
      .attr("font-size", "8px")
      .selectAll("text")
      .text((label) => {
        const nameParts = label.split(" ");
        const length = nameParts.length;
        if (length === 1 || length === 3) {
          return nameParts[0];
        } else if (length === 2) {
          return nameParts[1];
        } else {
          return label;
        }
      });

    // Y-Axis
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .attr("class", "text-white")
      .attr("font-size", "6px");

    // Bars
    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", teamColorMapping[team].color)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    // Calculate the median value for the transformStat
    const medianValue = d3.median(chartData, (d) => d.value);

    // Add a line for the median
    svg
      .append("line")
      .attr("class", "median-line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", yScale(medianValue))
      .attr("y2", yScale(medianValue))
      .attr("stroke", team === "Tottenham" ? "blue" : "white")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3 3");

    // Add text for the median
    svg
      .append("text")
      .attr("class", "median-text")
      .attr("x", innerWidth)
      .attr("y", yScale(medianValue) - 10) // Slightly above the line (adjust 10 for the desired offset)
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-size", "12px")
      .text(`median: ${medianValue.toFixed(2)}`);
  };

  useEffect(() => {
    const updateHeight = () => {
      setHeight(getHeight());
    };
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  });

  useEffect(() => {
    if (data && data.length !== 0) {
      barChart();
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-b from-black to-gray-800 min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-b from-black to-gray-800 min-h-screen">
        <Error />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-column justify-center bg-gradient-to-b from-black to-gray-800 min-h-screen border-2 border-solid border-transparent">
        <div className="mt-32 text-center">
          <h1 className="text-white text-2xl sm:text-4xl font-bold">
            STAT NOT AVAILABLE!
          </h1>
          <img
            src={ronaldo}
            alt="Stat not found"
            className="w-100 h-100 mx-auto mt-8"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black to-gray-800 border-2 border-solid border-transparent min-h-screen">
      <h1 className="text-white text-2xl sm:text-4xl font-bold mb-2 mx-auto underline underline-offset-4 text-center mt-32">
        {transformStat.toUpperCase()} CHART
      </h1>
      <div id="chart" ref={chartRef} className="flex justify-center mb-8" />
    </div>
  );
};

export default StatBarChart;
